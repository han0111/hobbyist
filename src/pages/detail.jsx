import React from "react";
import { styled } from "styled-components";

const Header = styled.header`
  background-color: #fbf0e4;

  display: flex;
  flex-direction: row;

  padding-left: 20px;
  padding-right: 20px;

  justify-content: space-between;

  box-shadow: 1px 1px 5px gray;
`;

const DetailLayout = styled.div`
  background-color: #f5f6f5;
  padding: 20px;

  max-width: 1000px;

  margin: auto;
`;

const DetailContainer = styled.div`
  background-color: #d9d9d9;
  padding: 30px;

  box-shadow: 0px 1px 5px gray;
`;

const ContentHeader = styled.div`
  display: flex;
  flex-position: row;
  align-items: center;

  margin-bottom: 20px;
`;

const ProfileImage = styled.img`
  /* background-image: ; */
  background-color: gray;
  border-radius: 70%;
  width: 100px;
  height: 100px;
  overflow: hidden;
`;

const ProfileName = styled.span`
  font-size: 30px;
  margin-left: 20px;
`;

const ContentImage = styled.img`
  /* background-color: gray; */

  height: 400px;

  margin-bottom: 10px;

  object-fit: cover;
`;

const ContentFunc = styled.div`
  display: flex;
  flex-position: row;s
  align-items: center;

  margin-bottom: 10px;
`;

const LikeContainer = styled.div`
  margin-right: 10px;
`;

const LikeButton = styled.button`
  border: 0;
  background-color: transparent;

  font-size: 30px;

  width: 40px;
  height: 40px;
`;

const BookButton = styled.button`
  border: 0;
  background-color: transparent;

  height: 50px;
`;

const ShareButton = styled.button`
  border: 0;
  background-color: transparent;

  margin-left: auto;

  height: 50px;
`;

const ContentTitle = styled.div`
  margin-bottom: 20px;
`;

const ContentBody = styled.p`
  margin-bottom: 20px;

  background-color: yellow;
  height: 150px;
`;

const CommentBody = styled.div`
  margin-bottom: 20px;
`;

const CommentContainer = styled.div`
  background-color: beige;

  display: flex;
  flex-position: row;
  align-items: center;
`;

const CommentLike = styled.button`
  border: 0;
  background-color: transparent;

  font-size: 30px;

  width: 40px;
  height: 40px;

  margin-left: auto;
`;

function Detail() {
  return (
    <DetailLayout>
      <Header>
        <h1>Hobbyist</h1>
      </Header>
      <DetailContainer>
        <div>
          <ContentHeader>
            <ProfileImage></ProfileImage>
            <ProfileName>User</ProfileName>
          </ContentHeader>
          <ContentImage
            src="https://cdn.pixabay.com/photo/2016/11/29/09/16/architecture-1868667_640.jpg"
            alt="ContentImage"
          ></ContentImage>
          <ContentFunc>
            <LikeContainer>
              <LikeButton>♥️</LikeButton>
              <span>1000</span>
            </LikeContainer>
            <BookButton>북마크</BookButton>
            <ShareButton>공유하기</ShareButton>
          </ContentFunc>
          <ContentTitle>user 작성글</ContentTitle>
          <ContentBody>나 여기 다녀왔어!</ContentBody>
        </div>
        <CommentContainer>
          <div>
            <CommentBody>댓글</CommentBody>
            <span>아이디</span>
            <span>댓글</span>
          </div>
          <CommentLike>♥️</CommentLike>
        </CommentContainer>
      </DetailContainer>
    </DetailLayout>
  );
}

export default Detail;
