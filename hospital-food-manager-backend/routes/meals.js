const express = require('express');
const router = express.Router();
const Meal = require('../models/Meal');

// Get all meals
router.get('/', async (req, res) => {
    try {
        const meals = await Meal.find();
        res.json(meals);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new meal
router.post('/', async (req, res) => {
    const meal = new Meal({
        type: req.body.type,
        details: req.body.details, // Assuming you have a 'details' field in your Meal model
        preparationStatus: req.body.preparationStatus,
        deliveryStatus: req.body.deliveryStatus,
    });

    try {
        const newMeal = await meal.save();
        res.status(201).json(newMeal);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update meal preparation status
router.put('/:id', async (req, res) => {
    try {
        const updatedMeal = await Meal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMeal) return res.status(404).json({ message: 'Meal not found' });
        res.json(updatedMeal);
    } catch (err) {
        console.error('Error updating meal:', err); // Log the error for debugging
        res.status(400).json({ message: err.message });
    }
});

// DELETE a meal by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedMeal = await Meal.findByIdAndDelete(req.params.id);
        if (!deletedMeal) {
            return res.status(404).json({ message: 'Meal not found' });
        }
        res.status(200).json({ message: 'Meal deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete meal' });
    }
});

module.exports = router;