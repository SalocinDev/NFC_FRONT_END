const apiUrl = import.meta.env.VITE_API_URL;

export async function uploadProfilePicture(formData, role) {
  try {
    /* console.log("Uploading:", formData); */

    const response = await fetch(`${apiUrl}/file/profile-picture-update`, {
      method: "POST",
      body: formData, role,
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    /* console.error("Upload failed:", error); */
    return null;
  }
}

/* export async function fetchProfilePicture() {
  try {
    const response = await fetch(`${apiUrl}/file/profile-picture-fetch`, {
      method: "POST",
      credentials: "include"
    });

    if (!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
} */