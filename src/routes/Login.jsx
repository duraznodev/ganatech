import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "@/components/UserAuthForm";
import { AuthAside } from "../components/AuthAside";

export default function Login() {
  return (
    <>
      <div className="container relative h-screen  flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          to="/register"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8 md:inline-flex"
          )}
        >
          Crear una cuenta
        </Link>
        <AuthAside type="login" />
        <div className="lg:p-8 ">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Ingresa a tu cuenta
              </h1>
              <p className="text-sm text-muted-foreground">
                Ingresa tu email y contraseña para acceder a tu cuenta
              </p>
            </div>
            <UserAuthForm type="login" />
          </div>
        </div>
      </div>
    </>
  );
}
