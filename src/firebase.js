// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  
import { getFirestore } from "firebase/firestore";  

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCc-yl-lleJIzG1MsFgwmozgYIVC2A2SkY",
  authDomain: "vital-recorder.firebaseapp.com",
  projectId: "vital-recorder",
  storageBucket: "vital-recorder.firebasestorage.app",
  messagingSenderId: "822927141060",
  appId: "1:822927141060:web:e0531769db168d1aba0191",
  measurementId: "G-7ZYXQDYPD1"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta los servicios que necesitarás
export const auth = getAuth(app); // Para la autenticación
export const db = getFirestore(app); // Para la base de datos
