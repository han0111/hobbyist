import React, { useEffect } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function SignUp() {
  useEffect(() => {
    createUserWithEmailAndPassword(auth, "test1@gmail.com", "123456");
  }, []);

  return (
    <>
      <div>SignUp</div>
      이메일: <input type="text" />
      비밀번호: <input type="password" />
    </>
  );
}

export default SignUp;
