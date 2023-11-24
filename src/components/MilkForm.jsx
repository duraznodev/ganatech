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
import { useGlobal } from "../contexts/GlobalContext";
import AnimalCard from "./AnimalCard";
import { Timestamp } from "firebase/firestore";

export default function MilkForm({
    resetSelection,
    type,
    selectedAnimals,
    children,
}) {
    const FormSchema = z.object(
        selectedAnimals.reduce((acc, animalId) => {
            acc[animalId] = z.string().min(1, "Los litros son requeridos");
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
    const animals = global[type] || [];

    function onSubmit(data) {
        const milks = Object.entries(data).map(([animalId, milk]) => ({
            animalId,
            milk,
            date: Timestamp.now(),
            type,
        }));

        milks.forEach((m) => {
            addToCollection(getCollection("milk_history",global.farmId), m);
            global.addMilkHistory(m);
        });

        resetSelection();
        form.reset();
    }

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-y-3 w-full "
                >
                    <div className="flex flex-col gap-y-3 w-full max-h-[70vh] overflow-scroll">
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
                                                <FormLabel className="font-semibold">Litros</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Ingrese los litros de leche" {...field} />
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