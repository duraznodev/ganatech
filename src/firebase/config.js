import { initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
  signOut,
} from "firebase/auth";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};
// Initialize Firebase
export const firebase_app = initializeApp(firebaseConfig);

export const firebase_auth = getAuth(firebase_app);

setPersistence(firebase_auth, browserLocalPersistence);

export const user = firebase_auth.currentUser;

// export const firebase_auth = getAuth();
// connectAuthEmulator(firebase_auth, "http://127.0.0.1:9099");
// signOut(firebase_auth);
export const firebase_db = initializeFirestore(firebase_app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
});
// export const firebase_db = getFirestore();

// connectFirestoreEmulator(firebase_db, "127.0.0.1", 8080);

// await disableNetwork(firebase_db);
// console.log("Network disabled!");
