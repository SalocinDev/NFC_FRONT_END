import classes from '/src/CSS-Folder/SignUpForm.module.css';
import { useNavigate } from 'react-router-dom';
import { Wlogo, Input, Blogo, Button } from '../Components';
import BlogoImg from '/src/Logo/B-logo.png';
function ResetPasswordForm() {
  const navigate = useNavigate();
  return (

     <div className={classes.body}>
      <div className={classes.curvedRectangle}>
        <div className={classes.content}>
          <Wlogo />
          <p className={classes.tagline}>
            Already have an account? Sign in now
          </p>
          <Button name="SIGN IN" use="ButtonForm" />
        </div>
      </div>

    <div className={classes.container}>
      <Button name="Back" use="BackButton" onClick={() => navigate("/")}/>

      <h1 className={classes.LogoContainer}>
        <span className={classes.text}>Sign Up</span>
        <img src={BlogoImg} alt="Logo" className={classes.icon} />
      </h1>
       <p className={classes.info}>
            Please provide your information to sign up.
          </p>
     
       

      <Input placeholder="Name" />
      <Input placeholder="Email"  type='password' />
      
      <div className={classes.InputMagkatabi}>
        <input placeholder="Username"  className={classes.SmallInput} />
        <input placeholder="Password" className={classes.SmallInput} />
      </div>
      <Button name="SIGN UP" use="ButtonSignUpForm" />
      
      
    </div>

    </div>
    
  );
}

export default ResetPasswordForm;
