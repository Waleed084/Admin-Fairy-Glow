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
    balance: {
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
    image: { type: String, required: true },
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
    image: { type: String, required: true },
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

    // Update user's balance and training bonus balance
    const bonusAmount = approval.transactionAmount * 0.5;
    user.balance += bonusAmount;
    user.trainingBonusBalance += bonusAmount;
    await user.save();

    // Create a new approved record
    const approvedRecord = new TrainingBonusApproved({
      username: approval.username,
      transactionId: approval.transactionId,
      transactionAmount: approval.transactionAmount,
      gateway: approval.gateway,
      image: approval.image, // Ensure image path is correct for frontend display
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
