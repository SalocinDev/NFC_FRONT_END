import classes from '../CSS-Folder/LibraryLane.module.css';

import { MdDashboard } from 'react-icons/md';
import { FaCompass, FaBookOpen, FaUser, FaCog, FaHandPointer, FaReply, FaCommentMedical} from 'react-icons/fa';
import { Button, Table, SearchID, AiPopUp } from '.';
import { IconHeader } from '.';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import WlogoSidebar from '/src/Logo/W-logo.png';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../Services/SessionUtils';


function LibraryLane() {
  const navigate = useNavigate(); 
  const columns = ["ID", "User ID", "Name", "Email"];
  const storedUser = JSON.parse(sessionStorage.getItem("userInfo"));
    
  const records = [
    { id: 1, userid: "U001", name: "John Doe", email: "john@example.com" },
    { id: 2, userid: "U002", name: "Jane Smith", email: "jane@example.com" },
    { id: 2, userid: "U002", name: "Jane Smith", email: "jane@example.com" },
    { id: 2, userid: "U002", name: "Jane Smith", email: "jane@example.com" },
    { id: 2, userid: "U002", name: "Jane Smith", email: "jane@example.com" }
  ];

  return (
    <div>
    
      <div className={classes.samplelang}>
          <span className={classes.Header}>Library Lane Books</span>
          <span className={classes.AcquireContainer}><Button name="Acquire" use="Acquire" onClick={() => {logOut().then(() => navigate('/BorrowedForm'));}}/></span>
          <SearchID placeholder="Search by ID or Type"/>
      </div>

      <div className={classes.TableContainer}>
        <Table columns={columns} records={records} />
      </div>

       <div className={classes.DesignRectangle}>
    <span className={classes.VerticalManila}>MANILA</span>
    <span className={classes.VerticalLibrary}>City <br/>Library</span>
    <div className={classes.CircleIcon}>
          <AiPopUp/>
    </div>
        </div>
    </div>
  );
}

export default LibraryLane;

