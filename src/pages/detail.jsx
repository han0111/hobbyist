import React, { useEffect, useState, useRef } from "react";
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
  ${(props) =>
    props.islike
      ? `
      background-image: url("https://img.icons8.com/?size=1x&id=16424&format=png");
    `
      : `
      background-image: url("https://img.icons8.com/?size=1x&id=581&format=png");
    `};
  /* background-image: url("https://img.icons8.com/?size=1x&id=581&format=png"); */
  /* background-image: url("https://img.icons8.com/?size=1x&id=16424&format=png"); */
  font-size: 50px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.5;
  }
`;
const BookButton = styled.button`
  border: 0;
  background-color: transparent;
  ${(props) =>
    props.isbooked
      ? `
      background-image: url("https://img.icons8.com/?size=1x&id=26083&format=png");
    `
      : `
    background-image: url("https://img.icons8.com/?size=1x&id=25157&format=png");
    `};
  /* background-image: url("https://img.icons8.com/?size=1x&id=25157&format=png"); */
  /* background-image: url("https://img.icons8.com/?size=1x&id=26083&format=png"); */
  height: 50px;
  width: 50px;
  margin-left: 20px;
  cursor: pointer;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.5;
  }
`;
const ShareButton = styled.button`
  border: 0;
  background-color: transparent;
  margin-left: auto;
  height: 50px;
  font-size: 20px;
  font-weight: bold;

  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
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

const TextArea = styled.textarea`
  position: absolute;
  width: 0px;
  height: 0px;
  bottom: 0;
  right: 0;
  opacity: 0;
`;

function Detail() {
  const [contents, setContents] = useState([]);
  const [content, setContent] = useState([]);

  // 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "contents"));
      const querySnapshot = await getDocs(q);
      const initialContents = [];
      querySnapshot.forEach((doc) => {
        initialContents.push({ id: doc.id, ...doc.data() });
      });
      setContents(initialContents);

      const contentData = initialContents.find((item) => item.id === "content");
      setContent(contentData);
    };
    fetchData();
  }, []);

  // Like update
  const updateLike = async (event) => {
    const contentRef = doc(db, "contents", "content");

    if (content.isLike) {
      // 이미 좋아요가 눌린 상태인 경우, 좋아요 취소 처리
      await updateDoc(contentRef, {
        isLike: false,
        likeCount: content.likeCount - 1,
      });
      setContent((prevContent) => ({
        ...prevContent,
        isLike: !prevContent.isLike,
        likeCount: prevContent.likeCount - 1,
      }));
    } else {
      // 좋아요가 눌리지 않은 상태인 경우, 좋아요 처리
      await updateDoc(contentRef, {
        isLike: true,
        likeCount: content.likeCount + 1,
      });
      setContent((prevContent) => ({
        ...prevContent,
        isLike: !prevContent.isLike,
        likeCount: prevContent.likeCount + 1,
      }));
    }
  };

  // 북마크 update
  const updateBooked = async (event) => {
    const contentRef = doc(db, "contents", "content");
    await updateDoc(contentRef, { isBooked: !content.isBooked });
    setContent((prevContent) => ({
      ...prevContent,
      isBooked: !prevContent.isBooked,
    }));
  };

  // url 복사
  const copyUrlRef = useRef(null);

  const copyUrl = (e) => {
    if (!document.queryCommandSupported("copy")) {
      return alert("복사 기능이 지원되지 않는 브라우저입니다.");
    }

    copyUrlRef.current.select();
    document.execCommand("copy");
    e.target.focus();

    alert("링크가 복사되었습니다.");
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
                islike={content.isLike}
              ></LikeButton>
              <Likecount>{content.likeCount}</Likecount>
            </LikeContainer>
            <BookButton
              onClick={updateBooked}
              isbooked={content.isBooked}
            ></BookButton>
            <TextArea ref={copyUrlRef} value={window.location.href}></TextArea>
            <ShareButton onClick={copyUrl}>공유하기</ShareButton>
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
