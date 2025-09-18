import React, { useState } from "react";
import { uploadFile } from "../Services/FileUpload";
import classes from '../CSS-Folder/FileUpload.module.css';

function ImageUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    const result = await uploadFile(formData);

    if (result && result.data) {
      console.log("Upload success:", result.data);
    } else {
      console.error("Upload failed or no data returned");
    }
  };

  return (
    <div className={classes.ProfileContainer}>
      <div className={classes.ImageContainer}>   
      {preview && <img src={preview} alt="preview" className={classes.UploadedImage}/>}
      </div>
      
      <div className={classes.InputButtonContainer}>
      <label className={classes.custominput}>
        Choose File
      <input className={classes.UploadImage} type="file" accept="image/*" onChange={handleFileChange} />
      </label>
      <button className={classes.UploadButton} onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
}

export default ImageUpload;
