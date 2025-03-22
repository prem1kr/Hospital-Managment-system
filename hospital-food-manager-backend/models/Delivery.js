const mongoose = require('mongoose');

const DeliverySchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    status: { type: String, default: 'Pending' },
    patientInfo: { type: String, required: true },
    roomNumber: { type: String, required: true },
    dietChartDetails: { type: String, required: true },
    deliveryNotes: { type: String, default: '' },
    deliveryTime: { type: Date, default: null },
    deliveryPersonnel: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryPersonnel' } // Reference to DeliveryPersonnel
}, { timestamps: true });

module.exports = mongoose.model('Delivery', DeliverySchema);