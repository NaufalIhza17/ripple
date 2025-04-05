import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: 'AIzaSyAoK3lX2PFBfcYz2u__BhWdCJjZEzEKEUw',
  authDomain: 'ripple-e4529.firebaseapp.com',
  projectId: 'ripple-e4529',
  storageBucket: 'ripple-e4529.firebasestorage.app',
  messagingSenderId: '288402236026',
  appId: '1:288402236026:web:5f5cbf40c19cc18044d1c3',
  measurementId: 'G-FVEH41G8VL'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider('apple.com');