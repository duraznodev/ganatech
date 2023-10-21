import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useGlobal } from "../contexts/GlobalContext";
import { addToCollection, getCollection } from "../firebase/api";
import { Timestamp } from "firebase/firestore";
import AnimalCard from "./AnimalCard";

export function VaccineForm({
    resetSelection,
    type,
    selectedAnimals,
    children,
}) {
    const FormSchema = z.object(
        selectedAnimals.reduce((acc, animalId) => {
            acc[animalId] = z.string().min(2, "La vacuna es obligatoria");
            return acc;
        }, {})
    );

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: selectedAnimals.reduce((acc, animalId) => {
            acc[animalId] = "";
            return acc;
        }, {}),
    });

    const global = useGlobal();
    console.log(global)
    const animals = global[type] || [];

    const onSubmit = async (data) => {
        try {
            const vaccines = Object.entries(data).map(
                ([animalId, VaccineType]) => ({
                    animalId,
                    VaccineType,
                    // date: Timestamp.fromDate(calvingDate),
                    date: Timestamp.now(),
                    type,
                })
            );
            // console.log(calvings);

            vaccines.forEach((c) => {
                addToCollection(getCollection("vaccines", global.farmId), c);
                global.addVaccines(c);
            });

            // const collection = await addToCollection(getCollection("calvings", farmId), {
            //     ...data,
            //     type,
            //     calvingDate: formattedDate,
            //     animals: selectedAnimals,
            // });

            // console.log(collection)
            // addCalving({ ...data, id: collection.id, type, animals: selectedAnimals });
            resetSelection();
            form.reset();
        } catch (error) {
            console.error("Error al guardar la vacuna:", error);
        }
    };
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-y-3 w-full"
            >
                {selectedAnimals.map((animalId) => {
                    const animal = animals.find((animal) => animal.id === animalId);
                    return (
                        // <FormField
                        //     className="grid w-full max-w-sm items-center gap-y-1.5"
                        //     control={form.control}
                        //     name="calvingDate"
                        //     render={({ field }) => (
                        //         <FormItem className="flex flex-col">
                        //             <FormLabel>Fecha de Parto</FormLabel>
                        //             <Popover>
                        //                 <PopoverTrigger asChild>
                        //                     <FormControl>
                        //                         <Button
                        //                             variant={"outline"}
                        //                             className="pl-3 text-left font-normal"
                        //                         >
                        //                             {field.value ? (
                        //                                 format(field.value, "PPP")
                        //                             ) : (
                        //                                 <span>Selecciona una fecha</span>
                        //                             )}
                        //                             <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        //                         </Button>
                        //                     </FormControl>
                        //                 </PopoverTrigger>
                        //                 <PopoverContent className="w-auto p-0" align="start">
                        //                     <Calendar
                        //                         mode="single"
                        //                         selected={field.value}
                        //                         onSelect={field.onChange}
                        //                         disabled={(date) =>
                        //                             date > new Date() || date < new Date("1900-01-01")
                        //                         }
                        //                         initialFocus
                        //                     />
                        //                 </PopoverContent>
                        //             </Popover>
                        //             <FormMessage />
                        //         </FormItem>
                        //     )}
                        // />,
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
                                        <FormLabel className="font-semibold">Tipo</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Ingrese la vacuna"
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

                {/* <span className="text-sm text-muted-foreground">
                    Agregar a {selectedAnimals?.length} animales
                </span> */}
                {children}
            </form>
        </Form>
    );
}
