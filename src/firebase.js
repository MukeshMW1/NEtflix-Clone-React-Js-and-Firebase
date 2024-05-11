import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { useAsyncValue } from "react-router-dom";
import { toast } from "react-toastify";



const firebase_key = import.meta.env.VITE_FIREBASE_API_KEY
const firebase_authdomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN
const firebase_projectid = import.meta.env.VITE_FIREBASE_PROJECT_ID
const firebase_storagebucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET
const firebase_messagingsenderid = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID
const firebase_appid = import.meta.env.VITE_FIREBASE_APP_ID
const firebase_measurementid = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID


const firebaseConfig = {
    apiKey: firebase_key,
    authDomain: firebase_authdomain,
    projectId: firebase_projectid,
    storageBucket: firebase_storagebucket,
    messagingSenderId: firebase_messagingsenderid,
    appId: firebase_appid,
    measurementId: firebase_measurementid
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);




export const signUp = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email

        })
    }
    catch (err) {
        console.log("This is an error during sign up ", err);
        toast.error(err.code.split('/')[1].split('-').join(" "));
    }
}



export const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    }
    catch (err) {
        console.log("This is an error during login  ", err);
        toast.error(err.code.split('/')[1].split('-').join(" "));

    }

}


export const logOut = () => {
    signOut(auth);
}