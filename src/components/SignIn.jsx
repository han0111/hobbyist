import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { auth, db } from "../service/firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import { doc, setDoc, getDoc } from "firebase/firestore";

import { VerifyMessage } from "./styledcomponents/Styled";

import github from "../img/github.png";
import google from "../img/google.png";
import { generateRandomNickname } from "./Post";

const OpenBtn = styled.button`
  font-size: 15px;
  width: 130px;
  height: 35px;
  border: none;
  border-radius: 10px;
  background-color: transparent;
  margin-left: 300px;
  cursor: pointer;
  &:hover {
    color: #5e5ee8;
    background-color: #e3e3f0;
  }
`;

const BcDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 30;
  width: 100%;
  height: 100%;
  display: ${(props) => (props.open ? "block" : "none")};
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
  margin-top: 30px;
  font-size: 28px;
  padding-top: 20px;
`;

const StInput = styled.input`
  width: 250px;
  margin-top: 20px;
  height: 40px;
  background-color: #f5f3f3;
  border-style: none;
  border-radius: 8px;
  padding-left: 15px;
`;

const StLoginBtn = styled.button`
  width: 100px;
  height: 30px;
  margin-top: 20px;
  border-radius: 5px;
  border-style: none;
  background-color: #6969ed;
  cursor: pointer;
  color: white;
  margin-bottom: 10px;
`;

function SignIn() {
  const [open, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("로그인");
  const [passwordverify, setPasswordVerify] = useState(true);

  useEffect(() => {
    localStorage.setItem("login", login);
  }, [login]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {});
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLogin(user ? "로그아웃" : "로그인");
    });
    return () => unsubscribe();
  }, []);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
      setPasswordVerify(value.length < 8); //비밀번호 길이 검증
    }
  };

  function signInByGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((data) => {
        const user = data.user;
        const { email, uid } = user;

        const userDocRef = doc(db, "users", uid); // 해당 유저의 문서 참조
        getDoc(userDocRef)
          .then((docSnapshot) => {
            if (!docSnapshot.exists()) {
              // 데이터가 없는 경우에만 초기값으로 설정
              const nickname = generateRandomNickname();
              const memo = "메모가 없습니다";
              const img =
                "https://ca.slack-edge.com/T043597JK8V-U057B2LN1NU-f07fd31753d9-512";

              setDoc(
                userDocRef,
                {
                  email: email,
                  nickname: nickname,
                  uid: uid,
                  memo: memo,
                  img: img,
                },
                { merge: true }
              );
            }
          })
          .catch((err) => {
            console.log(err);
          });

        setIsOpen(false);
        setLogin("로그아웃");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function signInByGithub() {
    const provider = new GithubAuthProvider(); // provider 깃헙 설정
    signInWithPopup(auth, provider)
      .then((data) => {
        const user = data.user;
        const { email, uid } = user;

        // 추가 필드 값들을 원하는 값으로 설정
        const nickname = generateRandomNickname();
        const memo = "메모가 없습니다";
        const img =
          "https://ca.slack-edge.com/T043597JK8V-U057B2LN1NU-f07fd31753d9-512";

        const userDocRef = doc(db, "users", uid); // 해당 유저의 문서 참조

        setDoc(
          userDocRef,
          {
            // 문서에 필드 추가
            email: email,
            nickname: nickname,
            uid: uid,
            memo: memo,
            img: img,
          },
          { merge: true }
        ); // 필드를 merge하여 기존 필드와 병합

        setIsOpen(false);
        setLogin("로그아웃");
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
      setIsOpen(false);
      setLogin("로그아웃");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        alert("존재하지 않는 이메일입니다.");
      } else {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("아이디와 비밀번호를 확인해주세요.");
        console.log("error with signIn", errorCode, errorMessage);
      }
    }
    setEmail("");
    setPassword("");
  };

  const logOut = async (e) => {
    e.preventDefault();
    await signOut(auth);
    alert("로그아웃 되었습니다.");
    setLogin("로그인");
  };

  const loginModalHandler = () => {
    setIsOpen(!open);
    setEmail("");
    setPassword("");
    setPasswordVerify(true);
  };

  return (
    <>
      <div>
        <BcDiv open={open} onClick={loginModalHandler}>
          <StDiv onClick={(e) => e.stopPropagation()}>
            <StForm>
              <StH2>LOGIN</StH2>
              <p>
                <StInput
                  type="email"
                  value={email}
                  name="email"
                  onChange={onChange}
                  required
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
              {passwordverify && password && (
                <VerifyMessage invalid={passwordverify ? "true" : undefined}>
                  비밀번호가 8자리 미만입니다.
                </VerifyMessage>
              )}
              {!passwordverify && password && (
                <VerifyMessage>8자리 이상입니다.</VerifyMessage>
              )}
              <p />
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
            </StForm>

            <Stbtn onClick={loginModalHandler}>x</Stbtn>
          </StDiv>
        </BcDiv>
        <OpenBtn onClick={login === "로그인" ? loginModalHandler : logOut}>
          {login}
        </OpenBtn>
      </div>
    </>
  );
}

export default SignIn;
