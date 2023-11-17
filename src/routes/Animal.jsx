import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiEditAlt, BiFoodMenu } from "react-icons/bi";
import { FaBirthdayCake } from "react-icons/fa";
import { FaMars, FaPlus, FaVenus } from "react-icons/fa6";
import { MdVaccines } from "react-icons/md";
import { TbWeight } from "react-icons/tb";
import { Link, useParams } from "react-router-dom";
import * as z from "zod";
import AnimalCard from "../components/AnimalCard";
import AnimalList from "../components/AnimalList";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useGlobal } from "../contexts/GlobalContext";
import { updateInCollection } from "../firebase/api";
import { useSelectAnimal } from "../hooks/useSelectAnimal";

const formSchema = z.object({
  father_id: z.string().nullable(),
  mother_id: z.string().nullable(),
  breed: z.string().nullable(),
  genre: z.string().nullable(),
  purposes: z.string().nullable(),
  weight: z.string().nullable(),
});

export default function Animal({ type }) {
  const { id } = useParams();
  const state = useGlobal();
  const animals = state?.[type] || [];
  const animal = animals.find((_animal) => _animal.id === id);
  const father = animals.find((_animal) => _animal.id === animal?.father_id);
  const mother = animals.find((_animal) => _animal.id === animal?.mother_id);

  const castrationDate = animal?.castrationDate;
  const castrationDateJs = castrationDate?.toDate();

  const [initialValues, setInitialValues] = useState({
    father_id: animal?.father_id || "",
    mother_id: animal?.mother_id || "",
    breed: animal?.breed || "",
    genre: animal?.genre || "",
    purposes: animal?.purposes || "",
    weight: animal?.weight || "",
  });
  const global = useGlobal();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

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

  const feminineAnimals = animals.filter(
    (animal) => animal?.attributes?.genre === "F"
  );

  const onSubmit = async (data) => {
    toggleFatherSelection("");
    toggleMotherSelection("");

    const updatedFields = {};

    Object.keys(data).forEach((key) => {
      if (data[key] !== initialValues[key]) {
        updatedFields[key] = data[key];
      }
    });

    if (Object.keys(updatedFields).length === 0) {
      return;
    }

    try {
      const { success, error } = await updateInCollection(
        type,
        id,
        updatedFields,
        global.farmId
      );
      if (success) {
        state.updateAnimal(type, id, updatedFields);
        form.reset();
      } else {
        console.error("Error updating document:", error);
      }
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  return (
    <>
      <AnimalCard type={type} {...animal} simple />
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Información General:</CardTitle>
        </CardHeader>
        <CardContent className="">
          <div>
            <span className="font-semibold text-sm">Padre:</span>{" "}
            <span className="text-sm">{father?.name}</span>
          </div>
          <div>
            <span className="font-semibold text-sm">Madre:</span>{" "}
            <span className="text-sm">{mother?.name}</span>
          </div>
          <div>
            <span className="font-semibold text-sm">Raza:</span>{" "}
            <span className="text-sm">{animal?.breed}</span>
          </div>
          <div>
            <span className="font-semibold text-sm">Genero:</span>{" "}
            <span className="text-sm">
              {" "}
              {animal?.attributes?.genre === "M" ? "Macho" : "Hembra"}
            </span>
          </div>
          <div>
            <span className="font-semibold text-sm">Peso Actual:</span>{" "}
            <span className="text-sm">
              {Number(animal?.weight).toFixed(2)} L
            </span>
          </div>
          <div>
            <span className="font-semibold text-sm">Propósito: </span>
            <span className="text-sm">{animal?.purposes}</span>
          </div>

          {animal?.attributes.genre === "M" ? (
            <div>
              <span className="font-semibold text-sm">Fecha Castración: </span>
              <span className="text-sm">
                {castrationDateJs
                  ? castrationDateJs.toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
          ) : (
            ""
          )}
        </CardContent>
      </Card>

      <Dialog>
        <DialogTrigger className="flex justify-center">
          <Button type="submit" className="flex gap-2">
            <BiEditAlt />
            Editar Información
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Información del Animal</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-y-3 w-full"
            >
              <FormField
                className="flex flex-col gap-2"
                control={form.control}
                name="fatherName"
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
                              type={type}
                              multiple={false}
                              onSelect={(animalId) => {
                                toggleFatherSelection(animalId);
                                form.setValue("father_id", animalId);
                              }}
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
                name="motherName"
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
                              type={type}
                              multiple={false}
                              onSelect={(animalId) => {
                                toggleMotherSelection(animalId);
                                form.setValue("mother_id", animalId);
                              }}
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
                className="grid w-full max-w-sm items-center gap-y-1.5"
                control={form.control}
                name="breed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Raza</FormLabel>
                    <FormControl>
                      <Input placeholder="Reescribe la raza" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                className="grid w-full max-w-sm items-center gap-y-1.5"
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Peso</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Ingrese el peso"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {animal?.hasOwnProperty("earring") ? (
                animal.attributes?.genre === "M" ? (
                  <FormField
                    className="flex flex-col gap-y-1.5"
                    control={form.control}
                    name="purposes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">
                          Propósitos
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona un propósito" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Trabajo">Trabajo</SelectItem>
                              <SelectItem value="Producción de carne">
                                Producción de carne
                              </SelectItem>
                              <SelectItem value="Reproducción">
                                Reproducción
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <FormField
                    className="flex flex-col gap-y-1.5"
                    control={form.control}
                    name="purposes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">
                          Propósitos
                        </FormLabel>
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
                              <SelectItem value="Reproducción">
                                Reproducción
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )
              ) : (
                <FormField
                  className="flex flex-col gap-y-1.5"
                  control={form.control}
                  name="purposes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        Propósitos
                      </FormLabel>
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
                            <SelectItem value="Reproducción">
                              Reproducción
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <Button type="submit">Actualizar</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Registros</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3">
          <div className="  rounded-lg border bg-card text-card-foreground shadow-sm flex-1 items-center justify-center flex">
            <Link
              to="diets"
              className="gap-x-2 justify-center flex-1 py-4 text-lg items-center font-semibold flex"
            >
              <BiFoodMenu className="text-xl" />
              Dietas
            </Link>
          </div>
          <div className="  rounded-lg border bg-card text-card-foreground shadow-sm flex-1 items-center justify-center flex">
            <Link
              to="weight_history"
              className="gap-x-2 justify-center flex-1 py-4 text-lg items-center font-semibold flex"
            >
              <TbWeight className="text-xl" />
              Pesajes
            </Link>
          </div>
          <div className="  rounded-lg border bg-card text-card-foreground shadow-sm flex-1 items-center justify-center flex">
            <Link
              to="calving"
              className="gap-x-2 justify-center flex-1 py-4 text-lg items-center font-semibold flex"
            >
              <FaBirthdayCake className="text-xl" />
              Partos
            </Link>
          </div>

          <div className="  rounded-lg border bg-card text-card-foreground shadow-sm flex-1 items-center justify-center flex">
            <Link
              to="vaccine"
              className="gap-x-2 justify-center flex-1 py-4 text-lg items-center font-semibold flex"
            >
              <MdVaccines className="text-xl" />
              Vacunas
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
