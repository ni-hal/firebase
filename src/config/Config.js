import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDGccXZ3T0WFhWPjKkiBexwheriIPy5fe8",
  authDomain: "cofee-a109e.firebaseapp.com",
  databaseURL: "https://cofee-a109e-default-rtdb.firebaseio.com",
  projectId: "cofee-a109e",
  storageBucket: "cofee-a109e.appspot.com",
  messagingSenderId: "376245760708",
  appId: "1:376245760708:web:3f6e9881a911e08d0e0f91",
  measurementId: "G-PN279S885Q",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const fs = firebase.firestore();
const storage = firebase.storage();

export { auth, fs, storage };




