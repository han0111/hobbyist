import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faHeart,
  faCommentDots,
  faShareFromSquare,
} from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../modules/comments";
import { Firestore } from "firebase/firestore";


const Main = styled.main`
  padding: 20px;
  background: #eee;
  width: 600px;
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

  // useEffect(() => {
  //   const fetchLikeCount = async () => {
  //     try {
  //       const snapshot = await Firestore.collection("").doc("").get();
  //       if (snapshot.exists) {
  //         const data = snapshot.data();
  //         setLikeCount(data.likeCount);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching like count:", error);
  //     }
  //   };
  //   fetchLikeCount();
  // }, []);

  // const handleLike = async () => {
  //   try {
  //     const snapshot = await Firestore.collection("").doc("").get();
  //     let currentCount = 0;
  //     if (snapshot.exists) {
  //       const data = snapshot.data();
  //       currentCount = data.likeCount || 0;
  //     }
  //     await Firestore
  //       .collection("")
  //       .doc("")
  //       .update({
  //         likeCount: currentCount + 1,
  //       });

  //     setLikeCount(currentCount + 1);
  //   } catch (error) {
  //     console.error("Error updating like count:", error);
  //   }
  // };

  const disPatch = useDispatch();

  const comments = useSelector((state) => {
    return state.comments;
  });

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
              <p
                style={{
                  padding: "16px 0px 0px 0px",
                }}
              >
                {item.comment}
              </p>
            );
          })}

          <FunctionUl>
            <li>
              <IconSpan>
                <FontAwesomeIcon icon={faHeart} onClick={() => {}} />
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
          <CommentForm
            onSubmit={(event) => {
              event.preventDefault();
              const newComment = {
                id: 5,
                comment: comment,
              };
              disPatch(addComment(newComment));
              setComment("");
            }}
          >
            <CommentInput
              value={comment}
              onChange={(event) => {
                setComment(event.target.value);
              }}
            ></CommentInput>
            <CommentButton>쓰기</CommentButton>
          </CommentForm>
        </ContentsBox>
      </MainInner>
    </Main>
  );
}

export default Contents;
