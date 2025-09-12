const apiUrl = import.meta.env.VITE_API_URL;
/* export async function getAuth() {
    try {
        const res = await fetch(`http://${window.location.hostname}:3000/api/auth`, {
            method: "POST"
        });
        const data = await res.json();
        console.log(data);
    } catch (err) {
        console.error("Error:", err);
    }
} 
    commented because not being used atm*/

export async function logOut() {
    await fetch(`${apiUrl}/acc/logout`, {
        method: "POST",
        credentials: "include"
    });
    sessionStorage.clear();
    console.log(`Session Deleted`);
}
  
/* export async function getInfo() {
    const res = await fetch(`http://${window.location.hostname}:3000/get-info`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!res.ok) {
        console.error("Failed to get session info");
        return null;
    }

    const data = await res.json();
    console.log("Session userID:", data.userID);
    return data.userID;
}
 */
export async function getSession() {
    const res = await fetch(`${apiUrl}/acc/get-session`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await res.json();
    console.log(data);
    return data
}