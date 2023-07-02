// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // 우정님 firebase API 키
  // apiKey: "AIzaSyBfNHo0wuQcZrrVWX8iUFdwpMwnqWNb-q0",
  // authDomain: "fir-test-a8fe2.firebaseapp.com",
  // projectId: "fir-test-a8fe2",
  // storageBucket: "fir-test-a8fe2.appspot.com",
  // messagingSenderId: "982481039500",
  // appId: "1:982481039500:web:ef48c3e8ee16180e920ba9",

  // 유길
  // apiKey: "AIzaSyBwuJ3Uaom2GOUpID0A6OXb-ZeCoDm0d_k",
  // authDomain: "hobbyist-68c32.firebaseapp.com",
  // projectId: "hobbyist-68c32",
  // storageBucket: "hobbyist-68c32.appspot.com",
  // messagingSenderId: "978662957730",
  // appId: "1:978662957730:web:bb74db15c0a2ac659d2dfb",
  // measurementId: "G-CKE0B2V0W0",

  // 한희
  apiKey: "AIzaSyAojcDu2jBPfdgiHohB7a6NS_EN5sqgXUE",
  authDomain: "hobbyist-391107.firebaseapp.com",
  projectId: "hobbyist-391107",
  storageBucket: "hobbyist-391107.appspot.com",
  messagingSenderId: "260045142119",
  appId: "1:260045142119:web:2f84805b38876f7673bcc2",

  // // 윤건
  // apiKey: "AIzaSyBYtriPYjeOSg4WIEWBqyutqxu9oJTNzvI",
  // authDomain: "hobbyist-40edb.firebaseapp.com",
  // projectId: "hobbyist-40edb",
  // storageBucket: "hobbyist-40edb.appspot.com",
  // messagingSenderId: "415353098643",
  // appId: "1:415353098643:web:6ec6c18d0251493579d866",
};

export const signInWithGoogle = () => {
  const googleProvider = new GoogleAuthProvider();

  return signInWithPopup(auth, googleProvider);
};

export const signInWithGithub = () => {
  const githubProvider = new GithubAuthProvider();

  return signInWithPopup(auth, githubProvider);
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);

export default app;
