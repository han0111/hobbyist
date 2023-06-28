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
  const [likeCount, setLikeCount] = useState(false);
  const [comments, setComments] = useState([]);
  const [editCommentId, setEditCommentId] = useState("");
  const [editedComment, setEditedComment] = useState("");

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
    const newComment = {
      CID: uuid(),
      comment: comment,
      createdAt: new Date(),
    };

    try {
      const docRef = await addDoc(collection(db, "Comments"), newComment);
      console.log("Comment added with ID: ", docRef.id);
      setComment("");
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  const handleCommentEdit = async (cid) => {
    try {
      await updateDoc(doc(db, "Comments", cid), {
        comment: editedComment,
      });
      setEditCommentId("");
      setEditedComment("");
    } catch (error) {
      console.error("Error updating comment: ", error);
    }
  };

  //DB에서 값 삭제하는 함수
  const handleCommentDelete = async (CID) => {
    try {
      await deleteDoc(doc(db, "Comments", CID));
      console.log("Comment deleted with ID:", CID);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  //DB에서 저장된 값 불러오는 부분
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "Comments"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      const fetchedComments = [];

      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.id,
          ...doc.data(),
        };
        fetchedComments.push(data);
      });

      setComments(fetchedComments);
    };

    fetchData();
  }, []);

  return (
    <Main>
      <MainInner>
        <MainUser>
          <UserImg src="images/user_img.png" alt=""></UserImg>
          <User>UserName</User>
        </MainUser>
        <ContentsBox>
          <img
            style={{
              width: "100%",
            }}
            src="images/test_img.png"
            alt=""
          ></img>
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
  );
}

export default Contents;
