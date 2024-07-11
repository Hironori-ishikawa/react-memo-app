// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4Qs0LgaggQ8rURjvOSOPSgUt-R2BBJKQ",
  authDomain: "react-memo-app-35cdb.firebaseapp.com",
  projectId: "react-memo-app-35cdb",
  storageBucket: "react-memo-app-35cdb.appspot.com",
  messagingSenderId: "789241894625",
  appId: "1:789241894625:web:d49da49289ff2cabf509a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export default db;
