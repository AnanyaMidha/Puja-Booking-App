// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCoSq9mGSDolD1yr2nOp1D7wK47C0bksJc",
    authDomain: "puja-76053.firebaseapp.com",
    projectId: "puja-76053",
    storageBucket: "puja-76053.appspot.com",
    messagingSenderId: "913740891334",
    appId: "1:913740891334:web:9f3197f663855c31d783c7",
    measurementId: "G-34SW311THS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
