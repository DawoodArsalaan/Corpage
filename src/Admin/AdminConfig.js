import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminConfig = () => {
  const [configs, setConfigs] = useState([]);
  const [newConfig, setNewConfig] = useState({
    settingName: '',
    settingValue: '',
    description: '',
    type: 'text',
  });

  useEffect(() => {
    fetchConfigs();
  }, []);

  const fetchConfigs = async () => {
    const response = await axios.get('http://localhost:5000/api/config');
    setConfigs(response.data);
  };

  const handleAddConfig = async () => {
    const response = await axios.post('http://localhost:5000/api/config', newConfig);
    setConfigs([...configs, response.data]);
    setNewConfig({ settingName: '', settingValue: '', description: '', type: 'text' });
  };

  const handleDeleteConfig = async (id) => {
    await axios.delete(`http://localhost:5000/api/config/${id}`);
    setConfigs(configs.filter((config) => config._id !== id));
  };

  const handleUpdateConfig = async (id, updatedConfig) => {
    const response = await axios.put(`http://localhost:5000/api/config/${id}`, updatedConfig);
    setConfigs(configs.map((config) => (config._id === id ? response.data : config)));
  };

  return (
    <div>
      <h1>Admin Configuration Settings</h1>
      <div>
        <input
          type="text"
          placeholder="Setting Name"
          value={newConfig.settingName}
          onChange={(e) => setNewConfig({ ...newConfig, settingName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Setting Value"
          value={newConfig.settingValue}
          onChange={(e) => setNewConfig({ ...newConfig, settingValue: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newConfig.description}
          onChange={(e) => setNewConfig({ ...newConfig, description: e.target.value })}
        />
        <select
          value={newConfig.type}
          onChange={(e) => setNewConfig({ ...newConfig, type: e.target.value })}
        >
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="boolean">Boolean</option>
        </select>
        <button onClick={handleAddConfig}>Add Setting</button>
      </div>
      <ul>
        {configs.map((config) => (
          <li key={config._id}>
            <input
              type="text"
              value={config.settingName}
              onChange={(e) =>
                handleUpdateConfig(config._id, { ...config, settingName: e.target.value })
              }
            />
            <input
              type={config.type}
              value={config.settingValue}
              onChange={(e) =>
                handleUpdateConfig(config._id, { ...config, settingValue: e.target.value })
              }
            />
            <input
              type="text"
              value={config.description}
              onChange={(e) =>
                handleUpdateConfig(config._id, { ...config, description: e.target.value })
              }
            />
            <select
              value={config.type}
              onChange={(e) =>
                handleUpdateConfig(config._id, { ...config, type: e.target.value })
              }
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="boolean">Boolean</option>
            </select>
            <button onClick={() => handleDeleteConfig(config._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminConfig;
