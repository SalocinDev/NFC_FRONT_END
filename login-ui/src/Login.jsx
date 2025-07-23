import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Header from './Components/Header.jsx'
import Input from './Components/Input.jsx'
import Button from './Components/Button.jsx'
import Logo from './Components/Logo.jsx'


function Login() {
   createRoot(document.getElementById('root')).render(

  <StrictMode>

    
   <div className="Login">
  <div className="rectangle-container">
    <div className="rectangle"> 
      <img src="/src/Logo/W-typo.png" alt="Logo" style={{ width: '80px', height: 'auto' }} /> 
          <span style={{ fontSize: '9px', color: 'white', position: 'absolute', bottom: '115px', left: '53px' }}>New to our platform? Sign Up now.</span>
      </div>
  </div>
 
  <Logo src={'/src/Logo/B-lugo.png'} />
  <Header/>
  <Input/>
  <Button name="SIGN-IN"/>
  <Button name="NFC LOGIN" className="rectangle-btn" />
</div>
    
  </StrictMode>,
)
   
}
export default Login;
