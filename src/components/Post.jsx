import React from "react";
import { useState } from "react";
import { styled } from "styled-components";

const BcDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  width: 100%;
  height: 100%;
  display: ${(props) => (props.open ? "block" : "none")};
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
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const postModalHandler = () => {
    setOpen(!open);
  };

  return (
    <>
      <BcDiv open={open} onClick={postModalHandler}>
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
              onChange={(e) => setBody(e.target.value)}
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
