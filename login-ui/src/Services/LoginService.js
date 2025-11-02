import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendOTP } from './SignUpService';

const apiUrl = import.meta.env.VITE_API_URL;
//////////////////////////////////////////////////////////////////////////////////////////////
async function toLogin(email, password) {
  try {
    const response = await fetch(`http://${ip}:3000/acc/login-verify`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_API_KEY
      },
      body: JSON.stringify({ email: email, password: password })
    });
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Login Error:", error);
    return "Error";
  }
}

export async function handleLoginClick(navigate) {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  
  const result = await toLogin(email, password);
  console.log(result);
  if (result.success && result.data.user_id) {
    toast.success(`Welcome, ${result.data.user_firstname}!`);
    navigate("/UserPage");
  } else if (result.success === false) {
    toast.warn("Login Failed. Try again.");
  } else if (result.data === "Error") {
    toast.warn("An error occurred. Check console.");
  } else {
    // toast.warn("Unexpected server response: " + JSON.stringify(result));
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////
async function checkIfLoggedIn({ email, token, navigate }) {
  try {
    const payload = email ? { email } : { token };

    const checkFirst = await fetch(`${apiUrl}/acc/relogin`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_API_KEY
      },
      body: JSON.stringify(payload)
    });

    const resultCheck = await checkFirst.json().catch(() => ({}));
    // console.log("checkIfLoggedIn response:", resultCheck);

    if (resultCheck.success) {
      // console.log("User already logged in, redirecting to /Intermediary");
      // navigate('/Intermediary', { state: { hasLogged: true } });
      return { success: true };
    }

    return { success: false, message: resultCheck.message || "Not logged in yet" };
  } catch (error) {
    console.error("checkIfLoggedIn error:", error);
    return { success: false, message: error.message || error };
  }
}

export async function toNFClogin(navigate) {
  // console.log("API URL:", apiUrl);
  try {
    const nfcResponse = await fetch(`${apiUrl}/nfc/read`, {
      method: "GET",
      headers: { 
        "Accept": "application/json",
        "x-api-key": import.meta.env.VITE_API_KEY
      }
    });

    const nfcData = await nfcResponse.json().catch(() => ({}));
    const token = nfcData?.token;
    const reader_attached = nfcData?.reader_attached
    const error = nfcData?.error
    // console.log(nfcData);

    if (!reader_attached) return {...nfcData}
    if (!token) throw new Error("No token returned from NFC data");

    const checkFirst = await fetch(`${apiUrl}/acc/relogin`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_API_KEY
      },
      body: JSON.stringify({ token })
    });

    const recheck = await checkFirst.json().catch(() => ({}));
    // console.log("checkIfLoggedIn response:", recheck);

    if (recheck.success) {
      return { success: true, alreadyLoggedIn: true, user_firstname: recheck.user_firstname };
    }

    const response = await fetch(`${apiUrl}/acc/login-verify`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_API_KEY
      },
      body: JSON.stringify({ token })
    });

    const result = await response.json().catch(() => {
      console.error("Failed to parse /acc/login-verify response");
      return null;
    });

    if (!result) return { success: false, message: "No response from server" };

    return { ...result, reader_attached, alreadyLoggedIn: false };
  } catch (err) {
    console.error("NFC Login Error:", err.message);
    return { success: false, error: err.message };
  }
}


export async function signIn(email, password, navigate) {
  try {
    const response = await fetch(`${apiUrl}/acc/login-verify`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_API_KEY
      },
      body: JSON.stringify({ email, password })
    });
    const result = await response.json();
    // console.log(result);
    // console.log(response);
    if (!result.success) {
      toast.error(result.error || result.message || "Login failed");
      if (response.status === 403) {
        // toast.info(`Please wait, Sending OTP to ${email}`);
        // const OTPsend = await sendOTP(email);
        // if (!OTPsend) {
        //   return toast.error(`OTP has failed to Send`);
        // }
        // if (OTPsend.success) {
        //   toast.error(`OTP has been sent to ${email}!`);
        // }
        navigate(`OtpForm`, { state: { email, resetPass: false } })
        return;
      }
      return;
    }

    toast.success("Welcome!, " + (result.user_firstname || result.staff_firstname));

    if (result.role === "staff") {
      navigate("/AdminPage");
      return;
    }

    if (result.role === "user") {
      const check = await checkIfLoggedIn({ email, navigate });

      if (check.success) {
        navigate("/Intermediary", { state: { loggedIn: true } });
      } else {
        navigate("/Services", { state: { loggedIn: true } });
      }
    }

  } catch (error) {
    console.error("signIn error:", error);
    toast.error("Something went wrong during login.");
  }
}
