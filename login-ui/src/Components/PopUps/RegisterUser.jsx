import classes from "../../CSS-Folder/RegisterUser.module.css";
import { TiUserAddOutline } from "react-icons/ti";
import { MdMarkEmailRead } from "react-icons/md";

import { Button, Input } from "..";
import { useState } from "react";
import { signUp, sendOTP } from '../../Services/SignUpService';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisterUser({ isOpen, onClose, user = {} }) {
  if (!isOpen) return null; 

    const [FN, setFN] = useState("");
    const [MN, setMN] = useState("");
    const [LN, setLN] = useState("");
    const [Email, setEmail] = useState("");
    const [Pass, setPass] = useState("");
    const [ConfirmPass, setconfirmPass] = useState("");
    const [DoB, setDoB] = useState("");
    const [Gender, setGender] = useState("");
    const [Contact, setContact] = useState("");
    const [School, setSchool] = useState("");
  
    const handleSignUp = () => {
    //required fields check
    if (!FN || !LN || !Email || !Pass || !DoB || !Gender || !Contact || !School) {
      toast.error("Please fill in all required fields.");
      return;
    }
  
    //email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
  
    //password length check
    if (Pass.length < 6 || ConfirmPass.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
  
    //confirm password are the same
    if (Pass !== ConfirmPass) {
      toast.error("Passwords are not the same");
      return;
    }
  
    //contact number validation (10–15 digits)
    const contactRegex = /^[0-9]{10,15}$/;
    if (!contactRegex.test(Contact)) {
      toast.error("Contact number must be 10–15 digits only (no letters or symbols).");
      return;
    }
  
    //date of Birth not in future
    const today = new Date();
    if (new Date(DoB) > today) {
      toast.error("Date of birth cannot be in the future.");
      return;
    }
  
    //if all validations pass, call your signUp function
    toast.success(Email, Pass, FN, MN, LN, DoB, Gender, Contact, School, navigate);
  };

  return (
    <div className={classes.popup}>
  <div className={classes.popupContent}>
    
    {/* Header */}
    <div className={classes.popupHeader}>
      <h2>Register New User</h2>
      <div className={classes.headerActions}>
         <Button 
          use="VerifyEmail"
          onClick={handleSignUp}
          name={<><MdMarkEmailRead size={24} />VERIFY EMAIL</>} 
          cooldown={2000}
        />

        <Button 
          use="RegisterNewUser"
          onClick={handleSignUp}
          name={<><TiUserAddOutline size={24} />REGISTER</>} 
          cooldown={2000}
        /> 
      </div>
    </div>

    <div className={classes.popupForm}>
      <div className={classes.inputWrapper}>
      <Input required type="text" placeholder="First Name" value={FN} onChange={(e) => setFN(e.target.value)} />
      </div>
      <Input type="text" placeholder="Middle Name (If: N/A)" value={MN} onChange={(e) => setMN(e.target.value)} />
      <Input required type="text" placeholder="Last Name" value={LN} onChange={(e) => setLN(e.target.value)} />
      <Input className={classes.GenderInput} required type="select" placeholder="Gender" value={Gender} options={["Male", "Female"]} onChange={(e) => setGender(e.target.value)} />

      <PhoneInput
        country={'ph'}
        value={Contact}
        onChange={setContact}
        specialLabel=""
        buttonClass={classes.myDropdown}
        inputClass={classes.input}
        dropdownClass={classes.myCountryList}
        searchable
        disableSearchIcon
      />
      <Input className={classes.DateInput} required type="date" value={DoB} onChange={(e) => setDoB(e.target.value)} />
      <Input required type="text" placeholder="School" value={School} onChange={(e) => setSchool(e.target.value)} />
      <Input required type="password" placeholder="Password" value={Pass} onChange={(e) => setPass(e.target.value)} />
      <Input required type="email" placeholder="Email" value={Email} onChange={(e) => setEmail(e.target.value)} />
      <Input required type="password" placeholder="Confirm Password" value={ConfirmPass} onChange={(e) => setconfirmPass(e.target.value)} />
      
     
    </div>

    <div className={classes.popupFooter}>
      <button onClick={onClose}>Close</button>
    </div>

  </div>
</div>

  );
}

export default RegisterUser;
