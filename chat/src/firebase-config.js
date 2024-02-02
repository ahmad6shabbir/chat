// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import { getMessaging, onMessage, getToken } from "firebase/messaging";
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
const messaging = getMessaging();


export const requestForToken = async () => {
    try {
    const currentToken = await getToken(messaging, { vapidKey: 'BK66VfD-bLRDt8wE692LwnHujjmVU7MKkM00MXnjQxkdbpZh8MvDVU-3hCXm3V76e8gfbtWr2dLyvSdrSEq-2dU' });
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      let token = currentToken;
      console.log('current token for client let: ', token);
      return token;
    } else {
      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.');
    }
  } catch (err) {
    console.log('An error occurred while retrieving token. ', err);
  }
  
  };

  export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload)
      resolve(payload);
    });
  });