import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { GiCow, GiPig } from "react-icons/gi";
import { SiHappycow } from "react-icons/si";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import { useGlobal } from "../contexts/GlobalContext";
import AnimalQuantityCard from "../components/Dashboard/AnimalQuantityCard";
import FarmStatsPieChart from "../components/Dashboard/FarmStatsPieChart.1";

export default function Dashboard() {
  const [data, setData] = useState({
    bovineMCount: 0,
    bovineFCount: 0,
    porcineMCount: 0,
    porcineFCount: 0,
    alive: 0,
    dead: 0,
    sold: 0,
    lost: 0,
  });
  const {
    bovineMCount,
    bovineFCount,
    porcineMCount,
    porcineFCount,
    alive,
    dead,
    sold,
    lost,
  } = !!data && data;
  const global = useGlobal();
  const porcines = global?.porcines || [];
  const bovines = global?.bovines || [];

  useEffect(() => {
    const statusArr = ["alive", "dead", "sold", "lost"];
    async function init() {
      const [bovineMCount, bovineFCount] = bovines?.reduce(
        (acc, curr) =>
          curr?.attributes?.genre === "M"
            ? [acc[0] + 1, acc[1]]
            : [acc[0], acc[1] + 1],
        [0, 0],
      );

      const [porcineMCount, porcineFCount] = porcines?.reduce(
        (acc, curr) =>
          curr?.attributes?.genre === "M"
            ? [acc[0] + 1, acc[1]]
            : [acc[0], acc[1] + 1],
        [0, 0],
      );

      setData({
        bovineMCount,
        bovineFCount,
        porcineMCount,
        porcineFCount,
      });

      statusArr.forEach(async (status) => {
        const count = bovines.filter(
          (bovine) => bovine?.attributes?.status == status,
        ).length;

        setData((prev) => ({ ...prev, [status]: count }));
      });
    }
    init();
  }, [global]);

  const [filterText, setFilterText] = useState("state");

  const dataType = [
    { name: "Vacas", value: bovineFCount },
    { name: "Toros", value: bovineMCount },
    { name: "Cerdos", value: porcineMCount },
    { name: "Cerdas", value: porcineFCount },
  ];

  const dataState = [
    { name: "Activos", value: alive },
    { name: "Muertos", value: dead },
    { name: "Perdidos", value: lost },
    { name: "Vendidos", value: sold },
  ];

  const handleChangeFilter = (text) => {
    setFilterText(text);
  };

  return (
    <>
      <div className="md:sw-screen flex flex-col gap-6 md:h-full md:flex-row">
        <Card className="md:h-full md:w-2/3">
          <CardHeader className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-1">
                <SiHappycow />
                <CardTitle>
                  Ganado por {filterText === "state" && "Estado"}
                  {filterText === "type" && "Tipo"}
                </CardTitle>
              </div>
              <div className="flex gap-x-2">
                <Button
                  variant={filterText === "state" ? "default" : "outline"}
                  onClick={() => handleChangeFilter("state")}
                >
                  Estado
                </Button>
                <Button
                  variant={filterText === "type" ? "default" : "outline"}
                  onClick={() => handleChangeFilter("type")}
                >
                  Tipo
                </Button>
              </div>
            </div>
            <Separator />
          </CardHeader>
          <CardContent className="h-80">
            <FarmStatsPieChart
              data={filterText === "type" ? dataType : dataState}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold tracking-tight">
              Control Ganadero
            </CardTitle>
            <CardDescription>
              Bienvenido
              <span className="font-medium"> Querido Finquero</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-1">
              <AnimalQuantityCard
                type="bovine"
                title="Toros"
                count={bovineMCount}
              />
              <AnimalQuantityCard
                type="bovine"
                title="Vacas"
                count={bovineFCount}
              />
              <AnimalQuantityCard
                type="porcine"
                title="Cerdos"
                count={porcineMCount}
              />
              <AnimalQuantityCard
                type="porcine"
                title="Cerdas"
                count={porcineFCount}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
