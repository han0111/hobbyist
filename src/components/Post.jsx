import React from "react";
import { useState } from "react";
import { styled } from "styled-components";
// import { useDispatch } from "react-redux";
// import uuid from "react-uuid";

const BcDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  width: 100%;
  height: 100%;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const StDiv = styled.div`
  width: 650px;
  height: 500px;
  z-index: 9999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 8px;
`;

const Stbtn = styled.button`
  position: absolute;
  background-color: transparent;
  border-style: none;
  right: 10px;
  top: 10px;
  font-size: 17px;
  cursor: pointer;
`;

function Post() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const postModalHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <BcDiv isOpen={isOpen} onClick={postModalHandler}>
        <StDiv onClick={(e) => e.stopPropagation()}>
          <h1>글 작성하기</h1>
          <form>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력해주세요."
            />
            <input
              type="text"
              value={body}
              onClick={(e) => setBody(e.target.value)}
              placeholder="내용을 입력해주세요."
            />
            <button>등록</button>
          </form>
          <Stbtn onClick={postModalHandler}>x</Stbtn>
        </StDiv>
      </BcDiv>
      <button onClick={postModalHandler}>글쓰기버튼</button>
    </>
  );
}

export default Post;
