// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnrVwhE0qoZNmTX27dEQv-FTTgneilzFU",
  authDomain: "reight-ce36c.firebaseapp.com",
  projectId: "reight-ce36c",
  storageBucket: "reight-ce36c.appspot.com",
  messagingSenderId: "123583272414",
  appId: "1:123583272414:web:1e9f2352ff3c5d8762794f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
