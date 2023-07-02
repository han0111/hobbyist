import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import { auth, db, storage } from "../service/firebase";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import CategorySelect from "../components/CategorySelect/CategorySelect";
import SubcategorySelect from "../components/CategorySelect/SubcategorySlect";
import {
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  where,
  updateDoc,
} from "firebase/firestore";

const EditBtn = styled.button`
  background-image: url("https://img.icons8.com/?size=1x&id=47749&format=png");
  background-size: cover;
  border: none;
  background-color: transparent;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin-left: auto;
  cursor: pointer;
  display: ${(props) =>
    props.currentuserid === props.params.id ? "block" : "none"};
`;
const MyContents = styled.div`
  width: 100%;
  height: 90%;
`;

const ListContainer = styled.div`
  background-color: #efefea;
  height: 20%;
  padding: 10px;
  border: 0.5px solid #f5f5f5;
  display: flex;
  flex-direction: row;
  align-items: center;
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
  cursor: pointer;
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
  display: ${(props) =>
    props.currentuserid === props.params.id ? "block" : "none"};
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

//카테고리 셀렉트바 하드코딩 부분
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

export const subcategoryOptions = {
  경제: [
    { value: "", label: "카테고리를 선택해주세요!" },
    { value: "📈 주식", label: "주식" },
    { value: "💸 가상화폐", label: "가상화폐" },
    { value: "🏡 부동산", label: "부동산" },
    { value: "🪙 기타경제", label: "기타경제" },
    { value: "🪙 전체보기", label: "전체보기" },
  ],

  애완동식물: [
    { value: "", label: "카테고리를 선택해주세요!" },
    { value: "🍯 꿀팁", label: "꿀팁" },
    { value: "💳 쇼핑", label: "쇼핑" },
    { value: "🐱 기타정보", label: "기타정보" },
    { value: "🐱 기타정보", label: "기타정보" },
  ],

  여행: [
    { value: "", label: "카테고리를 선택해주세요!" },
    { value: "🚅 국내여행", label: "국내여행" },
    { value: "🛩️ 해외여행", label: "해외여행" },
    { value: "🗺️ 기타여행", label: "기타여행" },
  ],

  음악: [
    { value: "", label: "카테고리를 선택해주세요!" },
    { value: "🇰🇷 국내음악", label: "국내음악" },
    { value: "🏳️‍🌈 해외음악", label: "해외음악" },
    { value: "🎸 기타음악", label: "기타음악" },
  ],

  기타: [
    { value: "", label: "카테고리를 선택해주세요!" },
    { value: "📱 기타", label: "기타" },
  ],
};

function MyPost() {
  const [myPost, setMyPost] = useState([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [, setDownloadURL] = useState(null);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [modalCID, setModalCID] = useState("");

  const navigate = useNavigate();

  const params = useParams();

  //피드 정보 불러오는 함수
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

  //피드 삭제 버튼 핸들러
  const PostDeleteBtn = async (CID) => {
    try {
      console.log("삭제한 피드의CID값은?", CID);
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

  // 글 수정
  const handlePostEdit = async (CID) => {
    try {
      let updatedData = {
        title,
        body,
        category,
        subcategory,
      };

      if (selectedFile) {
        const downloadURL = await handleUpload();
        updatedData.downloadURL = downloadURL;
      }

      const querySnapshot = await getDocs(
        query(collection(db, "posts"), where("CID", "==", CID))
      );

      await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          await updateDoc(doc.ref, updatedData);
        })
      );

      setSelectedFile("");
      fetchMyposts();
      setOpen(!open);
      alert("수정이 완료되었습니다!");
    } catch (error) {
      console.error("피드 수정 오류:", error);
    }
  };

  const showItsCID = (CID) => {
    console.log(`cid는 ${CID}`);
  };

  // 글쓰기 모달창 열기
  const postModalHandler = async (post) => {
    setModalCID(post.CID);
    if (!auth.currentUser) {
      alert("로그인 후 사용해주세요.");
      return;
    }

    console.log(post.CID);

    setOpen(!open);

    await fetchMyposts();
    showItsCID(post.CID);

    setTitle(post.title);
    setBody(post.body);
    setCategory(post.category);
    setSubcategory(post.subcategory);
  };

  //카테고리 핸들러
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSubcategory("");
  };

  const currentUserId = auth.currentUser.uid;
  console.log(currentUserId);

  return (
    <>
      <MyContents>
        {myPost
          .filter((post) => post.uid === params.id)
          .map((post) => (
            <ListContainer key={post.CID}>
              <img
                style={{
                  width: "300px",
                  height: "100px",
                }}
                src={post.downloadURL}
                alt=""
              ></img>
              <ContentBody>
                <ContentTitle
                  onClick={() => {
                    navigate(`/detail/${post.id}`);
                  }}
                >
                  {post.title}
                </ContentTitle>
                <ContentMent>{post.body}</ContentMent>
              </ContentBody>
              <EditBtn
                width="40px"
                height="40px"
                onClick={() => postModalHandler(post)}
                params={params}
                currentuserid={currentUserId}
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
                    </p>
                    <button
                      onClick={(event) => {
                        event.preventDefault(); // 기본 동작인 새로고침을 막음
                        handlePostEdit(modalCID);
                      }}
                    >
                      수정
                    </button>
                  </form>
                  <Stbtn onClick={postModalHandler}>x</Stbtn>
                </StDiv>
              </BcDiv>
              {/* 수정모달창부분 */}
              <DeleteBtn
                onClick={() => PostDeleteBtn(post.CID)}
                params={params}
                currentuserid={currentUserId}
              ></DeleteBtn>
            </ListContainer>
          ))}
      </MyContents>
    </>
  );
}
export default MyPost;
