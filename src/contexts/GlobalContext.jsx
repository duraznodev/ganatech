import { createContext, useContext, useEffect, useState } from "react";
import { allFromCollection, getCollection } from "../firebase/api";

export const GlobalContext = createContext(null);

export function GlobalProvider({ children }) {
  const [bovines, setBovines] = useState([]);
  const [porcines, setPorcines] = useState([]);
  const [diets, setDiets] = useState([]);
  const [weightHistories, setWeightHistories] = useState([]);
  const [farmId, setFarmId] = useState(null);
  const [user, setUser] = useState(null);
  const [ironImgRef, setIronImgRef] = useState(null);
  const [ironImgURL, setIronImgURL] = useState(null);
  const [calvings, setCalvings] = useState([]);
  const [vaccines, setVaccines] = useState([]);
  const [milkHistories, setMilkHistories] = useState([]);
  const [farm, setFarm] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const init = async () => {
      setBovines(await allFromCollection(getCollection("bovines", farmId)));
      setWeightHistories(
        await allFromCollection(getCollection("weight_history", farmId))
      );
      setPorcines(await allFromCollection(getCollection("porcines", farmId)));
      setDiets(await allFromCollection(getCollection("diets", farmId)));
      setCalvings(await allFromCollection(getCollection("calvings", farmId)));
      setVaccines(await allFromCollection(getCollection("vaccines", farmId)));
      setMilkHistories(
        await allFromCollection(getCollection("milk_history", farmId))
      );

    };

    if (farmId) {
      // seeder(farmId);
      init(farmId);
    }
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
    // console.log("Updating Local State:", { type, id, updatedAnimal });
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
  const addMilkHistory = (milkHistory) => {
    setMilkHistories([...milkHistories, milkHistory]);
  };

  const addCalving = (_calvings) => {
    setCalvings([...calvings, _calvings]);
  };
  const addVaccines = (_vaccines) => {
    setVaccines([...vaccines, _vaccines]);
  };

  return (
    <GlobalContext.Provider
      value={{
        bovines,
        calvings,
        diets,
        farm,
        farmId,
        ironImgRef,
        ironImgURL,
        isAdmin,
        porcines,
        user,
        vaccines,
        weightHistories,
        milkHistories,
        addAnimal,
        addCalving,
        addDiet,
        addVaccines,
        addWeightHistory,
        addMilkHistory,
        setFarm,
        setFarmId,
        setIronImgRef,
        setIronImgURL,
        setIsAdmin,
        setUser,
        updateAnimal,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  return useContext(GlobalContext);
}
