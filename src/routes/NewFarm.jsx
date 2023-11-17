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
    <div className="container flex h-screen flex-col justify-center gap-y-6 pb-14 pt-5">
      <Card>
        <CardHeader className="">
          <CardTitle className="text-lg font-semibold tracking-tight ">
            Crea tu finca
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-2">
          <NewFarmForm>
            <div className="mt-4 flex gap-x-2">
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
