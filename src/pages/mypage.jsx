import React, { useState, useRef, useEffect } from "react";
import TopBar from "../components/TopBar";
import { styled } from "styled-components";
import Profile from "../components/Profile";
import MyPost from "../components/MyPost";
import BookedPost from "../components/BookedPost";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../service/firebase";

const MypageLayout = styled.div`
  padding: 30px;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const MyContents = styled.div`
  button {
    &:first-child {
      margin-right: 5px;
    }
  }
  width: 60%;
  height: 90%;
`;

const MyButton = styled.button`
  width: 150px;
  height: 36px;
  font-size: 13px;
  border-radius: 7px;
  font-weight: ${({ active }) => (active ? "400" : "600")};
  border: solid 1px #c5c5c5;
  color: ${({ active }) => (active ? "#111" : "#fff")};
  background-color: ${({ active }) => (active ? "#fff" : "rgb(94, 94, 232)")};
  margin-bottom: 8px;
`;

function Mypage() {
  const [isActive, setIsActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /*auth 객체와 현재 사용자의 인증 상태를 나타내는 user 객체를 받는 함수
  onAuthStateChanged에 전달된 인증 상태가 변경될 때마다 호출 */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleButtonClick = () => {
    if (isLoggedIn) {
      setIsActive((prevIsActive) => !prevIsActive);
    } else {
      alert("로그인이 필요합니다.");
    }
  };

  const myPost = useRef(null);
  const bookedPost = useRef(null);

  return (
    <div>
      <TopBar />
      <MypageLayout>
        <Profile />

        <MyContents>
          <MyButton
            ref={myPost}
            active={isActive ? "true" : undefined}
            onClick={handleButtonClick}
          >
            내가 쓴 글
          </MyButton>
          <MyButton
            ref={bookedPost}
            active={!isActive ? "true" : undefined}
            onClick={handleButtonClick}
          >
            북마크 한 글
          </MyButton>
          {isActive ? <MyPost /> : <BookedPost />}
        </MyContents>
      </MypageLayout>
    </div>
  );
}

export default Mypage;
