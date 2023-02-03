// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApLkSWzz4JsMARoB9Bvvbwzl2CLW54Mi4",
  authDomain: "shopping-house-c86b0.firebaseapp.com",
  projectId: "shopping-house-c86b0",
  storageBucket: "shopping-house-c86b0.appspot.com",
  messagingSenderId: "316745243187",
  appId: "1:316745243187:web:52b698bf67a74ae979a146"
};

// Initialize Firebase
 initializeApp(firebaseConfig);
 export const db = getFirestore()