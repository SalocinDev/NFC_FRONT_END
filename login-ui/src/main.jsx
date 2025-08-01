import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '/index.css'
import App from './Main-Components/App.jsx'
import Dashboard from './Main-Components/Dashboard.jsx'
import NotFoundPage from './Components/NotFoundPage.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
  {path: "/", element: <App/>},
  {path: "/Dashboard", element: <Dashboard/>},
  {path: "*", element: <NotFoundPage/>},
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
);
