async function toLogin(username, password) {
    try {
      const response = await fetch("http://localhost:3000/login-verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: username, password })
      });
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Login Error:", error);
      return "Error";
    }
  }
  
  export async function handleLoginClick(navigate) {
    const name = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    const result = await toLogin(name, password);
    console.log(result);
  
    if (result.success && result.role === "admin") {
      alert("Welcome Admin!");
      navigate("/Dashboard");
    } else if (result.success && result.role === "member") {
      alert("Welcome Member!");
      navigate("/Dashboard");
    } else if (result.success === false) {
      alert("Login Failed. Try again.");
    } else if (result === "Error") {
      alert("An error occurred. Check console.");
    } else {
      alert("Unexpected server response: " + JSON.stringify(result));
    }
  }
  
  
  