// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  projectId: "studio-5659569481-cc767",
  appId: "1:413516910680:web:16ebdce239af58ee723a2d",
  storageBucket: "studio-5659569481-cc767.firebasestorage.app",
  apiKey: "AIzaSyCLURkoinlBlWPpnIcRaWIE74MwGWgrb0g",
  authDomain: "studio-5659569481-cc767.firebaseapp.com",
  messagingSenderId: "413516910680",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
