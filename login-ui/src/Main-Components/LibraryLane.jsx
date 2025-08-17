import classes from '/src/CSS-Folder/LibraryLane.module.css';

import { MdDashboard } from 'react-icons/md';
import { FaCompass, FaBookOpen, FaUser, FaCog, FaHandPointer, FaReply, FaCommentMedical} from 'react-icons/fa';
import { Button, Wlogo, Blogo, Input, LogoComponent, Chart, ChartLegend, Table, SearchID, AiPopUp } from '../Components';
import { IconHeader } from '../Components';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import WlogoSidebar from '/src/Logo/W-logo.png';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../Services/SessionUtils';


function LibraryLane() {
  const navigate = useNavigate(); 
  const columns = ["ID", "User ID", "Amount", "Due-date", "Date & Time"];
  const storedUser = JSON.parse(sessionStorage.getItem("userInfo"));
    
  const records = [
    { id: 1, userid: "U001", name: "John Doe", email: "john@example.com" },
    { id: 2, userid: "U002", name: "Jane Smith", email: "jane@example.com" }
  ];


  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const borrowedBooks = 60;
  const returnedBooks = 40;


  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setCurrentDate(now.toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }));
    };

    updateTime(); // initial run
    const interval = setInterval(updateTime, 60000); // every 60s

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div>
      {/* Sidebar */}
      <div className={classes.Sidebar}>
        <img src={WlogoSidebar} alt="Logo" className={classes.WSidebar} />

        <NavLink
          to="/AdminPage"
          className={({ isActive }) =>
            isActive ? classes.activeIcon : classes.iconLink
          }
        >
          <MdDashboard size={24} />
        </NavLink>

        <NavLink
          to="/NfcPage"
          className={({ isActive }) =>
            isActive ? classes.activeIcon : classes.iconLink
          }
        >
          <FaCompass size={24} />
        </NavLink>

        <NavLink
          to="/LibraryLane"
          className={({ isActive }) =>
            isActive ? classes.activeIcon : classes.iconLink
          }
        >
          <FaBookOpen size={24} />
        </NavLink>

        <Button name="Log Out" use="LogoutButton" onClick={() => {logOut().then(() => navigate('/'));}}/>
      </div>

     
      <div className={classes.NavBar}>
        
        <div className={classes.LeftTopbar}>
          <NavLink to="/profile" className={classes.iconLink}>
            <FaUser className={classes.userIcon} size={32} />
          </NavLink>
          <div className={classes.Contents}>
            <div className={classes.username}>{storedUser.username}</div>
            <div className={classes.role}>{storedUser.name}</div>
          </div>
        </div>

        
        <div className={classes.RightTopbar}>
          <div className={classes.TimeGear}>
            <span className={classes.Time}>{currentTime}</span>
            <FaCog className={classes.GearIcon} size={16} />
          </div>
          <div className={classes.Date}>{currentDate}</div>
        </div>
        
      </div>
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

