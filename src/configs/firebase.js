// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDYoeP9taIc2IVn5_1Z4tBT7Ns8AssdxSE",
    authDomain: "vue3-firebase-b87a7.firebaseapp.com",
    projectId: "vue3-firebase-b87a7",
    storageBucket: "vue3-firebase-b87a7.appspot.com",
    messagingSenderId: "421048165608",
    appId: "1:421048165608:web:7577baa769ea6d2a99955d"
};

initializeApp(firebaseConfig);

const auth = getAuth();

export { auth };