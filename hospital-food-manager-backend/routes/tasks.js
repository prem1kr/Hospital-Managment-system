const express = require('express');
const Task = require('../models/Task'); // Import the Task model
const router = express.Router();

// GET all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find(); // Fetch tasks from the database
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching tasks' });
    }
});

// POST a new task
router.post('/', async (req, res) => {
    const { description, status } = req.body;
    const newTask = new Task({ description, status });

    try {
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(400).json({ message: 'Error creating task' });
    }
});

module.exports = router;