import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";

export const ImageUploadButton = ({ onImageUpload, buffer, mode }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (buffer) {
      setPreviewUrl(`data:image/jpeg;base64,${buffer.toString("base64")}`);
    }
  }, [buffer]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile && selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
        onImageUpload(selectedFile);
      };
      reader.readAsDataURL(selectedFile);
    } 
    else {
      console.error("Invalid file type. Please select an image.");
    }
  };

  const disabled = mode === "view";
  return (
    <div>
      {previewUrl && <img src={previewUrl} alt="Preview" style={{ maxWidth: "100%", marginTop: "10px" }} />}
      <TextField disabled={disabled} type="file" onChange={handleFileChange} />
    </div>
  );
};
