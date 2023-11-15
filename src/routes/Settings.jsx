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

      <div className="md:flex gap-5 md:w-full md:h-full">
        <Card className="md:w-1/2 md:flex md:flex-col md:items-center md:justify-around">
          <CardHeader>
            <CardTitle className="font-semibold tracking-tight text-xl md:text-5xl md:text-center">
              Finca:
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="md:flex md:flex-col md: justify-center md:items-center">
              <div className="flex justify-center md:mb-32">
                <img src={ironImgURL} alt="" className="max-w-[250px]" />
              </div>
              <div className="md:flex md:justify-center">
                <span className="font-semibold  md:text-center  md:text-3xl md:font-semibold md:shadow-lg md:text-black"> {farmData.name}</span>{" "}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="md:w-1/2 md:flex md:items-center md:flex-col md:justify-center">
          <CardHeader>
            <CardTitle className="font-semibold tracking-tight text-xl md:text-2xl ">
              Usuario:
            </CardTitle>
          </CardHeader>
          <CardContent className="md:flex md:gap-5 md:flex-col md:mb-11">
            <p className="font-medium">
              Correo Electrónico:{" "}
              <span className="font-semibold">{user?.email}</span>
            </p>
            {owner.includes(user?.uid) && (
              <p className="font-medium md:text">
                Rol: <span className="font-semibold  ">Dueño de finca</span>
              </p>
            )}
            {users.includes(user?.uid) && (
              <p className="font-medium">
                Rol: <span className="font-semibold">Empleado de finca</span>
              </p>
            )}
          </CardContent>
          <CardFooter >
            <Button onClick={handleSignOut} variant="destructive">
              Cerrar sesión
            </Button>
          </CardFooter>
        </Card>
      </div>

    </>
  );
}
