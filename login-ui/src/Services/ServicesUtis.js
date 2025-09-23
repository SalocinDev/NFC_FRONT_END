const apiUrl = import.meta.env.VITE_API_URL;

export async function submitServices( services ) {
    try {
        const response = await fetch(`${apiUrl}/lib/user-services`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
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
