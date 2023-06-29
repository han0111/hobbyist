import { getDownloadURL, uploadBytes } from "firebase/storage";
import { ref } from "firebase/storage";
// import { uploadBytes } from "firebase/storage";
import { storage } from "../service/firebase";
import React from "react";
import { useState } from "react";
import { auth } from "../service/firebase";

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const imageRef = ref(
      storage,
      `${auth.currentUser.uid}/${selectedFile.name}`
    );
    await uploadBytes(imageRef, selectedFile);

    const downloadURL = await getDownloadURL(imageRef);
    console.log("downloadURL", downloadURL);
  };

  return (
    <>
      <input type="file" onChange={handleFileSelect} />
      <button onClick={handleUpload}>Upload</button>
    </>
  );
}

export default FileUpload;
