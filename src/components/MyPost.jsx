import React from "react";
import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  where,
} from "firebase/firestore";

import { db } from "../service/firebase";
const EditBtn = styled.button`
  background-image: url("https://img.icons8.com/?size=1x&id=47749&format=png");
  background-size: cover;
  border: none;
  background-color: transparent;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin-left: auto;
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
function MyPost() {
  const [myPost, setMyPost] = useState([]);
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
  return (
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
            <EditBtn width="40px" height="40px"></EditBtn>
            <DeleteBtn onClick={() => PostDeleteBtn(post.CID)}></DeleteBtn>
          </ListContainer>
        ))}
    </MyContents>
  );
}
export default MyPost;
