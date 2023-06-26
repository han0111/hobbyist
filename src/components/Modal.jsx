import React from "react";
import { styled } from "styled-components";
import { useState } from "react";

const OpenBtn = styled.button`
  width: 150px;
  height: 40px;
  background-color: #dbdfaa;
  border-radius: 10px;
  border-style: none;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  &:hover {
    border: 1.5px solid gray;
  }
`;

const BcDiv = styled.div`
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;
  width: 100%;
  height: 100%;
  display: ${(props) => (props.isOpen2 ? "block" : "none")};
`;

const StDiv = styled.div`
  width: 550px;
  height: 400px;
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

const StForm = styled.form`
  text-align: center;
`;

const StH2 = styled.h2`
  color: #5e5ee8;
  font-size: 28px;
  padding-top: 10px;
`;

const StInput = styled.input`
  width: 250px;
  height: 40px;
  background-color: #f5f3f3;
  border-style: none;
  border-radius: 8px;
  padding-left: 15px;
`;

const StLoginBtn = styled.button`
  width: 100px;
  height: 30px;
  border-radius: 5px;
  border-style: none;
  background-color: #6969ed;
  cursor: pointer;
  color: white;
  margin-bottom: 10px;
`;

const gitBtn = styled.button`
  width: 200px;
  height: 50px;
`;

function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  const modalHandler = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div>
        <BcDiv isOpen2={isOpen} onClick={modalHandler}>
          <StDiv onClick={(e) => e.stopPropagation()}>
            <StForm>
              <StH2>LOGIN</StH2>
              <p>
                <StInput type="text" placeholder="아이디를 입력하세요." />
              </p>
              <p>
                <StInput type="password" placeholder="패스워드를 입력하세요." />
              </p>
              <StLoginBtn>로그인</StLoginBtn>
              <br />
              <button
                style={{
                  width: "250px",
                  height: "25px",
                  marginTop: "10px",
                  borderStyle: "none",
                  border: "1px solid gray",
                  backgroundColor: "white",
                }}
              >
                gitHub 계정으로 로그인
              </button>
              <br />
              <button
                style={{
                  width: "250px",
                  height: "25px",
                  marginTop: "10px",
                  borderStyle: "none",
                  border: "1px solid gray",
                  backgroundColor: "white",
                }}
              >
                구글 계정으로 로그인
              </button>
              <p>아직 회원이 아니세요?</p>
            </StForm>

            <Stbtn onClick={modalHandler}>x</Stbtn>
          </StDiv>
        </BcDiv>
        <OpenBtn onClick={modalHandler}>open modal</OpenBtn>
      </div>
    </>
  );
}

export default Modal;
