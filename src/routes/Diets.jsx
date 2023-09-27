import { useParams } from "react-router-dom";
import { useGlobal } from "../contexts/GlobalContext";
import AnimalCard from "../components/AnimalCard";
import { columns } from "../components/WeigthTable/columns";
import { DataTable } from "../components/ui/data-table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export default function Diets({ type }) {
  const { id } = useParams();
  const state = useGlobal();
  const animals = state?.[type] || [];
  const animal = animals.find((_animal) => _animal.id === id);
  const diets = state?.diets || [];
  console.log(diets);

  const animalDiets = diets.filter((diet) => diet.animalId === id);

  return (
    <>
      <AnimalCard {...animal} type={type} simple interaction={false} />
      {animalDiets.length > 0 ? (
        animalDiets.map((diet) => (
          <Card>
            <CardContent className="pt-6 flex flex-col gap-y-2">
              <div>
                <span className="font-semibold">Cantidad de alimento: </span>
                {diet?.foodAmount}
              </div>
              <div>
                <span className="font-semibold">Tipo de alimento: </span>
                {diet?.foodType}
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="flex justify-center items-center h-full">
          <div className="text-2xl text-gray-400">No hay dietas :(</div>
        </div>
      )}
    </>
  );
}
