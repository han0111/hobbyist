import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import TopBar from "../components/TopBar";
import { collection, getDocs, query, updateDoc, doc } from "firebase/firestore";
import { db } from "../service/firebase";

const DetailContainer = styled.div`
  margin-top: 100px;
  background-color: #d9d9d9;
  padding: 30px;

  box-shadow: 0px 1px 5px gray;
`;

const ContentHeader = styled.div`
  display: flex;
  /* flex-position: row; */
  flex-direction: row;
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

const ContentImage = styled.div`
  /* background-color: gray; */

  height: 600px;
  width: 100%;

  margin-bottom: 10px;

  background-image: url("https://cdn.pixabay.com/photo/2015/09/02/12/30/hiker-918473_640.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const ContentFunc = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-bottom: 10px;
`;

const LikeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-bottom: 10px;
`;

const Likecount = styled.div`
  font-size: 25px;
  font-weight: bold;

  padding-top: 10px;
`;

const LikeButton = styled.button`
  border: 0;
  background-color: transparent;

  /* ${(props) =>
    props.isLike
      ? `
      background-image: url("https://img.icons8.com/?size=1x&id=16424&format=png");

    `
      : `
    
      background-image: url("https://img.icons8.com/?size=1x&id=581&format=png");
    `}; */

  background-image: url("https://img.icons8.com/?size=1x&id=581&format=png");
  /* background-image: url("https://img.icons8.com/?size=1x&id=16424&format=png"); */
  font-size: 50px;

  width: 50px;
  height: 50px;

  transition: opacity 0.3s ease;

  cursor: pointer;
`;

const BookButton = styled.button`
  border: 0;
  background-color: transparent;

  /* ${(props) =>
    props.isBooked
      ? `
      background-image: url("https://img.icons8.com/?size=1x&id=26083&format=png");  
    `
      : `
    
    background-image: url("https://img.icons8.com/?size=1x&id=25157&format=png");
    `}; */

  background-image: url("https://img.icons8.com/?size=1x&id=25157&format=png");
  /* background-image: url("https://img.icons8.com/?size=1x&id=26083&format=png") */
  font-size: 25px;

  height: 50px;
  width: 50px;

  margin-left: 20px;

  cursor: pointer;
`;

const ShareButton = styled.button`
  border: 0;
  background-color: transparent;

  margin-left: auto;

  height: 50px;

  font-size: 20px;
  font-weight: bold;
`;

const ContentBody = styled.p`
  margin-bottom: 20px;

  height: 150px;

  font-size: 20px;
`;

const CommentTitle = styled.div`
  font-size: 25px;
  font-weight: bold;
`;

const CommentBody = styled.div`
  margin-bottom: 20px;
  padding: 10px;

  font-size: 20px;

  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CommentContainer = styled.div``;

const CommentLike = styled.button`
  border: 0;
  background-color: transparent;
  background-image: url("https://img.icons8.com/?size=1x&id=581&format=png");
  /* https://img.icons8.com/?size=1x&id=16424&format=png */
  background-size: cover;

  font-size: 30px;

  width: 30px;
  height: 30px;

  margin-left: auto;
`;

function Detail() {
  const [contents, setContents] = useState([]);

  // 왜 안돼?
  // 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      // collection 이름이 todos인 collection의 모든 document를 가져옵니다.
      const q = query(collection(db, "contents"));
      const querySnapshot = await getDocs(q);

      const initialContents = [];

      // document의 id와 데이터를 initialTodos에 저장합니다.
      // doc.id의 경우 따로 지정하지 않는 한 자동으로 생성되는 id입니다.
      // doc.data()를 실행하면 해당 document의 데이터를 가져올 수 있습니다.
      querySnapshot.forEach((doc) => {
        initialContents.push({ id: doc.id, ...doc.data() });
      });

      setContents(initialContents);
    };

    fetchData();
  }, []);

  console.log(contents);

  const [content] = contents.filter((content) => content.id === "content");
  console.log(content);

  // Like update
  const updateLike = async (event) => {
    const contentRef = doc(db, "contents", "content");
    await updateDoc(contentRef, { isLike: !content.isLike });
  };

  // 북마크 update
  const updateBooked = async (event) => {
    const contentRef = doc(db, "contents", "content");
    await updateDoc(contentRef, { isBooked: !content.isBooked });
  };

  return (
    <>
      <TopBar />
      <DetailContainer>
        <div>
          <ContentHeader>
            <ProfileImage></ProfileImage>
            <ProfileName>User</ProfileName>
          </ContentHeader>
          <ContentImage></ContentImage>
          <ContentFunc>
            <LikeContainer>
              <LikeButton
                onClick={updateLike}
                // isLike={content.isLike}
              ></LikeButton>
              {/* <Likecount>{content.likeCount}</Likecount> */}
            </LikeContainer>
            <BookButton
              onClick={updateBooked}
              // isBooked={content.isBooked}
            ></BookButton>
            <ShareButton>공유하기</ShareButton>
          </ContentFunc>
          <ContentBody>나 여기 다녀왔어!</ContentBody>
        </div>
        <CommentContainer>
          <CommentTitle>댓글</CommentTitle>

          <CommentBody>
            <span>아이디</span>
            <p>댓글</p>
            <CommentLike></CommentLike>
          </CommentBody>
        </CommentContainer>
      </DetailContainer>
    </>
  );
}

// 좋아요 버튼
// isActive ? 채워진 하트 : 빈하트

// 좋아요 수
// 데이터 불러오기 > count+1 > 데이터 베이스 > 데이터 불러오기

// 북마크
// isBooked ? 채워진 북마크 : 빈 북마크

export default Detail;
