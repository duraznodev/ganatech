import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
      <DialogFooter className="flex w-full flex-row gap-2">
        <Button
          onClick={() => handleTypeSelection("bovines")}
          className="flex-1 gap-x-1 py-2 font-semibold"
          variant="outline"
          size="lg"
        >
          <GiCow className="text-xl" /> Bovino
        </Button>
        <Button
          onClick={() => handleTypeSelection("porcines")}
          className="flex-1 gap-x-1 py-2 font-semibold"
          variant="outline"
          size="lg"
        >
          <GiPig className="text-xl" /> Porcino
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
