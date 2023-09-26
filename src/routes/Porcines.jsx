import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import AddAnimalForm from "../components/AddAnimalForm";
import AnimalList from "../components/AnimalList";
import { allFromCollection, getCollection } from "../firebase/api";
import { useSelectedAnimals } from "../hooks/useSelectedAnimals";

export default function Porcines() {
  const { selectedAnimals, toggleAnimalSelection } = useSelectedAnimals();
  const [porcines, setPorcines] = useState([]);

  useEffect(() => {
    const init = async () => {
      setPorcines(await allFromCollection(getCollection("porcines")));
    };
    init();
  }, []);
  return (
    <>
      <AnimalList
        type="porcines"
        selectedAnimals={selectedAnimals}
        onSelect={toggleAnimalSelection}
        animals={porcines}
      />
      <Dialog>
        <DialogTrigger>
          <Button className="absolute bottom-20 right-6">
            <FaPlus className="me-2" />
            Nuevo animal
          </Button>
        </DialogTrigger>
        <DialogContent className=" flex flex-col h-auto  sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Agregar porcino</DialogTitle>
            <DialogDescription>
              Agregue las caracteristicas del porcino
            </DialogDescription>
          </DialogHeader>
          <AddAnimalForm type="porcines" animals={porcines}>
            <DialogFooter className="flex-row gap-x-2 mt-4">
              <Button className="flex-1" size="lg" variant="outline">
                Cancelar
              </Button>
              <Button type="submit" className="flex-1" size="lg">
                Agregar
              </Button>
            </DialogFooter>
          </AddAnimalForm>
        </DialogContent>
      </Dialog>
    </>
  );
}
