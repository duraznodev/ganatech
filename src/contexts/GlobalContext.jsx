import { createContext, useContext, useEffect, useState } from "react";
import { allFromCollection, getCollection } from "../firebase/api";

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
  return (
    <GlobalContext.Provider
      value={{ bovines, diets, porcines, weightHistories }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  return useContext(GlobalContext);
}
