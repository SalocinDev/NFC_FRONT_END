import classes from '/src/CSS-Folder/Services.module.css';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Wlogo, Blogo, Input, Checkbox } from '../Components';
import { handleLoginClick } from '../Services/LoginService.js';

function Services() {
  const [accepted, setAccepted] = useState(false);
  const [subscribe, setSubscribe] = useState(true);
  
  return (

      <div>
        <div className={classes.RectangleAbove}>
          
          <span className={classes.ManilaAbove}>MANILA</span>
          <span className={classes.LibraryAbove}>City <br/>Library</span>
        </div>

        <div className={classes.CheckboxContainer}>
       
         <Checkbox/>
      
        </div>
      
  
    </div>
  );
}

export default Services;
