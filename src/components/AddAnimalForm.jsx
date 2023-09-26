import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaMars, FaPlus, FaVenus } from "react-icons/fa6";
import * as z from "zod";
import { addToCollection, getCollection } from "../firebase/api";
import { useSelectAnimal } from "../hooks/useSelectAnimal";
import AnimalList from "./AnimalList";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

const FormSchemaAdd = z.object({
  earring: z
    .string()
    .min(4, {
      message: "La chapa debe tener 4 digitos",
    })
    .max(4, {
      message: "La chapa debe tener 4 digitos",
    }),
  genre: z.string(),
  weight: z
    .string()
    .min(2, {
      message: "Ingrese una cantidad valida",
    })
    .max(4, {
      message: "Ingrese una cantidad valida",
    }),
  breed: z
    .string()
    .min(3, {
      message: "Ingrese una raza valida",
    })
    .max(30, {
      message: "Ingrese una raza valida",
    }),
  father: z.string().nullable(),
  mother: z.string().nullable(),
});

export default function AddAnimalForm({ children, animals, type }) {
  const {
    selectedAnimal: selectedFather,
    toggleAnimalSelection: toggleFatherSelection,
  } = useSelectAnimal();
  const {
    selectedAnimal: selectedMother,
    toggleAnimalSelection: toggleMotherSelection,
  } = useSelectAnimal();

  const masculineAnimals = animals.filter(
    (animal) => animal?.attributes?.genre === "M"
  );

  const femenineAnimals = animals.filter(
    (animal) => animal?.attributes?.genre === "F"
  );

  const form = useForm({
    resolver: zodResolver(FormSchemaAdd),
    defaultValues: {
      earring: "",
      genre: "",
      weight: "",
      father: "",
      mother: "",
      breed: "",
    },
  });

  useEffect(() => {
    form.setValue("father", selectedFather);
    form.setValue("mother", selectedMother);
  }, [selectedFather, selectedMother]);

  async function onSubmit(data) {
    toggleFatherSelection("");
    toggleFatherSelection("");
    const animal = {
      ...data,
      weight: Number(data.weight),
    };
    const submitedAnimal = await addToCollection(getCollection(type), animal);
    console.log(submitedAnimal);

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
            name="earring"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Numero de chapa</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="1234" {...field} />
                </FormControl>
                {/* <FormDescription>
                Este es el numero de chapa de la vaca
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            className="flex flex-col gap-y-1.5"
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="font-semibold">
                  Sexo del animal.
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    // defaultValue="option-one"
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-y-0 space-x-2">
                      <FormControl className="text-blue-500">
                        <RadioGroupItem
                          className="border-blue-500"
                          value="male"
                          id="option-one"
                        />
                      </FormControl>
                      <FormLabel className="text-[14px]">Macho</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl className="text-pink-500">
                        <RadioGroupItem
                          className="border-pink-500 appearance-none checked:border-blue-500"
                          value="female"
                          id="option-two"
                        />
                      </FormControl>
                      <FormLabel className="text-[14px]">Hembra</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            className="flex flex-col gap-y-1.5"
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Peso del animal</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="400..." {...field} />
                </FormControl>
                {/* <FormDescription>Ingrese el peso de el animal</FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            className="flex flex-col gap-y-1.5"
            control={form.control}
            name="breed"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Raza del bovino</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Brahman..." {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            className="flex flex-col gap-2"
            control={form.control}
            name="father"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="font-semibold">Padre</FormLabel>
                <FormControl>
                  <Dialog>
                    <DialogTrigger>
                      {selectedFather ? (
                        <button
                          type="button"
                          className="flex h-10 w-full items-center gap-x-2 font-medium rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <FaMars className="text-blue-500" />
                          {
                            animals.find(
                              (animal) => animal.id === selectedFather
                            )?.name
                          }
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="flex h-10 w-full items-center text-muted-foreground gap-x-2 font-medium rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <FaPlus /> Elegir un padre
                        </button>
                      )}
                    </DialogTrigger>
                    <DialogContent>
                      <div className="container h-[80vh]  flex flex-col gap-y-6">
                        <AnimalList
                          multiple={false}
                          onSelect={toggleFatherSelection}
                          simple
                          animals={masculineAnimals}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                  {/* <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un padre" />
                    </SelectTrigger>
                    <SelectContent>
                      {animals
                        .filter((animal) => animal.attributes?.genre === "M")
                        .map((animal) => (
                          <SelectItem key={animal.id} value={animal.id}>
                            {animal.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select> */}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            className="flex flex-col gap-2"
            control={form.control}
            name="mother"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="font-semibold">Madre</FormLabel>
                <FormControl>
                  <Dialog>
                    <DialogTrigger>
                      {selectedMother ? (
                        <button
                          type="button"
                          className="flex h-10 w-full items-center gap-x-2 font-medium rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <FaVenus className="text-rose-500" />

                          {
                            animals.find(
                              (animal) => animal.id === selectedMother
                            )?.name
                          }
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="flex h-10 w-full items-center text-muted-foreground gap-x-2 font-medium rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <FaPlus /> Elegir una madre
                        </button>
                      )}
                    </DialogTrigger>
                    <DialogContent>
                      <div className="container h-[80vh]  flex flex-col gap-y-6">
                        <AnimalList
                          multiple={false}
                          onSelect={toggleMotherSelection}
                          simple
                          animals={femenineAnimals}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                  {/* <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un padre" />
                    </SelectTrigger>
                    <SelectContent>
                      {animals
                        .filter((animal) => animal.attributes?.genre === "M")
                        .map((animal) => (
                          <SelectItem key={animal.id} value={animal.id}>
                            {animal.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select> */}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {children}
        </form>
      </Form>
    </>
  );
}
