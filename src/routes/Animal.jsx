import { useParams } from "react-router-dom";
import AnimalCard from "../components/AnimalCard";
import { columns } from "../components/WeigthTable/columns";
import { DataTable } from "../components/ui/data-table";
import { useGlobal } from "../contexts/GlobalContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Link } from "react-router-dom";
import { BiFoodMenu } from "react-icons/bi";
import { TbWeight } from "react-icons/tb";

export default function Animal({ type }) {
  const { id } = useParams();
  const state = useGlobal();
  const animals = state?.[type] || [];
  const animal = animals.find((_animal) => _animal.id === id);
  const father = animals.find((_animal) => _animal.id === animal?.father_id);
  const mother = animals.find((_animal) => _animal.id === animal?.mother_id);
  console.log(animal);
  return (
    <>
      <AnimalCard type={type} {...animal} simple />
      {/* <DataTable columns={columns} data={[]} /> */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Informacion:</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2">
          <div>
            <span className="font-semibold">Padre:</span> {father?.name}
          </div>
          <div>
            <span className="font-semibold">Madre:</span> {mother?.name}
          </div>
          <div>
            <span className="font-semibold">Raza:</span> {animal?.breed}
          </div>
          <div>
            <span className="font-semibold">Genero:</span>{" "}
            {animal?.genre === "M" ? "Macho" : "Hembra"}
          </div>
          <div>
            <span className="font-semibold">Peso:</span>{" "}
            {Number(animal?.weight).toFixed(2)}
          </div>
          <div>
            <span className="font-semibold">Propositos:</span>
            {animal?.purposes &&
              animal?.purposes.map((purpose) => {
                if (purpose === "reproduction") return "Reproduccion ";
                if (purpose === "milk_production")
                  return "Produccion de leche ";
                if (purpose === "work") return "Trabajo ";
                if (purpose === "meat_production")
                  return "Produccion de carne ";
              })}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Registros</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-x-4">
          <div className="  rounded-lg border bg-card text-card-foreground shadow-sm flex-1 items-center justify-center flex">
            <Link
              to="diets"
              className="gap-x-2 justify-center flex-1 py-4 text-lg items-center font-semibold flex"
            >
              <BiFoodMenu className="text-xl" />
              Dietas
            </Link>
          </div>
          <div className="  rounded-lg border bg-card text-card-foreground shadow-sm flex-1 items-center justify-center flex">
            <Link
              to="weight_history"
              className="gap-x-2 justify-center flex-1 py-4 text-lg items-center font-semibold flex"
            >
              <TbWeight className="text-xl" />
              Pesajes
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
