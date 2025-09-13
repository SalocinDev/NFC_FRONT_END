import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import NotFoundPage from "./Components/NotFoundPage.jsx";
import { MainPage} from "./Main-Components/";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "/index.css";

/* import ProtectedRoute from "./ProtectedRoute"; */

const router = createBrowserRouter([
  { path: "/", element: <MainPage /> },
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
