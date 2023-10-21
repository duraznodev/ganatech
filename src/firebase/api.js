import {
  addDoc,
  collection,
  doc,
  getDocs,
  or,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { firebase_db, firebase_storage } from "./config";
import { getDownloadURL, uploadBytes } from "firebase/storage";

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

export const newFarm = (data) => addToCollection(getFarms(), data);

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
  updatedFields,
  farm_id
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

export const uploadFile = async (file, ref) => {
  await uploadBytes(ref, file);
  const url = await getDownloadURL(ref);
  return url;
};
