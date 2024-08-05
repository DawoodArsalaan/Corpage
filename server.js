const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = 'mongodb://localhost:27017/taskdb'; // Your MongoDB connection string
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Mongoose schema and model
const taskSchema = new mongoose.Schema({
  employeeId: String,
  taskName: String,
  status: String,
});

const Task = mongoose.model('Task', taskSchema);

// Routes
app.post('/tasks', async (req, res) => {
  console.log('POST /tasks endpoint hit');
  console.log('Request Body:', req.body);
  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    console.log('Saved Task:', savedTask);
    res.status(201).json(savedTask);
  } catch (err) {
    console.error('Error:', err.message);
    res.status(400).json({ error: err.message });
  }
});

app.get('/tasks/:employeeId', async (req, res) => {
  console.log('GET /tasks/:employeeId endpoint hit');
  console.log('Employee ID:', req.params.employeeId);
  try {
    const tasks = await Task.find({ employeeId: req.params.employeeId });
    console.log('Tasks:', tasks);
    res.status(200).json(tasks);
  } catch (err) {
    console.error('Error:', err.message);
    res.status(400).json({ error: err.message });
  }
});

// Catch-all route for unknown routes
app.use((req, res) => {
  res.status(404).send('Route not found');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
