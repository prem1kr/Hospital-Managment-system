const express = require('express');
const Delivery = require('../models/Delivery'); // Import the Delivery model
const router = express.Router();

// GET all deliveries with populated delivery personnel
router.get('/', async (req, res) => {
    console.log('Fetching deliveries...');
    try {
        const deliveries = await Delivery.find().populate('deliveryPersonnel'); // Populate delivery personnel
        console.log('Deliveries fetched:', deliveries);
        res.status(200).json(deliveries);
    } catch (error) {
        console.error('Error fetching deliveries:', error);
        res.status(500).json({ message: 'Failed to fetch deliveries' });
    }
});

// POST a new delivery
router.post('/', async (req, res) => {
    const newDelivery = new Delivery(req.body);
    try {
        const savedDelivery = await newDelivery.save();
        res.status(201).json(savedDelivery);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create delivery' });
    }
});

// PUT (update) a delivery by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedDelivery = await Delivery.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDelivery) {
            return res.status(404).json({ message: 'Delivery not found' });
        }
        res.status(200).json(updatedDelivery);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update delivery' });
    }
});

// DELETE a delivery by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedDelivery = await Delivery.findByIdAndDelete(req.params.id);
        if (!deletedDelivery) {
            return res.status(404).json({ message: 'Delivery not found' });
        }
        res.status(200).json({ message: 'Delivery deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete delivery' });
    }
});

module.exports = router;