import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "/index.css";
import NotFoundPage from "./Components/NotFoundPage.jsx";
import { 
  LoginPage, Dashboard, NfcPage, OtpForm, ResetPasswordForm, SignUpForm, 
  UserPage, Services, Intermediary, AdminPage
} from "./Main-Components/";
import { HashRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter hashType="slash">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="OtpForm" element={<OtpForm />} />
        <Route path="ResetPasswordForm" element={<ResetPasswordForm />} />
        <Route path="SignUpForm" element={<SignUpForm />} />
        <Route path="NfcPage" element={<NfcPage />} />
        <Route path="Dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="UserPage" element={<ProtectedRoute><UserPage /></ProtectedRoute>} />
        <Route path="Services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
        <Route path="Intermediary" element={<ProtectedRoute><Intermediary /></ProtectedRoute>} />
        <Route path="AdminPage" element={<AdminPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  </StrictMode>
);
