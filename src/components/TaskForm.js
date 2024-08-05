import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onTaskAdded }) => {
  const [taskName, setTaskName] = useState('');
  const [status, setStatus] = useState('Pending');
  const [employeeId, setEmployeeId] = useState('');

  console.log('Task Name:', taskName);
  console.log('Status:', status);
  console.log('Employee ID:', employeeId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting task:', { taskName, status, employeeId });
    try {
      const response = await axios.post('http://localhost:3000/tasks', {
        taskName,
        status,
        employeeId,
      });
      onTaskAdded(response.data);
      setTaskName('');
      setStatus('Pending');
      setEmployeeId('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Employee ID:</label>
        <input
          type="text"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Task Name:</label>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
