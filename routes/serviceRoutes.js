const express = require('express');
const router = express.Router();
const Service = require('../modles/Service');  // Ensure the path to the Service model is correct

// Get all services
router.get('/', async (req, res) => {
    try {
        const services = await Service.find();  // Fetch all services from the database
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Create a new service
router.post('/', async (req, res) => {
    const { serviceName, serviceDescription, serviceAmountPerHour } = req.body;

    // Validation: Check if all required fields are present
    if (!serviceName || !serviceDescription || !serviceAmountPerHour) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const service = new Service({
        serviceName,
        serviceDescription,
        serviceAmountPerHour // Include the hourly amount
    });

    try {
        const newService = await service.save();
        res.status(201).json(newService); // Successfully created
    } catch (error) {
        res.status(500).json({ message: error.message }); // Internal server error
    }
});

// Update a service by ID
router.put('/:id', async (req, res) => {
    const { serviceName, serviceDescription, serviceAmountPerHour } = req.body;

    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        // Update service details
        service.serviceName = serviceName || service.serviceName;
        service.serviceDescription = serviceDescription || service.serviceDescription;
        service.serviceAmountPerHour = serviceAmountPerHour || service.serviceAmountPerHour; // Include hourly rate

        await service.save();  // Save updated service
        res.json({ message: 'Service updated successfully', service });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new service
router.post('/', async (req, res) => {
    const { serviceName, serviceDescription } = req.body;

    // Validation: Check if all required fields are present
    if (!serviceName || !serviceDescription) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const service = new Service({
        serviceName,
        serviceDescription
    });

    try {
        const newService = await service.save();
        res.status(201).json(newService); // Successfully created
    } catch (error) {
        res.status(500).json({ message: error.message }); // Internal server error
    }
});

// Update a service by ID
router.put('/:id', async (req, res) => {
    const { serviceName, serviceDescription } = req.body;

    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        // Update service details
        service.serviceName = serviceName || service.serviceName;
        service.serviceDescription = serviceDescription || service.serviceDescription;

        await service.save();  // Save updated service
        res.json({ message: 'Service updated successfully', service });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a service
router.delete('/:id', async (req, res) => {
    try {
        const result = await Service.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.json({ message: 'Service deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
