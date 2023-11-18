import { useParams } from "react-router-dom";
import AnimalCard from "../components/AnimalCard";
import { DataTable } from "../components/ui/data-table";
import { useGlobal } from "../contexts/GlobalContext";
import { VaccineColumns } from "../utils/columns";

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

  return (
    <>
      <AnimalCard {...animal} type={type} simple interaction={false} />
      <DataTable columns={VaccineColumns} data={animalVaccines} />
    </>
  );
}
