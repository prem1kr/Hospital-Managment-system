const mongoose = require('mongoose');

const MealDeliverySchema = new mongoose.Schema({
    patientInfo: { type: String, required: true },
    roomNumber: { type: String, required: true },
    dietChartDetails: { type: String, required: true },
    status: { type: String, default: 'Pending' }, // Default status can be 'Pending', 'Delivered', etc.
}, { timestamps: true });

module.exports = mongoose.model('MealDelivery', MealDeliverySchema);