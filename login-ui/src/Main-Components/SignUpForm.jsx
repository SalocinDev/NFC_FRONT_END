import classes from '../CSS-Folder/SignUpForm.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { Wlogo, Input, Blogo, Button } from '../Components';
import BlogoImg from '../Logo/B-logo.png';
import { signUp, sendOTP } from '../Services/SignUpService';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; 

function ResetPasswordForm() {
  const navigate = useNavigate();

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
    alert("Please fill in all required fields.");
    return;
  }

  //email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(Email)) {
    alert("Please enter a valid email address.");
    return;
  }

  //password length check
  if (Pass.length < 6 || ConfirmPass.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }

  //confirm password are the same
  if (Pass !== ConfirmPass) {
    alert("Passwords are not the same");
    return;
  }

  //contact number validation (10–15 digits)
  const contactRegex = /^[0-9]{10,15}$/;
  if (!contactRegex.test(Contact)) {
    alert("Contact number must be 10–15 digits only (no letters or symbols).");
    return;
  }

  //date of Birth not in future
  const today = new Date();
  if (new Date(DoB) > today) {
    alert("Date of birth cannot be in the future.");
    return;
  }

  //if all validations pass, call your signUp function
  signUp(Email, Pass, FN, MN, LN, DoB, Gender, Contact, School, navigate);
};

  return (

     <div className={classes.body}>

      {/* Rectangle Side */}
      <div className={classes.curvedRectangle}>
        <div className={classes.content}>
          <Wlogo />
          <p className={classes.tagline}>
            Already have an account? Sign in now
          </p><br/>
          <Button name="SIGN IN" use="ButtonForm" onClick={() => navigate("/")}/>
        </div>
      </div>

    <div className={classes.container}>
      <Button name="Back" use="BackButton" onClick={() => navigate("/")}/>

      <h1 className={classes.LogoContainer}>
        <span className={classes.title}>Sign Up</span>
        <img src={BlogoImg} alt="Logo" className={classes.icon} />
      </h1>
       <p className={classes.info}>
            Please provide your information to sign up.
          </p>

  <div className={classes.SignUpContainer}>
    <div className={classes.NameContainer}>

      <Input required type="text" placeholder="First Name" value={FN} onChange={(e) => setFN(e.target.value)} />
      <Input type="text" placeholder="Middle Name (If: N/A)" value={MN} onChange={(e) => setMN(e.target.value)} />
      <Input required type="text" placeholder="Last Name" value={LN} onChange={(e) => setLN(e.target.value)} />

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

      <Input  className={classes.SmallInput} required type="select" placeholder="Gender" value={Gender} options={["Male", "Female"]} onChange={(e) => setGender(e.target.value)} />
    </div>

    <div className={classes.InfoContainer}>
      <Input required type="email" placeholder="Email" value={Email} onChange={(e) => setEmail(e.target.value)} />
      <Input required type="password" placeholder="Password" value={Pass} onChange={(e) => setPass(e.target.value)} />
      <Input required type="password" placeholder="Confirm Password" value={ConfirmPass} onChange={(e) => setconfirmPass(e.target.value)} />
      <Input className={classes.DateInput} required type="date" value={DoB} onChange={(e) => setDoB(e.target.value)} />
      <Input required type="text" placeholder="School" value={School} onChange={(e) => setSchool(e.target.value)} />
    </div>
  </div>

    <div className={classes.InputGender}>
      
      <Button name="SIGN UP" use="ButtonSignUpForm" onClick={handleSignUp} />
    </div>
    </div>

    

    </div>

    
    
  );
}

export default ResetPasswordForm;
