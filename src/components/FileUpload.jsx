import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
// import { uploadBytes } from "firebase/storage";
import { storage, auth } from "../service/firebase";
import React, { useState } from "react";

function FileUpload({ setDownloadURL }) {
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

    savePost(downloadURL);
  };

  const savePost = (downloadURL) => {
    setDownloadURL(downloadURL);
  };

  return (
    <>
      <h2>파일 업로드 컴포넌트</h2>
      <input type="file" onChange={handleFileSelect} />
      <button onClick={handleUpload}>Upload</button>
    </>
  );
}

export default FileUpload;
