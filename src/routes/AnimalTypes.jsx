import { AnimalTypeDialogContent } from "../components/AnimalTypeDialogContent";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { GiCow, GiPig } from "react-icons/gi";
import { Link } from "react-router-dom";
import CardLink from "../components/CardLink";

export default function Animals() {
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
          <CardLink to="/animales/bovinos">
            <GiCow className="text-2xl" /> Bovino
          </CardLink>
          <CardLink to="/animales/porcinos">
            <GiPig className="text-2xl" /> Porcino
          </CardLink>
        </CardContent>
      </Card>
    </div>
  );
}
