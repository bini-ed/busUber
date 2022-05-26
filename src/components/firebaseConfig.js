import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC_T1ScR3B5Cz8EcKSh9moc3yLJKSFMbDQ",
  authDomain: "upbus-8e30a.firebaseapp.com",
  projectId: "upbus-8e30a",
  storageBucket: "upbus-8e30a.appspot.com",
  messagingSenderId: "278665255879",
  appId: "1:278665255879:web:e75641d54b3de0da99d7e2",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const authentication = getAuth(app);
