import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDoiipgio7SivUEcu7s-c5xc4GSJ96ciR0",
  authDomain: "todoweb-6ad4a.firebaseapp.com",
  projectId: "todoweb-6ad4a",
  storageBucket: "todoweb-6ad4a.firebasestorage.app",
  messagingSenderId: "72749461089",
  appId: "1:72749461089:web:44003460a43e48ebcf0420",
  measurementId: "G-7TB72K2HR9"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore
const db = getFirestore(app);

// Authentication
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };