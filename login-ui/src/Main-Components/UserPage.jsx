import classes from '../CSS-Folder/UserPage.module.css';
import { FaUser, FaCog, FaCompass, FaBookOpen} from 'react-icons/fa';

import { Button, UserDashboard, LibraryLane, BorrowedForm} from '../Components';
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
  

  const [active, setActive] = useState("UserDashboard"); // default section

 const renderContent = () => {
    switch (active) {
      case "UserDashboard":
        return <UserDashboard/>;
      case "BorrowedForm":
        return <BorrowedForm />;
        case "LibraryLane":
        return <LibraryLane />;
      default:
        return <UserDashboard />;
    }
  }; 

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
      <aside className={classes.Sidebar}>
        <img src={WlogoSidebar} alt="Logo" className={classes.WSidebar} />

       <ul className={classes.ulstyling}>
  <li>
    <Button 
      name={<><MdDashboard size={24} />Home</>} 
      use="Sample" 
      onClick={() => setActive("UserDashboard")} 
    />
  </li>
  <li>
    <Button 
      name={<><FaCompass size={24} />Borrowed Books</>} 
      use="Sample" 
      onClick={() => setActive("BorrowedForm")} 
    />
  </li>
  <li>
    <Button 
      name={<><FaBookOpen size={24} />Library Lane</>} 
      use="Sample" 
      onClick={() => setActive("LibraryLane")} 
    />
  </li>
</ul>

      <Button name="Log Out" use="LogoutUser" onClick={() => {logOut().then(() => navigate('/'));}}/>
      </aside>

     
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
            <NavLink to="/SettingPage">
            <FaCog className={classes.GearIcon} size={16} />
            </NavLink>
        </div>
      <div className={classes.Date}>{currentDate}</div>
    </div>
        
    </div>
    

     <div className={classes.SampleLangTo}>
        <main>
          {renderContent()}
        </main>
      </div>

    </div>
  );
}

export default UserPage;


import { MdDashboard } from 'react-icons/md';