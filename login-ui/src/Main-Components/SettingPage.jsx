import classes from '../CSS-Folder/SettingPage.module.css';
import PhoneInput from 'react-phone-input-2';
import { MdDashboard } from 'react-icons/md';
import { FaCompass, FaBookOpen, FaUser, FaCog, FaHandPointer, FaReply, FaCommentMedical} from 'react-icons/fa';
import { Button, Table, SearchID, AiPopUp, Input } from '../Components';
import { IconHeader } from '../Components';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import WlogoSidebar from '/src/Logo/W-logo.png';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../Services/SessionUtils';

function SettingPage() {
  const navigate = useNavigate(); 
  const columns = ["ID", "User ID", "Name", "Email"];
  const storedUser = JSON.parse(sessionStorage.getItem("userInfo"));
  
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const borrowedBooks = 60;
  const returnedBooks = 40;
  const [FN, setFN] = useState("");
  const [MN, setMN] = useState("");
  const [LN, setLN] = useState("");
  const [Email, setEmail] = useState("");
  const [Pass, setPass] = useState("");
  const [NewPass, newSetPass] = useState("");
  const [DoB, setDoB] = useState("");
  const [Gender, setGender] = useState("");
  const [Contact, setContact] = useState("");
  const [School, setSchool] = useState("");


  const [phone, setPhone] = useState('');
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
          to="/BorrowedForm"
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
            <div className={classes.username}>{storedUser?.firstName || "Test"}</div>
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


        <div className={classes.PersonalDetail}>
  <h1>ACCOUNT SETTING</h1>
  <h2>Your Profile Picture</h2>

  <div className={classes.InputGrid}>
    <div className={classes.InputField}>
      <label>Surname</label>
      <Input required type="text" placeholder="Surname" value={LN} onChange={(e) => setLN(e.target.value)} />
    </div>

    <div className={classes.InputField}>
       <PhoneInput
      country={'ph'}            
      value={phone}
      onChange={setPhone}
      enableSearch={true}    
    />
    </div>

    <div className={classes.InputField}>
      <label>First Name</label>
      <Input required type="text" placeholder="First Name" value={FN} onChange={(e) => setFN(e.target.value)} />
    </div>

    <div className={classes.InputField}>
      <label>Email</label>
      <Input required type="email" placeholder="Email" value={Email} onChange={(e) => setEmail(e.target.value)} />
    </div>
    <div className={classes.InputField}>
      <label>Middle Name</label>
      <Input required type="email" placeholder="Middle Name" value={MN} onChange={(e) => setMN(e.target.value)} />
    </div>
    
    <div className={classes.InputField}>
      <label>University</label>
      <Input required type="text" placeholder="Your University" value={School} onChange={(e) => setUniversity(e.target.value)} />
    </div>

    <div className={classes.InputField}>
      <label>Birth Date</label>
      <Input required type="date" value={DoB} onChange={(e) => setDoB(e.target.value)} />
    </div>

    <div className={classes.InputField}>
      <label>Old Password</label>
      <Input required type="password" placeholder="Enter Your Old Password" value={Pass} onChange={(e) => setPass(e.target.value)} />
    </div>

    <div className={classes.InputField}>
      <label>Gender Identity</label>
      <span>
        <Input
        type="select"
        placeholder="Choose gender"
        name="gender"
        value={Gender}
        onChange={(e) => setGender(e.target.value)}
        options={["Man", "Woman", "Mayonnaise"]}
        className={classes.SmallInput}
      />
      </span>
    </div>

     <div className={classes.InputField}>
      <label>New Password</label>
      <Input required type="password" placeholder="Enter Your Old Password" value={Pass} onChange={(e) => setPass(e.target.value)} />
    </div>

     <Button name="Update Profile" use="ConfirmPassButton"/>

  </div>
  
          
  

    

    <h1>LOCATION SETTING</h1>
   <div className={classes.InputField}>
      <label>Address</label>
      <Input required type="text" placeholder="Please Enter Your Address"/>

    </div>
 <div className={classes.InputField}>
      <label>City</label>
      <Input required type="text" placeholder="Please Enter Your City"/>

    </div>
 <div className={classes.InputField}>
      <label>Zip Code</label>
      <Input required type="text" placeholder="Please Enter Your Zip Code"/>
      <br/>   
    </div>
<div className={classes.UpdateButton}>
    <Button name="Update Profile" use="UpdateProfileButton"/>
    
</div>
<br/>
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

export default SettingPage;

