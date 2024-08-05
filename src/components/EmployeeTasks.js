// EmployeeTasks.js
import React, { useState } from 'react';
import TaskList from './TaskList';

const EmployeeTasks = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [showTasks, setShowTasks] = useState(false);

  const handleFetchTasks = () => {
    if (employeeId) {
      setShowTasks(true);
    }
  };

  return (
    <div>
      <h2>Employee Task Information</h2>
      <div>
        <input
          type="text"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          placeholder="Enter Employee ID"
        />
        <button onClick={handleFetchTasks}>Get Tasks</button>
      </div>
      {showTasks && <TaskList employeeId={employeeId} />}
    </div>
  );
};

export default EmployeeTasks;
