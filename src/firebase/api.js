import { addDoc, collection, doc } from "firebase/firestore";
import { firebase_db } from "./config";

const bovinesCollection = collection(
  firebase_db,
  "farms/Y2ZMx8WST52QYZD5XkiF/bovines"
);

const birthsCollection = collection(
  firebase_db,
  "farms/Y2ZMx8WST52QYZD5XkiF/births"
);

const inseminationsCollection = collection(
  firebase_db,
  "farms/Y2ZMx8WST52QYZD5XkiF/inseminations"
);

export function addBovine(
  bovine = {
    animal_id: "1",
    breed: "vero",
    earring: {
      country: "NIC",
      earring_code: "1238",
      farm_code: "1034",
    },
    father_id: null,
    genre: "M",
    its_pregnant: true,
    mother_id: null,
    name: "Gonzalo",
    purposes: ["reproduction", "production"],
    status: ["observed"],
    weight: 37.76,
  }
) {
  return addDoc(bovinesCollection, bovine);
}

export function addBirth(
  birth = {
    animal_id: "1",
    children_ids: ["4"],
    date: "2021-08-09",
    father_id: "2",
    mother_id: "3",
    number_of_babies: 1,
    observations: "Ninguna",
  }
) {
  return addDoc(birthsCollection, birth);
}

export function inseminations() {
  return addDoc();
}
