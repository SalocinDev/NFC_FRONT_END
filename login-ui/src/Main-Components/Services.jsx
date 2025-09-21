import classes from '../CSS-Folder/Services.module.css';
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox } from '../Components';
import { logOut } from '../Services/SessionUtils';
import { submitServices } from '../Services/ServicesUtis'

function Services() {
  const storedUser = JSON.parse(sessionStorage.getItem("userInfo"));
  const navigate = useNavigate();
  const [availedServices, setAvailedServices] = useState({ selectedServices: [], others: "" });
  const [alertShown, setAlertShown] = useState(false);

  // show greeting only once
  useEffect(() => {
    if (!alertShown) {
      alert(`Hello, ${storedUser?.firstName || "User"}. Please select the services you'd like to avail.`);
      setAlertShown(true);
    }
  }, [alertShown, storedUser]);

  const handleServicesChange = useCallback(
    (selected, others) => {
      setAvailedServices({ selectedServices: selected, others });
    },
    []
  );

  const handleSubmit = async () => {
    const { selectedServices, others } = availedServices;
    const servicesText = selectedServices.length > 0 ? selectedServices.join(", ") : "None";
    const othersText = others ? ` | Others: ${others}` : "";

    alert(`Availed services: ${servicesText}${othersText}`);
    const result = await submitServices( servicesText, storedUser.user_id );

    if (!result.success) {
      
    }
    //Optional: log out and go home
    logOut().then(() => {
      navigate("/");// forces React to remount and re-check ProtectedRoute
    });
    
  };

  return (
    <div className={classes.Background}>
      <div className={classes.RectangleAbove}>
        <span className={classes.ManilaAbove}>MANILA</span>
        <span className={classes.LibraryAbove}>City <br />Library</span>
      </div>

      <div className={classes.CheckboxContainer}>
        <Checkbox onChange={handleServicesChange} />

        {/* Live display of selected services */}
        <div className={classes.ServicesSubmitted} style={{ marginTop: "1rem", fontSize: "1rem", color: "#101540" }}>
          <strong>Selected Services:</strong> {availedServices.selectedServices.join(", ")}
          {availedServices.others ? ` | Others: ${availedServices.others}` : ""}
        </div>

        <Button name="Submit" use="ButtonSubmit" onClick={handleSubmit} />
      </div>
    </div>
  );
}

export default Services;
