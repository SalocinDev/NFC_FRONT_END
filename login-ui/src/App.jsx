
import Button from './Components/Button.jsx'
import Logo from './Components/Logo.jsx'

function App() {
   
return (
    
   <div className="Login-container"> 
      <div className='Header'>
         <Logo/>
         <h1 className="Welcome-header">Welcome Back !!</h1>
         <p>Please Enter Your Credentials To Log-in</p>
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

         <a href="#">Forgot password?</a>
   </div>
      <Button name="SIGN-UP"/>
   </div>
   
    );
   
}
export default App;
