import { createContext, useContext, useEffect, useState } from "react";
import { allFromCollection, getCollection } from "../firebase/api";

export const GlobalContext = createContext(null);

export function GlobalProvider({ children }) {
  const [bovines, setBovines] = useState([]);
  const [weightHistories, setWeightHistories] = useState([]);
  useEffect(() => {
    const init = async () => {
      setBovines(await allFromCollection(getCollection("bovines")));
      setWeightHistories(
        await allFromCollection(getCollection("weight_history"))
      );
    };
    // seeder();
    init();
  }, []);
  return (
    <GlobalContext.Provider value={{ bovines, weightHistories }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  return useContext(GlobalContext);
}
