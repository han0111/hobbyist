import React, { useEffect, useState, useRef } from "react";
import { styled } from "styled-components";
import { db } from "../service/firebase";
import { getAuth } from "firebase/auth";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";

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

const TextArea = styled.textarea`
  position: absolute;
  width: 0px;
  height: 0px;
  bottom: 0;
  right: 0;
  opacity: 0;
`;

// 데이터 가져오기
function ButtonFunc() {
  const [, setPosts] = useState([]);
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

  useEffect(() => {
    fetchData();
  }, []);

  //현재 로그인 된 아이디 알아오는 함수
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const getCurrentUserUid = () => {
    if (currentUser) {
      return currentUser.uid;
    } else {
      return null;
    }
  };

  // likesByUser
  const updateLikes = async () => {
    const postRef = doc(db, "posts", id);
    const postSnapshot = await getDoc(postRef);
    const postData = postSnapshot.data();
    const uid = getCurrentUserUid();
    const { likesByUser, likeCount } = postData;

    if (!postData) {
      alert("피드가 존재하지 않습니다.");
      return;
    }

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
  const likesByUser = post.likesByUser;
  //id 별 좋아요 여부 확인
  const isLikedByUser =
    likesByUser && likesByUser.hasOwnProperty(getCurrentUserUid());

  // BookedByUsers
  const updateBooked = async () => {
    const postRef = doc(db, "posts", id);
    const postSnapshot = await getDoc(postRef);
    const postData = postSnapshot.data();
    const uid = getCurrentUserUid();
    const { bookedByUsers } = postData;

    if (!postData) {
      alert("피드가 존재하지 않습니다.");
      return;
    }

    if (getCurrentUserUid() !== null) {
      if (bookedByUsers && bookedByUsers[uid]) {
        // 이미 해당 사용자가 북마크를 누른 경우, 북마크 취소 처리
        delete bookedByUsers[uid];
        await updateDoc(postRef, {
          bookedByUsers: { ...bookedByUsers },
        });
      } else {
        // 해당 사용자가 북마크를 누르지 않은 경우, 북마크 처리
        await updateDoc(postRef, {
          bookedByUsers: {
            ...bookedByUsers,
            [uid]: true,
          },
        });
      }
    } else {
      alert("로그인이 필요합니다.");
    }

    fetchData(); // 데이터 갱신
  };

  //id 별 북마크 여부 확인
  const bookedByUsers = post.bookedByUsers;
  const isBookedByUser =
    bookedByUsers && bookedByUsers.hasOwnProperty(getCurrentUserUid());

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
    <ContentFunc>
      <LikeContainer>
        <LikeButton onClick={updateLikes}>
          {isLikedByUser ? (
            <img
              src="https://img.icons8.com/?size=1x&id=16424&format=png"
              alt="하트 이미지"
            />
          ) : (
            <img
              src="https://img.icons8.com/?size=1x&id=581&format=png"
              alt="하트 이미지"
            />
          )}
        </LikeButton>
        <Likecount>{post.likeCount}</Likecount>
      </LikeContainer>
      <BookButton onClick={updateBooked}>
        {isBookedByUser ? (
          <img
            src="https://img.icons8.com/?size=1x&id=26083&format=png"
            alt="북마크 이미지"
          />
        ) : (
          <img
            src="https://img.icons8.com/?size=1x&id=25157&format=png"
            alt="북마크 이미지"
          />
        )}
      </BookButton>

      <TextArea
        readOnly
        ref={copyUrlRef}
        value={window.location.href}
      ></TextArea>

      <ShareButton onClick={copyUrl}>공유하기</ShareButton>
    </ContentFunc>
  );
}

export default ButtonFunc;
