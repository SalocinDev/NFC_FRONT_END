export async function fetchBooks(){
    try {
        const response = await fetch(`http://${window.location.hostname}:3000/sql//get-books`);
        const result = await response.json();
        if (result){
            return { success: true, data: result };
        }
    } catch (err) {
        return { success: false, err };
    }
}