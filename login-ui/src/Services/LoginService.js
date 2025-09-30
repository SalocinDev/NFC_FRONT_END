import { toast } from "react-toastify";

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
    alert(`Welcome, ${result.data.user_firstname}!`);
    navigate("/UserPage");
  } else if (result.success === false) {
    alert("Login Failed. Try again.");
  } else if (result.data === "Error") {
    alert("An error occurred. Check console.");
  } else {
    alert("Unexpected server response: " + JSON.stringify(result));
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////
export async function toNFClogin(navigate) {
  console.log("API URL:", apiUrl);
  try {
    const nfcResponse = await fetch(`${apiUrl}/nfc/read`, {
      method: "POST",
      headers: { 
        "Accept": "application/json",
        "x-api-key": import.meta.env.VITE_API_KEY }
    });
    const nfcData = await nfcResponse.json();
    const token = nfcData?.token;

    if (!token) {
      throw new Error("No token returned from NFC data");
    }

    const checkFirst = await fetch(`${apiUrl}/acc/relogin`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_API_KEY
      },
      body: JSON.stringify({ token })
    });
    const resultCheck = await checkFirst.json();
    if (resultCheck.success) {
      navigate('/Intermediary', { state: { hasLogged: true }});
      return;      
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

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("NFC Login Error:", error.message);
    return { success: false, error: error.message };
  }
}

export async function signIn(email, password, navigate) {
  try {
    // console.log(email, password);
    const checkFirst = await fetch(`${apiUrl}/acc/relogin`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_API_KEY
      },
      body: JSON.stringify({ email, password })
    });
    const resultCheck = await checkFirst.json();
    if (resultCheck.success) {
      navigate('/Intermediary', { state: { hasLogged: true }});
      return;      
    }

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
    if (!result.success) {
      alert(result.error, result.details);
    }

    if (result.success) {
      alert("Welcome!, " + (result.user_firstname || result.staff_firstname));
      if (result.role === "staff"){
        navigate("/AdminPage");
      }
      if (result.role === "user"){
        navigate("/Services", { state: { loggedIn: true } });
      }

    } else if (result.success === false && result.message === "Email is not verified") {
      alert(result.message + " Please wait");

      const resendOTP = await fetch(`${apiUrl}/acc/send-otp`, {
        method: "POST",
        credentials: "include",
        headers: { 
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_API_KEY },
        body: JSON.stringify({ email })
      });

      const resultResend = await resendOTP.json();
      alert("Check your Email for the OTP");

      if (resultResend.success) {
        navigate(`/OtpForm`, { state: { email, resetPass: false } });
      }
    }
  } catch (error) {
    console.log(error);
  }
}