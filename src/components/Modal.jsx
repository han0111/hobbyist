import React, { useState } from "react";

function Modal() {
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifypassword, setVerifyPassword] = useState("");
  const [nickname, setNickName] = useState("");

  const openModal2 = () => {
    setIsModalOpen2(true);
  };

  const closeModal2 = () => {
    setIsModalOpen2(false);
  };

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
    setNickName("");
  };

  const SubmitBtnHandler = (event) => {
    event.preventDefault();
    if (
      email.trim() === "" ||
      password.trim() === "" ||
      verifypassword.trim() === "" ||
      nickname.trim() === ""
    ) {
      alert("양식을 전부 입력해 주세요!");
    }
  };

  const verifypasswordChangeHandler = (event) => {
    setVerifyPassword(event.target.value);
  };

  const nicknameChangeHandler = (event) => {
    setNickName(event.target.value);
  };

  const verifyEmailHandler = (event) => {
    event.preventDefault();
  };

  const verifyNickNameHandelr = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <button className="Sign-Up-Btn" onClick={SignUpBtnHandler}>
        회원가입
      </button>
      {isModalOpen2 && (
        <div className="Modal-Container">
          <div className="Modal-Container-Modal2">
            <form className="Sign-Up">
              <span className="Email-Label">이메일</span>
              <input
                className="Email-Input"
                type="text"
                value={email}
                onChange={emailChangeHandler}
              />
              <button onClick={verifyEmailHandler}>이메일 확인</button>
              <br />
              <span className="Password-Label">비밀번호</span>
              <input
                className="Password-Input"
                type="password"
                value={password}
                onChange={passwordChangeHandler}
              />
              <br />
              <span className="Verify-Password-Label">비밀번호 확인</span>
              <input
                className="Verify-Password-Input"
                type="password"
                value={verifypassword}
                onChange={verifypasswordChangeHandler}
              />
              <br />
              <span className="NickName-Label">닉네임</span>
              <input
                className="NickName-Input"
                type="text"
                value={nickname}
                onChange={nicknameChangeHandler}
              />
              <button
                className="Verify-NicknameBtn"
                onClick={verifyNickNameHandelr}
              >
                닉네임 확인
              </button>
              <br />
              <br />
              <button className="CancelBtn" onClick={CancelBtnHandler}>
                취소하기
              </button>
              <button className="SubmitBtn" onClick={SubmitBtnHandler}>
                가입하기
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
export default Modal;
