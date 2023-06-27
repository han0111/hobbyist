import React from "react";
import { styled } from "styled-components";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../service/firebase";
import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { signOut } from "firebase/auth";
import github from "../img/github.png";
import google from "../img/google.png";

const OpenBtn = styled.button`
  margin-top: 10px;
  font-size: 20px;
  width: 120px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;

const BcDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;
  width: 100%;
  height: 100%;
  display: ${(props) => (props.isOpen ? "block" : "none")};
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

function SignIn() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(null);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };

  function signInByGoogle() {
    const provider = new GoogleAuthProvider(); // provider 구글 설정
    signInWithPopup(auth, provider) // 팝업창 띄워서 로그인
      .then((data) => {
        setUserData(data.user); // user data 설정
        console.log(data); // console에 UserCredentialImpl 출력
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function signInByGithub() {
    const provider = new GithubAuthProvider(); // provider 깃헙 설정
    signInWithPopup(auth, provider) // 팝업창 띄워서 로그인
      .then((data) => {
        setUserData(data.user); // user data 설정
        console.log(data); // console에 UserCredentialImpl 출력
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const signInByEmail = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("user with signIn", userCredential.user);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("아이디와 비밀번호를 확인해주세요.");
      console.log("error with signIn", errorCode, errorMessage);
    }
    setEmail("");
    setPassword("");
  };

  const logOut = async (e) => {
    e.preventDefault();
    await signOut(auth);
  };

  const modalHandler = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div>
        <BcDiv isOpen={isOpen} onClick={modalHandler}>
          <StDiv onClick={(e) => e.stopPropagation()}>
            <StForm>
              <StH2>LOGIN</StH2>
              <p>
                <StInput
                  type="email"
                  value={email}
                  name="email"
                  onChange={onChange}
                  reaquired
                  placeholder="아이디를 입력하세요."
                />
              </p>
              <p>
                <StInput
                  type="password"
                  value={password}
                  name="password"
                  onChange={onChange}
                  required
                  placeholder="패스워드를 입력하세요."
                />
              </p>
              <StLoginBtn onClick={signInByEmail}>로그인</StLoginBtn>
              <br />
              <button
                style={{
                  width: "250px",
                  height: "25px",
                  marginTop: "10px",
                  borderStyle: "none",
                  backgroundColor: "black",
                  color: "white",
                  borderRadius: "3px",
                  lineHeight: "20px",
                  cursor: "pointer",
                }}
                onClick={signInByGithub}
              >
                <img
                  src={github}
                  alt="깃허브로고"
                  style={{ width: "20px", float: "left" }}
                />
                github 계정으로 로그인
              </button>
              <br />
              <button
                style={{
                  width: "250px",
                  height: "25px",
                  marginTop: "10px",
                  border: "1px solid gray",
                  backgroundColor: "white",
                  color: "black",
                  lineHeight: "20px",
                  borderRadius: "3px",
                  cursor: "pointer",
                }}
                onClick={signInByGoogle}
              >
                <img
                  src={google}
                  alt="구글로고"
                  style={{ width: "20px", float: "left" }}
                />
                구글 계정으로 로그인
              </button>
              <p>아직 회원이 아니세요?</p>
              <button onClick={logOut}>로그아웃</button>
            </StForm>

            <Stbtn onClick={modalHandler}>x</Stbtn>
          </StDiv>
        </BcDiv>
        <OpenBtn onClick={modalHandler}>로그인</OpenBtn>
      </div>
    </>
  );
}

export default SignIn;
