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
  // apiKey: "AIzaSyBnrVwhE0qoZNmTX27dEQv-FTTgneilzFU",
  // authDomain: "reight-ce36c.firebaseapp.com",
  // projectId: "reight-ce36c",
  // storageBucket: "reight-ce36c.appspot.com",
  // messagingSenderId: "123583272414",
  // appId: "1:123583272414:web:1e9f2352ff3c5d8762794f",

  // 윤건
  // apiKey: "AIzaSyAEW8wQZNGpwDkjVRA9ygcJwNcxMnLKvTE",
  // authDomain: "fir-test-7fd35.firebaseapp.com",
  // projectId: "fir-test-7fd35",
  // storageBucket: "fir-test-7fd35.appspot.com",
  // messagingSenderId: "1026947458072",
  // appId: "1:1026947458072:web:467659b3a6190617724f6d",

  //유길2
  apiKey: "AIzaSyBMVH9MLz1rBnI7aapwImQtA5Rw-WM21k0",
  authDomain: "testproject-ed7cc.firebaseapp.com",
  projectId: "testproject-ed7cc",
  storageBucket: "testproject-ed7cc.appspot.com",
  messagingSenderId: "883829817146",
  appId: "1:883829817146:web:a5591680b556d1b0025a03",
  measurementId: "G-TGC21KQ44R",
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

export default app;
