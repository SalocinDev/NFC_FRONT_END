import { useState, useEffect } from 'react';
import classes from '../CSS-Folder/UserPage.module.css';
import { MdMenu, MdDashboard, MdLogout } from "react-icons/md"; 
import { FaUser, FaCog, FaCompass, FaBookOpen } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, UserDashboard, ServicesAvailed, BorrowedForm, SettingPage, AiPopUp } from '../Components';
import WlogoSidebar from '../Logo/W-logo.png';
import { logOut } from '../Services/SessionUtils';

const apiUrl = import.meta.env.VITE_API_URL;

function UserPage() {
  const navigate = useNavigate(); 
  const storedUser = JSON.parse(sessionStorage.getItem("userInfo") || "{}");
/*   const profileUrl = storedUser?.user_pfp_id_fk
    ? `${apiUrl}/file/profile-picture/${storedUser.user_pfp_id_fk}`
    : null; */

  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("UserDashboard");
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [profileSrc, setProfileSrc] = useState(null);

  useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth <= 480) {
  
      setCollapsed(true);
    } else if (window.innerWidth <= 820) {
 
      setCollapsed(true);
    } else {

      setCollapsed(false);
    }
  };

  handleResize();

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);


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

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getProfilePicture(storedUser.user_pfp_id_fk).then(url => setProfileSrc(url));
    console.log(profileSrc)
  })

  const renderContent = () => {
    switch (active) {
      case "UserDashboard": return <UserDashboard />;
      case "BorrowedForm": return <BorrowedForm />;
      case "ServicesAvailed": return <ServicesAvailed />;
      case "SettingPage": return <SettingPage />;
      default: return <UserDashboard />;
    }
  };

  return (
    <div>

      <aside className={`${classes.Sidebar} ${collapsed ? classes.hidden : classes.open}`}>
        <Button 
          name={<MdMenu size={24} />} 
          use="BurgerIcon" 
          onClick={() => setCollapsed(true)}    
        />
        <img src={WlogoSidebar} alt="Logo" className={classes.WSidebar} />

        <ul className={classes.ulstyling}>
          <li>
            <Button 
              name={<><MdDashboard size={24} /><span>Home</span></>} 
              use="Sample" 
              onClick={() => setActive("UserDashboard")} 
              isActive={active === "UserDashboard"}   
            />
          </li>
          <li>
            <Button 
              name={<><FaBookOpen size={24} /><span>Borrowed Books</span></>} 
              use="Sample" 
              onClick={() => setActive("BorrowedForm")}
              isActive={active === "BorrowedForm"}   
            />
          </li>
          <li>
            <Button 
              name={<><FaCompass size={24} /><span>Services Used</span></>} 
              use="Sample" 
              onClick={() => setActive("ServicesAvailed")}
              isActive={active === "ServicesAvailed"}    
            />
          </li>
        </ul>

        <Button 
          name={<><MdLogout size={24} /><span>Logout</span></>} 
          use="Sample" 
          onClick={() => {
            logOut().then(() => navigate('/'));
          }}
        />
      </aside>

      {collapsed && (
        <button 
          className={classes.ToggleButton}
          onClick={() => setCollapsed(false)}
        >
          <MdMenu size={22} color="#101540" />
        </button>
      )}

      <div className={classes.NavBar}>
        <div className={classes.LeftTopbar}>
          <NavLink className={classes.iconLink}>
            {profileSrc ? (
              <img src={profileSrc} alt="Profile" className={classes.ChogogImage}/>
            ) : (
              <FaUser className={classes.userIcon} size={32} />
            )}
          </NavLink>
          <div className={classes.Contents}>
            <div className={classes.UserName}>
              {storedUser?.user_firstname || storedUser?.staff_firstname || "Test"}
            </div>
            <div className={classes.UserRole}>
              {storedUser?.user_id || storedUser?.staff_id || "Test"}
            </div>
          </div>
        </div>
        
        <div className={classes.RightTopbar}>
          <div className={classes.TimeGear}>
            <span className={classes.Time}>{currentTime}</span>
            <NavLink className={classes.GearButton} onClick={() => setActive("SettingPage")}>
              <FaCog className={classes.GearIcon} size={16} />
            </NavLink>
          </div>
          <div className={classes.Date}>{currentDate}</div>
        </div>
      </div>

     
      <div className={classes.SampleLangTo}>
        <main className={classes.RenderComponents}>
          {renderContent()}
        </main>
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

export default UserPage;
