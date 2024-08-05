//import React, { useState, useEffect } from 'react';

const TaskList = ({ tasks }) => {
  if (!tasks) return <p>No tasks to display.</p>; // Handles case where no tasks are passed

  return (
    <div>
      <h2>Your Tasks</h2>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map(task => (
            <li key={task._id}>
              <strong>{task.taskName}</strong> - {task.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks found.</p>
      )}
    </div>
  );
};

export default TaskList;
