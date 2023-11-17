import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { ref } from "firebase/storage";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useGlobal } from "../contexts/GlobalContext";
import { newFarm, uploadFile } from "../firebase/api";
import { firebase_storage } from "../firebase/config";

const FormSchema = z.object({
  name: z.string().min(1, "El nombre de la finca es requerido"),
  iron: z.any(),
});

export default function NewFarmForm({ type, selectedAnimals, children }) {
  const { setIronImgRef, user, setFarmId } = useGlobal();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      iron: "",
    },
  });

  async function onSubmit(data) {
    if (data?.name) {
      newFarm({
        name: data.name,
        owners: [user.uid],
      }).then(async (farm) => {
        const ironImgPath = `images/${farm.id}.png`;
        const ironImgRef = ref(firebase_storage, ironImgPath);

        if (image) {
          await uploadFile(image, ironImgRef);
        }

        setFarmId(farm.id);
        setIronImgRef(ironImgRef);
        navigate("/");
      });
    }
    form.reset();
  }

  return (
    <>
      <Form {...form}>
        <form
          encType="multipart/form-data"
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-y-3"
        >
          <FormField
            className="grid w-full max-w-sm items-center gap-y-1.5"
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">
                  Nombre de la Finca
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ingrese el nombre de su finca"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-2">
            <Label htmlFor="iron" className="font-semibold">
              Fierro
            </Label>
            <Input
              type="file"
              accept="image/* "
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
          </div>
          {children}
        </form>
      </Form>
    </>
  );
}
