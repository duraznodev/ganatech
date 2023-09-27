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

export default function Animal({ type }) {
  const { id } = useParams();
  const state = useGlobal();
  const animals = state?.[type] || [];
  const animal = animals.find((_animal) => _animal.id === id);
  const father = animals.find((_animal) => _animal.id === animal.father_id);
  const mother = animals.find((_animal) => _animal.id === animal.mother_id);

  return (
    <>
      <AnimalCard {...animal} simple />
      {/* <DataTable columns={columns} data={[]} /> */}
      <Card>
        <CardHeader>
          <CardTitle>Caracteristicas</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2">
          <div>Padre: {father?.name}</div>
          <div>Madre: {mother?.name}</div>
        </CardContent>
      </Card>
    </>
  );
}
