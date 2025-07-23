import '/index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './Login.jsx'
import Button from './Components/Button.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>

<div className="Login-container">

    <Login/>

</div>
    
    
  </StrictMode>,
)
