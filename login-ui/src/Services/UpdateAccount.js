const apiUrl = import.meta.env.VITE_API_URL;

// Update account details
export async function updateAccount(email, updates, navigate) {
  try {
    console.log(email);
    
    const response = await fetch(`${apiUrl}/acc/update`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, ...updates }),
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.message || "Account update failed.");
      return { success: false, ...result };
    }

    alert(result.message || "Account updated successfully!");
    sessionStorage.setItem("userInfo", JSON.stringify(result.user || {}));

    return { success: true, ...result };
  } catch (err) {
    console.error("Update Account Error:", err);
    alert("An error occurred while updating account.");
    return { success: false, error: err };
  }
}


export async function updateAddress(updatedAddress, navigate) {
  try {
    const response = await fetch(`${apiUrl}/acc/update-address`, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAddress),
    });

    const result = await response.json();

    if (!response.ok) {
        alert(result.message || "Address update failed.");
        return { success: false, ...result };
    }

    alert(result.message || "Address updated successfully!");
    return { success: true, ...result };
  } catch (err) {
    console.error("Update Address Error:", err);
    alert("An error occurred while updating address.");
    return { success: false, error: err };
  }
}
