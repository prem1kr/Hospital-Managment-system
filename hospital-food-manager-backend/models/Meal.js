const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    type: { type: String, required: true }, // e.g., "Morning", "Evening", "Night"
    prepared: { type: Boolean, default: false },
    details: { type: String, required: true }, // Details about the meal
    preparationStatus: { type: String, default: 'Pending' }, // e.g., "Pending", "Prepared"
    deliveryStatus: { type: String, default: 'Pending' }, // e.g., "Pending", "Delivered"
}, { timestamps: true });

module.exports = mongoose.model('Meal', mealSchema);