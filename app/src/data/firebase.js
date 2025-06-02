
// src/data/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAyFjBcpxwgHEs8i8QGMEgu172ALd6MddY",
  authDomain: "databese-menu-restoran.firebaseapp.com",
  projectId: "databese-menu-restoran",
  storageBucket: "databese-menu-restoran.firebasestorage.app",
  messagingSenderId: "124852832963",
  appId: "1:124852832963:web:e2ef488da3272d4512b076",
  measurementId: "G-XLNTRKSZP4"
};

const app = initializeApp(firebaseConfig);

// Jangan panggil getAnalytics() di sini

export const db = getFirestore(app);
