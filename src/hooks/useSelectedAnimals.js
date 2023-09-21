import { useState } from "react";

export function useSelectedAnimals() {
  const [selectedAnimals, setSelectedAnimals] = useState([]);

  const toggleAnimalSelection = (animalId) => {
    setSelectedAnimals((prev) =>
      prev.includes(animalId)
        ? prev.filter((id) => id !== animalId)
        : [...prev, animalId]
    );
  };

  const resetSelection = () => setSelectedAnimals([]);

  return { selectedAnimals, resetSelection, toggleAnimalSelection };
}
