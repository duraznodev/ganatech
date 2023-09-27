import { useParams } from "react-router-dom";
import { useGlobal } from "../contexts/GlobalContext";
import AnimalCard from "../components/AnimalCard";
import { columns } from "../components/WeigthTable/columns";
import { DataTable } from "../components/ui/data-table";

export default function WeightHistory({ type }) {
  const { id } = useParams();
  const state = useGlobal();
  const animals = state?.[type] || [];
  const animal = animals.find((_animal) => _animal.id === id);
  const weightHistories = state?.weightHistories || [];

  const animalWeightHistory = weightHistories.filter(
    (weightHistory) => weightHistory.animalId === id
  );

  return (
    <>
      <AnimalCard {...animal} type={type} simple interaction={false} />
      <DataTable columns={columns} data={animalWeightHistory} />
    </>
  );
}
