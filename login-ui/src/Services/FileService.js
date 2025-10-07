const apiUrl = import.meta.env.VITE_API_URL;

export async function uploadProfilePicture(formData) {
  try {
    const response = await fetch(`${apiUrl}/file/profile-picture-update`, {
      method: "POST",
      credentials: "include",
      body: formData,
      headers: {
        "x-api-key": import.meta.env.VITE_API_KEY
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
}

export async function getProfilePicture(user_pfp_id) {
  try {
    const response = await fetch(`${apiUrl}/file/profile-picture/${user_pfp_id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "x-api-key": import.meta.env.VITE_API_KEY
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error(error);
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