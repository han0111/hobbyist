import React from "react";
import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { auth } from "../service/firebase";
import { ref } from "firebase/storage";
import { storage } from "../service/firebase";
import { uploadBytes } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { updateDoc } from "firebase/firestore";
import CategorySelect from "../components/CategorySelect/CategorySelect";
import SubcategorySelect from "../components/CategorySelect/SubcategorySlect";
import {
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  where,
} from "firebase/firestore";

import { VerifyMessage } from "./styledcomponents/Styled";
import { db } from "../service/firebase";
const EditBtn = styled.button`
  background-image: url("https://img.icons8.com/?size=1x&id=47749&format=png");
  background-size: cover;
  border: none;
  background-color: transparent;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin-left: auto;
  cursor: pointer;
`;
const MyContents = styled.div`
  margin-left: 100px;
  width: 100%;
  height: 90%;
`;
const MyButton = styled.button`
  width: 250px;
  height: 50px;
  font-size: 20px;
  font-weight: bold;
  border: none;
  background-color: #cccccc;
  box-shadow: 0px 1px 5px gray;
`;
const ListContainer = styled.div`
  background-color: #efefea;
  height: 20%;
  padding: 10px;
  border: 0.5px solid #f5f5f5;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ContentBody = styled.div`
  margin-left: 30px;
  height: 90%;
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ContentTitle = styled.div`
  font-size: 30px;
  font-weight: bold;
`;
const ContentMent = styled.p`
  font-size: 20px;
`;
const DeleteBtn = styled.button`
  background-image: url("https://img.icons8.com/?size=1x&id=102315&format=png");
  background-size: cover;
  border: none;
  background-color: transparent;
  width: 50px;
  height: 50px;
  margin-right: 50px;
  margin-left: 20px;
  cursor: pointer;
`;

// 모달디자인

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
`;

const BodyInput = styled.input`
  width: 400px;
  height: 200px;
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

const categoryOptions = [
  { value: "", label: "카테고리를 선택해주세요!" },
  { value: "여행", label: "여행" },
  { value: "음악", label: "음악" },
  { value: "경제", label: "경제" },
  { value: "스포츠", label: "스포츠" },
  { value: "영화", label: "영화" },
  { value: "게임", label: "게임" },
  { value: "기타", label: "기타" },
];

const subcategoryOptions = {
  여행: [
    { value: "", label: "카테고리를 선택해주세요!" },
    { value: "국내여행", label: "국내여행" },
    { value: "해외여행", label: "해외여행" },
    { value: "기타여향", label: "기타여행" },
  ],

  음악: [
    { value: "", label: "카테고리를 선택해주세요!" },
    { value: "국내음악", label: "국내음악" },
    { value: "해외음악", label: "해외음악" },
    { value: "기타음악", label: "기타음악" },
  ],

  경제: [
    { value: "", label: "카테고리를 선택해주세요!" },
    { value: "주식", label: "주식" },
    { value: "가상화폐", label: "가상화폐" },
    { value: "부동산", label: "부동산" },
    { value: "기타 경제", label: "기타 경제" },
  ],

  스포츠: [
    { value: "", label: "카테고리를 선택해주세요!" },
    { value: "축구", label: "축구" },
    { value: "야구", label: "야구" },
    { value: "농구", label: "농구" },
    { value: "기타 스포츠", label: "기타 스포츠" },
  ],

  영화: [
    { value: "", label: "카테고리를 선택해주세요!" },
    { value: "국내영화", label: "국내영화" },
    { value: "해외영화", label: "해외영화" },
    { value: "기타영화", label: "기타영화" },
  ],

  게임: [
    { value: "", label: "카테고리를 선택해주세요!" },
    { value: "온라인게임", label: "온라인게임" },
    { value: "콘솔게임", label: "콘솔게임" },
    { value: "기타게임", label: "기타게임" },
  ],

  기타: [
    { value: "", label: "카테고리를 선택해주세요!" },
    { value: "기타", label: "기타" },
  ],
};

function MyPost() {
  const [myPost, setMyPost] = useState([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [downloadURL, setDownloadURL] = useState(null);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");

  const params = useParams();
  const fetchMyposts = async () => {
    try {
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const fetchedPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMyPost(fetchedPosts);
      console.log(fetchedPosts);
    } catch (error) {
      console.error("Error fetching MyPosts:", error);
    }
  };
  const PostDeleteBtn = async (CID) => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "posts"), where("CID", "==", CID))
      );
      const deletePost = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
      await Promise.all(deletePost);
      fetchMyposts();
    } catch (error) {
      console.error("포스트 삭제 오류:", error);
    }
  };
  useEffect(() => {
    fetchMyposts();
  }, []);

  const handleFileSelect = (e) => {
    setUploadComplete(false);
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

    setUploadComplete(true);
  };

  // 글 수정

  const handlePostEdit = async (CID, downloadURL) => {
    await handleUpload();
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "posts"), where("CID", "==", CID))
      );
      querySnapshot.forEach(async (doc) => {
        await updateDoc(doc.ref, {
          title,
          body,
          downloadURL,
          category,
          subcategory,
        });
      });
      setSelectedFile("");
      fetchMyposts();
      setOpen(!open);
      alert("수정이 완료됐습니다!");
    } catch (error) {
      console.error("프로필 수정 오류:", error);
    }
  };

  // 글쓰기 모달창 열기
  const postModalHandler = async (post) => {
    if (!auth.currentUser) {
      alert("로그인 후 사용해주세요.");
      return;
    }

    setOpen(!open);

    const thisUser = {};

    if (thisUser) {
      // 기존 게시물 값으로 입력 필드 설정
      setTitle(post.title);
      setBody(post.body);
      setCategory(post.category);
      setSubcategory(post.subcategory);
    }

    console.log("수정폼 유저데이터", thisUser);

    await fetchMyposts();
  };

  //카테고리 핸들러
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSubcategory("");
  };

  return (
    <>
      <MyContents>
        <MyButton>내가 쓴 글</MyButton>
        <MyButton>북마크 한 글</MyButton>
        {myPost
          .filter((post) => post.uid === params.id)
          .map((post) => (
            <ListContainer key={post.id}>
              <img
                style={{
                  width: "300px",
                  height: "100px",
                }}
                src={post.downloadURL}
                alt=""
              ></img>
              <ContentBody>
                <ContentTitle>{post.title}</ContentTitle>
                <ContentMent>{post.body}</ContentMent>
              </ContentBody>
              <EditBtn
                width="40px"
                height="40px"
                onClick={() => postModalHandler(post)}
              ></EditBtn>
              {/* 수정 모달창부분 */}
              <BcDiv open={open} onClick={postModalHandler}>
                <StDiv onClick={(e) => e.stopPropagation()}>
                  <form>
                    <h1>글 작성하기</h1>
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
                      <button onClick={(e) => handleUpload(e)}>Upload</button>
                      {!uploadComplete && (
                        <VerifyMessage invalid="true">
                          업로드 안 함
                        </VerifyMessage>
                      )}

                      {uploadComplete && (
                        <VerifyMessage>업로드 완료</VerifyMessage>
                      )}
                    </p>
                    <button
                      onClick={(event) => {
                        event.preventDefault(); // 기본 동작인 새로고침을 막음
                        handlePostEdit(post.CID, downloadURL);
                      }}
                    >
                      수정
                    </button>
                  </form>
                  <Stbtn onClick={postModalHandler}>x</Stbtn>
                </StDiv>
              </BcDiv>
              {/* 수정모달창부분 */}
              <DeleteBtn onClick={() => PostDeleteBtn(post.CID)}></DeleteBtn>
            </ListContainer>
          ))}
      </MyContents>
    </>
  );
}
export default MyPost;
