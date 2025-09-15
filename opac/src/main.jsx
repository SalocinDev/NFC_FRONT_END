import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import NotFoundPage from "./Components/NotFoundPage.jsx";
import { MainPage, AboutPage, BookArchiveOpac} from "./Main-Components/";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "/index.css";
import { HashRouter, Routes, Route } from "react-router-dom";

/* import ProtectedRoute from "./ProtectedRoute"; */

const router = createBrowserRouter([
  { path: "/", element: <MainPage /> },
  { path: "/AboutPage", element: <AboutPage /> },
  { path: "/BookArchiveOpac", element: <BookArchiveOpac /> },
  { path: "*", element: <NotFoundPage /> }
],
  {
    basename: "/NFC_FRONT_END/opac",
  });

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
