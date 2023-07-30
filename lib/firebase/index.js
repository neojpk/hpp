// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCY_lXEJPRj_djRESGyld2Xipix8h5ZJLc",
  authDomain: "pokerplanner-379422.firebaseapp.com",
  databaseURL: "https://pokerplanner-379422-default-rtdb.firebaseio.com",
  projectId: "pokerplanner-379422",
  storageBucket: "pokerplanner-379422.appspot.com",
  messagingSenderId: "10589663420",
  appId: "1:10589663420:web:8fc3f66aa6207376f4e0b9",
};

const env = process.env.NODE_ENV;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

if (env === "development") {
  connectDatabaseEmulator(db, "127.0.0.1", 9000);
}
