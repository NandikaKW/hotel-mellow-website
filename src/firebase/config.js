// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBHv2FV-yw4YISgTF_qgYR5OrkTZFczgyc",
    authDomain: "hotel-mellow.firebaseapp.com",
    projectId: "hotel-mellow",
    storageBucket: "hotel-mellow.firebasestorage.app",
    messagingSenderId: "114686189937",
    appId: "1:114686189937:web:08cae9151a8413adb656d0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;