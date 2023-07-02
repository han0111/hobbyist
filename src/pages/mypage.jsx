import React, { useState, useRef } from "react";
import TopBar from "../components/TopBar";
import { styled } from "styled-components";
import Profile from "../components/Profile";
import MyPost from "../components/MyPost";
import BookedPost from "../components/BookedPost";

const MypageLayout = styled.div`
  padding: 30px;
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 90%;
  margin: 0 auto;
`;

const MyContents = styled.div`
  button {
    &:first-child {
      margin-right: 5px;
    }
  }
  width: 50%;
  height: 90%;
`;

const MyButton = styled.button`
  width: 150px;
  height: 36px;
  font-size: 13px;
  border-radius: 7px;
  font-weight: ${({ active }) => (active ? "400" : "600")};
  border: solid 1px #c5c5c5;
  color: ${({ active }) => (active ? "#fff" : "#111")};
  background-color: ${({ active }) => (active ? "rgb(94, 94, 232)" : "#fff")};
  margin-bottom: 8px;
  cursor: pointer;
`;

function Mypage() {
  const [isActive, setIsActive] = useState(false);

  const handleButtonClick = () => {
    setIsActive(!isActive);
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
          {(myPost.active = isActive ? <MyPost /> : <BookedPost />)}
        </MyContents>
      </MypageLayout>
    </div>
  );
}

export default Mypage;
