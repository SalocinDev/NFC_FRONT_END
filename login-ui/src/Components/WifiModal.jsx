import React from "react";
import WifiQRCode from "./WifiQRcode";

const WifiModal = ({ wifi, onClose }) => {
  if (!wifi) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={onClose} // Close on background click
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "10px",
          width: "400px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
          position: "relative",
          textAlign: "center",
        }}
        onClick={(e) => e.stopPropagation()} // Prevent background close
      >
        <h2 style={{ marginBottom: "15px" }}>{wifi.wifi_name}</h2>

        <p>
          <strong>Security:</strong> {wifi.wifi_security}
        </p>
        <p>
          <strong>Password:</strong> {wifi.wifi_password}
        </p>

        <div style={{ margin: "20px 0" }}>
          <WifiQRCode
            name={wifi.wifi_name}
            password={wifi.wifi_password}
            security={wifi.wifi_security}
            size={400}
          />
        </div>

        <button
          onClick={onClose}
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            padding: "8px 15px",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default WifiModal;
