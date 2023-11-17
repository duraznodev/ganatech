import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { FaBirthdayCake } from "react-icons/fa";
import { LuMilk } from "react-icons/lu";
import { MdVaccines } from "react-icons/md";
import { Button } from "../components/ui/button";
import { useGlobal } from "../contexts/GlobalContext";
import { CalvingForm } from "./CalvingForm";
import MilkForm from "./MilkForm";
import { VaccineForm } from "./VaccineForm";

export default function ModalOptions({
  type,
  resetSelection,
  selectedAnimals,
  children,
}) {
  const [openModal, setOpenModal] = useState(null);
  const state = useGlobal();
  const animals = state?.[type] || [];
  const animal = animals.find((_animal) => _animal.id === selectedAnimals[0]);

  return (
    <Dialog>
      <DialogTrigger className="flex flex-wrap justify-center gap-2">
        {animal?.attributes?.genre === "F" ? (
          <Button
            variant="outline"
            className="flex w-40 gap-2"
            onClick={() => setOpenModal("partos")}
          >
            <FaBirthdayCake />
            Partos
          </Button>
        ) : (
          ""
        )}

        {animal?.attributes?.genre === "F" ? (
          <Button
            variant="outline"
            className="flex w-40 gap-2"
            onClick={() => setOpenModal("milk")}
          >
            <LuMilk />
            Leche
          </Button>
        ) : (
          ""
        )}
        <Button
          variant="outline"
          className="flex w-40 gap-2"
          onClick={() => setOpenModal("vacunas")}
        >
          <MdVaccines />
          Vacunas
        </Button>
      </DialogTrigger>
      <DialogContent className=" flex h-auto flex-col  sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Selecciona una opción</DialogTitle>
        </DialogHeader>
        {openModal === "partos" && (
          <CalvingForm
            type={type}
            resetSelection={resetSelection}
            selectedAnimals={selectedAnimals}
            onClose={() => setOpenModal(null)}
          >
            {children}
          </CalvingForm>
        )}
        {openModal === "vacunas" && (
          <VaccineForm
            type={type}
            resetSelection={resetSelection}
            selectedAnimals={selectedAnimals}
            onClose={() => setOpenModal(null)}
          >
            {children}
          </VaccineForm>
        )}
        {openModal === "milk" && (
          <MilkForm
            type={type}
            resetSelection={resetSelection}
            selectedAnimals={selectedAnimals}
            onClose={() => setOpenModal(null)}
          >
            {children}
          </MilkForm>
        )}
      </DialogContent>
    </Dialog>
  );
}
