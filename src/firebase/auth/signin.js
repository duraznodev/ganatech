import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { firebase_app, firebase_auth } from "../config";

export default async function signIn(email, password) {
  let result = null,
    error = null;
  try {
    result = await signInWithEmailAndPassword(firebase_auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
