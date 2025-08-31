export async function signUp (email, password, firstName, middleName, lastName, dob, gender, contactNumber, school) {
    console.log("Signing up with:", { email, password, firstName, middleName, lastName, dob, gender, contactNumber, school });
    try {
        const response = await fetch(`http://${window.location.hostname}:3000/acc/sign-up`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password, firstName, middleName, lastName, dob, gender, contactNumber, school })
        });
        const result = await response.json();
        if (result.success) {
            console.log(result);
            alert("Success Signing up!");
        } 
    } catch (error) {
        return alert(error)
    }
}