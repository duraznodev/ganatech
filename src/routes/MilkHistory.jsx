import { useParams } from "react-router-dom";
import { useGlobal } from "../contexts/GlobalContext";
import AnimalCard from "../components/AnimalCard";
import { columns } from "../components/MilkTable/columns";
import { DataTable } from "../components/ui/data-table";

export default function MilkHistory({ type }) {
  const { id } = useParams();
  const state = useGlobal();
  const animals = state?.[type] || [];
  const animal = animals.find((_animal) => _animal.id === id);
  const milkHistories = state?.milkHistories || [];

  const animalMilkHistory = milkHistories.filter(
    (milkHistory) => milkHistory.animalId === id
  );

  return (
    <>
      <AnimalCard {...animal} type={type} simple interaction={false} />
      <DataTable columns={columns} data={animalMilkHistory} />
    </>
  );
}
