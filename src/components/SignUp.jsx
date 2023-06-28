import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import {
  Label,
  Input,
  Button,
  ModalContainer,
  ModalContainerModal2,
  CancelBtn,
  SubmitBtn,
  TopButton,
  StH2,
} from "./styledcomponents/Styled";

function SignUp() {
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifypassword, setVerifyPassword] = useState("");

  const auth = getAuth();

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const SignUpBtnHandler = () => {
    setIsModalOpen2(true);
  };

  const CancelBtnHandler = () => {
    setIsModalOpen2(false);
    setEmail("");
    setPassword("");
    setVerifyPassword("");
  };

  const SubmitBtnHandler = async (event) => {
    event.preventDefault();
    if (
      email.trim() === "" ||
      password.trim() === "" ||
      verifypassword.trim() === ""
    ) {
      alert("양식을 전부 입력해 주세요!");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      alert("가입에 성공했습니다!");
      console.log("가입 성공", userCredential.user);
      setIsModalOpen2(false); // 모달 닫기
      setEmail("");
      setPassword("");
      setVerifyPassword("");
    } catch (error) {
      alert("가입에 실패했습니다!");
      console.log("가입 실패", error.code, error.message);
    }
  };

  const verifypasswordChangeHandler = (event) => {
    setVerifyPassword(event.target.value);
  };

  const verifyEmailHandler = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <TopButton className="Sign-Up-Btn" onClick={SignUpBtnHandler}>
        회원가입
      </TopButton>
      {isModalOpen2 && (
        <ModalContainer className="Modal-Container">
          <ModalContainerModal2 className="Modal-Container-Modal2">
            <form className="Sign-Up" style={{ textAlign: "center" }}>
              <StH2>Sign Up</StH2>
              <Label className="Email-Label"></Label>
              <Input
                className="Email-Input"
                type="text"
                value={email}
                onChange={emailChangeHandler}
                placeholder="아이디 (이메일 주소)"
              />
              {/* <Button onClick={verifyEmailHandler}>중복확인</Button> */}
              {/* <Label className="Password-Label"></Label> */}
              <p>
                <Input
                  className="Password-Input"
                  type="password"
                  value={password}
                  onChange={passwordChangeHandler}
                  placeholder="비밀번호"
                />
              </p>
              {/* <Label className="Verify-Password-Label"></Label> */}
              <p>
                <Input
                  className="Verify-Password-Input"
                  type="password"
                  value={verifypassword}
                  onChange={verifypasswordChangeHandler}
                  placeholder="비밀번호 확인"
                />
              </p>
              <CancelBtn onClick={CancelBtnHandler}>x</CancelBtn>
              <SubmitBtn onClick={SubmitBtnHandler}>가입하기</SubmitBtn>
            </form>
          </ModalContainerModal2>
        </ModalContainer>
      )}
    </>
  );
}

export default SignUp;
