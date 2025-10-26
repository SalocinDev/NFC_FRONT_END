import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const apiUrl = import.meta.env.VITE_API_URL;

export async function logOut() {
    await fetch(`${apiUrl}/acc/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_API_KEY
        },
    });
    sessionStorage.clear();
    toast.success(`Logged Out Successfully`);
}
  
export async function getSession() {
    const res = await fetch(`${apiUrl}/acc/get-session`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_API_KEY
        }
    });
    const data = await res.json();
    console.log(data);
    return data
}