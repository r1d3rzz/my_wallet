import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDdb2j_XzaMg4Rcff_j99uZphdWXLhdpDg",
  authDomain: "testing-projects-9bfd5.firebaseapp.com",
  projectId: "testing-projects-9bfd5",
  storageBucket: "testing-projects-9bfd5.appspot.com",
  messagingSenderId: "990581023030",
  appId: "1:990581023030:web:7bca185301ad46692b5397",
};

firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
let auth = firebase.auth();
let timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { db, auth, timestamp };
