const apiUrl = import.meta.env.VITE_API_URL;

export async function signUp (email, password, firstName, middleName, lastName, dob, gender, contactNumber, school, navigate) {
    console.log("Signing up with:", { email, password, firstName, middleName, lastName, dob, gender, contactNumber, school });
    alert(`Signing up with:, ${email}, ${password}, ${firstName}, ${middleName}, ${lastName}, ${dob}, ${gender}, ${contactNumber}, ${school}`);
    try {
        const response = await fetch(`${apiUrl}/acc/sign-up`, {
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
        } else if (!result.success && result.message === "Account already registered"){
            alert(result.message);
        }
    } catch (error) {
        alert(error);
        console.log(error);
        return
    }
}

export async function sendOTP(email, navigate){
    try {
        const response = await fetch(`${apiUrl}/acc/send-otp`, {
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
        const response = await fetch(`${apiUrl}/acc/verify-otp`, {
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