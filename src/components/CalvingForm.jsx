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
import * as z from "zod";
import { useGlobal } from "../contexts/GlobalContext";
import { addToCollection, getCollection } from "../firebase/api";
import AnimalCard from "./AnimalCard";

export function CalvingForm({
  resetSelection,
  type,
  selectedAnimals,
  children,
}) {
  const FormSchema = z.object(
    selectedAnimals.reduce((acc, animalId) => {
      acc[animalId] = z.string().min(1, "La cantidad de crías es obligatoria.");
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

  const onSubmit = async (data) => {
    try {
      const calvings = Object.entries(data).map(
        ([animalId, childrenNumber]) => ({
          animalId,
          childrenNumber,
          date: Timestamp.now(),
          type,
        }),
      );
      // console.log(calvings);

      calvings.forEach((c) => {
        addToCollection(getCollection("calvings", global.farmId), c);
        global.addCalving(c);
      });

      resetSelection();
      form.reset();
    } catch (error) {
      console.error("Error al guardar el parto:", error);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-y-3"
      >
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
                    <FormLabel className="font-semibold">Cantidad</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingrese la cantidad de crías"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </AnimalCard>
              )}
            />
          );
        })}
        {children}
      </form>
    </Form>
  );
}
