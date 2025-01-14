const express = require('express');
const DeliveryPersonnel = require('../models/DeliveryPersonnel'); // Import the DeliveryPersonnel model
const Delivery = require('../models/Delivery'); // Import the Delivery model
const router = express.Router();

// GET all delivery personnel with their associated deliveries
router.get('/', async (req, res) => {
    try {
        const personnel = await DeliveryPersonnel.find(); // Fetch all delivery personnel from the database
        // Fetch associated deliveries for each personnel
        const personnelWithDeliveries = await Promise.all(personnel.map(async (person) => {
            const deliveries = await Delivery.find({ deliveryPersonnel: person._id }); // Assuming deliveryPersonnel is a field in Delivery
            return { ...person.toObject(), deliveries }; // Combine personnel data with their deliveries
        }));
        res.status(200).json(personnelWithDeliveries);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch delivery personnel' });
    }
});

// POST a new delivery personnel
router.post('/', async (req, res) => {
    const newPersonnel = new DeliveryPersonnel(req.body);
    try {
        const savedPersonnel = await newPersonnel.save();
        res.status(201).json(savedPersonnel);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create delivery personnel' });
    }
});

// PUT (update) a delivery personnel by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedPersonnel = await DeliveryPersonnel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPersonnel) {
            return res.status(404).json({ message: 'Delivery personnel not found' });
        }
        res.status(200).json(updatedPersonnel);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update delivery personnel' });
    }
});

// DELETE a delivery personnel by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedPersonnel = await DeliveryPersonnel.findByIdAndDelete(req.params.id);
        if (!deletedPersonnel) {
            return res.status(404).json({ message: 'Delivery personnel not found' });
        }
        res.status(200).json({ message: 'Delivery personnel deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete delivery personnel' });
    }
});

module.exports = router;