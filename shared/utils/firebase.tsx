// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC5xZbMrmk1ybesdWdamFH8aTaNiycTNUg",
  authDomain: "task-clone-1ee6b.firebaseapp.com",
  projectId: "task-clone-1ee6b",
  storageBucket: "task-clone-1ee6b.appspot.com",
  messagingSenderId: "512827924182",
  appId: "1:512827924182:web:220d4a2f29b961982b3377",
  measurementId: "G-Q5JDE45HT0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore();
export const storage:any = getStorage(app);