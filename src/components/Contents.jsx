import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import TopBar from "./TopBar";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../service/firebase";
import { useNavigate } from "react-router-dom";
import MainBtnFunc from "./MainBtnFunc";
import google from "../img/google.png";

const AllContents = styled.div`
  margin-left: 200px;
`;

const Main = styled.main`
  padding: 20px;
  background: #eee;
  width: 600px;
  margin-top: 150px;
  margin-left: 100px;
  border-radius: 20px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;
const MainInner = styled.div`
  margin-bottom: 20px;
`;
const MainUser = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 0px;
  cursor: pointer;
`;
const UserImg = styled.img`
  width: 48px;
`;
const User = styled.h3`
  font-size: 25px;
  font-weight: 600;
  letter-spacing: -1px;
`;
const ContentsBox = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  cursor: pointer;
`;

function Contents() {
  const [, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [, setUsers] = useState();
  const [searchQuery, setSearchQuery] = useState("");

  //db에서 유저 데이터 불러오는 함수
  const fetchUsers = async () => {
    try {
      const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      const fetchedUsers = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUsers(fetchedUsers);
      console.log(fetchedUsers);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // DB에서 저장된 값 불러오는 부분과 재렌더링
  const fetchComments = async () => {
    try {
      const q = query(collection(db, "Comments"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const fetchedComments = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(fetchedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  useEffect(() => {
    fetchComments();
  }, []);

  // DB에서 저장된 포스트를 불러오는 함수
  const fetchPosts = async () => {
    try {
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));

      const querySnapshot = await getDocs(q);
      const fetchedPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    console.log("피드데이터 호출");
    fetchPosts();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const navigate = useNavigate();

  const filterPosts = () => {
    if (searchQuery) {
      return posts.filter((post) => post.title.includes(searchQuery));
    } else {
      return posts;
    }
  };

  return (
    <AllContents>
      <TopBar onSearch={handleSearch} />
      <div style={{ width: "650px" }}>
        {filterPosts().map((post) => {
          return (
            <Main key={post.CID}>
              <MainInner>
                <MainUser
                  onClick={() => {
                    navigate(`/mypage/${post.uid}`);
                  }}
                >
                  <div
                    style={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "70%",
                      overflow: "hidden",
                    }}
                  >
                    <UserImg src={post.img ? post.img : google} alt="" />
                  </div>
                  <User>{post.nickname}</User>
                </MainUser>
                <ContentsBox
                  onClick={() => {
                    navigate(`/detail/${post.id}`);
                  }}
                >
                  <h2>{post.title}</h2>
                  <img
                    style={{
                      width: "100%",
                    }}
                    src={post.downloadURL}
                    alt=""
                  />
                  <span>{post.body}</span>
                </ContentsBox>

                <MainBtnFunc id={post.id} />
              </MainInner>
            </Main>
          );
        })}
      </div>
    </AllContents>
  );
}
export default Contents;
