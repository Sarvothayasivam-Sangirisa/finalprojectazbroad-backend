// const mongoose = require('mongoose');

// const bookingSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     phoneNumber: { type: String, required: true },
//     address: { type: String, required: true },
//     postalCode: { type: String, required: true },
//     city: { type: String, required: true },
//     country: { type: String, required: true },
//     duration: { type: Number, required: true },
//     paymentMethod: { type: String, required: true },
//     cardholderName: { type: String },
//     cardNumber: { type: String },
//     expirationDate: { type: String },
//     cvc: { type: String }
// });

// const Booking = mongoose.model('Booking', bookingSchema);

// module.exports = Booking;
const mongoose = require('mongoose');
const { isEmail } = require('validator'); // To validate email
const { isCreditCard } = require('validator'); // To validate credit card

const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { 
        type: String, 
        required: true,
        validate: [isEmail, 'Invalid email'] // Validates email format
    },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    postalCode: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    duration: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    cardholderName: { type: String },
    cardNumber: { 
        type: String,
        validate: [isCreditCard, 'Invalid credit card number'] // Validates credit card format
    },
    expirationDate: { 
        type: String,
        validate: {
            validator: function(v) {
                return /^\d{2}\/\d{2}$/.test(v); // Validates MM/YY format
            },
            message: props => `${props.value} is not a valid expiration date!`
        }
    },
    cvc: { 
        type: String,
        validate: {
            validator: function(v) {
                return /^\d{3,4}$/.test(v); // Validates CVC format
            },
            message: props => `${props.value} is not a valid CVC!`
        }
    }
});

// Indexing email and cardNumber for faster lookups
bookingSchema.index({ email: 1 });
bookingSchema.index({ cardNumber: 1 });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
