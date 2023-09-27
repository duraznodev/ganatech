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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addToCollection, getCollection } from "../firebase/api";

const FormSchema = z.object({
  foodType: z.string().min(1, "El tipo de alimento es requerido"),
  foodAmount: z.string().min(1, "La cantidad de alimento es requerida"),
});

export default function DietForm({
  resetSelection,
  type,
  selectedAnimals,
  children,
}) {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      foodType: "",
      foodAmount: "",
    },
  });

  function onSubmit(data) {
    addToCollection(getCollection("diets"), {
      ...data,
      type,
      animals: selectedAnimals,
    });

    resetSelection();
    form.reset();
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-3 w-full"
        >
          <FormField
            className="grid w-full max-w-sm items-center gap-y-1.5"
            control={form.control}
            name="foodType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">
                  Tipo de Alimento
                </FormLabel>
                <FormControl>
                  <Input placeholder="Tipo de alimento" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            className="grid w-full max-w-sm items-center gap-y-1.5"
            control={form.control}
            name="foodAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">
                  Cantidad de Alimento
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Cantidad de alimento"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <span className="text-sm text-muted-foreground">
            Agregar a {selectedAnimals?.length} animales
          </span>
          {children}
        </form>
      </Form>
    </>
  );
}
