// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZRgCbTb3l_WLRq_s3F6nzj0usqPaXQ5o",
  authDomain: "neflix-clone-v13.firebaseapp.com",
  projectId: "neflix-clone-v13",
  storageBucket: "neflix-clone-v13.appspot.com",
  messagingSenderId: "978398352394",
  appId: "1:978398352394:web:5e8db57deabf4fc5a1fbf3"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }