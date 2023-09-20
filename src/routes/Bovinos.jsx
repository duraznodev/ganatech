import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FaCircle,
  FaFilter,
  FaHeart,
  FaMars,
  FaPlus,
  FaVenus,
} from "react-icons/fa6";
import { GiCow } from "react-icons/gi";
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
          <DialogContent className="flex flex-col h-full sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value="Pedro Duarte" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" value="@peduarte" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
