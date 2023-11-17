import { useParams } from "react-router-dom";
import AnimalCard from "../components/AnimalCard";
import { Card, CardContent } from "../components/ui/card";
import { useGlobal } from "../contexts/GlobalContext";

export default function Diets({ type }) {
  const { id } = useParams();
  const state = useGlobal();
  const animals = state?.[type] || [];
  const animal = animals.find((_animal) => _animal.id === id);
  const diets = state?.diets || [];

  const animalDiets = diets.filter((diet) => diet?.animals?.includes(id));
  return (
    <>
      <AnimalCard {...animal} type={type} simple interaction={false} />
      {animalDiets.length > 0 ? (
        animalDiets.map((diet) => (
          <Card key={crypto.randomUUID()}>
            <CardContent className="flex flex-col gap-y-2 pt-6">
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
        <div className="flex h-full items-center justify-center">
          <div className="text-2xl text-gray-400">No hay dietas :(</div>
        </div>
      )}
    </>
  );
}
