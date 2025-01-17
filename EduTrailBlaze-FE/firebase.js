// Import the functions you need from the SDKs you need
import { getStorage } from "firebase/storage";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBP6f9UrpD8K_B5kISPn3ETVbOHTA-5rpU",
    authDomain: "authenticationedu.firebaseapp.com",
    projectId: "authenticationedu",
    storageBucket: "authenticationedu.firebasestorage.app",
    messagingSenderId: "51611859884",
    appId: "1:51611859884:web:e84c62b4c27082e0679809",
    measurementId: "G-44W86FZYC3"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);
// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

const storageDb = getStorage(firebaseApp)

export {firebaseApp, auth, storageDb}