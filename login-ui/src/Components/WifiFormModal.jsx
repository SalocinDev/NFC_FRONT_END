import React, { useState, useEffect } from "react";

const WifiFormModal = ({ isOpen, onClose, onSubmit, editData }) => {
  const [wifiName, setWifiName] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiSecurity, setWifiSecurity] = useState("WPA2");

  useEffect(() => {
    if (editData) {
      setWifiName(editData.wifi_name);
      setWifiPassword(editData.wifi_password);
      setWifiSecurity(editData.wifi_security);
    } else {
      setWifiName("");
      setWifiPassword("");
      setWifiSecurity("WPA2");
    }
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      wifi_name: wifiName,
      wifi_password: wifiPassword,
      wifi_security: wifiSecurity,
    });
    onClose();
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          width: "400px",
          padding: "25px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
          {editData ? "Edit Wi-Fi" : "Add New Wi-Fi"}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Wi-Fi Name */}
          <div style={{ marginBottom: "15px" }}>
            <label>Wi-Fi Name</label>
            <input
              type="text"
              value={wifiName}
              onChange={(e) => setWifiName(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "15px" }}>
            <label>Password</label>
            <input
              type="text"
              value={wifiPassword}
              onChange={(e) => setWifiPassword(e.target.value)}
              required={wifiSecurity !== "nopass"}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              placeholder={
                wifiSecurity === "nopass" ? "No password required" : "Enter password"
              }
              disabled={wifiSecurity === "nopass"}
            />
          </div>

          {/* Security Type */}
          <div style={{ marginBottom: "20px" }}>
            <label>Security Type</label>
            <select
              value={wifiSecurity}
              onChange={(e) => setWifiSecurity(e.target.value)}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            >
              <option value="WEP">WEP</option>
              <option value="WPA">WPA</option>
              <option value="WPA2">WPA2</option>
              <option value="WPA3">WPA3</option>
              <option value="WPA/WPA2 Mixed">WPA/WPA2 Mixed</option>
              <option value="nopass">No Password (Open Network)</option>
            </select>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                backgroundColor: "#ccc",
                border: "none",
                padding: "8px 12px",
                borderRadius: "5px",
                marginRight: "10px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                padding: "8px 12px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {editData ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WifiFormModal;
