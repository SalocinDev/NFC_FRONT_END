import React, { useState, useEffect } from "react";
import { Button } from ".";
import api from "../api/api";
import WifiModal from "./WifiModal";
import WifiFormModal from "./WifiFormModal";
import { BiQrScan } from "react-icons/bi";
import { HiMiniSquaresPlus } from "react-icons/hi2";
import { MdOutlineDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import classes from '../CSS-Folder/WifiList.module.css';

const WifiList = () => {
  const [wifiList, setWifiList] = useState([]);
  const [editWifi, setEditWifi] = useState(null);
  const [viewWifi, setViewWifi] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);

  const fetchWifi = async () => {
    try {
      const res = await api.get("/wifi");
      setWifiList(res.data);
    } catch (err) {
      console.error("Error fetching Wi-Fi:", err);
    }
  };

  useEffect(() => {
    fetchWifi();
  }, []);

  const handleSubmit = async (wifiData) => {
    try {
      if (editWifi) {
        await api.put(`/wifi/${editWifi.wifi_id}`, wifiData);
      } else {
        await api.post("/wifi", wifiData);
      }
      fetchWifi();
      setEditWifi(null);
      setShowFormModal(false);
    } catch (err) {
      console.error("Error saving Wi-Fi:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Wi-Fi entry?")) return;
    try {
      await api.delete(`/wifi/${id}`);
      fetchWifi();
    } catch (err) {
      console.error("Error deleting Wi-Fi:", err);
    }
  };

  return (
    <div>
      <div className={classes.WifiHeaderContainer}>
        
        <h2>Library Wi-Fi Management</h2>
        <Button
          onClick={() => {
            setEditWifi(null);
            setShowFormModal(true);
          }}

          use="AddWifiQr"
          name={
            <>
              <HiMiniSquaresPlus size={25} />
              <span>Add Wi-Fi</span>
            </>
          }
        />

      
          
      </div>

      <div className={classes.TableContainer}>
      <table className={classes.WifiTable}
        
      >
        <thead>
          <tr>
            <th>Wi-Fi Name</th>
            <th>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {wifiList.map((wifi) => (
            <tr key={wifi.wifi_id}>
              <td>{wifi.wifi_name}</td>
              <td>
                <div className={classes.ButtonContainer}>
                <Button onClick={() => setViewWifi(wifi)}
                use="ViewQR"
                name={
            <>
              < BiQrScan  size={25} />
              <span>View</span>
            </>
          } />
                <Button
                  onClick={() => {
                    setEditWifi(wifi);
                    setShowFormModal(true);
                  }}
                  use="EditQR"
                  name={
                    <>
                      < FaEdit size={25} />
                      <span>Edit</span>
                    </>
                  }
                />
                  
                <Button
                  
                  onClick={() => handleDelete(wifi.wifi_id)}
                  use="DeleteQR"
                  name={
                  <>
                    <MdOutlineDelete size={25} />
                    <span>Delete</span>
                  </>
                }
                />
              </div>
              </td>
            </tr>
          ))}
          {wifiList.length === 0 && (
            <tr>
              <td colSpan="2" style={{ textAlign: "center", padding: "20px", color: "#666" }}>
                No Wi-Fi records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>

      {/* Modals */}
      <WifiModal wifi={viewWifi} onClose={() => setViewWifi(null)} />
      <WifiFormModal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSubmit={handleSubmit}
        editData={editWifi}
      />
    </div>
  );
};

export default WifiList;
