import React from "react";
import TopBar from "../components/TopBar";
import { styled } from "styled-components";
import Profile from "../components/Profile";

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

const ProfileContainer = styled.div`
  background-color: white;
  width: 500px;
  height: 600px;

  border-radius: 20px;

  display: flex;
  align-items: center;
  flex-direction: column;

  box-shadow: 0px 1px 5px gray;
`;

const MyImg = styled.img`
  background-color: gray;
  border-radius: 70%;
  width: 250px;
  height: 250px;
  overflow: hidden;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const NameContainer = styled.div`
  padding-left: 10px;
  margin-bottom: 40px;
`;

const MyName = styled.span`
  font-size: 30px;
  font-weight: bold;
  margin-right: 10px;
`;

const IntroduceMe = styled.div`
  background-color: #f5f5f5;
  width: 80%;
  height: 180px;
  padding: 10px;

  display: flex;
  flex-direction: row;
`;

const EditBtn = styled.button`
  background-image: url("https://img.icons8.com/?size=1x&id=47749&format=png");
  background-size: cover;
  border: none;
  background-color: transparent;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin-left: auto;
`;

const IntroduceMent = styled.p`
  font-size: 20px;
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

const ContentImg = styled.div`
  background-image: url("https://cdn.pixabay.com/photo/2018/02/21/10/16/train-station-3169964_640.jpg");
  background-size: cover;
  margin: 20px;
  width: 30%;
  height: 90%;
`;

const ContentBody = styled.div`
  /* background-color: beige; */
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
`;

function Mypage() {
  return (
    <div>
      <TopBar />
      <MypageLayout>
        <Profile />
        <MyContents>
          <MyButton>내가 쓴 글</MyButton>
          <MyButton>북마크 한 글</MyButton>
          <ListContainer>
            <ContentImg></ContentImg>
            <ContentBody>
              <ContentTitle>제목</ContentTitle>
              <ContentMent>작성글</ContentMent>
            </ContentBody>
            <EditBtn width="40px" height="40px"></EditBtn>
            <DeleteBtn></DeleteBtn>
          </ListContainer>
          <ListContainer>
            <ContentImg></ContentImg>
            <ContentBody>
              <ContentTitle>제목</ContentTitle>
              <ContentMent>작성글</ContentMent>
            </ContentBody>
            <EditBtn width="40px" height="40px"></EditBtn>
            <DeleteBtn></DeleteBtn>
          </ListContainer>
          <ListContainer>
            <ContentImg></ContentImg>
            <ContentBody>
              <ContentTitle>제목</ContentTitle>
              <ContentMent>작성글</ContentMent>
            </ContentBody>
            <EditBtn width="40px" height="40px"></EditBtn>
            <DeleteBtn></DeleteBtn>
          </ListContainer>
          <ListContainer>
            <ContentImg></ContentImg>
            <ContentBody>
              <ContentTitle>제목</ContentTitle>
              <ContentMent>작성글</ContentMent>
            </ContentBody>
            <EditBtn width="40px" height="40px"></EditBtn>
            <DeleteBtn></DeleteBtn>
          </ListContainer>
        </MyContents>
      </MypageLayout>
    </div>
  );
}

export default Mypage;
