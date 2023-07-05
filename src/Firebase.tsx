import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAJRtJgg8rvAHBn0AHzPWR0ZhDoPxcwcm8",
  authDomain: "notebook-13ded.firebaseapp.com",
  projectId: "notebook-13ded",
  storageBucket: "notebook-13ded.appspot.com",
  messagingSenderId: "906163854455",
  appId: "1:906163854455:web:8e7c7c8bad1e986dfcfa72",
  measurementId: "G-ZVW4L9SLTJ",
  databaseURL:
    "https://notebook-13ded-default-rtdb.europe-west1.firebasedatabase.app/",
};
const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const database = getDatabase(app);
