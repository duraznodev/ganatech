import { useParams } from "react-router-dom";
import { useGlobal } from "../contexts/GlobalContext";
import AnimalCard from "../components/AnimalCard";
import { DataTable } from "../components/ui/data-table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { columns } from "../components/CalvingTable/columns";

export default function Calving({ type }) {
  const { id } = useParams();
  const state = useGlobal();
  const animals = state?.[type] || [];
  const animal = animals.find((_animal) => {
    // console.log(_animal.id, id, _animal.id === id);
    return _animal.id === id;
  });
  const calvings = state?.calvings || [];

  const animalCalvings = calvings.filter(
    (calvings) => calvings.animalId === id
  );

  // console.log(animalCalvings);

  return (
    <>
      <AnimalCard {...animal} type={type} simple interaction={false} />
      <Card>
        <CardHeader>
          <p className="text-lg font-medium">
            Cantidad de partos:{" "}
            <span className="font-semibold">{animalCalvings?.length}</span>
          </p>
        </CardHeader>
      </Card>
      <DataTable columns={columns} data={animalCalvings} />
    </>
  );
  return (
    <>
      <AnimalCard {...animal} type={type} simple interaction={false} />
      {animalCalvings.length > 0 ? (
        animalCalvings.map((calving) => (
          <Card key={crypto.randomUUID()}>
            <CardContent className="pt-6 flex flex-col gap-y-2">
              <div>
                <span className="font-semibold">Fecha de parto: </span>
                {new Date(calving?.calvingDate)?.toLocaleDateString()}
              </div>
              <div>
                <span className="font-semibold">Cantidad de partos: </span>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="flex justify-center items-center h-full">
          <div className="text-2xl text-gray-400">No hay Partos :(</div>
        </div>
      )}
    </>
  );
}
