const apiUrl = import.meta.env.VITE_API_URL;

export async function fetchBooks(){
    try {
        const response = await fetch(`${apiUrl}/lib/get-books`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
        },
        });
        const result = await response.json();
        if (result){
            return { success: true, data: result };
        }
    } catch (err) {
        return { success: false, err };
    }
}