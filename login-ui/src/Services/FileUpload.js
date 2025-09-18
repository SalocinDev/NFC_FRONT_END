const apiUrl = import.meta.env.VITE_API_URL;

export async function uploadFile(formData) {
  try {
    console.log("Uploading:", formData);

    const response = await fetch(`${apiUrl}/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data; // <-- important: return the result
  } catch (error) {
    console.error("Upload failed:", error);
    return null; // return null so caller can handle failure
  }
}
