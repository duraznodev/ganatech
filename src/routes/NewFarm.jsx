import NewFarmForm from "../components/NewFarmForm";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export default function NewFarm() {
  return (
    <div className="container h-screen pt-5 pb-14 flex flex-col justify-center gap-y-6">
      <Card>
        <CardHeader className="">
          <CardTitle className="font-semibold tracking-tight text-lg ">
            Crea tu finca
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-2">
          <NewFarmForm>
            <div className="flex gap-x-2 mt-4">
              <Button
                type="button"
                size="lg"
                className="flex-1 px-0"
                variant="outline"
              >
                Cancelar
              </Button>
              <Button type="submit" size="lg" className="flex-1 px-0">
                Agregar
              </Button>
            </div>
          </NewFarmForm>
        </CardContent>
      </Card>
    </div>
  );
}
