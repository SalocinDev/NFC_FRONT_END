export async function signUp (email, password, firstName, middleName, lastName, dob, gender, contactNumber, school, navigate) {
    console.log("Signing up with:", { email, password, firstName, middleName, lastName, dob, gender, contactNumber, school });
    try {
        const response = await fetch(`http://${window.location.hostname}:3000/acc/sign-up`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password, firstName, middleName, lastName, dob, gender, contactNumber, school })
        });
        const result = await response.json();
        if (result.success) {
            console.log(result);
            alert("Success Signing up!");
            sendOTP(email, navigate)
        } else if (!result.success && result.message === "User already registered!"){
            alert(result.message);
        }
    } catch (error) {
        return alert(error)
    }
}

export async function sendOTP(email, navigate){
    try {
        const response = await fetch(`http://${window.location.hostname}:3000/acc/send-otp`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
        });
        const result = await response.json();
        if (result.success) {
            console.log(result);
            alert("OTP Sent! Please check your email at "+ email);
            navigate(`/OtpForm?email=${email}`)
        } else if (!result.success){
            alert(result.message);
        }
    } catch (error) {
        return alert(error)
    }
}

export async function verifyOTP(email, OTP, navigate){
    try {
        const response = await fetch(`http://${window.location.hostname}:3000/acc/verify-otp`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, OTP })
        });
        const result = await response.json();
        if (result.verified) {
            console.log(result.message);
            alert("Email Verified!");
            navigate('/');
        } else if (!result.verified){
            alert(result.message);
        }
    } catch (error) {
        return alert(error)
    }
}