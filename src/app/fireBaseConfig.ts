// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrCezwOAkjLsPiDIs7vFMDYsQ3w9wTmDE",
  authDomain: "webmusic-95f07.firebaseapp.com",
  databaseURL: "https://webmusic-95f07-default-rtdb.firebaseio.com",
  projectId: "webmusic-95f07",
  storageBucket: "webmusic-95f07.firebasestorage.app",
  messagingSenderId: "460192936311",
  appId: "1:460192936311:web:785001571b530fad9b7172"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseData = getDatabase(app);
export const authDatabase = getAuth(app)