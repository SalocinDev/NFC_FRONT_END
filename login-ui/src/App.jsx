import Button from './Components/Button.jsx';
import Logo from './Components/Logo.jsx';
import Whitelogo from './Components/Whitelogo.jsx';

function App() {
  return (
    <>
      {/* Right side rectangle background */}
      <div className="Right-rectangle">
         <div className="Right-content">

         <Whitelogo />
         <p>New to our platform? Sign up now.</p>
         <Button name="SIGN UP" use="Button-sign-up"/>

         </div>
       </div>

      {/* Main login form container */}
      <div className="Login-container">
        <div className='Header'>
          <Logo />
          <h1 className="Welcome-header">Welcome Back !!</h1>
          <p className='Credentials'>Please Enter Your Credentials To Log-in</p>
        </div>

        <div className="Login-input">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            required
          />

          <input
            type="text"
            id="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>

        <a href="#" className='Forgot-password'>Forgot password?</a>
        <Button name="SIGN-IN" use="Button-sign-in" />

        <div className="Line-container">
          <div className="Line Left"></div>
          <span className="Text">or</span>
          <div className="Line Right"></div>
        </div>

        <Button name="LOGIN WITH NFC" use="Nfc-sign-in" />
      </div>
    </>
  );
}

export default App;
