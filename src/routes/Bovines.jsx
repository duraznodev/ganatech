import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import {
  FaCircle,
  FaFilter,
  FaHeart,
  FaMars,
  FaPlus,
  FaVenus,
} from "react-icons/fa6";
import { GiCow, GiPig } from "react-icons/gi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import AnimalCard from "../components/AnimalCard";
import { useState } from "react";
import { useEffect } from "react";
import { allFromCollection, getCollection } from "../firebase/api";
import AnimalList from "../components/AnimalList";
import { useSelectedAnimals } from "../hooks/useSelectedAnimals";
import { weightHistoryFactory } from "../firebase/factories";
import { seeder } from "../firebase/seeder";

export default function Bovines() {
  const { selectedAnimals, toggleAnimalSelection } = useSelectedAnimals();
  const [bovines, setBovines] = useState([]);
  useEffect(() => {
    const init = async () => {
      setBovines(await allFromCollection(getCollection("bovines")));
    };
    init();
  }, []);
  return (
    <>
      <div className="container h-screen py-6 flex flex-col gap-y-6">
        <AnimalList
          selectedAnimals={selectedAnimals}
          onSelect={toggleAnimalSelection}
          animals={bovines}
        />
        <div className="h-28"></div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="absolute bottom-20 right-6">
              <FaPlus className="me-2" />
              Nuevo animal
            </Button>
          </DialogTrigger>
          <DialogContent className=" flex flex-col h-auto  sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>Agregar bovino</DialogTitle>
              <DialogDescription>
                Agregue las caracteristicas del bovino
              </DialogDescription>
            </DialogHeader>
            <form>
              <div className="flex flex-col gap-y-3 w-full">
                <div className="grid w-full max-w-sm items-center gap-y-1.5">
                  <Label className="font-semibold" htmlFor="number">
                    Numero de chapa
                  </Label>
                  <Input type="number" id="number" placeholder="001" />
                </div>
                <div className="flex flex-col gap-y-1.5">
                  <Label className="font-semibold">Sexo del animal</Label>
                  <RadioGroup defaultValue="option-one">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        className="border-blue-500"
                        value="option-one"
                        id="option-one"
                      />
                      <Label className="text-[14px]" htmlFor="option-one">
                        Macho
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        className="border-pink-500 appearance-none checked:border-blue-500"
                        value="option-two"
                        id="option-two"
                      />
                      <Label className="text-[14px]" htmlFor="option-two">
                        Hembra
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="grid w-full max-w-sm items-center gap-y-2.5">
                  <div className="flex flex-col gap-y-1.5">
                    <Label className="font-semibold" htmlFor="peso">
                      Peso del animal
                    </Label>
                    <Input type="number" id="peso" placeholder="400..." />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label className="font-semibold">Padre</Label>
                    <Combobox
                      data={bovines
                        .filter((bovine) => bovine.attributes?.genre === "M")
                        .map((bovine) => ({
                          value: bovine.id,
                          label: bovine.name,
                        }))}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label className="font-semibold">Madre</Label>
                    <Combobox
                      data={bovines
                        .filter((bovine) => bovine.attributes?.genre === "F")
                        .map((bovine) => ({
                          value: bovine.id,
                          label: bovine.name,
                        }))}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label className="font-semibold" htmlFor="raza">
                      Raza del bovino
                    </Label>
                    <Input type="text" id="raza" placeholder="Brahman..." />
                  </div>
                </div>
              </div>
              <DialogFooter className="flex-row gap-x-2 mt-4">
                <Button className="flex-1" size="lg" variant="outline">
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1" size="lg">
                  Agregar
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
