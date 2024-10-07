// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  planName: { type: String, required: true },
  planserviceLocation: { type: String, required: true }, // Ensure this matches the client-side
  planpaymentId: { type: String, required: true }, // Ensure this matches the client-side
  planuser: { type: String, required: true }, // Ensure this matches the client-side
  planemail: { type: String, required: true }, // Ensure this matches the client-side
  planduration: { type: String, required: true }, // Ensure this matches the client-side
  plantotalAmount: { type: Number, required: true }, // Ensure this matches the client-side
}, { timestamps: true }); // This will add createdAt and updatedAt timestamps

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
