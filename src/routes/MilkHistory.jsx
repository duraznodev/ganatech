import { useParams } from "react-router-dom";
import { useGlobal } from "../contexts/GlobalContext";
import AnimalCard from "../components/AnimalCard";
import { DataTable } from "../components/ui/data-table";
import { MilkColumns } from "../utils/columns";
import StatisticsModal from "../components/StatisticsModal";

export default function MilkHistory({ type }) {
  const { id } = useParams();
  const state = useGlobal();
  const animals = state?.[type] || [];
  const animal = animals.find((_animal) => _animal.id === id);
  const milkHistories = state?.milkHistories || [];

  const animalMilkHistory = milkHistories.filter(
    (milkHistory) => milkHistory.animalId === id,
  );

  const data = animalMilkHistory
    .sort((a, b) => a.date - b.date)
    .map((milkHistory) => ({
      item: Number(milkHistory.milk),
      date: milkHistory.date.toDate().toLocaleDateString(),
    }));

  return (
    <>
      <AnimalCard {...animal} type={type} simple interaction={false} />
      <DataTable columns={MilkColumns} data={animalMilkHistory} />
      <StatisticsModal
        data={data}
        itemName="Litros de leche"
        description={"Estadísticas sobre la producción de leche"}
      />
    </>
  );
}
