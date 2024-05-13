// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC10VutlY2DrhMA8IeVeQQT92CE1JJU_f4",
  authDomain: "fintracker-d78eb.firebaseapp.com",
  projectId: "fintracker-d78eb",
  storageBucket: "fintracker-d78eb.appspot.com",
  messagingSenderId: "146636749467",
  appId: "1:146636749467:web:d241fb3277ec66f1d1a43e",
  measurementId: "G-PJ26V6VXXN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };


