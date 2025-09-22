const apiUrl = import.meta.env.VITE_API_URL;

export async function submitServices( servicesText, user_id ) {
    try {
        const response = await fetch(`${apiUrl}/lib/user-services`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ servicesText, user_id })
        })
        const result = await response.json();
        if (!result.success){
            alert("Submission Failed!");
            return { success: false }
        }
        if (result.success) {
            alert("Services Submitted");
            return { success: true }
        }
    } catch (error) {
        return;
    }
}
