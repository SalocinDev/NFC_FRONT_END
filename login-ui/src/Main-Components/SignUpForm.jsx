import classes from '../CSS-Folder/SignUpForm.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { Wlogo, Input, Blogo, Button } from '../Components';
import BlogoImg from '../Logo/B-logo.png';
import { signUp, sendOTP } from '../Services/SignUpService'
function ResetPasswordForm() {
  const navigate = useNavigate();

  const [FN, setFN] = useState("");
  const [MN, setMN] = useState("");
  const [LN, setLN] = useState("");
  const [Email, setEmail] = useState("");
  const [Pass, setPass] = useState("");
  const [DoB, setDoB] = useState("");
  const [Gender, setGender] = useState("");
  const [Contact, setContact] = useState("");
  const [School, setSchool] = useState("");

  return (

     <div className={classes.body}>
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
      <Input required type="text" placeholder="Contact#" value={Contact} onChange={(e) => setContact(e.target.value)} />
    </div>

    <div className={classes.InfoContainer}>
      <Input required type="email" placeholder="Email" value={Email} onChange={(e) => setEmail(e.target.value)} />
      <Input required type="password" placeholder="Password" value={Pass} onChange={(e) => setPass(e.target.value)} />
      <Input required type="date" value={DoB} onChange={(e) => setDoB(e.target.value)} />
      <Input required type="text" placeholder="School" value={School} onChange={(e) => setSchool(e.target.value)} />
    </div>
  </div>

    <div className={classes.InputGender}>
      <Input  className={classes.SmallInput} required type="select" placeholder="Gender" value={Gender} options={["Male", "Female", "Mayonnaise"]} onChange={(e) => setGender(e.target.value)} />
      <Button name="SIGN UP" use="ButtonSignUpForm" onClick={() => signUp(Email, Pass, FN, MN, LN, DoB, Gender, Contact, School, navigate)} />
    </div>
    </div>

    </div>
    
  );
}

export default ResetPasswordForm;
