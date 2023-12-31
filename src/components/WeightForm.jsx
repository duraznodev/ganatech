import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Timestamp } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useGlobal } from "../contexts/GlobalContext";
import { addToCollection, getCollection } from "../firebase/api";
import AnimalCard from "./AnimalCard";

export default function WeightForm({
  resetSelection,
  type,
  selectedAnimals,
  children,
}) {
  const FormSchema = z.object(
    selectedAnimals.reduce((acc, animalId) => {
      acc[animalId] = z.string().min(1, "El peso es requerido");
      return acc;
    }, {}),
  );

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: selectedAnimals.reduce((acc, animalId) => {
      acc[animalId] = "";
      return acc;
    }, {}),
  });

  const global = useGlobal();
  const animals = global[type] || [];

  function onSubmit(data) {
    const weights = Object.entries(data).map(([animalId, weight]) => ({
      animalId,
      weight,
      date: Timestamp.now(),
      type,
    }));

    weights.forEach((w) => {
      addToCollection(getCollection("weight_history", global.farmId), w);
      global.addWeightHistory(w);
    });

    resetSelection();
    form.reset();
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-y-3 "
        >
          <div className="flex max-h-[70vh] w-full flex-col gap-y-3 overflow-scroll">
            {selectedAnimals.map((animalId) => {
              const animal = animals.find((animal) => animal.id === animalId);
              return (
                <FormField
                  key={animalId}
                  className="grid w-full max-w-sm items-center gap-y-1.5"
                  control={form.control}
                  name={animalId}
                  render={({ field }) => (
                    <AnimalCard
                      interaction={false}
                      type={type}
                      className="flex-1"
                      badges={false}
                      simple
                      {...animal}
                    >
                      <FormItem className="flex flex-col items-start">
                        <FormLabel className="font-semibold">Peso</FormLabel>
                        <FormControl>
                          <Input placeholder="Ingrese el peso" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </AnimalCard>
                  )}
                />
              );
            })}
          </div>
          {children}
        </form>
      </Form>
    </>
  );
}
