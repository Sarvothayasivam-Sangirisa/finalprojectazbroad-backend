 
// Sample data for services (In real-world, this would come from a database)
let services = [
    { id: 1, name: "Basic Plan", price: 1950, features: ["Regular Cleaning", "Outside Cleaning","Outside Floors", "Waste Management","Basic Repair","Utility Management"] },
    { id: 2, name: "Premium Plan", price: 9950, features: ["All Weekly Base Plans", "Deep Cleaning","house inside & outside","Windows and Doors", "Garden Maintenance","Interior maintanence and Security check"] },
    { id: 3, name: "Pro Plan", price: 19500, features: ["All Premium Plans", "Full Property Management","AR painting","AR Room Setup"] }
];

// Controller functions
const getAllServices = (req, res) => {
    res.json(services);
};

const createService = (req, res) => {
    const newService = { id: services.length + 1, ...req.body };
    services.push(newService);
    res.status(201).json(newService);
};

const updateService = (req, res) => {
    const id = parseInt(req.params.id);
    const serviceIndex = services.findIndex(service => service.id === id);
    if (serviceIndex === -1) return res.status(404).send('Service not found.');

    services[serviceIndex] = { ...services[serviceIndex], ...req.body };
    res.json(services[serviceIndex]);
};

const deleteService = (req, res) => {
    const id = parseInt(req.params.id);
    services = services.filter(service => service.id !== id);
    res.status(204).send();
};

// Export the controller functions
module.exports = {
    getAllServices,
    createService,
    updateService,
    deleteService
};
