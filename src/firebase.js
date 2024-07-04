// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA_jWoQAt5noTJeXR4buwC6G4FrA4K7lMY",
    authDomain: "p02-fauth-todo.firebaseapp.com",
    projectId: "p02-fauth-todo",
    storageBucket: "p02-fauth-todo.appspot.com",
    messagingSenderId: "197951374208",
    appId: "1:197951374208:web:ef9a435e4817275d58f765"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app);
export const db = getFirestore(app)