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

}
