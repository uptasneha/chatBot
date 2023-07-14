// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1HcMtH0hYEh1TNvHPWpW6vmEK2SuXYWI",
  authDomain: "chatbot-36418.firebaseapp.com",
  projectId: "chatbot-36418",
  storageBucket: "chatbot-36418.appspot.com",
  messagingSenderId: "496095154434",
  appId: "1:496095154434:web:c5a17dff10f4fcc83d321b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;