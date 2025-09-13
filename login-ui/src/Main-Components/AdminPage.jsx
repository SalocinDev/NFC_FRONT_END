import classes from '../CSS-Folder/AdminPage.module.css';
import { MdDashboard } from 'react-icons/md';
import { FaCompass, FaBookOpen, FaUser, FaCog, FaHandPointer, FaReply} from 'react-icons/fa';
import { Button, Graphs, Catalog, Books, UserManagement, NfcUserManagement} from '../Components';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import WlogoSidebar from '../Logo/W-logo.png';
import { useNavigate } from 'react-router-dom';
/* import { logOut } from '../Services/SessionUtils'; */

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

  /* eto yung bago: */

  const [active, setActive] = useState("home"); // default section

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
      default:
        return <Graphs />;
    }
  };


  return (
    <div>
      {/* Sidebar */}
      <aside className={classes.Sidebar}>
        <img src={WlogoSidebar} alt="Logo" className={classes.WSidebar} />
        <ul className={classes.ulstyling}>
          <li><Button name="Dashboard" use="Sample" onClick={() => setActive("Dashboard")}/></li>
          <li><Button name="Catalog" use="Sample" onClick={() => setActive("Catalog")}/></li>
          <li><Button name="Books" use="Sample" onClick={() => setActive("Books")}/></li>
          <li><Button name="Users" use="Sample" onClick={() => setActive("Users")}/></li>
          <li><Button name="NFC Users" use="Sample" onClick={() => setActive("NfcUsers")}/></li>
          <li><Button name="Reports" use="Sample" onClick={() => setActive("Sample6")}/></li>
        </ul>

           <Button name="Log Out" use="LogoutButton" onClick={() => {logOut().then(() => navigate('/'));}}/>
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

function Sample1() {
  return <Graphs/>;
}

function Sample2() {
  return <Catalog/>;
}

function Sample3() {
  return <Graphs/>;
}

function Sample4() {
  return <h1>Sample4</h1>;
}


export default AdminPage;
