import { createContext, useContext, useEffect, useState } from "react";
import { allFromCollection, getCollection } from "../firebase/api";
import { seeder } from "../firebase/seeder";

export const GlobalContext = createContext(null);

export function GlobalProvider({ children }) {
  const [bovines, setBovines] = useState([]);
  const [porcines, setPorcines] = useState([]);
  const [diets, setDiets] = useState([]);
  const [weightHistories, setWeightHistories] = useState([]);
  useEffect(() => {
    const init = async () => {
      setBovines(await allFromCollection(getCollection("bovines")));
      setWeightHistories(
        await allFromCollection(getCollection("weight_history"))
      );
      setPorcines(await allFromCollection(getCollection("porcines")));
      setDiets(await allFromCollection(getCollection("diets")));
    };
    // seeder();
    init();
  }, []);

  const addAnimal = (type, animal) => {
    if (type === "bovines") {
      setBovines([...bovines, animal]);
    }
    if (type === "porcines") {
      setPorcines([...porcines, animal]);
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
        porcines,
        weightHistories,
        addAnimal,
        addDiet,
        addWeightHistory,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  return useContext(GlobalContext);
}
