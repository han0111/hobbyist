import React, { useEffect, useState, useRef } from "react";
import { styled } from "styled-components";
import TopBar from "../components/TopBar";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../service/firebase";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
const DetailContainer = styled.div`
  margin-top: 100px;
  background-color: #d9d9d9;
  padding: 30px;
  box-shadow: 0px 1px 5px gray;
`;
const ContentHeader = styled.div`
  display: flex;
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
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState([]);
  const { id } = useParams();

  const fetchData = async () => {
    const q = query(collection(db, "posts"));
    const querySnapshot = await getDocs(q);
    const initialPosts = [];
    querySnapshot.forEach((doc) => {
      initialPosts.push({ id: doc.id, ...doc.data() });
    });
    setPosts(initialPosts);

    const postData = initialPosts.find((item) => item.id === id);
    setPost(postData);
  };

  // 데이터 가져오기
  useEffect(() => {
    fetchData();
  }, []);

  // console.log(posts);
  // console.log(id);
  // console.log(post);

  //-----------------------------------------------------------------------

  // likesByUser
  const updateLikes = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    //현재 로그인 된 아이디 알아오는 함수
    const getCurrentUserUid = () => {
      if (currentUser) {
        return currentUser.uid;
      } else {
        return null;
      }
    };

    // getCurrentUserUid();

    const postRef = doc(db, "posts", id);
    const postSnapshot = await getDoc(postRef);
    const postData = postSnapshot.data();
    const uid = getCurrentUserUid();

    if (!postData) {
      alert("피드가 존재하지 않습니다.");
      return;
    }
    const { likesByUser, likeCount } = postData;
    // console.log(postData);

    if (getCurrentUserUid() !== null) {
      if (likesByUser && likesByUser[uid]) {
        // 이미 해당 사용자가 좋아요를 누른 경우, 좋아요 취소 처리
        delete likesByUser[uid];
        await updateDoc(postRef, {
          likesByUser: { ...likesByUser },
          likeCount: likeCount - 1,
        });
      } else {
        // 해당 사용자가 좋아요를 누르지 않은 경우, 좋아요 처리
        await updateDoc(postRef, {
          likesByUser: {
            ...likesByUser,
            [uid]: true,
          },
          likeCount: likeCount + 1,
        });
      }
    } else {
      alert("로그인이 필요합니다.");
    }

    fetchData(); // 데이터 갱신
  };

  //-----------------------------------------------------------------------

  // // 북마크 update
  // const updateBooked = async (event) => {
  //   const contentRef = doc(db, "contents", "content");
  //   await updateDoc(contentRef, { isBooked: !content.isBooked });
  //   setContent((prevContent) => ({
  //     ...prevContent,
  //     isBooked: !prevContent.isBooked,
  //   }));
  // };

  // url 복사
  const copyUrlRef = useRef(null);

  const copyUrl = (e) => {
    if (!document.queryCommandSupported("copy")) {
      return alert("복사 기능이 지원되지 않는 브라우저입니다.");
    }

    copyUrlRef.current.select();
    document.execCommand("copy");

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
              <LikeButton onClick={updateLikes}></LikeButton>
              <Likecount>{post.likeCount}</Likecount>
            </LikeContainer>
            <BookButton
            // onClick={updateBooked}
            // isbooked={content.isBooked}
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

export default Detail;
