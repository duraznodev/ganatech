import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import {
  FaCircle,
  FaFilter,
  FaHeart,
  FaMars,
  FaPlus,
  FaVenus,
} from "react-icons/fa6";
import { GiCow, GiPig } from "react-icons/gi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
const data = [
  {
    value: "Lola",
    label: "Lola",
  },
  {
    value: "Cenizo",
    label: "Cenizo",
  },
  {
    value: "Cuernudo",
    label: "Cuernudo",
  },
  {
    value: "Chato",
    label: "Chato",
  },
  {
    value: "Gloria",
    label: "Gloria",
  },
  {
    value: "Mechuda",
    label: "Mechuda",
  },
];
export default function Bovinos() {
  return (
    <>
      <div className="container py-6 flex flex-col gap-y-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="font-semibold tracking-tight text-lg ">
              Filtrar
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-2">
            {/* <div className="gap-x-2 flex">
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-8 border-dashed">
                            Filtro
                            <FaArrowUp className="ms-1" />
                        </Button>
                        <Button size="sm" className="h-8 border-dashed">
                            Filtro
                            <FaArrowDown className="ms-1" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-8 border-dashed">
                            Filtro
                            <FaArrowDown className="ms-1" />
                        </Button>
                    </div>
                    <Separator /> */}
            <div className="flex justify-between gap-x-2">
              <Input placeholder="Buscar..." />
              <Button className="aspect-square" size="icon">
                <FaFilter />
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className="flex flex-col gap-y-4">
          <Card className="flex">
            <div className="flex-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="font-semibold tracking-tight text-lg">
                  Pepe
                </CardTitle>
                <GiCow className="text-2xl" />
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="gap-x-1">
                  <FaMars className="text-blue-500" />
                  Toro
                </Badge>
                <Badge variant="secondary" className="gap-x-1">
                  <FaCircle className="w-2 text-destructive" /> Muerto
                </Badge>
              </CardContent>
            </div>
            <Separator orientation="vertical" className="h-auto" />
            <div className="flex justify-center items-center p-4">
              <Checkbox className="scale-125" />
            </div>
          </Card>
          <Card className="flex">
            <div className="flex-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="font-semibold tracking-tight text-lg">
                  Lola
                </CardTitle>
                <GiCow className="text-2xl" />
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="gap-x-1">
                  <FaVenus className="text-rose-500" />
                  Vaca
                </Badge>
                <Badge variant="secondary" className="gap-x-1">
                  <FaCircle className="w-2 text-primary" /> Activo
                </Badge>
                <Badge variant="secondary" className="gap-x-1">
                  <FaHeart className="text-rose-400" /> Embarazada
                </Badge>
              </CardContent>
            </div>
            <Separator orientation="vertical" className="h-auto" />
            <div className="flex justify-center items-center p-4">
              <Checkbox className="scale-125" />
            </div>
          </Card>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="absolute bottom-20 right-6">
              <FaPlus className="me-2" />
              Nuevo animal
            </Button>
          </DialogTrigger>
          <DialogContent className=" flex flex-col h-auto  sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>Agregar bovino</DialogTitle>
              <DialogDescription>
                Agregue las caracteristicas del bovino
              </DialogDescription>
            </DialogHeader>
            <form>
              <div className="flex flex-col gap-y-3 w-full">
                <div className="grid w-full max-w-sm items-center gap-y-1.5">
                  <Label className="font-semibold" htmlFor="number">
                    Numero de chapa
                  </Label>
                  <Input type="number" id="number" placeholder="001" />
                </div>
                <div className="flex flex-col gap-y-1.5">
                  <Label className="font-semibold">Sexo del animal</Label>
                  <RadioGroup defaultValue="option-one">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        className="border-blue-500"
                        value="option-one"
                        id="option-one"
                      />
                      <Label className="text-[14px]" htmlFor="option-one">
                        Macho
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        className="border-pink-500 appearance-none checked:border-blue-500"
                        value="option-two"
                        id="option-two"
                      />
                      <Label className="text-[14px]" htmlFor="option-two">
                        Hembra
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="grid w-full max-w-sm items-center gap-y-2.5">
                  <div className="flex flex-col gap-y-1.5">
                    <Label className="font-semibold" htmlFor="peso">
                      Peso del animal
                    </Label>
                    <Input type="number" id="peso" placeholder="400..." />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label className="font-semibold">Padre</Label>
                    <Combobox data={data} />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label className="font-semibold">Madre</Label>
                    <Combobox data={data} />
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label className="font-semibold" htmlFor="raza">
                      Raza del bovino
                    </Label>
                    <Input type="text" id="raza" placeholder="Brahman..." />
                  </div>
                </div>
              </div>
              <DialogFooter className="flex-row gap-x-2 mt-4">
                <Button className="flex-1" size="lg" variant="outline">
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1" size="lg">
                  Agregar
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        {/* <Dialog>
          <DialogTrigger asChild>
            <Button className="absolute bottom-20 right-6">
              <FaPlus className="me-2" />
              Nuevo animal
            </Button>
          </DialogTrigger>
          <DialogContent className="flex flex-col  sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>Agregar animal</DialogTitle>
              <DialogDescription>
                Seleccione el tipo de animal que desea añadir
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex flex-row gap-2 w-full">
              <Button
                className="gap-x-1 flex-1 py-2 font-semibold"
                variant="outline"
                size="lg"
              >
                <GiCow className="text-xl" /> Bovino
              </Button>
              <Button
                className="gap-x-1 flex-1 py-2 font-semibold"
                variant="outline"
                size="lg"
              >
                <GiPig className="text-xl" /> Porcino
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog> */}
      </div>
    </>
  );
}
