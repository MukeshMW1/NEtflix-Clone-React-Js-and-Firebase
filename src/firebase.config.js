// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAScV1CeTT-vO-yaCQXo-HuKyIdJMit0pM",
    authDomain: "initial-966b1.firebaseapp.com",
    projectId: "initial-966b1",
    storageBucket: "initial-966b1.appspot.com",
    messagingSenderId: "469879645616",
    appId: "1:469879645616:web:c73dda531ef09d1779e275",
    measurementId: "G-LP3WP15NE4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
const analytics = getAnalytics(app);