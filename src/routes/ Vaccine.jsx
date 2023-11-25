import { useParams } from "react-router-dom";
import AnimalCard from "../components/AnimalCard";
import { DataTable } from "../components/ui/data-table";
import { useGlobal } from "../contexts/GlobalContext";
import { VaccineColumns } from "../utils/columns";
import { Card, CardContent } from "../components/ui/card";

export default function Vaccine({ type }) {
  const { id } = useParams();
  const state = useGlobal();
  const animals = state?.[type] || [];
  const animal = animals.find((_animal) => {
    return _animal.id === id;
  });
  const vaccines = state?.vaccines || [];

  const animalVaccines = vaccines.filter(
    (vaccines) => vaccines.animalId === id,
  );

  const totalInvestment = animalVaccines.reduce((acc, curr) => {
    if (curr.price) {
      return acc + Number(curr.price);
    }
    return acc;
  }, 0);

  return (
    <>
      <AnimalCard {...animal} type={type} simple interaction={false} />
      <DataTable columns={VaccineColumns} data={animalVaccines} />

      <Card className="p-4">
        <span className="font-semibold">Cantidad total de inversion: </span>
        {totalInvestment}
      </Card>
    </>
  );
}
