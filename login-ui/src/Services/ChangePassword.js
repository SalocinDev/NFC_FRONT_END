const apiUrl = import.meta.env.VITE_API_URL;
import { sendOTP } from '../Services/SignUpService'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export async function checkEmail(email, navigate) {
    try {
        if (!email) {
            alert("No Email");
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
            alert(result.message);
            return { success: false, email };
        }

        if (result.success) {
            const response = await sendOTP(email);
            if (!response.success) {
                alert(response.message);
                return { success: false, email };
            }

            if (response.success) {
                alert(response.message);
                return { success: true, email };
            }
        }
    } catch (error) {
        alert(error);
    }
}

export async function changePassword(email, password, navigate) {
    try {
        if (!email) {
            alert("No Email");
            navigate('/');
            return;
        }
        
        if (!password) {
            alert("No Password");
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
            alert(JSON.stringify(result));
            return;
        }

        if (result.success) {
            toast.success(result.message);
            navigate(`/`);
            return;
        }
    } catch (error) {
        alert(error.message);
        console.log(error);
        return;
    }
}
