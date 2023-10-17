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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const init = async () => {
      setBovines(await allFromCollection(getCollection("bovines")));
      setWeightHistories(
        await allFromCollection(getCollection("weight_history"))
      );
      setPorcines(await allFromCollection(getCollection("porcines")));
      setDiets(await allFromCollection(getCollection("diets")));
    };

    onAuthStateChanged(firebase_auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
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
        user,
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
