import classes from '../CSS-Folder/UserPage.module.css';
import { MdDashboard } from 'react-icons/md';
import { FaCompass, FaBookOpen, FaUser, FaCog, FaHandPointer, FaReply} from 'react-icons/fa';
import { Button, LogoComponent, Chart, ChartLegend } from '../Components';
import { IconHeader } from '../Components';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import WlogoSidebar from '../Logo/W-logo.png';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../Services/SessionUtils';

function UserPage() {
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
          to="/UserPage"
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
            <div className={classes.username}>{storedUser?.firstName|| "Test"}</div>
            <div className={classes.username}>{storedUser?.userID || "Test"}</div>
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
      <div className={classes.iconHeaderContainer}>
        <IconHeader
          icon={FaBookOpen}
          headerTop="Your Borrowed"
          headerBottom="Book List"
          to="/BorrowedForm"
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
          <p className={classes.BookWorm}>"Embarking on the journey of reading fosters <br/>personal growth, nurturing a path <br/>towards excellence and the refinement of <br/>character."</p>
          <footer>~Bookworm Team</footer>
        </div>


      </div>
    </div>
  );
}

export default UserPage;
