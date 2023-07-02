import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../service/firebase";
import { useNavigate } from "react-router-dom";
import MainBtnFunc from "./MainBtnFunc";
import google from "../img/google.png";
import { useSelector } from "react-redux";
import { FaSistrix } from "react-icons/fa";

const AllContents = styled.div``;

const Form = styled.form`
  display: flex;
  border: none;
  width: 98%;
  border-radius: 25px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.3);
  padding: 3px 10px;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  margin: 0px auto 40px auto;
`;

const Input = styled.input`
  border: none;
  border-radius: 20px;
  width: 100%;
  height: 30px;
  outline: none;
  padding-left: 10px;
`;
const Main = styled.main`
  margin-bottom: 36px;
`;
const MainInner = styled.div`
  margin-bottom: 20px;
  border-radius: 14px;
  background: #fff;
`;
const MainUser = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
  cursor: pointer;
`;
const UserImg = styled.img`
  width: 38px;
  border-radius: 25px;
`;
const User = styled.h3`
  font-size: 18px;
  font-weight: 500;
  letter-spacing: -1px;
`;
const ContentsBox = styled.div`
  padding: 16px 20px 26px 20px;
  cursor: pointer;
  cursor: pointer;
`;

const PostTitle = styled.h2`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 26px;
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
    }
    if (clicksubcategory) {
      console.log(clicksubcategory);
      filteredPosts = filteredPosts.filter(
        (post) => post.subcategory === clicksubcategory
      );

      if (clicksubcategory === "처음으로") {
        return posts;
      }
    }

    return filteredPosts;
  };

  const preventDefault = (event) => {
    event.preventDefault();
  };

  //무한스크롤 부분 기능은 구현했으나 아이콘버튼과의 연동 에러로 주석처리
  // const [data, setData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  // const fetchData = async () => {
  //   try {
  //     setIsLoading(true);
  //     const querySnapshot = await getDocs(collection(db, "posts"));
  //     const fetchedData = querySnapshot.docs.map((doc) => doc.data());
  //     setData((prevData) => [...prevData, ...fetchedData]);
  //     setIsLoading(false);
  //     console.log(data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (
  //       window.innerHeight + window.scrollY >= document.body.offsetHeight &&
  //       !isLoading
  //     ) {
  //       fetchData();
  //     }
  //   };

  //   console.log("얼마나 실행되지?");

  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [isLoading]); // isLoading을 의존성으로 포함

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <AllContents>
      <Form onSubmit={handleSearch}>
        <Input
          type="text"
          placeholder="검색 가능합니다."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" onClick={preventDefault}>
          <FaSistrix size="20" color="gray" />
        </button>
      </Form>
      <div style={{ width: "650px" }}>
        {filterPosts().map((post) => {
          return (
            <Main key={post.CID}>
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
              <MainInner>
                <ContentsBox
                  onClick={() => {
                    navigate(`/detail/${post.id}`);
                  }}
                >
                  <PostTitle>{post.title}</PostTitle>
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
