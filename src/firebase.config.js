// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBriZx-5YEr-34oZ9fnrtzYKkTEzovTq6o",
  authDomain: "house-marketplace-d6890.firebaseapp.com",
  projectId: "house-marketplace-d6890",
  storageBucket: "house-marketplace-d6890.appspot.com",
  messagingSenderId: "532070257276",
  appId: "1:532070257276:web:9b97ba5a87b63373316ff9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore()