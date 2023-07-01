import React from "react";
import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import { db } from "../service/firebase";

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

function BookedPost() {
  const [bookPost, setBookPost] = useState([]);
  const params = useParams();

  const navigate = useNavigate();

  const fetchBookposts = async () => {
    try {
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      const fetchedPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBookPost(fetchedPosts);
      console.log(fetchedPosts);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchBookposts();
  }, []);

  return (
    <MyContents>
      {bookPost
        .filter(
          (post) =>
            post && post.bookedByUsers && params.id in post.bookedByUsers
        )
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
              <ContentTitle
                onClick={() => {
                  navigate(`/detail/${post.id}`);
                }}
              >
                {post.title}
              </ContentTitle>
              <ContentMent>{post.body}</ContentMent>
            </ContentBody>
          </ListContainer>
        ))}
    </MyContents>
  );
}

export default BookedPost;
