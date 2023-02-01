import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const blogFirebase = {
  apiKey: "AIzaSyB8IXbDBcVBCR54GgRWTgoGDqY3DSOF5ng",
  authDomain: "blog-app-449e3.firebaseapp.com",
  databaseURL: "https://blog-app-449e3-default-rtdb.firebaseio.com",
  projectId: "blog-app-449e3",
  storageBucket: "blog-app-449e3.appspot.com",
  messagingSenderId: "861310168590",
  appId: "1:861310168590:web:5c470902d41cb4d50d565f",
};

const appBlog = initializeApp(blogFirebase);
// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);
export default appBlog;
