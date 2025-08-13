import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "/index.css";
import NotFoundPage from "./Components/NotFoundPage.jsx";
import { App, Dashboard, NfcPage, OtpForm, ResetPasswordForm, SignUpForm, AdminPage, BorrowedForm, LibraryLane } from "./Main-Components/";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "OtpForm", element: <OtpForm /> },
  { path: "ResetPasswordForm", element: <ResetPasswordForm /> },
  { path: "SignUpForm", element: <SignUpForm /> },
  { path: "NfcPage", element: <NfcPage /> },
  { path: "Dashboard", element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
  { path: "AdminPage", element: <ProtectedRoute><AdminPage /></ProtectedRoute> },
  { path: "BorrowedForm", element: <BorrowedForm />},
  { path: "LibraryLane", element: <LibraryLane />},
  { path: "*", element: <NotFoundPage /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
