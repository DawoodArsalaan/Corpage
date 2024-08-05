const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  taskName: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
}, {
  timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
