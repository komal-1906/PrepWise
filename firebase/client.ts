import { initializeApp, getApp, getApps } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFoCwXSo1C-xgGHHkBZvaCyST4ThsBSnY",
  authDomain: "prepwise-626cb.firebaseapp.com",
  projectId: "prepwise-626cb",
  storageBucket: "prepwise-626cb.firebasestorage.app",
  messagingSenderId: "476901328742",
  appId: "1:476901328742:web:3afc7c2548cda5a74beaa7",
  measurementId: "G-R2452YYFQY"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);