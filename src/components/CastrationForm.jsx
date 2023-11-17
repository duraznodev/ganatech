import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Timestamp } from "firebase/firestore";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useGlobal } from "../contexts/GlobalContext";
import { updateInCollection } from "../firebase/api";

const FormSchema = z.object({
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
});

export function CastrationForm({
  children,
  type,
  selectedAnimals,
  resetSelection,
}) {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      dob: null,
    },
  });

  const global = useGlobal();

  const onSubmit = async (data) => {
    const castrationDate = data.dob;
    for (const animalId of selectedAnimals) {
      const updatedFields = {
        castrationDate: Timestamp.fromDate(new Date(castrationDate)),
      };

      const response = await updateInCollection(
        `${type}`,
        animalId,
        updatedFields,
        global.farmId,
      );

      // console.log(response);
      if (response.success) {
        global.updateAnimal(type, animalId, updatedFields);
      } else {
        console.error(animalId, "; Error:", response.error);
      }
    }

    resetSelection();
    form.reset();
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-y-3"
        >
          <FormField
            className="grid w-full max-w-sm items-center gap-y-1.5"
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha de Castración</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          " pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Selecciona una fecha</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
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
