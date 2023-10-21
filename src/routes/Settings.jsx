import { GiCow, GiPig } from "react-icons/gi";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { signOut } from "firebase/auth";
import { firebase_auth } from "../firebase/config";
import { useGlobal } from "@/contexts/GlobalContext";

export default function Settings() {
  const { farm, ironImgURL, user } = useGlobal();
  const farmData = farm.data();
  const owner = farmData?.owners;
  const users = farmData?.users;

  function handleSignOut() {
    signOut(firebase_auth);
  }
  // console.log(ironImgRef, ironImgURL);
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="font-semibold tracking-tight text-xl">
            Finca
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <div className="flex justify-center">
              <img src={ironImgURL} alt="" className="max-w-[250px]" />
            </div>
            <p className="font-semibold">Nombre: {farmData.name}</p>{" "}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="font-semibold tracking-tight text-xl">
            Usuario
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-medium">
            Correo Electrónico:{" "}
            <span className="font-semibold">{user?.email}</span>
          </p>
          {owner.includes(user?.uid) && (
            <p className="font-medium">
              Rol: <span className="font-semibold">Dueño de finca</span>
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
    </>
  );
}
