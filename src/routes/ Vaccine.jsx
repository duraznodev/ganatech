
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
import { columns } from "../components/VaccineTable/colums";

export default function Vaccine({ type }) {
    const { id } = useParams();
    const state = useGlobal();
    const animals = state?.[type] || [];
    const animal = animals.find((_animal) => {
        // console.log(_animal.id, id, _animal.id === id);
        return _animal.id === id;
    });
    const vaccines = state?.vaccines || [];

    const animalVaccines = vaccines.filter(
        (vaccines) => vaccines.animalId === id
    );

    // console.log(animalCalvings);

    return (
        <>
            <AnimalCard {...animal} type={type} simple interaction={false} />
            <DataTable columns={columns} data={animalVaccines} />
        </>
    );

}
