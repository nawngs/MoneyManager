// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD18EOrywat4yOsrLIDi_3u95FV5D3-jKo",
  authDomain: "moneymanager-4c07b.firebaseapp.com",
  projectId: "moneymanager-4c07b",
  storageBucket: "moneymanager-4c07b.firebasestorage.app",
  messagingSenderId: "766019332315",
  appId: "1:766019332315:web:dc20fe9ce07e817f1e44fe"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// db
export const firestore = getFirestore(app);