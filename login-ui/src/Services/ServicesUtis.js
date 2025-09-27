const apiUrl = import.meta.env.VITE_API_URL;

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
