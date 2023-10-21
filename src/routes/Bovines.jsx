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
import { DialogClose } from "@radix-ui/react-dialog";
import { BiFoodMenu, BiEditAlt } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import { TbWeight } from "react-icons/tb";
import AddAnimalForm from "../components/AddAnimalForm";
import AnimalList from "../components/AnimalList";
import DietForm from "../components/DietForm";
import WeightForm from "../components/WeigthForm";
import { useGlobal } from "../contexts/GlobalContext";
import { useSelectedAnimals } from "../hooks/useSelectedAnimals";
import { GiScalpel } from "react-icons/gi";
import { CastrationForm } from "../components/CastrationForm";
import { IoMdOptions } from "react-icons/io";
import ModalOptions from "../components/ModalOptions";
export default function Bovines() {
  const { selectedAnimals, resetSelection, toggleAnimalSelection } =
    useSelectedAnimals();
  const global = useGlobal();
  const bovines = global?.bovines || [];

  const allMale = selectedAnimals.every(
    (animal) =>
      bovines.find((bovine) => bovine.id === animal)?.attributes?.genre === "M"
  );

  return (
    <>
      <AnimalList
        type="bovines"
        selectedAnimals={selectedAnimals}
        onSelect={toggleAnimalSelection}
        animals={bovines}
      />
      {selectedAnimals.length > 0 ? (
        <div className=" bottom-0  border-t bg-white/80 w-full">
          <div className="container h-full justify-around flex items-center text-muted-foreground">
            <Dialog>
              <DialogTrigger className="flex-1 py-2">
                <div className="h-full justify-center flex-col flex items-center flex-1">
                  <BiFoodMenu className="text-xl" />
                  <span className="text-xs">Dieta</span>
                </div>
              </DialogTrigger>
              <DialogContent className=" flex flex-col h-auto  sm:max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Plan de Alimentacion</DialogTitle>
                  <DialogDescription>
                    Parametros del plan de alimentacion
                  </DialogDescription>
                </DialogHeader>
                <DietForm
                  type="bovines"
                  resetSelection={resetSelection}
                  selectedAnimals={selectedAnimals}
                >
                  <DialogFooter className="flex-row gap-x-2 mt-4">
                    <DialogClose className="flex-1">
                      <Button
                        type="button"
                        size="lg"
                        className="w-full"
                        variant="outline"
                      >
                        Cancelar
                      </Button>
                    </DialogClose>
                    <Button type="submit" size="lg" className="flex-1 px-0">
                      Agregar
                    </Button>
                  </DialogFooter>
                </DietForm>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger className="flex-1 py-2">
                <div className="h-full justify-center flex-col flex items-center flex-1">
                  <TbWeight className="text-xl" />
                  <span className="text-xs">Peso</span>
                </div>
              </DialogTrigger>
              <DialogContent className=" flex flex-col h-auto  sm:max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Pesaje</DialogTitle>
                  <DialogDescription>Parametros del pesaje</DialogDescription>
                </DialogHeader>
                <WeightForm
                  type="bovines"
                  resetSelection={resetSelection}
                  selectedAnimals={selectedAnimals}
                >
                  <DialogFooter className="flex-row gap-x-2 mt-4">
                    <DialogClose className="flex-1">
                      <Button
                        type="button"
                        size="lg"
                        className="w-full"
                        variant="outline"
                      >
                        Cancelar
                      </Button>
                    </DialogClose>
                    <Button type="submit" size="lg" className="flex-1 px-0">
                      Agregar
                    </Button>
                  </DialogFooter>
                </WeightForm>
              </DialogContent>
            </Dialog>

            {allMale ? (
              <Dialog>
                <DialogTrigger className="flex-1 py-2">
                  <div className="h-full justify-center flex-col flex items-center flex-1">
                    <GiScalpel className="text-xl" />
                    <span className="text-xs">Castración</span>
                  </div>
                </DialogTrigger>
                <DialogContent className=" flex flex-col h-auto  sm:max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>Castracion</DialogTitle>
                    <DialogDescription>
                      Registro de castraciones
                    </DialogDescription>
                  </DialogHeader>
                  <CastrationForm
                    type="bovines"
                    selectedAnimals={selectedAnimals}
                    resetSelection={resetSelection}
                  >
                    <DialogFooter className="flex-row gap-x-2 mt-1">
                      <DialogClose className="flex-1">
                        <Button
                          type="button"
                          size="lg"
                          className="w-full"
                          variant="outline"
                        >
                          Cancelar
                        </Button>
                      </DialogClose>
                      <Button type="submit" size="lg" className="flex-1 px-0">
                        Agregar
                      </Button>
                    </DialogFooter>
                  </CastrationForm>
                </DialogContent>
              </Dialog>
            ) : null}
            <Dialog>
              <DialogTrigger className="flex-1 py-2">
                <div className="h-full justify-center flex-col flex items-center flex-1">
                  <IoMdOptions className="text-xl" />
                  <span className="text-xs">Mas</span>
                </div>
              </DialogTrigger>
              <DialogContent className=" h-auto   sm:max-w-3xl">
                <DialogHeader >
                  <DialogTitle className="text-center">Opciones</DialogTitle>
                  <DialogDescription className="text-center">Selecciona una opción</DialogDescription>
                </DialogHeader>
                <ModalOptions
                  type="bovines"
                  resetSelection={resetSelection}
                  selectedAnimals={selectedAnimals}
                >
                  <DialogFooter className="flex-row gap-x-2 mt-4">
                    <DialogClose className="flex-1">
                      <Button
                        type="button"
                        size="lg"
                        className="w-full"
                        variant="outline"
                      >
                        Cancelar
                      </Button>
                    </DialogClose>
                    <Button type="submit" size="lg" className="flex-1 px-0">
                      Agregar
                    </Button>
                  </DialogFooter>
                </ModalOptions>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ) : (
        <Dialog>
          <DialogTrigger>
            <div className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 absolute bottom-20 right-6">
              <FaPlus className="me-2" />
              Nuevo animal
            </div>
          </DialogTrigger>
          <DialogContent className=" flex flex-col h-auto  sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>Agregar bovino</DialogTitle>
              <DialogDescription>
                Agregue las características del bovino
              </DialogDescription>
            </DialogHeader>
            <AddAnimalForm type="bovines" animals={bovines}>
              <DialogFooter className="flex-row gap-x-2 mt-4">
                <DialogClose className="flex-1">
                  <Button
                    type="button"
                    size="lg"
                    className="w-full"
                    variant="outline"
                  >
                    Cancelar
                  </Button>
                </DialogClose>
                <Button type="submit" size="lg" className="flex-1 px-0">
                  Agregar
                </Button>
              </DialogFooter>
            </AddAnimalForm>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
