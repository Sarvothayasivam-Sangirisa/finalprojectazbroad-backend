// models/Service.js
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  serviceName: { 
    type: String, 
    required: true 
  },
  serviceDescription: { 
    type: String, 
    required: true 
  },
  serviceAmountPerHour: { type: Number, required: true }

}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
