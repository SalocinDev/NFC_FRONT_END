import classes from '/src/CSS-Folder/AdminPage.module.css';
import { MdDashboard } from 'react-icons/md';
import { FaCompass, FaBookOpen, FaUser, FaCog, FaHandPointer, FaReply} from 'react-icons/fa';
import { Button, Wlogo, Blogo, Input, LogoComponent, Chart, ChartLegend } from '../Components';
import { IconHeader } from '../Components';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import WlogoSidebar from '/src/Logo/W-logo.png';
import { useNavigate } from 'react-router-dom';
import { logOut, getInfo } from '../Services/SessionUtils';


function AdminPage() {
  const navigate = useNavigate(); 

  const storedUser = JSON.parse(sessionStorage.getItem("userInfo"));

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
          to="/dashboard"
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
          to="/library"
          className={({ isActive }) =>
            isActive ? classes.activeIcon : classes.iconLink
          }
        >
          <FaBookOpen size={24} />
        </NavLink>
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

       {/* RIGHT SIDE: Time + Gear + Date */}
        <Button name="Log Out" use="BackButton" onClick={() => {logOut().then(() => navigate('/'));}}/>
        <div className={classes.RightTopbar}>
          <div className={classes.TimeGear}>
            <span className={classes.Time}>{currentTime}</span>
            <FaCog className={classes.GearIcon} size={16} />
          </div>
          <div className={classes.Date}>{currentDate}</div>
        </div>
        
      </div>
      <div className={classes.samplelang}>
      <div className={classes.iconHeaderContainer}>
        <IconHeader
          icon={FaBookOpen}
          headerTop="Your Borrowed"
          headerBottom="Book List"
        /> 
    
         <IconHeader
          icon={ FaReply }
          headerTop="Your Returned"
          headerBottom="Book List"
        />

        <ChartLegend/>

      </div>
        
      <div className={classes.iconHeaderContainer}>  
          <IconHeader
          icon={FaHandPointer}
          headerTop="Browse Available"
          headerBottom="Book Inventory"
        />
          
          <span className={classes.BlogoGalaw}><LogoComponent className={classes.LogoUser}/></span>
          <Chart borrowed={borrowedBooks} returned={returnedBooks}/>
          
        
      </div>

        <div className={classes.paragraphContainer}>
          <p>"Embarking on the journey of reading fosters <br/>personal growth, nurturing a path <br/>towards excellence and the refinement of <br/>character."</p>
          <footer>~Bookworm Team</footer>
        </div>


      </div>
    </div>
  );
}

export default AdminPage;
