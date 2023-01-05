import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyCGLSebRyZCmz9YBnsO4l5JwbZPMrrhC6E",
  authDomain: "tugerente-60662.firebaseapp.com",
  projectId: "tugerente-60662",
  storageBucket: "tugerente-60662.appspot.com",
  messagingSenderId: "174740365701",
  appId: "1:174740365701:web:0732ab06aa80795c2964ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);


export default firebaseConfig;