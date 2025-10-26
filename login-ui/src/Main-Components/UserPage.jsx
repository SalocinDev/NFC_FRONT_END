import { useState, useEffect } from 'react';
import classes from '../CSS-Folder/UserPage.module.css';
import { MdMenu, MdDashboard, MdLogout } from "react-icons/md"; 
import { FaUser, FaCog, FaCompass, FaBookOpen } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, UserDashboard, ServicesAvailed, BorrowedForm, SettingPage, AiPopUp, SurveyForm, WifiQRSelector, LiveClock } from '../Components';
import { FaWifi } from "react-icons/fa";
import { RiSurveyFill } from "react-icons/ri";
import { WlogoSidebar } from '../Logo';
import { logOut } from '../Services/SessionUtils';
import { getProfilePicture } from '../Services/FileService'
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const FirstName = storedUser.user_firstname;
  const UserID = storedUser.user_id;

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
    if (storedUser.user_pfp_id_fk) {
      getProfilePicture(storedUser.user_pfp_id_fk).then(url => {
        setProfileSrc(url);
      });
    }
  }, [storedUser.user_pfp_id_fk]);

  const renderContent = () => {
    switch (active) {
      case "UserDashboard": return <UserDashboard />;
      case "BorrowedForm": return <BorrowedForm />;
      case "ServicesAvailed": return <ServicesAvailed />;
      case "SettingPage": return <SettingPage />;
      case "SurveyPage": return <SurveyForm />;
      case "WifiPage": return <WifiQRSelector />;
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
          <li>
            <Button 
              name={<>< RiSurveyFill size={24} /><span>Survey Form</span></>} 
              use="Sample" 
              onClick={() => setActive("SurveyPage")}
              isActive={active === "SurveyPage"}    
            />
          </li>
           <li>
            <Button 
              name={<>< FaWifi size={24} /><span>Wi-Fi</span></>} 
              use="Sample" 
              onClick={() => setActive("WifiPage")}
              isActive={active === "WifiPage"}    
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
          <div className={classes.iconLink}>
            {profileSrc ? (
              <img src={profileSrc} alt="Profile" className={classes.ChogogImage}/>
            ) : (
              <FaUser className={classes.userIcon} size={32} />
            )}
          </div>
          <div className={classes.Contents}>
            <div className={classes.UserName}>
              {FirstName || storedUser?.staff_firstname || "Test"}
            </div>
            <div className={classes.UserRole}>
              {UserID || storedUser?.staff_id || "Test"}
            </div>
          </div>
        </div>
        
        <div className={classes.RightTopbar}>
          
            <span><LiveClock/></span>
            <NavLink onClick={() => setActive("SettingPage")}>
            <FaCog className={classes.GearIcon} size={30} />
            </NavLink>
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
