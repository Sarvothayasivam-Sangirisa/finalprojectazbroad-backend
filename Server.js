//Server.js
const express = require('express'); // Set up the backend server
const dotenv = require('dotenv');  // Import dotenv to manage environment variables
const mongoose = require('mongoose'); // Import mongoose to interact with MongoDB
const cors = require('cors'); // Import CORS to handle cross-origin requests
const bodyParser = require('body-parser'); // Import body-parser to parse incoming requests
const authRoutes = require('./routes/authRoutes'); // Import authentication routes
const serviceRoutes = require('./routes/serviceRoutes')
const bookingRoutes = require('./routes/bookingRoutes');
const adminRoutes = require('./routes/adminRoutes');



const app = express(); // Create an express application

dotenv.config(); // Load environment variables from .env file

// Middleware setup
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse incoming requests with JSON payloads
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data

// Connect to MongoDB using environment variable for the URI
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Mount the authentication routes
app.use('/api', authRoutes);

// app.get('/', (req, res) => {
//   res.send('Welcome to the Service API!');
// });
app.use('/api', serviceRoutes);


app.use('/api', bookingRoutes);

app.use('/api/admin', adminRoutes);


// Define the port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
