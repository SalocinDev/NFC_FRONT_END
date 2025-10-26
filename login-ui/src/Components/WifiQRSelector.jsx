//jm palagay sa user to
import classes from '../CSS-Folder/WifiQRSelector.module.css';
import React, { useEffect, useState } from "react";
import api from "../api/api";
import WifiQRcode from "./WifiQRcode";
/* import { WifiQRcode } from "."; */ /* ganto mag import ng other component sa loob ng isapang component, depende if nasa ibang file component tanong ka sakin */

const WifiQRSelector = () => {
  const [wifiList, setWifiList] = useState([]);
  const [selectedWifiId, setSelectedWifiId] = useState("");
  const [selectedWifi, setSelectedWifi] = useState(null);

  // Load Wi-Fi list on mount
  useEffect(() => {
    const fetchWifi = async () => {
      try {
        const res = await api.get("/wifi");
        setWifiList(res.data);
      } catch (err) {
        console.error("Error fetching Wi-Fi list:", err);
      }
    };
    fetchWifi();
  }, []);

  // When user selects a Wi-Fi, fetch its full info
  useEffect(() => {
    const fetchWifiDetails = async () => {
      if (!selectedWifiId) return;
      try {
        const res = await api.get(`/wifi/${selectedWifiId}`);
        setSelectedWifi(res.data);
      } catch (err) {
        console.error("Error fetching Wi-Fi details:", err);
      }
    };
    fetchWifiDetails();
  }, [selectedWifiId]);

  return (
    <div className={classes.WifiMainDiv}>
      <h2 className={classes.WifiHeader}>Wi-Fi QR Code Generator</h2>
<div className={classes.SubDiv}>
  <div className={classes.TextContainer}>
    <div className={classes.SelectContainer}>
      <select
        value={selectedWifiId}
        onChange={(e) => setSelectedWifiId(e.target.value)}
      >
        <option value="">Select a Wi-Fi Network</option>
        {wifiList.map((wifi) => (
          <option key={wifi.wifi_id} value={wifi.wifi_id}>
            {wifi.wifi_name}
          </option>
        ))}
      </select>

      {selectedWifi ? (
        <div className={classes.MainText}>
          <div className={classes.WPAContainer}>
          <h3>
            Security: 
          </h3>
          <p>{selectedWifi.wifi_security}</p>
          </div>

          <div className={classes.WiFiContainer}>
          <h3>Wi-Fi:</h3>
          <p> {selectedWifi.wifi_name}</p>
          </div>

          <div className={classes.PassContainer}>
            <h3>Password:</h3>
          {selectedWifi.wifi_security !== "nopass" && (
          <p>
            {selectedWifi.wifi_password}
          </p>
          )}
          </div>
       
        </div>
      ) : (
        <div className={classes.SelectWifi}>
        <p>Select a Wi-Fi to view its QR code.</p>
        </div>
      )}
      </div>
</div>
      <div className={classes.QRContainer}>

     {selectedWifi && (
      <WifiQRcode
        name={selectedWifi.wifi_name}
        password={selectedWifi.wifi_password}
        security={selectedWifi.wifi_security}
        
        size={500}
      />
      )}
      </div>
</div>
    </div>
  );
};

export default WifiQRSelector;
