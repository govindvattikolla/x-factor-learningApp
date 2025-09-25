
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; //  Firebase Authentication
import { getFirestore } from "firebase/firestore"; //  Firestore database


const firebaseConfig = {
    apiKey: "AIzaSyBnmrIiOyN8ZMDYHwyhlX3dEIyDu4OaEk0",
    authDomain: "xfactor-xf.firebaseapp.com",
    projectId: "xfactor-xf",
    storageBucket: "xfactor-xf.firebasestorage.app",
    messagingSenderId: "788756087838",
    appId: "1:788756087838:web:29c281b83e6fc58e119a0f",
    measurementId: "G-XRQK0YLH98"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
