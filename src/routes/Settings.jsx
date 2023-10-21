import { GiCow, GiPig } from "react-icons/gi";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { signOut } from "firebase/auth";
import { firebase_auth } from "../firebase/config";
import { useGlobal } from "@/contexts/GlobalContext";

export default function Settings() {
  const { farm, user, ironImgRef, ironImgURL } = useGlobal();
  const farmData = farm.data();
  function handleSignOut() {
    signOut(firebase_auth);
  }
  // console.log(ironImgRef, ironImgURL);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-semibold tracking-tight text-xl">
          <img src="" alt="" />
          Administración
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <span className="font-semibold">Finca: {farmData.name}</span>{" "}
          <span className="font-semibold">Gmail: {user.email}</span>{" "}
        </div>
        <Button onClick={handleSignOut} variant="destructive">
          Cerrar sesión
        </Button>
      </CardContent>
    </Card>
  );
}
