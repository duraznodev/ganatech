import { useGlobal } from "@/contexts/GlobalContext";
import { signOut } from "firebase/auth";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { firebase_auth } from "../firebase/config";

export default function Settings() {
  const { farm, ironImgURL, user } = useGlobal();
  const farmData = farm.data();
  const owner = farmData?.owners;
  const users = farmData?.users;

  function handleSignOut() {
    signOut(firebase_auth);
  }

  return (
    <>
      <div className="gap-5 md:flex md:h-full md:w-full">
        <Card className="md:flex md:w-1/2 md:flex-col md:items-center md:justify-around">
          <CardHeader>
            <CardTitle className="text-xl font-semibold tracking-tight md:text-center md:text-5xl">
              Finca:
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="md: justify-center md:flex md:flex-col md:items-center">
              <div className="flex justify-center md:mb-32">
                <img src={ironImgURL} alt="" className="max-w-[250px]" />
              </div>
              <div className="md:flex md:justify-center">
                <span className="font-semibold  md:text-center  md:text-3xl md:font-semibold md:text-black md:shadow-lg">
                  {" "}
                  {farmData.name}
                </span>{" "}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="md:flex md:w-1/2 md:flex-col md:items-center md:justify-center">
          <CardHeader>
            <CardTitle className="text-xl font-semibold tracking-tight md:text-2xl ">
              Usuario:
            </CardTitle>
          </CardHeader>
          <CardContent className="md:mb-11 md:flex md:flex-col md:gap-5">
            <p className="font-medium">
              Correo Electrónico:{" "}
              <span className="font-semibold">{user?.email}</span>
            </p>
            {owner.includes(user?.uid) && (
              <p className="md:text font-medium">
                Rol: <span className="font-semibold  ">Dueño de finca</span>
              </p>
            )}
            {users.includes(user?.uid) && (
              <p className="font-medium">
                Rol: <span className="font-semibold">Empleado de finca</span>
              </p>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={handleSignOut} variant="destructive">
              Cerrar sesión
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
