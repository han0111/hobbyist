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
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 15px;
  height: 20%;
  padding: 15px;
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
  justify-content: center;
`;

const ContentTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  cursor: pointer;
`;

const ContentMent = styled.p`
  font-size: 14px;
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
                width: "240px",
                height: "80px",
              }}
              src={post.downloadURL ? post.downloadURL : null}
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
