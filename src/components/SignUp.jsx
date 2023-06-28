import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

import {
  Label,
  Input,
  Button,
  ModalContainer,
  ModalContainerModal2,
  CancelBtn,
  SubmitBtn,
  TopButton,
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

  //회원가입 버튼 핸들러
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
    if (password !== verifypassword) {
      alert("비밀번호가 일치하지 않습니다!");
      return;
    }

    try {
      //이메일 패스워드 받아서 회원가입 하는 코드
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      //가입 성공 시 alert 메세지 디스플레이 및 입력 필드 초기화와 모달창 닫기
      alert("가입에 성공했습니다!");
      console.log("가입에 성공했습니다", userCredential);
      setIsModalOpen2(false);
      setEmail("");
      setPassword("");
      setVerifyPassword("");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("이미 존재하는 이메일입니다.");
      } else {
        alert("가입에 실패했습니다!");
        console.log("가입 실패", error.code, error.message);
      }
    }
  };

  const verifypasswordChangeHandler = (event) => {
    setVerifyPassword(event.target.value);
  };

  const verifyEmailHandler = async (event) => {
    event.preventDefault();
    if (email.trim() === "") {
      alert("이메일을 입력해 주세요!");
      return;
    }
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length > 0) {
        // 이미 존재하는 이메일
        alert("이미 존재하는 이메일입니다.");
      } else {
        // 사용 가능한 이메일
        alert("사용할 수 있는 이메일입니다!");
      }
    } catch (error) {
      alert("이메일 확인에 실패했습니다!");
      console.log("이메일 확인 실패", error.code, error.message);
    }
  };

  return (
    <>
      <TopButton className="Sign-Up-Btn" onClick={SignUpBtnHandler}>
        회원가입
      </TopButton>
      {isModalOpen2 && (
        <ModalContainer className="Modal-Container">
          <ModalContainerModal2 className="Modal-Container-Modal2">
            <form className="Sign-Up">
              <Label className="Email-Label">이메일</Label>
              <Input
                className="Email-Input"
                type="text"
                value={email}
                onChange={emailChangeHandler}
              />
              <Button onClick={verifyEmailHandler}>이메일 확인</Button>
              <br />
              <Label className="Password-Label">비밀번호</Label>
              <Input
                className="Password-Input"
                type="password"
                value={password}
                onChange={passwordChangeHandler}
              />
              <br />
              <Label className="Verify-Password-Label">비밀번호 확인</Label>
              <Input
                className="Verify-Password-Input"
                type="password"
                value={verifypassword}
                onChange={verifypasswordChangeHandler}
              />
              <br />

              <br />
              <br />
              <CancelBtn onClick={CancelBtnHandler}>취소하기</CancelBtn>
              <SubmitBtn onClick={SubmitBtnHandler}>가입하기</SubmitBtn>
            </form>
          </ModalContainerModal2>
        </ModalContainer>
      )}
    </>
  );
}

export default SignUp;
