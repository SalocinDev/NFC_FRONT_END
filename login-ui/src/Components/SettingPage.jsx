import classes from '../CSS-Folder/SettingPage.module.css';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; 
import { MdDashboard } from 'react-icons/md';
import { FaCompass, FaBookOpen, FaUser, FaCog, FaHandPointer, FaReply, FaCommentMedical } from 'react-icons/fa';
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
  const [newPass, setNewPass] = useState("");
  const [DoB, setDoB] = useState("");
  const [Gender, setGender] = useState("");
  const [Contact, setContact] = useState("");
  const [School, setSchool] = useState("");
  
  const genderOptions = ["Man", "Woman", "Mayonnaise"];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setCurrentDate(
        now.toLocaleDateString(undefined, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      );
    };

    updateTime(); // initial run
    const interval = setInterval(updateTime, 60000); // every 60s

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div>
      <div className={classes.PersonalDetail}>
        <h1>ACCOUNT SETTING</h1>
        <h2>Your Profile Picture</h2>

        <div className={classes.InputGrid}>
          <div className={classes.InputField}>
            <label>Surname</label>
            <Input
              required
              type="text"
              placeholder="Surname"
              value={LN}
              onChange={(e) => setLN(e.target.value)}
            />
          </div>

          <div className={classes.InputField}>
            <label>Contact</label>
            <PhoneInput
              country={'ph'}
              value={Contact}
              onChange={setContact}
              specialLabel=""
              buttonClass={classes.myDropdown}
              inputClass={classes.input}
              dropdownClass={classes.myCountryList}
              searchable={true}
              disableSearchIcon={true}
            />
          </div>

          <div className={classes.InputField}>
            <label>First Name</label>
            <Input
              required
              type="text"
              placeholder="First Name"
              value={FN}
              onChange={(e) => setFN(e.target.value)}
            />
          </div>

          <div className={classes.InputField}>
            <label>Email</label>
            <Input
              required
              type="email"
              placeholder="Email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={classes.InputField}>
            <label>Middle Name</label>
            <Input
              required
              type="email"
              placeholder="Middle Name"
              value={MN}
              onChange={(e) => setMN(e.target.value)}
            />
          </div>
    
          <div className={classes.InputField}>
            <label>University</label>
            <Input
              required
              type="text"
              placeholder="Your University"
              value={School}
              onChange={(e) => setSchool(e.target.value)}
            />
          </div>

          <div className={classes.InputField}>
            <label>Birth Date</label>
            <Input
              required
              type="date"
              value={DoB}
              onChange={(e) => setDoB(e.target.value)}
            />
          </div>

          <div className={classes.InputField}>
            <label>Old Password</label>
            <Input
              required
              type="password"
              placeholder="Enter Your Old Password"
              value={Pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>

          <div className={classes.InputField}>
            <label>Gender Identity</label>
            <span>
              <select
                name="gender"
                value={Gender}
                onChange={(e) => setGender(e.target.value)}
                className={classes.SmallInput}
              >
                <option value="" disabled hidden>
                  Choose gender
                </option>
                {genderOptions.map((g, i) => (
                  <option key={i} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </span>
          </div>

          <div className={classes.InputField}>
            <label>New Password</label>
            <Input
              required
              type="password"
              placeholder="Enter Your New Password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
            />
          </div>

          <Button name="Update Account" use="ConfirmPassButton" />
        </div>

        <h1>LOCATION SETTING</h1>
        <div className={classes.InputField}>
          <label>Address</label>
          <Input required type="text" placeholder="Please Enter Your Address" />
        </div>

        <div className={classes.InputField}>
          <label>City</label>
          <Input required type="text" placeholder="Please Enter Your City" />
        </div>

        <div className={classes.InputField}>
          <label>Zip Code</label>
          <Input required type="text" placeholder="Please Enter Your Zip Code" />
          <br />   
        </div>

        <div className={classes.ButtonContainer}>
          <Button name="Update Address" use="UpdateProfileButton" />
        </div>
        <br />
      </div>
    </div>
  );
}

export default SettingPage;
