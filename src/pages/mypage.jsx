import React from "react";
import TopBar from "../components/TopBar";
import { styled } from "styled-components";
import Profile from "../components/Profile";
import MyPost from "../components/MyPost";

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
function Mypage() {
  return (
    <div>
      <TopBar />
      <MypageLayout>
        <Profile />
        <MyPost />
      </MypageLayout>
    </div>
  );
}

export default Mypage;
