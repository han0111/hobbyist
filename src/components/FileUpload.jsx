import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { storage, auth } from "../service/firebase";
import React, { useState } from "react";
import { VerifyMessage } from "./styledcomponents/Styled";

function FileUpload({ setDownloadURL, resetSelectedFile }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleFileSelect = (e) => {
    setUploadComplete(false);
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

    setUploadComplete(true);
  };

  return (
    <>
      <input type="file" onChange={handleFileSelect} />
      <button onClick={handleUpload}>Upload</button>
      {!uploadComplete && (
        <VerifyMessage invalid="true">업로드 안 함</VerifyMessage>
      )}

      {uploadComplete && <VerifyMessage>업로드 완료</VerifyMessage>}
    </>
  );
}

export default FileUpload;
