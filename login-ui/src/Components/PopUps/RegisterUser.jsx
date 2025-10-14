import classes from "../../CSS-Folder/RegisterUser.module.css";
import { TiUserAddOutline } from "react-icons/ti";
import { MdMarkEmailRead } from "react-icons/md";
import { Button, Input } from "..";
import { useState } from "react";
import { sendOTP, adminUserRegister } from '../../Services/SignUpService';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from "react-router-dom";

function RegisterUser({ isOpen, onClose }) {
  if (!isOpen) return null; 

  const [FN, setFN] = useState("");
  const [MN, setMN] = useState("");
  const [LN, setLN] = useState("");
  const [Email, setEmail] = useState("");
  const [Pass, setPass] = useState("");
  const [ConfirmPass, setConfirmPass] = useState("");
  const [DoB, setDoB] = useState("");
  const [Gender, setGender] = useState("");
  const [Contact, setContact] = useState("");
  const [School, setSchool] = useState("");

  const handleRegister = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (Pass.length < 6 || ConfirmPass.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    if (Pass !== ConfirmPass) {
      toast.error("Passwords do not match.");
      return;
    }

    const contactRegex = /^[0-9]{10,15}$/;
    if (!contactRegex.test(Contact)) {
      toast.error("Contact number must be 10–15 digits only.");
      return;
    }

    const today = new Date();
    if (new Date(DoB) > today) {
      toast.error("Date of birth cannot be in the future.");
      return;
    }

    try {
      console.log("Signing up with:", {
        firstname: FN,
        middlename: MN,
        lastname: LN,
        email: Email,
        password: Pass,
        dob: DoB,
        gender: Gender,
        contact: Contact,
        school: School,
      });

      const response = await adminUserRegister(Email, Pass, FN, MN, LN, DoB, Gender, Contact, School)

      if (response.success) {
        toast.success(response.message);
        onClose();
        return;
      } else {
        toast.error(response.message || "Registration failed.");
        return
      }
    } catch (error) {
      console.error(error);
      toast.error("Error registering user.");
      return;
    }
  };


  const handleVerify = async () => {
    try {
      const response = await sendOTP(Email);
      if (response.success) toast.success("Verification email sent!");
      else toast.error("Failed to send verification email.");
    } catch (error) {
      console.error(error);
      toast.error("Error sending verification email.");
    }
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
              onClick={handleVerify}
              name={<><MdMarkEmailRead size={24} /> VERIFY EMAIL</>} 
              cooldown={2000}
            />
            <Button 
              use="RegisterNewUser"
              onClick={handleRegister}
              name={<><TiUserAddOutline size={24} /> REGISTER</>} 
              cooldown={2000}
            /> 
          </div>
        </div>

        {/* Form Fields */}
        <div className={classes.popupForm}>
          <Input required type="text" placeholder="First Name" value={FN} onChange={(e) => setFN(e.target.value)} />
          <Input type="text" placeholder="Middle Name (If: N/A)" value={MN} onChange={(e) => setMN(e.target.value)} />
          <Input required type="text" placeholder="Last Name" value={LN} onChange={(e) => setLN(e.target.value)} />
          <Input
            className={classes.GenderInput}
            required
            type="select"
            placeholder="Gender"
            value={Gender}
            options={["Male", "Female"]}
            onChange={(e) => setGender(e.target.value)}
          />

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
          <Input required type="password" placeholder="Confirm Password" value={ConfirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
        </div>

        {/* Footer */}
        <div className={classes.popupFooter}>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default RegisterUser;
