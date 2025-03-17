import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDaWqx4Jv-mR4Cg4zg1GKdm87_yE70XU4s",
    authDomain: "bibogger-3b93a.firebaseapp.com",
    projectId: "bibogger-3b93a",
    storageBucket: "bibogger-3b93a.firebasestorage.app",
    messagingSenderId: "86250231581",
    appId: "1:86250231581:web:49114e2e947dc40f53b3f4"
  };


const app = initializeApp(firebaseConfig);


const auth = getAuth(app);

export { auth };