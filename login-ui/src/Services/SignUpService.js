const apiUrl = import.meta.env.VITE_API_URL;

export async function signUp (email, password, firstName, middleName, lastName, dob, gender, contactNumber, school, navigate) {
    /* console.log("Signing up with:", { email, password, firstName, middleName, lastName, dob, gender, contactNumber, school }); */
    alert(`Signing up with:, ${email}, ${firstName}, ${middleName}, ${lastName}, ${dob}, ${gender}, ${contactNumber}, ${school}`);
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
        if (!result.success && result.message === "Account already registered"){
            alert(result.message);
            return;
        }
        if (result.success) {
            console.log(result);
            alert("Success Signing up!");
            const response = sendOTP(email, navigate);

            if (!response.success) {
                alert(response.message);
                return;
            }

            if (response.success) {
                alert(response.message);
                navigate(`/OtpForm`, { state: { email, resetPass: false } });
                return;
            }
        } 
    } catch (error) {
        alert(error);
        console.log(error);
        return;
    }
}

export async function sendOTP(email){
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
        if (!result.success){
            return { success: false, message: "OTP failed to send" };
        }
        if (result.success) {
            return { success: true, message: "OTP Sent! Please check your email at "+ email };
        }
    } catch (error) {
        return { success: false, message: error.message || error}
    }
}

export async function verifyOTP(email, OTP, navigate, resetPass) {
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

        if (!result.verified) {
            alert(result.message || "Invalid OTP");
        return;
        }

        // Success case
        console.log(result.message);
        alert("Email Verified!");

        if (resetPass) {
            navigate("/ResetPasswordForm", { state: { email } });
        } else {
            navigate("/");
        }

        return result;
    } catch (error) {
        alert(error);
    }
}
