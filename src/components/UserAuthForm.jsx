import * as React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaSpinner } from "react-icons/fa";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import signUp from "@/firebase/auth/signup";
import signIn from "@/firebase/auth/signin";

const formAuth = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export function UserAuthForm({ className, ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const form = useForm({
    resolver: zodResolver(formAuth),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit() {
    setIsLoading(true);
    const { email, password } = form.getValues();
    const options = {
      login: signIn,
      register: signUp,
    };
    const resp = await options[props?.type](email, password);
    if (resp?.error) {
      setError(resp.error);
      setIsLoading(false);
    }
    if (resp?.result) {
      setError(null);
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-y-3", className)} {...props}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4 w-full"
        >
          <div className="flex flex-col gap-y-2 w-full">
            <FormField
              className="grid w-full max-w-sm items-center gap-y-1.5"
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Ingresa tu email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              className="grid w-full max-w-sm items-center gap-y-1.5"
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Ingresa tu contraseña"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && (
              <Label className="text-red-500">Ha ocurrido un Error</Label>
            )}
          </div>
          <Button disabled={isLoading}>
            {isLoading && <FaSpinner className="mr-2 h-4 w-4 animate-spin" />}
            {props.type === "login" ? "Iniciar sesión" : "Crear cuenta"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
