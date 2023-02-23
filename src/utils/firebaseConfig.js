// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { toastErrorNotify, toastSuccessNotify } from "../utils/toastNotify";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_apiKey,
  apiKey: "AIzaSyB8IXbDBcVBCR54GgRWTgoGDqY3DSOF5ng",
  authDomain: "blog-app-449e3.firebaseapp.com",
  // authDomain: process.env.REACT_APP_FIREBASE_authDomain,
  databaseURL: "https://blog-app-449e3-default-rtdb.firebaseio.com",

  projectId: process.env.REACT_APP_FIREBASE_projectId,
  storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
  messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId,
  appId: process.env.REACT_APP_FIREBASE_appId,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const createUser = async (email, password, navigate, displayName) => {
  try {
    let userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
      displayName
    );
    await updateProfile(auth.currentUser, {
      displayName: displayName,
    });
    navigate("/");

    console.log(userCredential.user.displayName);

    toastSuccessNotify("Successfully Registered");
  } catch (error) {
    toastErrorNotify(error.message);
    // alert(error.message);
  }
};

//* https://console.firebase.google.com/
//* => Authentication => sign-in-method => enable Email/password

export const signIn = async (email, password, navigate) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/");
    toastSuccessNotify("Signed in successfully");
  } catch (error) {
    // alert(error.message);
    toastErrorNotify(error.message);
  }
};

export const userObserver = (setCurrentUser) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // const { email } = user;
      // setCurrentUser({ email });
      const { email, displayName } = user;
      setCurrentUser({ email, displayName });
      // console.log(currentUser);
    } else {
      setCurrentUser("");

      console.log("user signed out");
    }
  });
};

export const logOut = () => {
  signOut(auth);
  toastSuccessNotify("Logged out successfully!");
};

export const signInWithGoogle = (navigate) => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};
