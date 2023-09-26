import { useState } from "react";

export function useSelectAnimal() {
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  const toggleAnimalSelection = (animalId) => {
    selectedAnimal === animalId
      ? setSelectedAnimal(null)
      : setSelectedAnimal(animalId);
    const elements = document.querySelectorAll("#closeDialog");
    elements[elements.length - 1]?.click();
    console.log(elements);
  };

  return { selectedAnimal, toggleAnimalSelection };
}
