import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBjrGbtP322sC8rMVp2KHPY1vO9R_8lP4w",
    authDomain: "todo-app-cde27.firebaseapp.com",
    projectId: "todo-app-cde27",
    storageBucket: "todo-app-cde27.appspot.com",
    messagingSenderId: "212341946102",
    appId: "1:212341946102:web:6a57040bed99811befded7"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };