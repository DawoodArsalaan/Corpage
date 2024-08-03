import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HREmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    position: '',
    department: '',
    salary: '',
    email: '',
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await axios.get('http://localhost:5000/api/employees');
    setEmployees(response.data);
  };

  const handleAddEmployee = async () => {
    const response = await axios.post('http://localhost:5000/api/employees', newEmployee);
    setEmployees([...employees, response.data]);
    setNewEmployee({ name: '', position: '', department: '', salary: '', email: '' });
  };

  const handleDeleteEmployee = async (id) => {
    await axios.delete(`http://localhost:5000/api/employees/${id}`);
    setEmployees(employees.filter((employee) => employee._id !== id));
  };

  const handleUpdateEmployee = async (id, updatedEmployee) => {
    const response = await axios.put(`http://localhost:5000/api/employees/${id}`, updatedEmployee);
    setEmployees(employees.map((employee) => (employee._id === id ? response.data : employee)));
  };

  return (
    <div>
      <h1>HR Employee Management</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newEmployee.name}
          onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Position"
          value={newEmployee.position}
          onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
        />
        <input
          type="text"
          placeholder="Department"
          value={newEmployee.department}
          onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
        />
        <input
          type="number"
          placeholder="Salary"
          value={newEmployee.salary}
          onChange={(e) => setNewEmployee({ ...newEmployee, salary: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newEmployee.email}
          onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
        />
        <button onClick={handleAddEmployee}>Add Employee</button>
      </div>
      <ul>
        {employees.map((employee) => (
          <li key={employee._id}>
            <input
              type="text"
              value={employee.name}
              onChange={(e) =>
                handleUpdateEmployee(employee._id, { ...employee, name: e.target.value })
              }
            />
            <input
              type="text"
              value={employee.position}
              onChange={(e) =>
                handleUpdateEmployee(employee._id, { ...employee, position: e.target.value })
              }
            />
            <input
              type="text"
              value={employee.department}
              onChange={(e) =>
                handleUpdateEmployee(employee._id, { ...employee, department: e.target.value })
              }
            />
            <input
              type="number"
              value={employee.salary}
              onChange={(e) =>
                handleUpdateEmployee(employee._id, { ...employee, salary: e.target.value })
              }
            />
            <input
              type="email"
              value={employee.email}
              onChange={(e) =>
                handleUpdateEmployee(employee._id, { ...employee, email: e.target.value })
              }
            />
            <button onClick={() => handleDeleteEmployee(employee._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HREmployeeManagement;
