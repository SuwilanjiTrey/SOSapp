// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYMJVz1L9O5TY5LD_x1Tj4OX6gRZmAVq8",
  authDomain: "th1ne-010.firebaseapp.com",
  projectId: "th1ne-010",
  storageBucket: "th1ne-010.firebasestorage.app",
  messagingSenderId: "109865250582",
  appId: "1:109865250582:web:7da316259557f973b32a37",
  measurementId: "G-H6ESMPHLZK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
