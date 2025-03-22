const express = require('express');
const Patient = require('../models/Patient');
const router = express.Router();

// Add diet chart to a patient
router.post('/:patientId/dietChart', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.patientId);
        patient.dietChart.push(req.body);
        await patient.save();
        res.status(201).json(patient);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get diet chart for a patient
router.get('/:patientId/dietChart', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.patientId);
        res.status(200).json(patient.dietChart);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;