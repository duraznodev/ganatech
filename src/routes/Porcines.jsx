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
import { BiFoodMenu } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import { GiScalpel } from "react-icons/gi";
import { IoMdOptions } from "react-icons/io";
import { TbWeight } from "react-icons/tb";
import AddAnimalForm from "../components/AddAnimalForm";
import AnimalList from "../components/AnimalList";
import { CastrationForm } from "../components/CastrationForm";
import DietForm from "../components/DietForm";
import ModalOptions from "../components/ModalOptions";
import WeightForm from "../components/WeightForm";
import { useGlobal } from "../contexts/GlobalContext";
import { useSelectedAnimals } from "../hooks/useSelectedAnimals";
export default function Porcines() {
  const { selectedAnimals, resetSelection, toggleAnimalSelection } =
    useSelectedAnimals();
  const global = useGlobal();
  const porcines = global?.porcines || [];

  const allMale = selectedAnimals.every(
    (animal) =>
      porcines.find((porcine) => porcine.id === animal)?.attributes?.genre ===
      "M",
  );

  return (
    <>
      <AnimalList
        type="porcines"
        selectedAnimals={selectedAnimals}
        onSelect={toggleAnimalSelection}
        animals={porcines}
      />
      {selectedAnimals.length > 0 ? (
        <div className=" bottom-0  w-full border-t bg-white/80">
          <div className="container flex h-full items-center justify-around text-muted-foreground">
            <Dialog>
              <DialogTrigger className="flex-1 py-2">
                <div className="flex h-full flex-1 flex-col items-center justify-center">
                  <BiFoodMenu className="text-xl" />
                  <span className="text-xs">Dieta</span>
                </div>
              </DialogTrigger>
              <DialogContent className=" flex h-auto flex-col  sm:max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Plan de Alimentación</DialogTitle>
                  <DialogDescription>
                    Parámetros del plan de alimentación
                  </DialogDescription>
                </DialogHeader>
                <DietForm
                  type="porcines"
                  resetSelection={resetSelection}
                  selectedAnimals={selectedAnimals}
                >
                  <DialogFooter className="mt-4 flex-row gap-x-2">
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
                <div className="flex h-full flex-1 flex-col items-center justify-center">
                  <TbWeight className="text-xl" />
                  <span className="text-xs">Peso</span>
                </div>
              </DialogTrigger>
              <DialogContent className=" flex h-auto flex-col  sm:max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Pesaje</DialogTitle>
                  <DialogDescription>Parámetros del pesaje</DialogDescription>
                </DialogHeader>
                <WeightForm
                  type="porcines"
                  resetSelection={resetSelection}
                  selectedAnimals={selectedAnimals}
                >
                  <DialogFooter className="mt-4 flex-row gap-x-2">
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
                  <div className="flex h-full flex-1 flex-col items-center justify-center">
                    <GiScalpel className="text-xl" />
                    <span className="text-xs">Castración</span>
                  </div>
                </DialogTrigger>
                <DialogContent className=" flex h-auto flex-col  sm:max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>Castración</DialogTitle>
                    <DialogDescription>
                      Registro de castraciones
                    </DialogDescription>
                  </DialogHeader>
                  <CastrationForm
                    type="porcines"
                    selectedAnimals={selectedAnimals}
                    resetSelection={resetSelection}
                  >
                    <DialogFooter className="mt-1 flex-row gap-x-2">
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
                <div className="flex h-full flex-1 flex-col items-center justify-center">
                  <IoMdOptions className="text-xl" />
                  <span className="text-xs">Mas</span>
                </div>
              </DialogTrigger>
              <DialogContent className=" flex h-auto flex-col  sm:max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Opciones</DialogTitle>
                  <DialogDescription>Selecciona una opción</DialogDescription>
                </DialogHeader>
                <ModalOptions
                  type="porcines"
                  resetSelection={resetSelection}
                  selectedAnimals={selectedAnimals}
                >
                  <DialogFooter className="mt-4 flex-row gap-x-2">
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
            <div className="absolute bottom-20 right-6 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
              <FaPlus className="me-2" />
              Nuevo animal
            </div>
          </DialogTrigger>
          <DialogContent className="flex h-full flex-col overflow-auto  sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>Agregar porcino</DialogTitle>
              <DialogDescription>
                Agregue las características del porcino
              </DialogDescription>
            </DialogHeader>
            <AddAnimalForm type="porcines" animals={porcines}>
              <DialogFooter className="mt-4 flex-row gap-x-2">
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
