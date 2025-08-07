import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '/index.css'
import NotFoundPage from './Components/NotFoundPage.jsx';
import { App, Dashboard, NfcPage, OtpForm, ResetPasswordForm, SignUpForm, AdminPage } from './Main-Components/';
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
  {path: "/", element: <App/>},
  {path: "/Dashboard", element: <Dashboard/>},
  {path: "/NfcPage", element: <NfcPage/>},
  {path: "/OtpForm", element: <OtpForm/>},
  {path: "/ResetPasswordForm", element: <ResetPasswordForm/>},
  {path: "/SignUpForm", element: <SignUpForm/>},
  {path: "/AdminPage", element: <AdminPage/>},
  {path: "*", element: <NotFoundPage/>},
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
);
