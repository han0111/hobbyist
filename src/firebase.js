// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfNHo0wuQcZrrVWX8iUFdwpMwnqWNb-q0",
  authDomain: "fir-test-a8fe2.firebaseapp.com",
  projectId: "fir-test-a8fe2",
  storageBucket: "fir-test-a8fe2.appspot.com",
  messagingSenderId: "982481039500",
  appId: "1:982481039500:web:ef48c3e8ee16180e920ba9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
