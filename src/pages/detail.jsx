import React, { useEffect, useState, useRef } from "react";
import { styled } from "styled-components";
import uuid from "react-uuid";
import TopBar from "../components/TopBar";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  addDoc,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../service/firebase";
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
  background-image: ${(props) => `url(${props.backgroundimg})`};
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
const ContentTitle = styled.h2``;
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
  flex-direction: column;
  align-items: left;
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

const CommentInput = styled.input`
  width: 100%;
  padding: 9px 8px;
  border-radius: 5px;
  border: none;
  outline: none;
  box-sizing: border-box;
  background: #eee;
`;

const CommentButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  padding: 8px 14px;
  border: none;
  border-radius: 0px 5px 5px 0px;
  background: #222;
  color: #fff;
`;

const CommentForm = styled.form`
  position: relative;
  right: 0;
  top: 0;
`;

function Detail() {
  const [, setContents] = useState([]);
  const [content, setContent] = useState([]);
  const [comments, setComments] = useState([]);
  const [editCommentId, setEditCommentId] = useState("");
  const [editedComment, setEditedComment] = useState("");
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("");
  const { id } = useParams();

  // 랜덤 닉네임 생성 함수
  const generateRandomNickname = () => {
    const adjectives = [
      "행복한 ",
      "용감한 ",
      "사나운 ",
      "최고의 ",
      "똑똑한 ",
      "섹시한 ",
      "슬픈 ",
      "기쁜 ",
    ];
    const nouns = [
      "호날두",
      "코린이",
      "말미잘",
      "외계인",
      "개발자",
      "오리",
      "잠자리",
      "박지성",
    ];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return adjective + noun;
  };

  // 현재 로그인 된 아이디 알아오는 함수
  const getCurrentUserUid = () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    console.log("현재 로그인 된 아이디", currentUser);
    if (currentUser) {
      return currentUser.uid;
    } else {
      console.log("로그인된 사용자가 없습니다!");
      return null;
    }
  };

  // 현재 로그인 된 이메일 알아오는 함수
  const getCurrentUserEmail = () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    console.log("현재 로그인 된 이메일", currentUser);
    if (currentUser) {
      return currentUser.email;
    } else {
      console.log("로그인된 사용자가 없습니다!");
      return null;
    }
  };

  // 닉네임 불러오는 함수
  const getNickname = async (uid, email) => {
    console.log(uid);
    try {
      const q = query(collection(db, "users"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        return userData.nickname || email;
      } else {
        const randomNickname = generateRandomNickname();
        return randomNickname;
      }
    } catch (error) {
      console.error("Error getting nickname:", error);
      throw error;
    }
  };

  //데이터 가져오는 함수
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
  // 데이터 가져오기
  useEffect(() => {
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
      fetchData();
    } else {
      // 좋아요가 눌리지 않은 상태인 경우, 좋아요 처리
      await updateDoc(contentRef, {
        isLike: true,
        likeCount: content.likeCount + 1,
      });
      fetchData();
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
    alert("링크가 복사되었습니다.");
  };

  // DB에서 저장된 포스트를 불러오는 함수
  const fetchPosts = async () => {
    try {
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const fetchedPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  // 포스트 저장 부분 불러옴
  useEffect(() => {
    fetchPosts();
  }, []);

  // DB에서 저장된 값 불러오는 부분과 재렌더링
  const fetchComments = async () => {
    try {
      const q = query(collection(db, "Comments"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      const fetchedComments = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setComments(fetchedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // 댓글 추가 함수
  const addComment = async (postId, comment) => {
    try {
      const uid = getCurrentUserUid();
      const email = getCurrentUserEmail();
      if (!uid) {
        console.error("User UID not found");
        return;
      }

      const fetchedNickname = await getNickname(uid, email);

      const newComment = {
        CID: uuid(),
        comment: comment,
        createdAt: new Date(),
        nickname: fetchedNickname,
        postId: postId,
      };

      await addDoc(collection(db, "Comments"), newComment);
      setComment(""); // 댓글 작성 후 입력 필드 비우기
      fetchComments(); // 댓글 목록 다시 불러오기
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  //DB에서 해당하는 CID값을 가진 댓글을 수정하는 함수
  const handleCommentEdit = async (CID) => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "Comments"), where("CID", "==", CID))
      );

      querySnapshot.forEach(async (doc) => {
        await updateDoc(doc.ref, {
          comment: editedComment,
        });
      });

      setEditCommentId("");
      setEditedComment("");
      fetchComments();
    } catch (error) {
      console.error("댓글 수정 오류:", error);
    }
  };

  //DB에서 해당하는 CID값을 가진 댓글을 삭제하는 함수
  const handleCommentDelete = async (CID) => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "Comments"), where("CID", "==", CID))
      );
      const deletecomment = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));

      await Promise.all(deletecomment);
      fetchComments();
    } catch (error) {
      console.error("댓글 삭제 오류:", error);
    }
  };

  const filteredPosts = posts.filter((post) => post.id === id);
  const filteredComments = comments.filter((comment) => comment.postId === id);

  return (
    <>
      {filteredPosts.map((post) => {
        return (
          <div key={post.id}>
            <TopBar />
            <DetailContainer>
              <div>
                <ContentHeader>
                  <ProfileImage></ProfileImage>
                  <ProfileName>{post.nickname}</ProfileName>
                </ContentHeader>
                <ContentImage backgroundimg={post.downloadURL}></ContentImage>
                <ContentFunc>
                  <LikeContainer>
                    <LikeButton
                      onClick={updateLike}
                      islike={content.isLike ? "true" : "false"}
                    >
                      {content.isLike ? (
                        <img
                          src="https://img.icons8.com/?size=1x&id=16424&format=png"
                          alt="좋아요"
                        />
                      ) : (
                        <img
                          src="https://img.icons8.com/?size=1x&id=581&format=png"
                          alt="좋아요 취소"
                        />
                      )}
                    </LikeButton>
                    <Likecount>{content.likeCount}</Likecount>
                  </LikeContainer>
                  <BookButton
                    onClick={updateBooked}
                    isbooked={content.isBooked ? "true" : "false"}
                  >
                    {content.isBooked ? (
                      <img
                        src="https://img.icons8.com/?size=1x&id=26083&format=png"
                        alt="북마크"
                      />
                    ) : (
                      <img
                        src="https://img.icons8.com/?size=1x&id=25157&format=png"
                        alt="북마크 해제"
                      />
                    )}
                  </BookButton>
                  <TextArea
                    ref={copyUrlRef}
                    value={window.location.href}
                    readOnly
                  ></TextArea>
                  <ShareButton onClick={copyUrl}>공유하기</ShareButton>
                </ContentFunc>
                <ContentTitle>{post.title}</ContentTitle>
                <ContentBody>{post.body}</ContentBody>
              </div>
              <CommentContainer>
                <CommentTitle>댓글</CommentTitle>
                <CommentBody>
                  {filteredComments.map((item) => {
                    return (
                      <div key={item.CID}>
                        <p>
                          <span>
                            {item.nickname}: {item.comment}
                            {editCommentId === item.CID ? (
                              <>
                                <input
                                  type="text"
                                  value={editedComment}
                                  onChange={(event) => {
                                    setEditedComment(event.target.value);
                                  }}
                                />
                                <button
                                  onClick={() => handleCommentEdit(item.CID)}
                                >
                                  완료
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => setEditCommentId(item.CID)}
                                >
                                  수정
                                </button>
                                <button
                                  onClick={() => {
                                    handleCommentDelete(item.CID);
                                  }}
                                >
                                  삭제
                                </button>
                              </>
                            )}
                            <CommentLike /> &nbsp; &nbsp;
                          </span>
                        </p>
                      </div>
                    );
                  })}
                </CommentBody>
                <CommentForm
                  onSubmit={(event) => {
                    event.preventDefault();
                    addComment(post.id, comment);
                  }}
                >
                  <CommentInput
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                  />
                  <CommentButton type="submit">쓰기</CommentButton>
                </CommentForm>
              </CommentContainer>
            </DetailContainer>
          </div>
        );
      })}
    </>
  );
}
export default Detail;
