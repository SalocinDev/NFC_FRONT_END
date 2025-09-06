//////////////////////////////////////////////////////////////////////////////////////////////
async function toLogin(email, password) {
  try {
    const response = await fetch(`http://${window.location.hostname}:3000/acc/login-verify`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
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
export async function toNFClogin() {
  try {
    const nfcResponse = await fetch(`http://${window.location.hostname}:3000/nfc/read`, { credentials: "include" });
    const nfcData = await nfcResponse.json();
    const token = nfcData?.token;

    if (!token) {
      throw new Error("No token returned from NFC data");
    }

    const response = await fetch(`http://${window.location.hostname}:3000/acc/login-verify`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
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

  
export async function signIn(email, password, navigate){
  try {
    console.log(email, password);
    const response = await fetch(`http://${window.location.hostname}:3000/acc/login-verify`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: email, password: password })
    });
    const result = await response.json()
    if (result.success){
      sessionStorage.setItem("userInfo", JSON.stringify({
        firstName: result.result.user_firstname,
        userID: result.result.user_id,
    }));
      alert("Welcome!, "+ result.result.user_firstname);
      navigate("/UserPage");
    } else if (result.success === false) {
      alert("Login Failed. Try again.");
    } else if (result.result === "Error") {
      alert("An error occurred. Check console.");
    } else {
      alert(JSON.stringify(result.error));
    }
  } catch (error) {
    console.log(error);
  }
}