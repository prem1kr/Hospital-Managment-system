const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const Meal = require('../models/Meal');
const Delivery = require('../models/Delivery');
const DeliveryPersonnel = require('../models/DeliveryPersonnel');

// Generic function to count documents in a collection
const countDocuments = async (Model, query = {}) => {
    try {
        const count = await Model.countDocuments(query);
        return count;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Get total patients count
router.get('/patients/count', async (req, res) => {
    try {
        const count = await countDocuments(Patient);
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get meals prepared today count
router.get('/meals/prepared', async (req, res) => {
    try {
        const today = new Date(new Date().setHours(0, 0, 0, 0)); // Today's start time
        const count = await countDocuments(Meal, {
            prepared: true,
            createdAt: { $gte: today },
        });
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get pending deliveries count
router.get('/deliveries/pending', async (req, res) => {
    try {
        const count = await countDocuments(Delivery, { status: 'Pending' });
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get completed deliveries count
router.get('/deliveries/completed', async (req, res) => {
    try {
        const count = await countDocuments(Delivery, { status: 'Completed' });
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get delivery personnel count
router.get('/delivery-personnel/count', async (req, res) => {
    try {
        const count = await countDocuments(DeliveryPersonnel);
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;