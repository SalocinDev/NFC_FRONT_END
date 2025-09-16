import { MdDashboard } from 'react-icons/md';
import { FaCompass, FaBookOpen, FaUser, FaCog, FaHandPointer, FaReply, FaCommentMedical} from 'react-icons/fa';
import { Button, Wlogo, Blogo, Input, LogoComponent, Chart, ChartLegend, Table, SearchID, AiPopUp } from '.';
import { IconHeader } from '.';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import WlogoSidebar from '../Logo/W-logo.png';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../Services/SessionUtils';
import classes from '../CSS-Folder/BorrowedForm.module.css';

function BorrowedForm() {
  const navigate = useNavigate(); 
  const columns = ["ID", "User ID", "Amount", "Due-date", "Date & Time"];
  const storedUser = JSON.parse(sessionStorage.getItem("userInfo"));
    
  const records = [
    { id: 1, userid: "U001", name: "John Doe", email: "john@example.com" },
    { id: 2, userid: "U002", name: "Jane Smith", email: "jane@example.com" }
  ];

  return (
    <div>
    
      <div className={classes.samplelang}>
          <Button name="Borrowed Books" use="BorrowedBooks" /* onClick={() => {logOut().then(() => navigate('/BorrowedForm'));}} *//>
          <Button name="Returned Books" use="ReturnedBooks" /* onClick={() => {logOut().then(() => navigate('/BorrowedForm'));}} *//>
          <SearchID placeholder="Search by ID"/>
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

export default BorrowedForm;

