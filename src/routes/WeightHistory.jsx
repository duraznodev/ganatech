import { useParams } from "react-router-dom";
import AnimalCard from "../components/AnimalCard";
import { columns } from "../components/WeigthTable/columns";
import { DataTable } from "../components/ui/data-table";
import { useGlobal } from "../contexts/GlobalContext";

export default function WeightHistory() {
  const { id } = useParams();
  const state = useGlobal();
  const weightHistories = state?.weightHistories || [];
  const bovines = state?.bovines || [];
  const animal = bovines.find((bovine) => bovine.id === id);

  const animalWeightHistory = weightHistories.filter(
    (weightHistory) => weightHistory.animal_id === id
  );

  return (
    <>
      <AnimalCard {...animal} simple />
      <DataTable columns={columns} data={animalWeightHistory} />
    </>
  );
}
