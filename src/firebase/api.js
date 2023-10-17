import { addDoc, collection, getDocs } from "firebase/firestore";
import { firebase_db } from "./config";
import { onAuthStateChanged } from "firebase/auth";

const farm_id = "Y2ZMx8WST52QYZD5XkiF";

export const getCollection = (collection_name) =>
  collection(firebase_db, `farms/${farm_id}/${collection_name}`);

export const addToCollection = (collection, data) => addDoc(collection, data);

export const allFromCollection = async (collection) => {
  return (await getDocs(collection)).docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};
