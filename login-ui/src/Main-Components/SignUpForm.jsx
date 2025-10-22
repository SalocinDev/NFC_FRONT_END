import classes from '../CSS-Folder/SignUpForm.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { Wlogo, Input, Blogo, Button } from '../Components';
import { BlogoImg } from '../Logo';
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
  const [Category, setCategory] = useState("");

  const SymbolList = ["!","@","#","$","%","^","&","*","(",")","-","_","=","+"];

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

  if (Pass.includes(""))
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
          <Button name="SIGN IN" use="ButtonForm" type="button" onClick={() => navigate("/")}/>
        </div>
      </div>

    <div className={classes.container}>
        <Button name="Back" use="BackButton" type="button" onClick={() => navigate("/")}/>
      <div className={classes.TitleRight}>
      <h1 className={classes.LogoContainer}>
        <span className={classes.title}>Sign Up</span>
        <img  src={BlogoImg} alt="Logo" className={classes.icon} />
      </h1>
       <p className={classes.info}> Please provide your information to sign up.</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault(); //prevents reload
          handleSignUp();
        }}
      >

  <div className={classes.SignUpContainer}>
    <div className={classes.NameContainer}>

      <Input required type="text" label="First Name"  value={FN} onChange={(e) => setFN(e.target.value)} />
      <Input type="text" label="Middle Name"  value={MN} onChange={(e) => setMN(e.target.value)} />
      <Input required label="Last Name" type="text"  value={LN} onChange={(e) => setLN(e.target.value)} />
      <Input className={classes.UniversityInput} required label="University" type="select" options={["TUP", "PNU", "UDM", "PLM", "ADAMSON", "Others."]} value={School} onChange={(e) => setSchool(e.target.value)} />
      
      <div className={classes.inputContainer}>
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
        <label className={classes.inputLabel}>Contact Number</label>
        </div>
        
      <Input className={classes.SmallInput} label="Gender" required type="select" value={Gender} options={["Male", "Female", "Other"]} onChange={(e) => setGender(e.target.value)} />
      
    </div>

    <div className={classes.InfoContainer}>
      <Input 
        className={classes.UniversityInput}
        required
        label="User Category"
        type="select"
        options={[
          "Elementary Student (ES)",
          "High School Student (HS)",
          "College Student (CS)",
          "Employees-Gov’t (EGOV)",
          "Employees-Private (EPRI)",
          "Senior Citizens (SC)",
          "Reviewees (R)",
          "Person with Disabilities (PWD)",
          "Children in Street Situations (CISS)",
          "Out-of-School-Youth (OSY)",
          "Housewife/Husband (HH)",
          "LGBTQIAS2+",
          "OTHERS",
          "N/A"
        ]}
        value={Category}
        onChange={(e) => setCategory(e.target.value)}
      />      
      <Input required type="email" label="Email" value={Email} onChange={(e) => setEmail(e.target.value)} />
      <Input required type="password" label="Password"  value={Pass} onChange={(e) => setPass(e.target.value)} />
      <Input required type="password" label="Verify Password"  value={ConfirmPass} onChange={(e) => setconfirmPass(e.target.value)} />
      
      <Input className={classes.DateInput} label="Date of Birth" required type="date" value={DoB} onChange={(e) => setDoB(e.target.value)} />
        
      {/* mobile view ito naka display: none; */}
      <Input className={classes.GenderInput} required type="select" value={Gender} options={["Male", "Female"]} onChange={(e) => setGender(e.target.value)} />
        

    </div>
    <div>
      
    </div>
  </div>

      
    <div className={classes.InputGender}>
      <Button name="SIGN UP" use="SignUpButtonForm" type="submit" />
    </div>
    </form>
    </div>

    </div>

  );
}

export default ResetPasswordForm;
