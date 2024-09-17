const express = require('express');
const router = express.Router();
const { bookService } = require('../controllers/bookingController');

// POST route for booking
router.post('/book', bookService);

module.exports = router;
