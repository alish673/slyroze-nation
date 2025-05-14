import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCBmezwZVXcKCVcZyJxtV8Ub-SSO-70xYM",
  authDomain: "slyroze-nation.firebaseapp.com",
  projectId: "slyroze-nation",
  storageBucket: "slyroze-nation.appspot.com",
  messagingSenderId: "682230405880",
  appId: "1:682230405880:web:7aa3a9495b153d4fa846a1"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
