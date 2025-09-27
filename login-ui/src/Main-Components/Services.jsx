import classes from '../CSS-Folder/Services.module.css';
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Checkbox } from '../Components';
import { logOut } from '../Services/SessionUtils';
import { submitServices } from '../Services/ServicesUtis';

function Services() {
  const storedUser = JSON.parse(sessionStorage.getItem("userInfo"));
  const navigate = useNavigate();
  const [availedServices, setAvailedServices] = useState({ selectedServices: [], others: "" });
  const [alertShown, setAlertShown] = useState(false);
  const location = useLocation();
  const { loggedIn } = location.state || {};

  useEffect(() => {
    const checkLogin = async () => {
      if (!loggedIn) {
        await logOut();
        navigate("/");
      }
    };
    checkLogin();
  }, [loggedIn, navigate]);

  useEffect(() => {
    if (!alertShown) {
      alert(`Hello, ${storedUser?.firstName || "User"}. Please select the services you'd like to avail.`);
      setAlertShown(true);
    }
  }, [alertShown, storedUser]);

  const handleServicesChange = useCallback((selected, others) => {
    setAvailedServices({ selectedServices: selected, others });
  }, []);

  const handleSubmit = async () => {
    const { selectedServices, others } = availedServices;

    let payloadServices = [...selectedServices];
    if (others.trim()) {
      payloadServices.push(`Others: ${others.trim()}`);
    }

    const servicesText = payloadServices.length > 0 ? payloadServices.join(", ") : "None";
    alert(`Availed services: ${servicesText}`);

    const result = await submitServices(payloadServices);

    if (!result.success) {
      alert(result.message || "Failed to submit services.");
      return;
    }

    logOut().then(() => navigate("/", { state: { loggedIn: true } }));
  };

  return (
    <div className={classes.Background}>
      <div className={classes.RectangleAbove}>
        <span className={classes.ManilaAbove}>MANILA</span>
        <span className={classes.LibraryAbove}>City <br />Library</span>
      </div>

      <div className={classes.CheckboxContainer}>
        <Checkbox onChange={handleServicesChange} />
        <div
          className={classes.ServicesSubmitted}
          style={{ marginTop: "1rem", fontSize: "1rem", color: "#101540" }}
        >
          <strong>Selected Services:</strong>{" "}
          {availedServices.selectedServices.join(", ")}
          {availedServices.others ? ` | Others: ${availedServices.others}` : ""}
        </div>

        <Button name="Submit" use="ButtonSubmit" onClick={handleSubmit} />
      </div>
    </div>
  );
}

export default Services;
