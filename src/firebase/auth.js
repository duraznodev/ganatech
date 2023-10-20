import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebase_auth } from "./config";

export async function signUp(email, password) {
  let result = null,
    error = null;
  try {
    result = await createUserWithEmailAndPassword(
      firebase_auth,
      email,
      password
    );
  } catch (e) {
    error = e;
  }

  return { result, error };
}

export async function signIn(email, password) {
  let result = null,
    error = null;

  try {
    result = await signInWithEmailAndPassword(firebase_auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
