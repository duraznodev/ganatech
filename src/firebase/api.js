import { collection, doc, updateDoc, addDoc, getDocs } from "firebase/firestore";
import { firebase_db } from "./config";

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

export const updateInCollection = async (collection_name, id, updatedFields) => {
  const animalRef = doc(firebase_db, `farms/${farm_id}/${collection_name}`, id);
  try {
    await updateDoc(animalRef, updatedFields);
    return { success: true };
  } catch (error) {
    // console.error('Error updating document:', error);
    return { success: false, error };
  }
};
