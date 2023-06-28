import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../service/firebase";
import uuid from "react-uuid";

import { styled } from "styled-components";

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
  height: 300px;
`;

const StDiv = styled.div`
  width: 650px;
  height: 500px;
  z-index: 9999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 8px;
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

// const PostBtn = styled.button`
//   height: 50px;
//   width: 200px;
// `;

function Post() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
      });
    };
    fetchData();
  }, []);

  // const posts = useSelector((state) => {
  //   console.log(state.posts);
  //   return state.posts;
  // });

  // 글쓰기 모달창 열기
  const postModalHandler = () => {
    setOpen(!open);
  };

  // db에 값 저장
  const handlePostSubmit = async (event) => {
    event.preventDefault();
    setOpen(false);
    const newPost = {
      CID: uuid(),
      title: title,
      body: body,
      createdAt: new Date(),
    };
    try {
      const docRef = await addDoc(collection(db, "posts"), newPost);
      console.log("Post added with ID: ", docRef.id);
      setTitle("");
      setBody("");
    } catch (error) {
      console.error("Error adding post: ", error);
    }
    window.location.reload();
  };
  return (
    <>
      <BcDiv open={open} onClick={postModalHandler}>
        <StDiv onClick={(e) => e.stopPropagation()}>
          <h1>글 작성하기</h1>
          <form>
            <p>
              <TitleInput
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력해주세요."
              />
            </p>
            <p>
              <BodyInput
                type="text"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="내용을 입력해주세요."
              />
            </p>
            <button onClick={handlePostSubmit}>등록</button>
          </form>
          <Stbtn onClick={postModalHandler}>x</Stbtn>
        </StDiv>
      </BcDiv>
      <button
        style={{
          width: "200px",
          height: "50px",
          marginTop: "300px",
        }}
        onClick={postModalHandler}
      >
        글쓰기버튼
      </button>
    </>
  );
}

export default Post;
