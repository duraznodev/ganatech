import { addDoc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { addToCollection, getCollection } from "./api";
import { fa, faker } from "@faker-js/faker";

export function bovineFactory() {
  const fakeBovine = {
    attributes: {
      genre: faker.helpers.arrayElement(["M", "F"]),
      status: faker.helpers.arrayElement(["alive", "dead", "sold", "lost"]),
      its_pregnant: faker.datatype.boolean(),
    },
    father_id: faker.string.uuid(),
    mother_id: faker.string.uuid(),
    name: faker.person.firstName(),
    id: faker.string.uuid(),
    breed: faker.animal.cow(),
    country: "NIC",
    earring: {
      earring_code: faker.string.numeric(4),
      farm_code: faker.string.numeric(4),
    },
    purposes: faker.helpers.arrayElements(
      ["reproduction", "milk_production", "work", "meat_production"],
      {
        min: 0,
      }
    ),
    in_observation: faker.datatype.boolean(),
    weight: faker.number.float({ min: 60, max: 20000 }),
  };
  return addToCollection(getCollection("bovines"), fakeBovine);
}

export function birthFactory() {
  const fakeBirth = {
    id: faker.string.uuid(),
    children_ids: faker.helpers.arrayElements(
      [faker.string.uuid(), faker.string.uuid()],
      { min: 0 }
    ),
    date: Timestamp.fromDate(faker.date.soon()),
    father_id: faker.string.uuid(),
    mother_id: faker.string.uuid(),
    number_of_babies: 1,
    observations: "Ninguna",
  };
  return addToCollection(getCollection("births"), fakeBirth);
}

export function inseminationFactory() {
  const fakeInsemination = {
    id: faker.string.uuid(),
    date: Timestamp.fromDate(faker.date.soon()),
    observations: "Ninguna",
  };
  return addToCollection(getCollection("inseminations"), fakeInsemination);
}

export function porcineFactory() {
  const fakePorcine = {
    id: faker.string.uuid(),
    attributes: {
      genre: faker.helpers.arrayElement(["M", "F"]),
      status: faker.helpers.arrayElement(["alive", "dead", "sold", "lost"]),
      its_pregnant: faker.datatype.boolean(),
    },
    breed: faker.animal.cow(),
    father_id: faker.string.uuid(),
    in_observation: faker.datatype.boolean(),
    mother_id: faker.string.uuid(),
    name: faker.person.firstName(),
    purposes: faker.helpers.arrayElements(["reproduction", "production"]),
    weight: faker.number.float({ min: 60, max: 20000 }),
  };
  return addToCollection(getCollection("porcines"), fakePorcine);
}

export function weightHistoryFactory() {
  const fakeWeightHistory = {
    animal_id: "032c2260-cb94-4cad-98b2-67d5e3fa4996",
    date: Timestamp.fromDate(faker.date.soon()),
    weight: faker.number.float({ min: 60, max: 20000 }),
  };

  return addToCollection(getCollection("weight_history"), fakeWeightHistory);
}
// export function BovineToBirthFactory(
//   birth_id,
//   bovine_id = {
//     id:faker.string.uuid(),
//     breed:faker.animal.cow(),
//     earring: {
//       country: "NIC",
//       earring_code:faker.string.numeric(4),
//       farm_code:faker.string.numeric(4),
//     },
//     father_id:faker.string.uuid(),
//     genre:faker.helpers.arrayElement("M","F"),
//     its_pregnant:faker.datatype.boolean(),
//     mother_id:faker.string.uuid(),
//     name:faker.person.firstName(),
//     purposes:faker.helpers.arrayElements( ["reproduction", "production"]),
//     status:faker.helpers.arrayElement(["alive", "dead", "sold","lost"]),
//     weight:faker.number.float({min:60,max:20000}),
//   }
// ) {
//   return addDoc(doc(birthsCollection, birth_id, "children"), bovine_id);
// }
