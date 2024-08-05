import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';
import axios from 'axios';

function App() {
  const [employeeId, setEmployeeId] = useState('');
  const [tasks, setTasks] = useState([]);
  const [showTasks, setShowTasks] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (showTasks && employeeId) {
      const fetchTasks = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get(`http://localhost:3000/tasks/${employeeId}`);
          setTasks(response.data);
        } catch (error) {
          setError('Error fetching tasks.');
        } finally {
          setLoading(false);
        }
      };

      fetchTasks();
    }
  }, [employeeId, showTasks]);

  const handleTaskAdded = async (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleFetchTasks = () => {
    if (employeeId) {
      setShowTasks(true);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Employee Task Dashboard</h1>

        <div>
          <input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            placeholder="Enter Employee ID"
          />
          <button onClick={handleFetchTasks}>Get Tasks</button>
        </div>

        <TaskForm onTaskAdded={handleTaskAdded} />
        
        {loading && <p>Loading tasks...</p>}
        {error && <p>{error}</p>}
        {showTasks && <TaskList tasks={tasks} />}
      </header>
    </div>
  );
}

export default App;
