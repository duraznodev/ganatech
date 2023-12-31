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
import { useGlobal } from "../contexts/GlobalContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addToCollection, getCollection } from "../firebase/api";
import { useSelectAnimal } from "../hooks/useSelectAnimal";
import AnimalList from "./AnimalList";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

const FormSchemaAdd = z.object({
  earring: z.string().nullable(),
  name: z.string().nullable(),
  genre: z.string(),
  weight: z.string().nullable(),
  breed: z.string().nullable(),
  father_id: z.string().nullable(),
  mother_id: z.string().nullable(),
  purposes: z.string().nullable(),
});

export default function AddAnimalForm({ children, animals, type }) {
  const { addAnimal, farmId } = useGlobal();
  const {
    selectedAnimal: selectedFather,
    toggleAnimalSelection: toggleFatherSelection,
  } = useSelectAnimal();
  const {
    selectedAnimal: selectedMother,
    toggleAnimalSelection: toggleMotherSelection,
  } = useSelectAnimal();

  const masculineAnimals = animals.filter(
    (animal) => animal?.attributes?.genre === "M",
  );

  const feminineAnimals = animals.filter(
    (animal) => animal?.attributes?.genre === "F",
  );

  const form = useForm({
    resolver: zodResolver(FormSchemaAdd),
    defaultValues: {
      name: "",
      earring: "",
      genre: null,
      weight: "",
      father_id: "",
      mother_id: "",
      breed: "",
      purposes: "",
    },
  });

  useEffect(() => {
    form.setValue("father_id", selectedFather);
    form.setValue("mother_id", selectedMother);
  }, [selectedFather, selectedMother]);

  async function onSubmit(data) {
    toggleFatherSelection("");
    toggleMotherSelection("");
    const animal = {
      ...data,
      attributes: {
        genre: data.genre,
      },
      weight: Number(data.weight),
      purposes: data.purposes,
      name: data.name.trim()
        ? data.name.trim()
        : `${
            type === "bovines" ? "Bovino" : "Porcino"
          } ${new Date().getTime()}`,
    };
    animal.genre = null;
    const submittedAnimal = await addToCollection(
      getCollection(type, farmId),
      animal,
    );

    addAnimal(type, {
      ...animal,
      id: submittedAnimal.id,
    });

    form.reset();
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full grid-cols-1 gap-y-3"
        >
          <FormField
            className="grid w-full max-w-sm items-center gap-y-1.5"
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre del animal" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl className="text-blue-500">
                        <RadioGroupItem
                          className="border-blue-500"
                          value="M"
                          id="option-one"
                        />
                      </FormControl>
                      <FormLabel className="text-[14px]">Macho</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl className="text-pink-500">
                        <RadioGroupItem
                          className="appearance-none border-pink-500 checked:border-blue-500"
                          value="F"
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
                <FormLabel className="font-semibold">
                  Raza del {type === "bovines" ? "bovino" : "cerdo"}
                </FormLabel>
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
            name="father_id"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="font-semibold">Padre</FormLabel>
                <FormControl>
                  <Dialog>
                    <DialogTrigger>
                      {selectedFather ? (
                        <button
                          type="button"
                          className="flex h-10 w-full items-center gap-x-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <FaMars className="text-blue-500" />
                          {
                            animals.find(
                              (animal) => animal.id === selectedFather,
                            )?.name
                          }
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="flex h-10 w-full items-center gap-x-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium text-muted-foreground ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <FaPlus /> Elegir un padre
                        </button>
                      )}
                    </DialogTrigger>
                    <DialogContent>
                      <div className="container flex  h-[80vh] flex-col gap-y-6">
                        <AnimalList
                          type={type}
                          multiple={false}
                          onSelect={toggleFatherSelection}
                          simple
                          animals={masculineAnimals}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            className="flex flex-col gap-2"
            control={form.control}
            name="mother_id"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="font-semibold">Madre</FormLabel>
                <FormControl>
                  <Dialog>
                    <DialogTrigger>
                      {selectedMother ? (
                        <button
                          type="button"
                          className="flex h-10 w-full items-center gap-x-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <FaVenus className="text-rose-500" />

                          {
                            animals.find(
                              (animal) => animal.id === selectedMother,
                            )?.name
                          }
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="flex h-10 w-full items-center gap-x-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium text-muted-foreground ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <FaPlus /> Elegir una madre
                        </button>
                      )}
                    </DialogTrigger>
                    <DialogContent>
                      <div className="container flex  h-[80vh] flex-col gap-y-6">
                        <AnimalList
                          type={type}
                          multiple={false}
                          onSelect={toggleMotherSelection}
                          simple
                          animals={feminineAnimals}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            className="flex flex-col gap-y-1.5"
            control={form.control}
            name="purposes"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Propósitos</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un propósito" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Producción de carne">
                        Producción de carne
                      </SelectItem>
                      <SelectItem value="Producción de leche">
                        Producción de leche
                      </SelectItem>
                      <SelectItem value="Reproducción">Reproducción</SelectItem>
                      <SelectItem value="Trabajo">Trabajo</SelectItem>
                    </SelectContent>
                  </Select>
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
