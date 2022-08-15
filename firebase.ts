// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDURHEpdLlj7YkGfkyJnDCUovb6Vqg_Bbw',
  authDomain: 'netflix-platform-57256.firebaseapp.com',
  projectId: 'netflix-platform-57256',
  storageBucket: 'netflix-platform-57256.appspot.com',
  messagingSenderId: '708466789456',
  appId: '1:708466789456:web:c0695f847d36b968469555',
  measurementId: 'G-GE5T4995MR'
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }

