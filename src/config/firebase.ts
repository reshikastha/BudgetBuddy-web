import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALg_ev--stXiysSh1oLGBLPzID_kcSdlA",
  authDomain: "budgetbuddy-1d6a7.firebaseapp.com",
  projectId: "budgetbuddy-1d6a7",
  storageBucket: "budgetbuddy-1d6a7.firebasestorage.app",
  messagingSenderId: "135001859282",
  appId: "1:135001859282:web:6dba32b363e29ff2cc790b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);