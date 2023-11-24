import { useParams } from "react-router-dom";
import AnimalCard from "../components/AnimalCard";
import { DataTable } from "../components/ui/data-table";
import { useGlobal } from "../contexts/GlobalContext";
import { WeightColumns } from "../utils/columns";
import StatisticsModal from "../components/StatisticsModal";

export default function WeightHistory({ type }) {
  const { id } = useParams();
  const state = useGlobal();
  const animals = state?.[type] || [];
  const animal = animals.find((_animal) => _animal.id === id);
  const weightHistories = state?.weightHistories || [];

  const animalWeightHistory = weightHistories.filter(
    (weightHistory) => weightHistory.animalId === id,
  );

  const data = animalWeightHistory
    .sort((a, b) => a.date - b.date)
    .map((weightHistory) => ({
      item: Number(weightHistory.weight),
      date: weightHistory.date.toDate().toLocaleDateString(),
    }));

  return (
    <>
      <AnimalCard {...animal} type={type} simple interaction={false} />
      <DataTable columns={WeightColumns} data={animalWeightHistory} />
      <StatisticsModal
        data={data}
        itemName="Peso"
        description={"Estadísticas sobre el peso"}
      />
    </>
  );
}
