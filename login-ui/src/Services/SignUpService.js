const apiUrl = import.meta.env.VITE_API_URL;
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export async function signUp (email, password, firstName, middleName, lastName, dob, gender, contactNumber, school, category, navigate) {
    /* console.log("Signing up with:", { email, password, firstName, middleName, lastName, dob, gender, contactNumber, school }); */
    // toast.success(`Signing up with:, ${email}, ${firstName}, ${middleName}, ${lastName}, ${dob}, ${gender}, ${contactNumber}, ${school}, ${category}`);
    try {
        const response = await fetch(`${apiUrl}/acc/sign-up`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": import.meta.env.VITE_API_KEY
        },
        body: JSON.stringify({ email, password, firstName, middleName, lastName, dob, gender, contactNumber, school, category })
        });
        const result = await response.json();
        if (!result.success && result.message === "Account already registered"){
            toast.error(result.message);
            return;
        }
        if (result.success) {
            // console.log(result);
            toast.success(result.message);
            toast.info(`Please wait, Sending OTP to ${email}`)
            navigate(`/OtpForm`, { state: { email, resetPass: false } });
            return;
        } 
    } catch (error) {
        toast.error(error);
        console.log(error);
        return;
    }
}

export async function adminUserRegister(email, password, firstName, middleName, lastName, dob, gender, contactNumber, school) {
    toast.success(`Signing up with:, ${email}, ${firstName}, ${middleName}, ${lastName}, ${dob}, ${gender}, ${contactNumber}, ${school}`);
    try {
        const response = await fetch(`${apiUrl}/acc/sign-up`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": import.meta.env.VITE_API_KEY
        },
        body: JSON.stringify({ email, password, firstName, middleName, lastName, dob, gender, contactNumber, school })
        });
        const result = await response.json();
        if (!result.success && result.message === "Account already registered"){
            toast.error(result.message);
            return;
        }
        if (result.success) {
            console.log(result);
            toast.success(result.message);
        } 
    } catch (error) {
        toast.error(error);
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
                "Content-Type": "application/json",
                "x-api-key": import.meta.env.VITE_API_KEY
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
        return { success: false, message: "Tite"}
    }
}

export async function verifyOTP(email, OTP, navigate, resetPass) {
    try {

        if (!OTP) {
            toast.warn("Input OTP");
            return
        }

        const response = await fetch(`${apiUrl}/acc/verify-otp`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_API_KEY
            },
            body: JSON.stringify({ email, OTP })
        });

        const result = await response.json();

        if (!result.verified) {
            toast.error(result.message || "Invalid OTP");
            return;
        }

        // Success case
        console.log(result.message);
        toast.success("Email Verified!");

        return result;
    } catch (error) {
        // toast.error(error);
    }
}
