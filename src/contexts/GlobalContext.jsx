import { createContext, useContext, useEffect, useState } from "react";
import { allFromCollection, getCollection } from "../firebase/api";
import { seeder } from "../firebase/seeder";
import { firebase_auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

export const GlobalContext = createContext(null);

export function GlobalProvider({ children }) {
  const [bovines, setBovines] = useState([]);
  const [porcines, setPorcines] = useState([]);
  const [diets, setDiets] = useState([]);
  const [weightHistories, setWeightHistories] = useState([]);
  const [farmId, setFarmId] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const init = async () => {
      setBovines(await allFromCollection(getCollection("bovines", farmId)));
      setWeightHistories(
        await allFromCollection(getCollection("weight_history", farmId))
      );
      setPorcines(await allFromCollection(getCollection("porcines", farmId)));
      setDiets(await allFromCollection(getCollection("diets", farmId)));
    };

    // seeder();
    if (farmId) init();
  }, [farmId]);

  const addAnimal = (type, animal) => {
    if (type === "bovines") {
      setBovines([...bovines, animal]);
    }
    if (type === "porcines") {
      setPorcines([...porcines, animal]);
    }
  };

  const updateAnimal = (type, id, updatedAnimal) => {
    console.log("Updating Local State:", { type, id, updatedAnimal });
    if (type === "bovines") {
      setBovines(
        bovines.map((animal) =>
          animal.id === id ? { ...animal, ...updatedAnimal } : animal
        )
      );
    }
    if (type === "porcines") {
      setPorcines(
        porcines.map((animal) =>
          animal.id === id ? { ...animal, ...updatedAnimal } : animal
        )
      );
    }
  };

  const addDiet = (diet) => {
    setDiets([...diets, diet]);
  };
  const addWeightHistory = (weightHistory) => {
    setWeightHistories([...weightHistories, weightHistory]);
  };

  return (
    <GlobalContext.Provider
      value={{
        bovines,
        diets,
        farmId,
        porcines,
        user,
        weightHistories,
        addAnimal,
        addDiet,
        addWeightHistory,
        setFarmId,
        setUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  return useContext(GlobalContext);
}
