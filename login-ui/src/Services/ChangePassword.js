const apiUrl = import.meta.env.VITE_API_URL;
import { sendOTP } from '../Services/SignUpService'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export async function checkEmail(email, navigate) {
    try {
        if (!email) {
            toast.warn("No Email");
            return { success: false, message: "No email" };
        }
        
        const response = await fetch(`${apiUrl}/acc/check-email`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": import.meta.env.VITE_API_KEY
            },
            body: JSON.stringify({ email })
        });

        const result = await response.json();
        if (!result.success) {
            toast.error(result.message);
            return { success: false, email };
        }

        if (result.success) {
            const response = await sendOTP(email);
            if (!response.success) {
                toast.error(response.message);
                return { success: false, email };
            }

            if (response.success) {
                toast.warn(response.message);
                return { success: true, email };
            }
        }
    } catch (error) {
        // toast.error(error);
    }
}

export async function changePassword(email, password, navigate) {
    try {
        if (!email || !password) {
            toast.warn("No Email");
            navigate('/');
            return;
        }

        const response = await fetch(`${apiUrl}/acc/change-password`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": import.meta.env.VITE_API_KEY
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();
        if(!result.success) {
            toast.error(JSON.stringify(result));
            return;
        }

        if (result.success) {
            toast.success(result.message);
            navigate(`/`);
            return;
        }
    } catch (error) {
        // toast.error(error.message);
        // console.log(error);
        return;
    }
}
