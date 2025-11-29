import classes from '../CSS-Folder/AdminPage.module.css';
import { FaUser, FaCog } from 'react-icons/fa';
import { Button, Statistics, Books, UserManagement, SettingPage, LogsTable, ReportsExport, WifiList, UserLibraryLog, AllSurvey, LiveClock, PopUpConfirm, AllServices} from '../Components';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { WlogoSidebar } from '../Logo';
import { useNavigate } from 'react-router-dom';
import { MdDashboard, MdBook, MdPeople, MdLibraryBooks, MdReport, MdPeopleAlt,MdMenu,MdLogout } from "react-icons/md";
import { RiSurveyFill } from "react-icons/ri";
import { FaBookReader } from "react-icons/fa";
import { logOut } from '../Services/SessionUtils';
import { getProfilePicture } from '../Services/FileService'
import { FaWifi } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";

const apiUrl = import.meta.env.VITE_API_URL;

function AdminPage() {
  const navigate = useNavigate(); 
  
  const storedUser = JSON.parse(sessionStorage.getItem("userInfo"));
  // const profileUrl = `${apiUrl}${storedUser.user_profile_pic}-staff`;
  
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [collapsed, setCollapsed] = useState(false);
  const [profileSrc, setProfileSrc] = useState(null);
  const [isPopupConfirmOpen, setIsPopupConfirmOpen] = useState(false);
  const borrowedBooks = 60;
  const returnedBooks = 40;

  useEffect(() => {
    if (storedUser.role) {
      getProfilePicture(7).then(url => {
        setProfileSrc(url);
      });
    }
  }, [storedUser.user_role]);

  useEffect(() => {
    const userRole = storedUser?.role || storedUser?.staff_role;
    if (!storedUser || userRole !== "staff") {
      navigate("/", { replace: true });
    }
  }, [navigate, storedUser]);
  
  if (!storedUser || storedUser?.role !== "staff") return null;

  useEffect(() => {
    if (window.innerWidth <= 480) {
      setCollapsed(true); 
    }
  }, []);
  
  const [active, setActive] = useState("Dashboard"); 

  const renderContent = () => {
    switch (active) {
      case "Dashboard":
        return <Statistics/>;
      case "Books":
        return <Books/>;
      case "Users":
        return <UserManagement />;
         case "SettingPage":
        return <SettingPage />;
        case "Reports":
        return <ReportsExport />;
        case "WiFi":
        return <WifiList />;
        case "Logs": 
        return <AllServices />;
        case "SurveyReport": 
        return <AllSurvey />;
      default:
        return <Statistics />;
    }
  };

  const handlePopupConfirmOpen = () => setIsPopupConfirmOpen(true)
  const handlePopupConfirm = async () => {
    try {
      await logOut();
      navigate("/");
      
    } catch (error) {
      return toast.error("Logout Error")
    }
  }
  return (
    <div>
      <aside className={`${classes.Sidebar} ${collapsed ? classes.hidden : classes.open}`}>
          <Button 
            name={<><MdMenu size={24} /></>} 
            use="BurgerIcon" 
            onClick={() => setCollapsed(true)}    
          />
        <img src={WlogoSidebar} alt="Logo" className={classes.WSidebar} />

        <ul className={classes.ulstyling}>
            <li>
              <Button 
                name={<><MdDashboard size={24} /><span>Home</span></>} 
                use="SidebarButton" 
                onClick={() => setActive("Dashboard")} 
                isActive={active === "Dashboard"}
              />
            </li>
            <li>
              <Button 
                name={<><MdBook size={24} /><span>Books</span></>} 
                use="SidebarButton" 
                onClick={() => setActive("Books")} 
                isActive={active === "Books"}
              />
            </li>
            <li>
              <Button 
                name={<><MdPeople size={24} /><span>Users</span></>} 
                use="SidebarButton" 
                onClick={() => setActive("Users")} 
                isActive={active === "Users"}
              />
            </li>
            <li>
              <Button 
                name={<><MdReport size={24} /><span>Reports</span></>} 
                use="SidebarButton" 
                onClick={() => setActive("Reports")} 
                isActive={active === "Reports"}
              />
            </li>
            <li>
              <Button 
                name={<><FaWifi size={24} /><span>Wi-Fi</span></>} 
                use="SidebarButton" 
                onClick={() => setActive("WiFi")} 
                isActive={active === "Wifi"}
              />
            </li>
            <li>
              <Button 
                name={<><IoDocumentText size={24} /><span>Services</span></>} 
                use="SidebarButton" 
                onClick={() => setActive("Logs")} 
                isActive={active === "Logs"}
              />
            </li>
            <li>
              <Button 
                name={<><RiSurveyFill  size={24} /><span>Survey</span></>} 
                use="SidebarButton" 
                onClick={() => setActive("SurveyReport")} 
                isActive={active === "SurveyReport"}
              />
            </li>
          </ul>

           <Button 
              name={<><MdLogout size={24} /><span>Logout</span></>} 
              use="SidebarButton" 
              onClick={handlePopupConfirmOpen}
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
          <div className={classes.UserName}>{storedUser?.firstName || storedUser?.staff_firstname || "Test"}</div>
          <div className={classes.UserRole}>{storedUser?.userID || storedUser?.staff_id || "Test"}</div>
        </div>
      </div>
        
      <div className={classes.RightTopbar}>
        <div className={classes.TimeGear}>
          <span><LiveClock/></span>
          <NavLink onClick={() => setActive("SettingPage")}>
          <FaCog className={classes.GearIcon} size={30} />
          </NavLink>
        </div>
        <div className={classes.Date}>{currentDate}</div>
      </div>
        
      </div>

      <div className={classes.MainRender}>
        <main className={classes.RenderComponents}>
          {renderContent()}
        </main>
      </div>

      <PopUpConfirm
        isOpen={isPopupConfirmOpen}
        onClose={() => setIsPopupConfirmOpen(false)}
        onConfirm={handlePopupConfirm}
        subject={"Confirm Logout?"}
      />
    </div>
  );
}

export default AdminPage;
