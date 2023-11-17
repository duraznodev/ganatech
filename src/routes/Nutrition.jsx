import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa6";
import AnimalList from "../components/AnimalList";
import { AnimalTypeDialogContent } from "../components/AnimalTypeDialogContent";
import { CardFooter } from "../components/ui/card";
import { allFromCollection, getCollection } from "../firebase/api";
import { useSelectedAnimals } from "../hooks/useSelectedAnimals";

export default function Nutrition() {
  const { register, handleSubmit, setValue, getValues, reset, watch } =
    useForm();
  const { selectedAnimals, toggleAnimalSelection, resetSelection } =
    useSelectedAnimals();
  const [animals, setAnimals] = useState([]);
  const [type, setType] = useState(null);

  useEffect(() => {
    if (type != null) {
      const init = async () => {
        const animals = await allFromCollection(getCollection(type));
        setAnimals(animals);
      };
      init();
    }
  }, [type]);

  const handleTypeSelection = (type) => {
    setType(type);
  };

  const confirmAnimalSelection = () => {
    setValue("selectedAnimals", selectedAnimals);
  };

  const onSubmit = (data) => {
    reset();
    resetSelection();
    setType(null);
  };

  return (
    <>
      <div className="container flex flex-col gap-y-6 py-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold tracking-tight ">
              Plan de Nutrición
            </CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <div className="flex w-full flex-col gap-y-3">
                <div className="grid w-full max-w-sm items-center gap-y-2.5">
                  <div className="flex flex-col gap-y-1.5">
                    <Label className="font-semibold" htmlFor="foodType">
                      Tipo de alimento
                    </Label>
                    <Input
                      id="foodType"
                      {...register("foodType", { required: true })}
                      placeholder="Ej: Pasto"
                      onChange={(e) => setValue("foodType", e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-y-1.5">
                    <Label className="font-semibold" htmlFor="foodAmount">
                      Cantidad de alimento
                    </Label>
                    <Input
                      id="foodAmount"
                      {...register("foodAmount", { required: true })}
                      type="number"
                      min="0"
                      step="0.1"
                      placeholder="Ej: 10 libras"
                      onChange={(e) => setValue("foodAmount", e.target.value)}
                    />
                  </div>
                  <input {...register("selectedAnimals")} type="hidden" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-row gap-x-2 ">
              <Button
                type="button"
                className="flex-1"
                size="lg"
                variant="outline"
              >
                Cancelar
              </Button>
              <Button
                className="flex-1"
                disabled={
                  !getValues("foodType") ||
                  !getValues("foodAmount") ||
                  selectedAnimals.length === 0
                }
                size="lg"
                type="submit"
              >
                Enviar
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="absolute bottom-20 right-6 flex items-center  ">
            <FaPlus className="me-2 leading-none" />
            <span className="leading-none">Animal</span>
          </Button>
        </DialogTrigger>
        {type != null ? (
          <DialogContent className="flex max-h-screen flex-col">
            <DialogHeader>
              <DialogTitle>Agregar animal</DialogTitle>
              <DialogDescription>
                Seleccione el tipo de animal que desea añadir
              </DialogDescription>
            </DialogHeader>
            <AnimalList
              selectedAnimals={selectedAnimals}
              onSelect={toggleAnimalSelection}
              animals={animals}
            />
            <Button onClick={confirmAnimalSelection}>
              Confirmar Selección
            </Button>
          </DialogContent>
        ) : (
          <AnimalTypeDialogContent handleTypeSelection={handleTypeSelection} />
        )}
      </Dialog>
    </>
  );
}
