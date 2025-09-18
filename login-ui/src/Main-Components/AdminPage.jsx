import classes from '../CSS-Folder/AdminPage.module.css';
import { FaUser, FaCog } from 'react-icons/fa';
import { Button, Graphs, Catalog, Books, UserManagement, NfcUserManagement, SettingPage} from '../Components';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import WlogoSidebar from '../Logo/W-logo.png';
import { useNavigate } from 'react-router-dom';
import { 
  MdDashboard, 
  MdBook, 
  MdPeople, 
  MdLibraryBooks, 
  MdReport, 
  MdPeopleAlt,
  MdMenu,
  MdLogout
} from "react-icons/md";
import { FaBookReader } from "react-icons/fa";
import { logOut } from '../Services/SessionUtils';

function AdminPage() {
  const navigate = useNavigate(); 

  const storedUser = JSON.parse(sessionStorage.getItem("userInfo"));

  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [collapsed, setCollapsed] = useState(false);
  const borrowedBooks = 60;
  const returnedBooks = 40;

   useEffect(() => {
    if (window.innerWidth <= 480) {
      setCollapsed(true); 
    }
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

    updateTime(); // initial run
    const interval = setInterval(updateTime, 60000); // every 60s

    return () => clearInterval(interval); // cleanup
  }, []);

  /* eto yung bago: */

  const [active, setActive] = useState("DashBoard"); // default section

  const renderContent = () => {
    switch (active) {
      case "Dashboard":
        return <Graphs/>;
      case "Catalog":
        return <Catalog />;
      case "Books":
        return <Books/>;
      case "Users":
        return <UserManagement />;
        case "NfcUsers":
        return <NfcUserManagement />;
         case "SettingPage":
        return <SettingPage />;
      default:
        return <Graphs />;
    }
  };


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
                use="Sample" 
                onClick={() => setActive("Dashboard")} 
              />
            </li>
            <li>
              <Button 
                name={<><MdLibraryBooks size={24} /><span>Catalog</span></>} 
                use="Sample" 
                onClick={() => setActive("Catalog")} 
              />
            </li>
            <li>
              <Button 
                name={<><MdBook size={24} /><span>Books</span></>} 
                use="Sample" 
                onClick={() => setActive("Books")} 
              />
            </li>
            <li>
              <Button 
                name={<><MdPeople size={24} /><span>Users</span></>} 
                use="Sample" 
                onClick={() => setActive("Users")} 
              />
            </li>
            <li>
              <Button 
                name={<><MdPeopleAlt size={24} /><span>NFC Users</span></>} 
                use="Sample" 
                onClick={() => setActive("NfcUsers")} 
              />
            </li>
            <li>
              <Button 
                name={<><MdReport size={24} /><span>Reports</span></>} 
                use="Sample" 
                onClick={() => setActive("Sample6")} 
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
          <NavLink to="/profile" className={classes.iconLink}>
            <FaUser className={classes.userIcon} size={32} />
          </NavLink>
          <div className={classes.Contents}>
            <div className={classes.UserName}>{storedUser?.firstName || storedUser?.staff_firstname || "Test"}</div>
            <div className={classes.UserRole}>{storedUser?.userID || storedUser?.staff_id || "Test"}</div>
          </div>
        </div>
        
        <div className={classes.RightTopbar}>
          <div className={classes.TimeGear}>
            <span className={classes.Time}>{currentTime}</span>
            <NavLink onClick={() => setActive("SettingPage")}>
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
    

    </div>
  );
}

export default AdminPage;
