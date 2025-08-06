import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '/index.css'
import App from './Main-Components/App.jsx'
import Dashboard from './Main-Components/Dashboard.jsx'
import OtpForm from './Main-Components/OtpForm.jsx'
import SignUpForm from './Main-Components/SignUpForm.jsx'
import NfcPage from './Main-Components/NfcPage.jsx'
import NotFoundPage from './Components/NotFoundPage.jsx'
import ResetPasswordForm from './Main-Components/ResetPasswordForm.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
  {path: "/", element: <App/>},
  {path: "/Dashboard", element: <Dashboard/>},
  {path: "/NfcPage", element: <NfcPage/>},
  {path: "/OtpForm", element: <OtpForm/>},
  {path: "/ResetPasswordForm", element: <ResetPasswordForm/>},
  {path: "/SignUpForm", element: <SignUpForm/>},
  {path: "*", element: <NotFoundPage/>},
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
);
