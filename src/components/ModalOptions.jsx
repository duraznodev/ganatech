import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../components/ui/button"
import { CalvingForm } from "./CalvingForm";
import { VaccineForm } from "./VaccineForm";
import { MdVaccines } from "react-icons/md";

import { FaBirthdayCake } from "react-icons/fa";


export default function ModalOptions({ type, resetSelection, selectedAnimals, children }) {
    const [openModal, setOpenModal] = useState(null);
    return (
        <Dialog>
            <DialogTrigger className="flex flex-col gap-3" >
                <Button className="flex gap-2 w-40" onClick={() => setOpenModal('partos')}>
                    <FaBirthdayCake />
                    Partos
                </Button>
                <Button className="flex gap-2 w-40" onClick={() => setOpenModal('vacunas')}>
                    <MdVaccines />
                    Vacunas
                </Button>
            </DialogTrigger>
            <DialogContent className=" flex flex-col h-auto  sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Selecciona una opción</DialogTitle>
                </DialogHeader>
                {openModal === 'partos' && <CalvingForm type={type} resetSelection={resetSelection} selectedAnimals={selectedAnimals} onClose={() => setOpenModal(null)} >{children}</CalvingForm>}
                {openModal === 'vacunas' && <VaccineForm type={type} resetSelection={resetSelection} selectedAnimals={selectedAnimals} onClose={() => setOpenModal(null)} >{children}</VaccineForm>}

            </DialogContent>
        </Dialog>
    );
}
