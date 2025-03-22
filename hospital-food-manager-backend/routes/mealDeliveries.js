const express = require('express');
const MealDelivery = require('../models/MealDelivery'); // Import the MealDelivery model
const router = express.Router();

// GET all meal deliveries
router.get('/', async (req, res) => {
    try {
        const mealDeliveries = await MealDelivery.find(); // Fetch all meal deliveries from the database
        res.status(200).json(mealDeliveries);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch meal deliveries' });
    }
});

// POST a new meal delivery
router.post('/', async (req, res) => {
    const newMealDelivery = new MealDelivery(req.body);
    try {
        const savedMealDelivery = await newMealDelivery.save();
        res.status(201).json(savedMealDelivery);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create meal delivery' });
    }
});

// PUT (update) a meal delivery by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedMealDelivery = await MealDelivery.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMealDelivery) {
            return res.status(404).json({ message: 'Meal delivery not found' });
        }
        res.status(200).json(updatedMealDelivery);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update meal delivery' });
    }
});

// DELETE a meal delivery by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedMealDelivery = await MealDelivery.findByIdAndDelete(req.params.id);
        if (!deletedMealDelivery) {
            return res.status(404).json({ message: 'Meal delivery not found' });
        }
        res.status(200).json({ message: 'Meal delivery deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete meal delivery' });
    }
});

module.exports = router;