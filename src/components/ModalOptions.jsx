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
import { FaBirthdayCake } from "react-icons/fa";


export default function ModalOptions({ type, resetSelection, selectedAnimals, children }) {
    const [openModal, setOpenModal] = useState(null);
    return (
        <Dialog>
            <DialogTrigger >
                <Button className="flex gap-2" onClick={() => setOpenModal('partos')}>
                    <FaBirthdayCake />
                    Partos
                </Button>
            </DialogTrigger>
            <DialogContent className=" flex flex-col h-auto  sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Selecciona una opción</DialogTitle>
                </DialogHeader>
                {openModal === 'partos' && <CalvingForm type={type} resetSelection={resetSelection} selectedAnimals={selectedAnimals} onClose={() => setOpenModal(null)} >{children}</CalvingForm>}
            </DialogContent>
        </Dialog>
    );
}
