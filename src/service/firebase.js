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
  apiKey: "AIzaSyBfNHo0wuQcZrrVWX8iUFdwpMwnqWNb-q0",
  authDomain: "fir-test-a8fe2.firebaseapp.com",
  projectId: "fir-test-a8fe2",
  storageBucket: "fir-test-a8fe2.appspot.com",
  messagingSenderId: "982481039500",
  appId: "1:982481039500:web:ef48c3e8ee16180e920ba9",

  // 유길
  // apiKey: "AIzaSyBMVH9MLz1rBnI7aapwImQtA5Rw-WM21k0",
  // authDomain: "testproject-ed7cc.firebaseapp.com",
  // projectId: "testproject-ed7cc",
  // storageBucket: "testproject-ed7cc.appspot.com",
  // messagingSenderId: "883829817146",
  // appId: "1:883829817146:web:a5591680b556d1b0025a03",

  // // 윤건
  //   apiKey: "AIzaSyBYtriPYjeOSg4WIEWBqyutqxu9oJTNzvI",
  //   authDomain: "hobbyist-40edb.firebaseapp.com",
  //   projectId: "hobbyist-40edb",
  //   storageBucket: "hobbyist-40edb.appspot.com",
  //   messagingSenderId: "415353098643",
  //   appId: "1:415353098643:web:6ec6c18d0251493579d866",
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
