import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GiCow, GiPig } from "react-icons/gi";

export function AnimalTypeDialogContent({ handleTypeSelection }) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Seleccionar tipo</DialogTitle>
        <DialogDescription>
          Seleccione el tipo de animal que desea añadir
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="flex flex-row gap-2 w-full">
        <Button
          onClick={() => handleTypeSelection("bovines")}
          className="gap-x-1 flex-1 py-2 font-semibold"
          variant="outline"
          size="lg"
        >
          <GiCow className="text-xl" /> Bovino
        </Button>
        <Button
          onClick={() => handleTypeSelection("porcines")}
          className="gap-x-1 flex-1 py-2 font-semibold"
          variant="outline"
          size="lg"
        >
          <GiPig className="text-xl" /> Porcino
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
