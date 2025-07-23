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
      <Logo/>
      <Header/>
      <Input/>
      <Button name="SIGN-UP"/>
   </div>
    
  </StrictMode>,
)
   
}
export default Login;
