import React, { useState } from "react";
import { uploadProfilePicture } from "../Services/FileService";
import classes from "../CSS-Folder/FileUpload.module.css";
import { useNavigate } from "react-router-dom";

function ImageUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadedPath, setUploadedPath] = useState(null); // <-- new
  const navigate = useNavigate();

  const storedUser = JSON.parse(sessionStorage.getItem("userInfo") || "{}");
  const role = storedUser.role;
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
  if (!file) {
    alert("Please select a file first!");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("role", role);

  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  try {
    const result = await uploadProfilePicture(formData, storedUser.role);

    if (result && result.success) {
      console.log("Upload success:", result?.url);
      alert("Upload Success!");
      window.location.reload();
      setUploadedPath(result.path);
    } else {
      console.error("Upload failed:", result?.message || "Unknown error");
    }
  } catch (error) {
    console.error("Error uploading file:", error);
  }};


  return (
    <div>
      <h2>Profile Picture</h2>
      <div className={classes.ProfileContainer}>
        <div className={classes.ImageContainer}>
          {preview && (
            <img
              src={preview}
              alt="preview"
              className={classes.UploadedImage}
            />
          )}

          {uploadedPath && (
            <img
              src={`${import.meta.env.VITE_API_URL}${uploadedPath}`}
              alt="uploaded"
              className={classes.UploadedImage}
            />
          )}
        </div>

        <div className={classes.InputButtonContainer}>
          <label className={classes.custominput}>
            Choose File
            <input
              className={classes.UploadImage}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
          <button className={classes.UploadButton} onClick={handleUpload}>
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageUpload;
