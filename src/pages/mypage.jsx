import React, { useState, useRef } from "react";
import TopBar from "../components/TopBar";
import { styled } from "styled-components";
import Profile from "../components/Profile";
import MyPost from "../components/MyPost";
import BookedPost from "../components/BookedPost";

const MypageLayout = styled.div`
  margin-top: 100px;
  background-color: #d9d9d9;
  padding: 30px;
  box-shadow: 0px 1px 5px gray;

  display: flex;
  flex-direction: row;

  height: 1000px;

  overflow: hidden;
`;

const MyContents = styled.div`
  /* background-color: gray; */
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
  background-color: ${({ active }) => (active ? "#B8B8B8" : "#cccccc")};
  box-shadow: ${({ active }) =>
    active ? "0px 1px 3px gray" : "0px 1px 5px gray;"};
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
