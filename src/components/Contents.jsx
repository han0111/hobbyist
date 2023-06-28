import React, { useEffect, useState } from "react";
import uuid from "react-uuid";
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faHeart,
  faCommentDots,
  faShareFromSquare,
} from "@fortawesome/free-regular-svg-icons";
import {
  Firestore,
  collection,
  getDocs,
  query,
  addDoc,
  orderBy,
  deleteDoc,
  updateDoc,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../service/firebase";
const Main = styled.main`
  padding: 20px;
  background: #eee;
  width: 600px;
  margin-top: 150px;
  margin-left: 100px;
`;

const MainInner = styled.div`
  margin-bottom: 20px;
`;
const MainUser = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 0px;
`;
const UserImg = styled.img`
  width: 48px;
`;
const User = styled.h3`
  font-size: 25px;
  font-weight: 600;
  letter-spacing: -1px;
`;
const ContentsBox = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 20px;
`;
const FunctionUl = styled.ul`
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  margin: 20px 15px;
  list-style: none;
`;
const IconSpan = styled.span`
  margin-right: 6px;
  font-size: 17px;
`;
const CommentForm = styled.form`
  position: relative;
  right: 0;
  top: 0;
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
function Contents() {
  const [comment, setComment] = useState();
  const [user] = useState(null);
  // const [user, setUser] = useState({ nickname: "익명", email: "" });
  const [likeCount, setLikeCount] = useState(false);
  const [comments, setComments] = useState([]);
  const [editCommentId, setEditCommentId] = useState("");
  const [editedComment, setEditedComment] = useState("");
  const [posts, setPosts] = useState([]);

  //닉네임을 가져오는 함수
  const getNickname = async (uid) => {
    try {
      if (!uid) {
        console.log("uid값을 찾을 수 없습니다!");
        return "익명";
      }

      const docRef = doc(db, "users", uid);
      console.log(docRef);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.nickname) {
          return data.nickname;
        } else {
          return "익명";
        }
      } else {
        throw new Error("사용자를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("Error getting nickname:", error);
    }
  };

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

  //Like 함수 부분 빼놨습니다!
  const handleLike = async () => {
    try {
      const snapshot = await Firestore.collection("").doc("").get();
      let currentCount = 0;
      if (snapshot.exists) {
        const data = snapshot.data();
        currentCount = data.likeCount || 0;
      }
      await Firestore.collection("")
        .doc("")
        .update({
          likeCount: currentCount + 1,
        });

      setLikeCount(currentCount + 1);
    } catch (error) {
      console.error("Error updating like count:", error);
    }
  };

  //입력시 DB에 저장하는 함수
  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    // 닉네임 가져오기
    const uid = user ? user.uid : null;
    const fetchedNickname = await getNickname(uid);

    const newComment = {
      CID: uuid(),
      comment: comment,
      createdAt: new Date(),
      nickname: fetchedNickname,
    };

    try {
      const docRef = await addDoc(collection(db, "Comments"), newComment);
      console.log("Comment added with ID: ", docRef.id);
      setComment("");
      fetchComments();
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
  // post 저장 부분 불러옴
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      const initialPosts = [];

      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.id,
          ...doc.data(),
        };
        initialPosts.push(data);
      });

      setPosts(initialPosts);
    };

    fetchData();
  }, []);

  return (
    <>
      {posts.map((post) => (
        <Main key={post.CID}>
          <MainInner>
            <MainUser>
              <UserImg src="images/user_img.png" alt=""></UserImg>
              <User>{post.id}</User>
            </MainUser>
            <ContentsBox>
              <h2>{post.title}</h2>
              <img
                style={{
                  width: "100%",
                }}
                src="images/test_img.png"
                alt=""
              ></img>
              <span>{post.body}</span>
              {comments.map((item) => {
                return (
                  <div key={item.CID}>
                    {editCommentId === item.CID ? (
                      <div>
                        <input
                          type="text"
                          value={editedComment}
                          onChange={(event) => {
                            setEditedComment(event.target.value);
                          }}
                        />
                        <button onClick={() => handleCommentEdit(item.CID)}>
                          완료
                        </button>
                      </div>
                    ) : (
                      <p
                        style={{
                          padding: "16px 0px 0px 0px",
                        }}
                      >
                        {item.nickname}
                        {item.comment}
                        <button onClick={() => setEditCommentId(item.CID)}>
                          수정
                        </button>
                        <button
                          onClick={() => {
                            handleCommentDelete(item.CID);
                          }}
                        >
                          삭제
                        </button>
                      </p>
                    )}
                  </div>
                );
              })}

              <FunctionUl>
                <li>
                  <IconSpan>
                    <FontAwesomeIcon icon={faHeart} onClick={handleLike} />
                  </IconSpan>
                  {likeCount}
                </li>
                <li>
                  <IconSpan>
                    <FontAwesomeIcon icon={faCommentDots} />
                  </IconSpan>
                  댓글작성
                </li>
                <li>
                  <IconSpan>
                    <FontAwesomeIcon icon={faBookmark} />
                  </IconSpan>
                  북마크
                </li>
                <li>
                  <IconSpan>
                    <FontAwesomeIcon icon={faShareFromSquare} />
                  </IconSpan>
                  공유하기
                </li>
              </FunctionUl>
              <CommentForm onSubmit={handleCommentSubmit}>
                <CommentInput
                  value={comment}
                  onChange={(event) => {
                    setComment(event.target.value);
                  }}
                />
                <CommentButton>쓰기</CommentButton>
              </CommentForm>
            </ContentsBox>
          </MainInner>
        </Main>
      ))}
    </>
  );
}

export default Contents;
