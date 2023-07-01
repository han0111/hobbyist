import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { storage, auth } from "../service/firebase";
import React, { useState } from "react";

function FileUpload({ setDownloadURL }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("파일을 선택해주세요.");
      return;
    }

    const imageRef = ref(
      storage,
      `${auth.currentUser.uid}/${selectedFile.name}`
    );
    await uploadBytes(imageRef, selectedFile);

    const downloadURL = await getDownloadURL(imageRef);
    console.log("downloadURL", downloadURL);

    setDownloadURL(downloadURL);
    return downloadURL;
  };

  return (
    <>
      <input type="file" onChange={handleFileSelect} />
      <button onClick={handleUpload}>Upload</button>
    </>
  );
}

export default FileUpload;
