import classes from '../CSS-Folder/Services.module.css';
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Checkbox } from '../Components';
import { logOut } from '../Services/SessionUtils';
import { submitServices } from '../Services/ServicesUtis';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Services() {
  const storedUser = JSON.parse(sessionStorage.getItem("userInfo"));
  const navigate = useNavigate();
  const [availedServices, setAvailedServices] = useState({ selectedServices: [], others: "" });
  const [alertShown, setAlertShown] = useState(false);
  const [showPopup, setShowPopup] = useState(false); 
  const [popupServices, setPopupServices] = useState([]); 

  const location = useLocation();
  const { loggedIn } = location.state || {};

  useEffect(() => {
    const checkLogin = async () => {
      console.log(loggedIn);
      
      if (!loggedIn) {
        await logOut();
        navigate("/");
      }
    };
    checkLogin();
  }, [loggedIn, navigate]);

  useEffect(() => {
    if (!alertShown) {
      toast.success(`Hello, ${storedUser?.firstName || "User"}. Please select the services you'd like to avail.`);
      setAlertShown(true);
    }
  }, [alertShown, storedUser]);

  const handleServicesChange = useCallback((selected, others) => {
    setAvailedServices({ selectedServices: selected, others });
  }, []);

  const handleSubmit = () => {
    const { selectedServices, others } = availedServices;

    let payloadServices = [...selectedServices];
    if (others.trim()) {
      payloadServices.push(`Others: ${others.trim()}`);
    }

    setPopupServices(payloadServices);
    setShowPopup(true); 
  };

  const handleConfirmSubmit = async () => {
    const result = await submitServices(popupServices);
    if (!result.success) {
      toast.error(result.message || "Failed to submit services.");
      return;
    }
    setShowPopup(false);
    logOut().then(() => navigate("/", { state: { loggedIn: true } }));
  };

  return (
    <div className={classes.Background}>
      <div className={classes.RectangleAbove}>
        <span className={classes.ManilaAbove}>MANILA</span>
        <span className={classes.LibraryAbove}>City <br />Library</span>
      </div>

      <div className={classes.CheckboxBackground}>
        <div className={classes.CheckboxContainer}>
          <Checkbox onChange={handleServicesChange} />
        </div>

        <div className={classes.ServicesSubmitted}>

          {availedServices.others ? ` | Others: ${availedServices.others}` : ""}
        </div>

        <Button name="Submit" use="ButtonSubmit" onClick={handleSubmit} />
      </div>

      {showPopup && (
        <div className={classes.PopupOverlay}>
          <div className={classes.PopupBox}>
            <h2>Confirm Your Selected Services</h2>
            <ul>
              {popupServices.length > 0 ? (
                popupServices.map((service, index) => <li key={index}>{service}</li>)
              ) : (
                <li>None</li>
              )}
            </ul>

            <div className={classes.PopupButtons}>
              <Button
                name="Cancel"
                use="CancelServicesButton"
                onClick={() => setShowPopup(false)}
              />

              <Button
                name="Confirm"
                use="ConfirmServicesButton"
                onClick={handleConfirmSubmit}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Services;
