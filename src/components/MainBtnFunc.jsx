import React, { useEffect, useState, useRef } from "react";
import { styled } from "styled-components";
import { db } from "../service/firebase";
import { getAuth } from "firebase/auth";
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

const FunctionUl = styled.ul`
  /* background-color: yellow; */
  /* width: 100%; */
  display: flex;
  /* justify-content: space-between; */
  font-size: 25px;
  margin: 20px 15px;
  margin-left: auto;
  list-style: none;
`;

const FunctionLi = styled.li`
  margin-right: 20px;
`;

const IconSpan = styled.span`
  margin-right: 6px;
  cursor: pointer;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.5;
  }
`;

const Icon = styled.img`
  width: 35px;
  height: 35px;
`;

const Likecount = styled.span`
  font-weight: bold;
  padding-top: 10px;
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
function MainBtnFunc(props) {
  const [, setPosts] = useState([]);
  const [post, setPost] = useState([]);
  const id = props.id;

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
  const likesByUser = post && post.likesByUser;
  //id 별 좋아요 여부 확인
  const isLikedByUser = likesByUser && likesByUser[getCurrentUserUid()];

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

  const copyUrl = (postId) => {
    if (!document.queryCommandSupported("copy")) {
      return alert("복사 기능이 지원되지 않는 브라우저입니다.");
    }
    const currentUrl = window.location.href; // 현재 페이지 URL 가져오기
    const additionalPath = `detail/${id}`; // 추가할 경로

    const newUrl = currentUrl + additionalPath; // 현재 URL에 추가 경로를 붙임
    copyUrlRef.current.value = newUrl; // 복사할 URL을 참조하는 input 요소에 새로운 URL 설정

    copyUrlRef.current.select();
    document.execCommand("copy");

    alert("링크가 복사되었습니다.");
  };

  return (
    <ContentFunc>
      <FunctionUl>
        <FunctionLi>
          <IconSpan onClick={updateLikes}>
            {isLikedByUser ? (
              <Icon
                src="https://cdn-icons-png.flaticon.com/128/833/833472.png"
                alt="좋아요"
              />
            ) : (
              <Icon
                src="https://cdn-icons-png.flaticon.com/128/1077/1077035.png"
                alt="좋아요"
              />
            )}
          </IconSpan>
          <Likecount>{isNaN(post.likeCount) ? 0 : post.likeCount}</Likecount>
        </FunctionLi>
        <FunctionLi>
          <IconSpan onClick={updateBooked}>
            {isBookedByUser ? (
              <Icon
                src="https://cdn-icons-png.flaticon.com/128/709/709631.png"
                alt="북마크"
              />
            ) : (
              <Icon
                src="https://cdn-icons-png.flaticon.com/128/5662/5662990.png"
                alt="북마크"
              />
            )}
          </IconSpan>
          {/* 북마크 */}
        </FunctionLi>
        <FunctionLi>
          <IconSpan onClick={copyUrl} value={post.id}>
            <Icon
              src="https://cdn-icons-png.flaticon.com/128/2550/2550207.png"
              alt="공유하기"
            />
          </IconSpan>
          {/* 공유하기 */}
        </FunctionLi>
        <TextArea
          readOnly
          ref={copyUrlRef}
          value={window.location.href}
        ></TextArea>
      </FunctionUl>
    </ContentFunc>
  );
}

export default MainBtnFunc;
