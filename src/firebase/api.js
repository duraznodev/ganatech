import {
  addDoc,
  collection,
  getDocs,
  or,
  query,
  where,
} from "firebase/firestore";
import { firebase_db } from "./config";

export const getCollection = (collection_name, farm_id) =>
  collection(firebase_db, `farms/${farm_id}/${collection_name}`);

export const getFarms = () => collection(firebase_db, "farms");

export const userFarms = (user) =>
  getDocs(
    query(
      collection(firebase_db, "farms"),
      or(
        where("owners", "array-contains", user.uid),
        where("users", "array-contains", user.uid)
      )
    )
  );

export const addToCollection = (collection, data) => addDoc(collection, data);

export const allFromCollection = async (collection) => {
  return (await getDocs(collection)).docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};

export const updateInCollection = async (
  collection_name,
  id,
  updatedFields
) => {
  const animalRef = doc(firebase_db, `farms/${farm_id}/${collection_name}`, id);
  try {
    await updateDoc(animalRef, updatedFields);
    return { success: true };
  } catch (error) {
    // console.error('Error updating document:', error);
    return { success: false, error };
  }
};
