import React, { useState } from "react";
import { collection, getDocs, addDoc, where, query } from "firebase/firestore";
import { db } from "../service/firebase";
import uuid from "react-uuid";
import { getAuth } from "firebase/auth";
import { styled } from "styled-components";
import { auth, storage } from "../service/firebase";
import CategorySelect from "../components/CategorySelect/CategorySelect";
import SubcategorySelect from "../components/CategorySelect/SubcategorySlect";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";

const StH1 = styled.h1`
  color: #5e5ee8;
  font-size: 20px;
  text-align: center;
`;

const BcDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  width: 100%;
  height: 100%;
  display: ${(props) => (props.open ? "block" : "none")};
`;

const TitleInput = styled.input`
  width: 400px;
  height: 30px;
  border-radius: 5px;
  padding: 10px;
  border: none;
  background-color: #f5f5f5;
`;

const BodyInput = styled.textarea`
  width: 400px;
  height: 200px;
  border-radius: 10px;
  padding: 10px;
  border: none;
  background-color: #f5f5f5;
`;

const StDiv = styled.div`
  width: 800px;
  height: 600px;
  z-index: 9999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Stbtn = styled.button`
  position: absolute;
  background-color: transparent;
  border-style: none;
  right: 10px;
  top: 10px;
  font-size: 17px;
  cursor: pointer;
`;

const StSubmitBtn = styled.button`
  background-color: #5e5ee8;
  border: none;
  border-radius: 5px;
  width: 100px;
  height: 30px;
  color: white;
  cursor: pointer;
  float: right;
  &:hover {
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }
`;

//랜덤닉네임 만드는 함수 하드코딩부분
const generateRandomNickname = () => {
  const adjectiveList = [
    "행복한 ",
    "용감한 ",
    "사나운 ",
    "최고의 ",
    "똑똑한 ",
    "섹시한 ",
  ];
  const nounList = ["홍정기", "최원장", "안동훈", "예병수", "류명한"];
  const randomAdjective =
    adjectiveList[Math.floor(Math.random() * adjectiveList.length)];
  const randomNoun = nounList[Math.floor(Math.random() * nounList.length)];
  return randomAdjective + randomNoun;
};

export { generateRandomNickname };

//셀렉트바 옵션 하드코딩 부분
const categoryOptions = [
  { value: "", label: "카테고리를 선택해주세요!" },
  { value: "경제", label: "경제" },
  { value: "애완동식물", label: "애완동.식물" },
  { value: "여행", label: "여행" },
  { value: "음악", label: "음악" },
  { value: "기타", label: "기타" },
];

const subcategoryOptions = {
  여행: [
    { value: "", label: "카테고리를 선택해주세요!" },
    { value: "국내여행", label: "국내여행" },
    { value: "해외여행", label: "해외여행" },
    { value: "기타여행", label: "기타여행" },
  ],

  음악: [
    { value: "", label: "카테고리를 선택해주세요!" },
    { value: "국내음악", label: "국내음악" },
    { value: "해외음악", label: "해외음악" },
    { value: "기타음악", label: "기타음악" },
  ],

  애완동식물: [
    { value: "", label: "카테고리를 선택해주세요!" },
    { value: "꿀팁", label: "꿀팁" },
    { value: "쇼핑", label: "쇼핑" },
    { value: "기타정보", label: "기타정보" },
  ],

  경제: [
    { value: "", label: "카테고리를 선택해주세요!" },
    { value: "주식", label: "주식" },
    { value: "가상화폐", label: "가상화폐" },
    { value: "부동산", label: "부동산" },
    { value: "기타 경제", label: "기타 경제" },
  ],

  기타: [
    { value: "", label: "카테고리를 선택해주세요!" },
    { value: "기타", label: "기타" },
  ],
};

function Post() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [, setDownloadURL] = useState(null);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    if (e) {
      e.preventDefault();
    }
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

  // 글쓰기 모달창 열기
  const postModalHandler = () => {
    !auth.currentUser ? alert("로그인 후 사용해주세요.") : setOpen(!open);

    setTitle("");
    setBody("");
    setCategory("");
    setSubcategory("");
    setDownloadURL(null);
    setSelectedFile(null);
  };

  //닉네임 가져오는 함수
  const getNickname = async (uid) => {
    console.log(uid);
    try {
      const q = query(collection(db, "users"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        return userData.nickname;
      } else {
        const randomNickname = generateRandomNickname();
        return randomNickname;
      }
    } catch (error) {
      console.error("Error getting nickname:", error);
      throw error;
    }
  };

  //img 가져오는 함수
  const getImg = async (uid) => {
    console.log(uid);
    try {
      const q = query(collection(db, "users"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        return userData.img;
      } else {
        return "https://ca.slack-edge.com/T043597JK8V-U057B2LN1NU-f07fd31753d9-512";
      }
    } catch (error) {
      console.error("Error getting nickImg:", error);
      throw error;
    }
  };

  // db에 값 저장
  const handlePostSubmit = async (event) => {
    event.preventDefault();

    const auth = getAuth();
    const currentUser = auth.currentUser;
    const uid = currentUser ? currentUser.uid : null;

    if (!uid) {
      console.error("User UID not found");
      return;
    }

    try {
      let downloadURL = "";

      if (selectedFile) {
        downloadURL = await handleUpload(); // 파일을 올렸을 경우에만 업로드 수행
      }

      const nickname = await getNickname(uid);
      const img = await getImg(uid);

      const newPost = {
        CID: uuid(),
        title,
        body,
        createdAt: new Date(),
        uid,
        nickname,
        likesByUser: { [uid]: false },
        downloadURL,
        likeCount: 0,
        img,
        category,
        subcategory,
      };

      const docRef = await addDoc(collection(db, "posts"), newPost);
      console.log("Post added with ID: ", docRef.id);
      setTitle("");
      setBody("");
      setSelectedFile(null);
      setOpen(false);
    } catch (error) {
      console.error("Error adding post: ", error);
    }
  };

  //카테고리 핸들러
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSubcategory("");
  };

  return (
    <>
      <BcDiv open={open} onClick={postModalHandler}>
        <StDiv onClick={(e) => e.stopPropagation()}>
          <form onSubmit={handlePostSubmit}>
            <StH1>글 작성하기</StH1>
            <p>
              <TitleInput
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력해주세요."
              />
            </p>
            <p>
              <CategorySelect
                value={category}
                onChange={handleCategoryChange}
                options={categoryOptions}
              />
            </p>
            {category && category !== "" && (
              <p>
                <SubcategorySelect
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                  options={subcategoryOptions[category]}
                />
              </p>
            )}
            <p>
              <BodyInput
                type="text"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="내용을 입력해주세요."
              />
            </p>
            <p>
              <input type="file" onChange={handleFileSelect} />
            </p>
            <StSubmitBtn onClick={handlePostSubmit}>등록</StSubmitBtn>
          </form>
          <Stbtn onClick={postModalHandler}>x</Stbtn>
        </StDiv>
      </BcDiv>
      <button
        style={{
          width: "220px",
          marginBottom: "18px",
          border: "none",
          padding: "13px 0px 13px",
          fontSize: "14px",
          background: "#5e5ee8",
          color: "#fff",
          borderRadius: "8px",
          fontWeight: "500",
          boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
        }}
        onClick={postModalHandler}
      >
        글 작성하기
      </button>
    </>
  );
}

export default Post;
