import '/index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Login from './Login.jsx'
import Button from './Components/Button.jsx'
import SimpleFetch from './SimpleFetch.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>

<div className="Login-container">

    <Login/>
    <SimpleFetch/>
</div>
    
    
  </StrictMode>,
)
