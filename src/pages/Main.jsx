import React from "react";
import SignUp from "../components/SignUp";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import SignIn from "../components/SignIn";
import Test from "../components/Test";
import { useState } from "react";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../service/firebase";

function Main() {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("user", user); // 사용자 인증 정보가 변경될 때마다 해당 이벤트를 받아 처리합니다.
    });
  }, []);

  return (
    <>
      <TopBar />
      <SideBar />
      <SignUp />;
      <Test />
    </>
  );
}

export default Main;
