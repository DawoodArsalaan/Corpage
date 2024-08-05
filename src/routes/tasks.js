const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Create a new task
router.post('/', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get tasks by employee ID
router.get('/:employeeId', async (req, res) => {
  try {
    const tasks = await Task.find({ employeeId: req.params.employeeId });
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
