import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBNDvNOoP8Ekz9b8kUsS1L3TI274_eDUEA",
    authDomain: "kafe-6e5ce.firebaseapp.com",
    projectId: "kafe-6e5ce",
    storageBucket: "kafe-6e5ce.appspot.com",
    messagingSenderId: "151513502214",
    appId: "1:151513502214:web:ef3badf32e2d16a914a987"
};

const app = initializeApp(firebaseConfig);
export {app};