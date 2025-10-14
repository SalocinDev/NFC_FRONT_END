const apiUrl = import.meta.env.VITE_API_URL;
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export async function submitServices( services ) {
    try {
        const response = await fetch(`${apiUrl}/servicelogs`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": import.meta.env.VITE_API_KEY
            },
            body: JSON.stringify({ services })
        })
        const result = await response.json();
        if (!result.success){
            toast.error("Submission Failed!");
            return { success: false }
        }
        if (result.success) {
            toast.success("Services Submitted");
            return { success: true }
        }
    } catch (error) {
        return;
    }
}
