import { useParams } from "react-router-dom";
import AnimalCard from "../components/AnimalCard";
import { Card, CardHeader } from "../components/ui/card";
import { DataTable } from "../components/ui/data-table";
import { useGlobal } from "../contexts/GlobalContext";
import { CalvingColumns } from "../utils/columns";

export default function Calving({ type }) {
  const { id } = useParams();
  const state = useGlobal();
  const animals = state?.[type] || [];
  const animal = animals.find((_animal) => {
    return _animal.id === id;
  });
  const calvings = state?.calvings || [];

  const animalCalvings = calvings.filter(
    (calvings) => calvings.animalId === id,
  );

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
      <DataTable columns={CalvingColumns} data={animalCalvings} />
    </>
  );
}
