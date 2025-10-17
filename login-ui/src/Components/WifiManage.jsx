//testing pa hindi pa tapos
//wifi admin
import React, { useState, useEffect } from 'react';
import api from '../api/api'; // Importing the axios instance

const WifiList = () => {
  const [wifiList, setWifiList] = useState([]);
  const [wifiName, setWifiName] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [editId, setEditId] = useState(null);

  // Fetch all WiFi entries
  useEffect(() => {
    fetchWifi();
  }, []);

  const fetchWifi = async () => {
    try {
      const response = await api.get('/');
      setWifiList(response.data);
    } catch (error) {
      console.error('Error fetching WiFi entries:', error);
    }
  };

  // Add new WiFi entry
  const handleAddWifi = async (e) => {
    e.preventDefault();
    if (!wifiName || !wifiPassword) return;

    const newWifi = { wifi_name: wifiName, wifi_password: wifiPassword };
    try {
      await api.post('/', newWifi);
      fetchWifi();  // Refresh the list after adding
      setWifiName('');
      setWifiPassword('');
    } catch (error) {
      console.error('Error adding WiFi entry:', error);
    }
  };

  // Edit WiFi entry
  const handleEditWifi = (wifi) => {
    setEditId(wifi.wifi_id);
    setWifiName(wifi.wifi_name);
    setWifiPassword(wifi.wifi_password);
  };

  // Update WiFi entry
  const handleUpdateWifi = async (e) => {
    e.preventDefault();
    if (!wifiName || !wifiPassword) return;

    const updatedWifi = { wifi_name: wifiName, wifi_password: wifiPassword };
    try {
      await api.put(`/${editId}`, updatedWifi);
      fetchWifi();  // Refresh the list after updating
      setEditId(null);
      setWifiName('');
      setWifiPassword('');
    } catch (error) {
      console.error('Error updating WiFi entry:', error);
    }
  };

  // Delete WiFi entry
  const handleDeleteWifi = async (id) => {
    try {
      await api.delete(`/${id}`);
      fetchWifi();  // Refresh the list after deleting
    } catch (error) {
      console.error('Error deleting WiFi entry:', error);
    }
  };

  return (
    <div>
      <h2>Library WiFi Management</h2>

      {/* Form for Adding or Editing WiFi */}
      <form onSubmit={editId ? handleUpdateWifi : handleAddWifi}>
        <input
          type="text"
          value={wifiName}
          onChange={(e) => setWifiName(e.target.value)}
          placeholder="WiFi Name"
        />
        <input
          type="password"
          value={wifiPassword}
          onChange={(e) => setWifiPassword(e.target.value)}
          placeholder="WiFi Password"
        />
        <button type="submit">{editId ? 'Update WiFi' : 'Add WiFi'}</button>
      </form>

      {/* WiFi List */}
      <ul>
        {wifiList.map((wifi) => (
          <li key={wifi.wifi_id}>
            <h3>{wifi.wifi_name}</h3>
            <p>{wifi.wifi_password}</p>
            <button onClick={() => handleEditWifi(wifi)}>Edit</button>
            <button onClick={() => handleDeleteWifi(wifi.wifi_id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WifiList;