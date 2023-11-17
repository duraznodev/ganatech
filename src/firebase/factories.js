import { faker } from "@faker-js/faker";
import { Timestamp } from "firebase/firestore";
import { addToCollection, getCollection } from "./api";

export function bovineFactory(farm_id) {
  const fakeBovineM = {
    attributes: {
      genre: "M",
      status: faker.helpers.arrayElement(["alive", "dead", "sold", "lost"]),
    },
    father_id: null,
    mother_id: null,
    name: faker.person.firstName("male"),
    id: faker.string.uuid(),
    breed: faker.animal.cow(),
    country: "NIC",
    earring: faker.string.numeric(8),
    purposes: faker.helpers.arrayElement(["Trabajo", "Reproducción"]),
    weight: faker.number.float({ min: 360, max: 640 }),
  };
  const fakeBovineF = {
    attributes: {
      genre: "F",
      status: faker.helpers.arrayElement(["alive", "sold", "lost"]),
      its_pregnant: faker.datatype.boolean(),
    },
    father_id: null,
    mother_id: null,
    name: faker.person.firstName("female"),
    id: faker.string.uuid(),
    breed: faker.animal.cow(),
    country: "NIC",
    earring: faker.string.numeric(8),
    purposes: faker.helpers.arrayElement([
      "Producción de Leche",
      "Reproducción",
      "Producción de Carne",
    ]),
    weight: faker.number.float({ min: 360, max: 640 }),
  };

  return addToCollection(
    getCollection("bovines", farm_id),
    faker.helpers.arrayElement([fakeBovineM, fakeBovineF])
  );
}

export function porcineFactory(farm_id) {
  const fakePorcineM = {
    id: faker.string.uuid(),
    attributes: {
      genre: "M",
      status: faker.helpers.arrayElement(["alive", "dead", "sold", "lost"]),
    },
    breed: faker.lorem.word(),
    father_id: null,
    mother_id: null,
    name: faker.person.firstName("male"),
    purposes: faker.helpers.arrayElement([
      "Reproducción",
      "Producción de Carne",
    ]),
    weight: faker.number.float({ min: 100, max: 300 }),
  };

  const fakePorcineF = {
    id: faker.string.uuid(),
    attributes: {
      genre: "F",
      status: faker.helpers.arrayElement(["alive", "sold", "lost"]),
      its_pregnant: faker.datatype.boolean(),
    },
    breed: faker.lorem.word(),
    father_id: null,
    in_observation: faker.datatype.boolean(),
    mother_id: null,
    name: faker.person.firstName("female"),
    purposes: faker.helpers.arrayElement([
      "Reproducción",
      "Producción de Carne",
    ]),
    weight: faker.number.float({ min: 100, max: 300 }),
  };
  return addToCollection(
    getCollection("porcines", farm_id),
    faker.helpers.arrayElement([fakePorcineM, fakePorcineF])
  );
}

// export function birthFactory(farm_id) {
//   const fakeBirth = {
//     id: faker.string.uuid(),
//     children_ids: faker.helpers.arrayElement(
//       [faker.string.uuid(), faker.string.uuid()],
//       { min: 0 }
//     ),
//     date: Timestamp.fromDate(faker.date.soon()),
//     father_id: faker.string.uuid(),
//     mother_id: faker.string.uuid(),
//     number_of_babies: 1,
//     observations: "Ninguna",
//   };
//   return addToCollection(getCollection("births", farm_id), fakeBirth);
// }

// export function inseminationFactory(farm_id) {
//   const fakeInsemination = {
//     id: faker.string.uuid(),
//     date: Timestamp.fromDate(faker.date.soon()),
//     observations: "Ninguna",
//   };
//   return addToCollection(
//     getCollection("inseminations", farm_id),
//     fakeInsemination
//   );
// }

// export function weightHistoryFactory(farm_id) {
//   const fakeWeightHistory = {
//     animal_id: "032c2260-cb94-4cad-98b2-67d5e3fa4996",
//     date: Timestamp.fromDate(faker.date.soon()),
//     weight: faker.number.float({ min: 60, max: 20000 }),
//   };

//   return addToCollection(
//     getCollection("weight_history", farm_id),
//     fakeWeightHistory
//   );
// }
// export function BovineToBirthFactory(farm_id
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
//     purposes:faker.helpers.arrayElement( ["reproduction", "production"]),
//     status:faker.helpers.arrayElement(["alive", "dead", "sold","lost"]),
//     weight:faker.number.float({min:60,max:20000}),
//   }
// ) {
//   return addDoc(doc(birthsCollection, birth_id, "children"), bovine_id);
// }
