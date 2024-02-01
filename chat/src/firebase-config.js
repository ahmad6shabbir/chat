// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeJ0sjge2mvIcJi2bo_UmZ2v735txjXEo",
  authDomain: "chat-91876.firebaseapp.com",
  projectId: "chat-91876",
  storageBucket: "chat-91876.appspot.com",
  messagingSenderId: "1012929722581",
  appId: "1:1012929722581:web:b1496a454a51a59c0c8a5c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);