const express = require('express');
const Patient = require('../models/Patient'); // Import the Patient model
const router = express.Router();

// GET all patients
router.get('/', async (req, res) => {
    try {
        const patients = await Patient.find(); // Fetch all patients from the database
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch patients' });
    }
});

// GET a single patient by ID
router.get('/:id', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch patient' });
    }
});

// POST a new patient
router.post('/', async (req, res) => {
    const newPatient = new Patient(req.body);
    try {
        const savedPatient = await newPatient.save();
        res.status(201).json(savedPatient);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create patient' });
    }
});

// PUT (update) a patient by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPatient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json(updatedPatient);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update patient' });
    }
});

// DELETE a patient by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
        if (!deletedPatient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete patient' });
    }
});

module.exports = router;