const mongoose = require('mongoose');

const DeliveryPersonnelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contactInfo: { type: String, required: true },
    otherDetails: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('DeliveryPersonnel', DeliveryPersonnelSchema);