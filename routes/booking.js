// // routes/booking.js
// const express = require('express');
// const Booking = require('../modles/Booking');
// const router = express.Router();
// const { sendPlanBookingConfirmationEmail } = require('../services/emailService'); 
// // In your router file
// router.post('/bookings', async (req, res) => {
//   const { planName, planserviceLocation, planpaymentId, planuser, planemail, planduration, plantotalAmount } = req.body;

//   // Validate incoming data
//   if (!planName || !planserviceLocation || !planpaymentId || !planuser || !planemail || !planduration || plantotalAmount === undefined) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   try {
//     // Create a new booking instance
//     const newBooking = new Booking({
//       planName,
//       planserviceLocation,
//       planpaymentId,
//       planuser,
//       planemail,
//       planduration,
//       plantotalAmount, // Store the total amount
//     });

//     // Save the booking to the database
//     await newBooking.save();

//     // Call the renamed function to send confirmation email
//     await sendPlanBookingConfirmationEmail(planemail, planName, planserviceLocation, planduration, plantotalAmount);

//     // Respond with success message
//     res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
//   } catch (error) {
//     console.error('Error creating booking:', error);
//     res.status(500).json({ message: 'Error creating booking' });
//   }
// });

// router.get('/bookings', async (req, res) => {
//   try {
//     const bookings = await Booking.find(); // Fetch all bookings from the database
//     res.status(200).json(bookings); // Send the bookings as the response
//   } catch (error) {
//     console.error('Error fetching bookings:', error);
//     res.status(500).json({ message: 'Error fetching bookings' });
//   }
// });
  
// // DELETE /api/bookings/:id
// router.delete('/bookings/:id', async (req, res) => {
//   try {
//     const { id } = req.params; // Extract the ID from the request parameters
//     const deletedBooking = await Booking.findByIdAndDelete(id); // Delete the booking by ID

//     if (!deletedBooking) {
//       return res.status(404).json({ message: 'Booking not found' }); // Handle not found case
//     }

//     res.status(200).json({ message: 'Booking deleted successfully', booking: deletedBooking }); // Return success response
//   } catch (error) {
//     console.error('Error deleting booking:', error);
//     res.status(500).json({ message: 'Error deleting booking' }); // Return server error
//   }
// });
// module.exports = router;
// routes/booking.js
const express = require('express');
const path = require('path');
const Booking = require('../modles/Booking');
const router = express.Router();
const multer = require('multer');
const { sendPlanBookingConfirmationEmail } = require('../services/emailService'); 
// In your router file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save uploaded files to "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique file name
  },
});

const upload = multer({ storage });

router.post('/bookings', upload.single('serviceImage'), async (req, res) => {
  const { planName, planserviceLocation, planpaymentId, planuser, planemail, planduration, plantotalAmount } = req.body;
  const serviceImage = req.file ? req.file.filename : null; // Check if file was uploaded

  // Validate incoming data
  if (!planName || !planserviceLocation || !planpaymentId || !planuser || !planemail || !planduration || plantotalAmount === undefined) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Create a new booking instance
    const newBooking = new Booking({
      planName,
      planserviceLocation,
      planpaymentId,
      planuser,
      planemail,
      planduration,
      plantotalAmount,
      serviceImage, // Save the uploaded image filename
    });

    // Save the booking to the database
    await newBooking.save();

    // Send confirmation email
    await sendPlanBookingConfirmationEmail(planemail, planName, planserviceLocation, planduration, plantotalAmount);

    // Respond with success message
    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Failed to create booking' });
  }
});


router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find(); // Fetch all bookings from the database
    res.status(200).json(bookings); // Send the bookings as the response
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});
  
// DELETE /api/bookings/:id
router.delete('/bookings/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extract the ID from the request parameters
    const deletedBooking = await Booking.findByIdAndDelete(id); // Delete the booking by ID

    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found' }); // Handle not found case
    }

    res.status(200).json({ message: 'Booking deleted successfully', booking: deletedBooking }); // Return success response
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ message: 'Error deleting booking' }); // Return server error
  }
});
module.exports = router;