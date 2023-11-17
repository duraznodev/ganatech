import { GiCow, GiPig } from "react-icons/gi";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export default function AnimalTypes() {
  return (
    <div className="flex h-full flex-col justify-center">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Seleccionar tipo</CardTitle>
          <CardDescription>
            Seleccione el tipo de animal a revisar
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-x-4">
          <div className="  flex flex-1 items-center justify-center rounded-lg border bg-card text-card-foreground shadow-sm">
            <Link
              to="/animales/bovinos"
              className="flex flex-1 items-center justify-center gap-x-2 py-4 text-lg font-semibold"
            >
              <GiCow className="text-2xl" /> Bovino
            </Link>
          </div>
          <div className="  flex flex-1 items-center justify-center rounded-lg border bg-card text-card-foreground shadow-sm">
            <Link
              to="/animales/porcinos"
              className="flex flex-1 items-center justify-center gap-x-2 py-4 text-lg font-semibold"
            >
              <GiPig className="text-2xl" /> Porcino
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
