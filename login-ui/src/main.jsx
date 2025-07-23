import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './Components/Login.jsx'
import Button from './Components/Button.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Login/>
    <Button name="Sign-up"/>
    
    
  </StrictMode>,
)
