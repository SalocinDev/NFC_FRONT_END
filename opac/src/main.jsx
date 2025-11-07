import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import { MainPage, AboutPage, BookArchiveOpac } from "./Main-Components/";
import NotFoundPage from "./Components/NotFoundPage.jsx";
import "/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter hashType="slash">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="AboutPage" element={<AboutPage />} />
        <Route path="BookArchiveOpac" element={<BookArchiveOpac />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  </StrictMode>
);
