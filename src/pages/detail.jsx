import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import uuid from "react-uuid";
import TopBar from "../components/TopBar";
import ButtonFunc from "../components/ButtonFunc";
import { useParams, useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  addDoc,
  orderBy,
  updateDoc,
  deleteDoc,
  where,
} from "firebase/firestore";
import { db } from "../service/firebase";
import { getAuth } from "firebase/auth";

const Browser = styled.div`
  aspect-ratio: 1/1;
  width: 100%;
`;

const Browser = styled.div`
  aspect-ratio: 2/1;
  width: 100%;
  height: 100%;
`;

const DetailContainer = styled.div`
  margin-top: 100px;
  background-color: #d9d9d9;
  padding: 30px;
  box-shadow: 0px 1px 5px gray;
  width: 65%;
  border-radius: 2%;
  display: flex;
  flex-direction: column;
  margin: 150px 20% 10px 15%;
`;
const ContentHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ProfileGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ProfileImage = styled.img`
  /* background-image: ; */
  background-color: gray;
  border-radius: 70%;
  width: 80px;
  height: 80px;
  overflow: hidden;
`;
const ProfileName = styled.span`
  font-size: 30px;
  margin-left: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  margin-left: 10px;
`;


const ContentImage = styled.div`
  background-color: white;
  height: 500px;
  width: 100%;
  margin-bottom: 10px;
  background-image: ${(props) => `url(${props.backgroundimg})`};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 20px;
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
  const [comments, setComments] = useState([]);
  const [editCommentId, setEditCommentId] = useState("");
  const [editedComment, setEditedComment] = useState("");
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const [editedTitle] = useState("");
  const [editedBody] = useState("");

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
      "말미잘",
      "코린이",
      "사자",
      "외계인",
      "개발자",
      "오리",
      "호날두",
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

  // DB에서 저장된 코멘트 불러오는 부분과 재렌더링
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
        await updateDoc(doc.ref, {});
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

  //DB에서 해당하는 CID값을 가진 게시글을 삭제하는 함수
  const PostDeleteBtn = async (CID) => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "posts"), where("CID", "==", CID))
      );
      const deletePost = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));

      await Promise.all(deletePost);
      alert("피드가 삭제되었습니다!");
      fetchPosts();
      navigate(`/`);
    } catch (error) {
      console.error("포스트 삭제 오류:", error);
    }
  };

  //DB에서 해당하는 CID 값을 가진 게시글을 수정하는 함수
  const PostEditBtn = async (CID) => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "posts"), where("CID", "==", CID))
      );

      querySnapshot.forEach(async (doc) => {
        await updateDoc(doc.ref, {
          title: editedTitle,
          body: editedBody,
        });
      });

      alert("게시글이 수정 되었습니다!");
      fetchPosts();
    } catch (error) {
      console.error("포스트 수정 오류:", error);
    }
  };

  const filteredPosts = posts.filter((post) => post.id === id);
  const filteredComments = comments.filter((comment) => comment.postId === id);

  return (
    <>
      {filteredPosts.map((post) => {
        return (
          <div key={post.id}>

            <Browser>
              <TopBar />

              <DetailContainer>
                <div>
                  <ContentHeader>
                    <ProfileGroup>
                      <ProfileImage></ProfileImage>
                      <ProfileName>{post.nickname}</ProfileName>
                    </ProfileGroup>
                    <ButtonGroup>
                      <Button onClick={() => PostEditBtn(post.CID)}>
                        수정
                      </Button>
                      <Button onClick={() => PostDeleteBtn(post.CID)}>
                        삭제
                      </Button>
                    </ButtonGroup>
                  </ContentHeader>
                  <ContentImage backgroundimg={post.downloadURL}></ContentImage>
                  <ButtonFunc />
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
            </Browser>
          </div>
        );
      })}
    </>
  );
}
export default Detail;

//사진크기조절
// 백그라운드 커버말고 다른거? 모지란거 검은배경 비율지키기!

//사이드바 카테고리
