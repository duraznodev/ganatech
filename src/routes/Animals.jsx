import { GiCow, GiPig } from "react-icons/gi";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export default function Animals() {
  return (
    <div className="h-full flex flex-col justify-center">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Seleccionar tipo</CardTitle>
          <CardDescription>
            Seleccione el tipo de animal a revisar
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-x-4">
          <div className="  rounded-lg border bg-card text-card-foreground shadow-sm flex-1 items-center justify-center flex">
            <Link
              to="/animales/bovinos"
              className="gap-x-2 justify-center flex-1 py-4 text-lg items-center font-semibold flex"
            >
              <GiCow className="text-2xl" /> Bovino
            </Link>
          </div>
          <div className="  rounded-lg border bg-card text-card-foreground shadow-sm flex-1 items-center justify-center flex">
            <Link
              to="/animales/porcinos"
              className="gap-x-2 justify-center flex-1 py-4 text-lg items-center font-semibold flex"
            >
              <GiPig className="text-2xl" /> Porcino
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
