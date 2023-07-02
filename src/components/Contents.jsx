import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import TopBar from "./TopBar";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../service/firebase";
import { useNavigate } from "react-router-dom";
import MainBtnFunc from "./MainBtnFunc";
import google from "../img/google.png";
import { useSelector } from "react-redux";

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
  const [posts, setPosts] = useState([]);
  const [, setUsers] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const clicksubcategory = useSelector((state) => state.subcategoryReducer);

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
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
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
    fetchPosts();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const navigate = useNavigate();

  // 검색어와 카테고리에 따라 필터링하는 함수
  const filterPosts = () => {
    let filteredPosts = posts;

    if (searchQuery) {
      filteredPosts = filteredPosts.filter((post) =>
        post.title.includes(searchQuery)
      );
    } else if (clicksubcategory) {
      console.log(clicksubcategory);
      filteredPosts = filteredPosts.filter(
        (post) => post.subcategory === clicksubcategory
      );
    }

    return filteredPosts;
  };

  //무한스크롤
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const querySnapshot = await getDocs(collection(db, "posts"));
      const fetchedData = querySnapshot.docs.map((doc) => doc.data());
      setData((prevData) => [...prevData, ...fetchedData]);
      setIsLoading(false);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        !isLoading
      ) {
        fetchData();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]); // isLoading을 의존성으로 포함

  useEffect(() => {
    fetchData();
  }, []);

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
