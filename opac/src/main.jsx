import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import NotFoundPage from "./Components/NotFoundPage.jsx";
import { MainPage, AboutPage, BookArchiveOpac} from "./Main-Components/";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "/index.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { BookDetailPage, OPACSearchbar, OPACResult } from "./Components";
import {OPACmain} from "./Main-Components";
/* import ProtectedRoute from "./ProtectedRoute"; */

/* const router = createBrowserRouter([
  { path: "/", element: <MainPage /> },
  { path: "/AboutPage", element: <AboutPage /> },
  { path: "/BookArchiveOpac", element: <BookArchiveOpac /> },
  { path: "*", element: <NotFoundPage /> }
],
  {
    basename: "/NFC_FRONT_END/opac",
  }); */


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter hashType="slash">
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="AboutPage" element={<AboutPage/>}/>
        <Route path="BookArchiveOpac" element={<BookArchiveOpac/>}/>


        {/*test*/}
        <Route path="OPACmain" element={<OPACmain/>}/>
        <Route path="OPACSearchBar" element={<OPACSearchbar />} />
        <Route path="OPACResult" element={<OPACResult />} />
        <Route path="BookDetail/:id" element={<BookDetailPage />} />

        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </HashRouter>
  </StrictMode>
);
