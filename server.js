const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 9000;

console.log('Attempting to start server on port:', PORT);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Your middleware and routes go here

app.listen(PORT, (err) => {
  if (err) {
    console.error('Error starting server:', err);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});

// Close the Mongoose connection if the Node process ends
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose connection disconnected through app termination');
    process.exit(0);
  });
});
app.use(bodyParser.json());
app.use(cors());

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    balance: {
      type: Number,
      default: 0
    },
    advancePoints: {
      type: Number,
      default: 0
    },
    totalPoints: {
      type: Number,
      default: 0
    },
    directPoints: {
      type: Number,
      default: 0
    },
    indirectPoints: {
      type: Number,
      default: 0
    },
    trainingBonusBalance: {
      type: Number,
      default: 0
    },
    plan: {
      type: String,
      required: true
    },
    rank: {
      type: String,
      required: true
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      default: null
    }, // Reference to the parent (referrer)
    refPer: {
      type: Number,
      required: true
    },
    refParentPer: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt timestamps
  }
);

const User = mongoose.model('User', userSchema);

const adminSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt timestamps
  }
);
const Admin = mongoose.model('Admin', adminSchema);
// Get full name by username
app.get('/api/users/fullname/:username', async (req, res) => {
  try {
    const user = await Admin.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.send({ fullName: user.fullName });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Authentication Endpoint
app.post('/api/authenticate', async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  try {
    const user = await Admin.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      password: password
    });

    if (user) {
      res.json({ success: true, username: user.username });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error('Error during authentication:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});
// Define schemas and models
const TrainingBonusApprovalSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    transactionId: { type: String, required: true },
    transactionAmount: { type: Number, required: true },
    gateway: { type: String, required: true },
    imagePath: { type: String, required: true },
    status: { type: String, default: 'pending' }
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt timestamps
  }
);

const TrainingBonusApproval = mongoose.model('TrainingBonusApproval', TrainingBonusApprovalSchema);

const TrainingBonusApprovedSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    transactionId: { type: String, required: true },
    transactionAmount: { type: Number, required: true },
    gateway: { type: String, required: true },
    addedPoints: { type: Number, required: true },
    imagePath: { type: String, required: true },
    status: { type: String, default: 'approved' }
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt timestamps
  }
);

const TrainingBonusApproved = mongoose.model('TrainingBonusApproved', TrainingBonusApprovedSchema);

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Fetch all pending approval requests
app.get('/api/approvals/pending-approvals', async (req, res) => {
  try {
    const approvals = await TrainingBonusApproval.find({ status: 'pending' });
    res.json(approvals);
  } catch (error) {
    console.error('Error fetching pending approvals:', error);
    res.status(500).send('Server error');
  }
});

app.post('/api/approvals/approve', async (req, res) => {
  const { id } = req.body;

  try {
    const approval = await TrainingBonusApproval.findById(id);
    if (!approval) {
      return res.status(404).send('Approval request not found');
    }

    // Fetch the user (replace User with your actual User model)
    const user = await User.findOne({ username: approval.username });
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Update user's balance, training bonus balance, and total points
    const bonusAmount = approval.transactionAmount * 0.5;
    const trainingBonusPoints = parseInt(process.env.TRAINING_BONUS_POINTS);
    user.balance += bonusAmount;
    user.trainingBonusBalance += bonusAmount;
    user.totalPoints += trainingBonusPoints;
    await user.save();

    // Create a new approved record
    const approvedRecord = new TrainingBonusApproved({
      username: approval.username,
      transactionId: approval.transactionId,
      transactionAmount: approval.transactionAmount,
      gateway: approval.gateway,
      addedPoints: process.env.TRAINING_BONUS_POINTS,
      imagePath: approval.imagePath, // Ensure image path is correct for frontend display
      approvedAt: new Date()
    });
    await approvedRecord.save();

    // Remove the approval request
    await TrainingBonusApproval.findByIdAndRemove(id);

    res.send('Request approved successfully');
  } catch (error) {
    console.error('Error approving request:', error);
    res.status(500).send('Server error: ' + error.message); // Send detailed error message
  }
});

//---------------||Rejected Training Bonus Schema||---------------------
const TrainingBonusRejectedSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    transactionId: { type: String, required: true },
    transactionAmount: { type: Number, required: true },
    gateway: { type: String, required: true },
    imagePath: { type: String, required: true },
    feedback: { type: String, required: true },
    status: { type: String, default: 'rejected' }
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt timestamps
  }
);

const TrainingBonusRejected = mongoose.model('TrainingBonusRejected', TrainingBonusRejectedSchema);

// ]--------------------||EndPoint to Handle Training Bonus Rejection||---------------------------[

app.post('/api/approvals/reject', async (req, res) => {
  const { id, feedback } = req.body;

  try {
    const approval = await TrainingBonusApproval.findById(id);
    if (!approval) {
      return res.status(404).send('Approval request not found');
    }

    // Create a new rejected record
    const rejectedRecord = new TrainingBonusRejected({
      username: approval.username,
      transactionId: approval.transactionId,
      transactionAmount: approval.transactionAmount,
      gateway: approval.gateway,
      imagePath: approval.imagePath,
      feedback: feedback
    });
    await rejectedRecord.save();

    // Remove the approval request
    await TrainingBonusApproval.findByIdAndRemove(id);

    res.send('Request rejected successfully');
  } catch (error) {
    console.error('Error rejecting request:', error);
    res.status(500).send('Server error: ' + error.message);
  }
});

// ]----------------||Implementation of approving Referrals||------------------[

// Define schema for ReferralPaymentVerification
const referralPaymentSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    transactionId: { type: String, required: true },
    transactionAmount: { type: Number, required: true },
    gateway: { type: String, required: true },
    planName: { type: String, required: true },
    planPRICE: { type: Number, required: true },
    advancePoints: { type: Number, required: true },
    DirectPoint: { type: Number, required: true },
    IndirectPoint: { type: Number, required: true },
    refPer: { type: Number, required: true },
    refParentPer: { type: Number, required: true },
    referrerPin: { type: String, required: true, unique: true },
    imagePath: { type: String, required: true }
  },
  { timestamps: true }
);
const ReferralPaymentVerification = mongoose.model('ReferralPaymentVerification', referralPaymentSchema);
const ReferralApprovedSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    transactionId: { type: String, required: true },
    transactionAmount: { type: Number, required: true },
    gateway: { type: String, required: true },
    addedPointsSelf: { type: Number, required: true },
    addedPointsParent: { type: Number, required: true },
    addedBalanceSelf: { type: Number, required: true },
    addedBalanceParent: { type: Number, required: true },
    imagePath: { type: String, required: true },
    status: { type: String, default: 'approved' }
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt timestamps
  }
);

const ReferralApproved = mongoose.model('ReferralApproved', ReferralApprovedSchema);

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Fetch all pending approval requests
app.get('/api/approvals/referral/pending-approvals', async (req, res) => {
  try {
    const approvals = await ReferralPaymentVerification.find({ status: 'pending' });
    res.json(approvals);
  } catch (error) {
    console.error('Error fetching pending approvals:', error);
    res.status(500).send('Server error');
  }
});

const userPendingSchema = new mongoose.Schema(
  {
    planName: { type: String, required: true },
    planPRICE: { type: Number, required: true },
    advancePoints: { type: Number, required: true },
    DirectPoint: { type: Number, required: true },
    IndirectPoint: { type: Number, required: true },
    refPer: { type: Number, required: true },
    refParentPer: { type: Number, required: true },
    referrerPin: { type: String, required: true, unique: true },
    referrerId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
  },
  { timestamps: true }
);

const UserPending = mongoose.model('UserPending', userPendingSchema);

app.post('/api/approvals/referral/approve', async (req, res) => {
  const { id } = req.body;

  try {
    const approval = await ReferralPaymentVerification.findById(id);
    if (!approval) {
      return res.status(404).send('Approval request not found');
    }

    const user = await User.findOne({ username: approval.username });
    if (!user) {
      return res.status(404).send('User not found');
    }

    const parent = await User.findById(user.parent);
    if (!parent) {
      return res.status(404).send('Parent user not found');
    }

    // Calculate the bonus amounts
    const bonusAmountSelf = approval.transactionAmount * user.refPer;
    const bonusAmountParent = approval.transactionAmount * parent.refParentPer;
    const referralDirectPoints = approval.DirectPoint;
    const referralIndirectPoints = approval.IndirectPoint;

    // Update the user balance and points
    user.balance += bonusAmountSelf;
    user.totalPoints += referralDirectPoints;
    user.directPoints += referralDirectPoints;
    await user.save();

    // Update the parent balance and points
    parent.balance += bonusAmountParent;
    parent.totalPoints += referralIndirectPoints;
    parent.indirectPoints += referralIndirectPoints;
    await parent.save();

    // Create a new approved record
    const approvedRecord = new ReferralApproved({
      username: approval.username,
      transactionId: approval.transactionId,
      transactionAmount: approval.transactionAmount,
      gateway: approval.gateway,
      addedPointsSelf: referralDirectPoints,
      addedPointsParent: referralIndirectPoints,
      addedBalanceSelf: bonusAmountSelf,
      addedBalanceParent: bonusAmountParent,
      imagePath: approval.imagePath,
      approvedAt: new Date()
    });
    await approvedRecord.save();

    // Create a new UserPending record
    const userPendingRecord = new UserPending({
      planName: approval.planName,
      planPRICE: approval.planPRICE,
      advancePoints: approval.advancePoints,
      DirectPoint: approval.DirectPoint,
      IndirectPoint: approval.IndirectPoint,
      refPer: approval.refPer,
      refParentPer: approval.refParentPer,
      referrerPin: approval.referrerPin,
      referrerId: user.id
    });
    await userPendingRecord.save();

    // Remove the approval request
    await ReferralPaymentVerification.findByIdAndRemove(id);

    res.send('Request approved successfully');
  } catch (error) {
    console.error('Error approving request:', error);
    res.status(500).send('Server error: ' + error.message);
  }
});

// ---------------||Define schema for ReferralRejected||-----------------------

const referralRejectedSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    transactionId: { type: String, required: true },
    transactionAmount: { type: Number, required: true },
    gateway: { type: String, required: true },
    imagePath: { type: String, required: true },
    feedback: { type: String, required: true },
    status: { type: String, default: 'rejected' },
    refPer: { type: Number, required: true },
    refParentPer: { type: Number, required: true }
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt timestamps
  }
);

const ReferralRejected = mongoose.model('ReferralRejected', referralRejectedSchema);

// EndPoint to Handle Referral Request Rejection
app.post('/api/approvals/referral/reject', async (req, res) => {
  const { id, feedback } = req.body;

  try {
    const approval = await ReferralPaymentVerification.findById(id);
    if (!approval) {
      return res.status(404).send('Approval request not found');
    }

    // Create a new rejected record
    const rejectedRecord = new ReferralRejected({
      username: approval.username,
      transactionId: approval.transactionId,
      transactionAmount: approval.transactionAmount,
      gateway: approval.gateway,
      imagePath: approval.imagePath,
      feedback: feedback,
      refPer: approval.refPer,
      refParentPer: approval.refParentPer
    });
    await rejectedRecord.save();

    // Remove the approval request
    await ReferralPaymentVerification.findByIdAndRemove(id);

    res.send('Request rejected successfully');
  } catch (error) {
    console.error('Error rejecting request:', error);
    res.status(500).send('Server error: ' + error.message);
  }
});
