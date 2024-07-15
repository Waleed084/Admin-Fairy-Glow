const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

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

// Get full name by username
app.get('/api/users/fullname/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.send({ fullName: user.fullName });
  } catch (err) {
    res.status(500).send(err);
  }
});

// ----------------------------------||Legacy Code||---------------------------------

const SleighSchema = new mongoose.Schema({
  submissionDate: {
    type: Date,
    required: true
  },
  Type: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  Seller: {
    type: String,
    required: true
  },
  route: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  Color: {
    type: String,
    required: true
  },
  HeadBoard: {
    type: String,
    required: true
  },
  mattress: {
    type: String,
    required: true
  },
  ottoman: {
    type: String,
    required: true
  },
  Glift: {
    type: String,
    required: true
  },
  threeD: {
    type: String,
    required: true
  },
  totalPrice: {
    type: String,
    required: true
  },
  Company: {
    type: String,
    required: true
  },
  customerDetails: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  },
  remarks: {
    type: String,
    required: true
  },
  sprice: {
    type: String,
    required: true
  },
  profit: {
    type: String,
    required: true
  }
});

const SleighModel = mongoose.model('SleighModel', SleighSchema); // Create a Mongoose model

app.post('/api/postSleigh', async (req, res) => {
  try {
    const objectToSave = req.body;
    const savedObject = await SleighModel.create(objectToSave); // Save the object using the model
    res.status(200).json({ message: 'Object saved successfully.', savedObject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const DevanSchema = new mongoose.Schema({
  submissionDate: {
    type: Date,
    required: true
  },
  Type: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  Seller: {
    type: String,
    required: true
  },
  route: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  Color: {
    type: String,
    required: true
  },
  HeadBoard: {
    type: String,
    required: true
  },
  mattress: {
    type: String,
    required: true
  },
  Set: {
    type: String,
    required: true
  },
  assembly: {
    type: String,
    required: true
  },
  siplet: {
    type: String,
    required: true
  },
  totalPrice: {
    type: String,
    required: true
  },
  Company: {
    type: String,
    required: true
  },
  customerDetails: {
    type: String,
    required: true
  },
  sprice: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  },
  remarks: {
    type: String,
    required: true
  },
  profit: {
    type: String,
    required: true
  }
});

const DevanModel = mongoose.model('DevanModel', DevanSchema); // Create a Mongoose model

const MattressSchema = new mongoose.Schema({
  submissionDate: {
    type: Date,
    required: true
  },
  Type: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  Seller: {
    type: String,
    required: true
  },
  route: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  mattress: {
    type: String,
    required: true
  },
  totalPrice: {
    type: String,
    required: true
  },
  Company: {
    type: String,
    required: true
  },
  customerDetails: {
    type: String,
    required: true
  },
  sprice: {
    type: String,
    required: true
  },
  postalCode: {
    type: String,
    required: true
  },
  remarks: {
    type: String
  },
  profit: {
    type: String,
    required: true
  }
});

const MattressModel = mongoose.model('MattressModel', MattressSchema); // Create a Mongoose model

app.post('/api/postMattress', async (req, res) => {
  try {
    const objectToSave = req.body;
    const savedObject = await MattressModel.create(objectToSave); // Save the object using the model
    res.status(200).json({ message: 'Object saved successfully.', savedObject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/postDevan', async (req, res) => {
  try {
    const objectToSave = req.body;
    const savedObject = await DevanModel.create(objectToSave); // Save the object using the model
    res.status(200).json({ message: 'Object saved successfully.', savedObject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Authentication Endpoint
app.post('/api/authenticate', async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  try {
    const user = await User.findOne({
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

// User Schema and Model (Assuming you have a User model)
/* const userSchema = new mongoose.Schema({
 // username: String,
//  email: String,
  bankName: String,
  accountNumber: String,
  authenticationPin: String,
  address: String,
  password: String
});

const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', {
  name: String,
  sellerPin: String,
  AdminPin: String,
  authenticationPin: String,
  password: String
}); */

// Registration Endpoint
app.post('/api/signup', async (req, res) => {
  const formData = req.body;

  try {
    // Check if the user already exists based on some unique identifier (e.g., username)
    const existingUser = await User.findOne({ username: formData.username });

    if (existingUser) {
      // User with this username already exists
      return res.json({ success: false, message: 'User with this username already exists.' });
    }

    // Check the authenticationPin against the sellerPin from the Admin model
    const admin = await Admin.findOne({ authenticationPin: formData.authenticationPin });

    if (admin) {
      // If the authenticationPin matches, create a new user record and save it to the database
      const newUser = new User({
        username: formData.username,
        email: formData.email,
        cnicNumber: formData.cnicNumber,
        accountNumber: formData.accountNumber,
        bankName: formData.bankName,
        authenticationPin: formData.authenticationPin,
        password: formData.password
      });
      await newUser.save();
      return res.json({ success: true, message: 'User registered successfully.' });
    } else {
      // AuthenticationPin does not match any authenticationPin in the Admin model
      return res.json({ success: false, message: 'Authentication failed. Please check your pin.' });
    }
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

const documentSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  size: Number,
  content: Buffer // Store file content as a Buffer
  // Define other fields as needed
});
const Document = mongoose.model('Document', documentSchema);
// Initialize GridFS asynchronously
const conn = mongoose.connection;
conn.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'uploads'
  });
});

// Enable CORS
app.use(cors());

// Route to download files
app.get('/api/download/:fileId', async (req, res) => {
  const fileId = req.params.fileId;

  try {
    // Retrieve the document from the database
    const document = await Document.findById(fileId);

    if (!document) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Set the content type header based on the document's content type
    res.setHeader('Content-Type', document.contentType);

    // Set the content-disposition header to force download
    res.setHeader('Content-Disposition', `attachment; filename=${document.filename}`);

    // Stream the binary content of the document to the client
    res.send(document.content);
  } catch (error) {
    console.error('Error fetching file:', error);
    res.status(500).json({ error: 'Error fetching file' });
  }
});

// Route to fetch files
app.get('/api/files', async (req, res) => {
  try {
    // Assuming you have a Document model defined in your backend
    const files = await Document.find(); // Retrieve files from your database
    res.status(200).json({ files });
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ error: 'Error fetching files' });
  }
});

// Endpoint to get Devan orders by seller name
app.get('/api/submissions/devan/:username', async (req, res) => {
  const username = req.params.username;

  try {
    // Fetch orders based on the provided username from the database
    const orders = await DevanModel.find({ Seller: username }); // Assuming you have a DevanModel for orders

    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.get('/api/submissions/mattress/:username', async (req, res) => {
  const username = req.params.username;

  try {
    // Fetch orders based on the provided username from the database
    const orders = await MattressModel.find({ Seller: username }); // Assuming you have a DevanModel for orders

    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint to get Sleigh orders by seller name
app.get('/api/submissions/sleigh/:username', async (req, res) => {
  const username = req.params.username;

  try {
    // Fetch orders based on the provided username from the database
    const orders = await SleighModel.find({ Seller: username }); // Assuming you have a DevanModel for orders

    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const commissionSchema = new mongoose.Schema({
  username: String,
  commissionAmount: Number
});
const Commission = mongoose.model('Commission', commissionSchema);

//Endpoint to get monthly Commission
app.post('/api/commission/this-month/:username', async (req, res) => {
  // Changed to app.post()
  try {
    const { username } = req.params; // Access the username from the request body
    const commission = await Commission.findOne({ username });
    if (!commission) {
      return res.status(404).json({ message: 'Commission not found' });
    }
    res.json({ commissionAmount: commission.commissionAmount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Endpoint to get all commission
app.post('/api/commission/:username', async (req, res) => {
  try {
    const { username } = req.params;
    // Find all documents with the matching username
    const commissions = await Commission.find({ username });

    if (commissions.length === 0) {
      return res.status(404).json({ message: 'Commission not found' });
    }

    // Sum up commission amounts
    const totalCommission = commissions.reduce((total, commission) => {
      return total + commission.commissionAmount;
    }, 0);

    res.json({ totalCommission });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const bedSchema = mongoose.Schema;

const ukBedSchema = new bedSchema({
  type: {
    type: String,
    required: true
  },
  companies: [
    {
      type: String,
      required: true
    }
  ]
});

const UKBed = mongoose.model('UKBed', ukBedSchema);

// Get all types of UK beds to show cards
app.get('/api/ukbeds/types', async (req, res) => {
  try {
    const ukBedTypes = await UKBed.find({});
    res.json(ukBedTypes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get companies for a specific type of UK bed
app.get('/api/ukbeds/types/:type', async (req, res) => {
  try {
    const ukBedType = await UKBed.findOne({ type: req.params.type });
    if (!ukBedType) {
      return res.status(404).json({ message: 'Type not found' });
    }
    res.json(ukBedType.companies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// GET /api/companies
app.get('/companies', async (req, res) => {
  try {
    const companies = await Company.find({});
    res.json(companies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Inventory schema
const InventorySchema = new mongoose.Schema({
  type: String,
  company: String,
  properties: [
    {
      name: String,
      choices: [String]
    }
  ]
});

const InventoryModel = mongoose.model('Inventory', InventorySchema);

// Cart schema
const CartSchema = new mongoose.Schema({
  type: String,
  company: String,
  properties: Map
});

const CartModel = mongoose.model('Cart', CartSchema);

// Get properties for a specific type and company
app.get('/api/inventory/properties/:type/:company', (req, res) => {
  const { type, company } = req.params;
  // Fetch properties from the InventoryModel
  InventoryModel.find({ type, company })
    .then((properties) => res.json(properties))
    .catch((error) => res.status(500).send(error));
});

// Add an order to the cart
app.post('/api/cart', (req, res) => {
  const order = req.body;
  // Save order to the CartModel
  CartModel.create(order)
    .then(() => res.status(201).send('Order added to cart'))
    .catch((error) => res.status(500).send(error));
});

// Get cart items
app.get('/api/cart', (req, res) => {
  CartModel.find()
    .then((cartItems) => res.json(cartItems))
    .catch((error) => res.status(500).send(error));
});
// Get Cart Items by ID
app.get('/api/cart/:id', (req, res) => {
  CartModel.findById(req.params.id)
    .then((cartItem) => res.json(cartItem))
    .catch((error) => res.status(500).send(error));
});
