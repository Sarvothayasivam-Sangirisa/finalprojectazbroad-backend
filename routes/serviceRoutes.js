// const express = require('express');
// const router = express.Router();
// // const authMiddleware = require('../middleware/authMiddleware.js'); // Middleware for authentication
// // const adminMiddleware = require('../middleware/adminMiddleware.js'); // Middleware for admin authorization
// const { getAllServices, createService, updateService, deleteService } = require('../controllers/serviceController.js');

// // Middleware for validation (example)
// const validateServiceData = (req, res, next) => {
//     const { name, price, features } = req.body;
//     if (!name || !price || !features) {
//         return res.status(400).json({ error: 'Name, price, and features are required' });
//     }
//     next();
// };

// // Define routes and apply middleware
// router.get('/services', getAllServices);
// router.post('/services', validateServiceData, createService);
// router.put('/services/:id', validateServiceData, updateService);
// router.delete('/services/:id', deleteService);

// module.exports = router;
//try
const express = require('express');
const router = express.Router();
const adminMiddleware = require('../middleware/adminMiddleware.js'); // Middleware for admin authorization
const { getAllServices, createService, updateService, deleteService } = require('../controllers/serviceController.js');

// Middleware for validation (example)
const validateServiceData = (req, res, next) => {
    const { name, price, features } = req.body;
    if (!name || !price || !features) {
        return res.status(400).json({ error: 'Name, price, and features are required' });
    }
    next();
};

// Define routes and apply middleware
router.get('/services', getAllServices);
router.post('/services', [adminMiddleware, validateServiceData], createService); // Only admins can create services
router.put('/services/:id', [adminMiddleware, validateServiceData], updateService); // Only admins can update services
router.delete('/services/:id', adminMiddleware, deleteService); // Only admins can delete services

module.exports = router;
