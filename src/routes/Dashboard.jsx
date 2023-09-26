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
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { allFromCollection, getCollection } from "../firebase/api";

export default function Dashboard() {
  const [data, setData] = useState({
    bovineMCount: 0,
    bovineFCount: 0,
    porcineMCount: 0,
    porcineFCount: 0,
  });
  const { bovineMCount, bovineFCount, porcineMCount, porcineFCount } =
    !!data && data;
  useEffect(() => {
    async function init() {
      const bovines = allFromCollection(getCollection("bovines"));
      const porcines = allFromCollection(getCollection("porcines"));

      const bovineMCount = (await bovines).filter(
        (bovine) => bovine?.attributes?.genre == "M"
      ).length;
      const bovineFCount = (await bovines).filter(
        (bovine) => bovine?.attributes?.genre == "F"
      ).length;
      const porcineMCount = (await porcines).filter(
        (bovine) => bovine?.attributes?.genre == "M"
      ).length;
      const porcineFCount = (await porcines).filter(
        (bovine) => bovine?.attributes?.genre == "F"
      ).length;
      setData({
        bovineMCount,
        bovineFCount,
        porcineMCount,
        porcineFCount,
      });
    }
    init();
  }, []);

  const [dynamicText, setDynamicText] = useState("estado");

  const [isMounted, setIsMounted] = useState(false);

  // const [timeFilter, setTimeFilter] = useState("Hoy");

  const dataTipo = [
    { name: "Vacas", value: bovineFCount },
    { name: "Toros", value: bovineMCount },
    { name: "Cerdos", value: porcineMCount },
    { name: "Cerdas", value: porcineFCount },
  ];

  const dataEstado = [
    { name: "Activos", value: 700 },
    { name: "Muertos", value: 200 },
  ];

  // const dataByTime = {
  //   Hoy: [
  //     { name: "Vacas", value: 100 },
  //     { name: "Toros", value: 80 },
  //     { name: "Cerdos", value: 50 },
  //   ],
  //   Semanal: [
  //     { name: "Vacas", value: 500 },
  //     { name: "Toros", value: 400 },
  //     { name: "Cerdos", value: 300 },
  //   ],
  //   Mensual: [
  //     { name: "Vacas", value: 2000 },
  //     { name: "Toros", value: 1500 },
  //     { name: "Cerdos", value: 1200 },
  //   ],
  //   Anual: [
  //     { name: "Vacas", value: 8000 },
  //     { name: "Toros", value: 7000 },
  //     { name: "Cerdos", value: 6000 },
  //   ],
  // };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const handleButtonClick = (text) => {
    setDynamicText(text);
  };

  const renderLabel = (entry) => {
    const currentData = dynamicText === "tipo" ? dataTipo : dataEstado;
    // dynamicText === "tipo" ? dataByTime[timeFilter] : dataEstado;
    const total = currentData.reduce((acc, curr) => acc + curr.value, 0);
    return `${((entry.value / total) * 100).toFixed(1)}%`;
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <Card>
        <CardHeader className="space-y-2 pb-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-1">
              <SiHappycow />
              <CardTitle>Ganado por {dynamicText}</CardTitle>
            </div>
            <div className="flex gap-x-2">
              <Button
                variant={dynamicText === "estado" ? "default" : "outline"}
                onClick={() => handleButtonClick("estado")}
              >
                Estado
              </Button>
              <Button
                variant={dynamicText === "tipo" ? "default" : "outline"}
                onClick={() => handleButtonClick("tipo")}
              >
                Tipo
              </Button>
            </div>
          </div>
          <Separator />
          {/* <div className="flex gap-x-1 w-full ">
            {["Hoy", "Semanal", "Mensual", "Anual"].map((filter) => (
              <Button
                className="flex-1"
                variant={timeFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeFilter(filter)}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Button>
            ))}
          </div> */}
        </CardHeader>
        <CardContent className="h-72">
          {isMounted && (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={
                    dynamicText === "tipo"
                      ? // dataByTime[timeFilter]
                        dataTipo
                      : dataEstado
                  }
                  labelLine={true}
                  label={renderLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {(dynamicText === "tipo" ? dataTipo : dataEstado).map(
                    (entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    )
                  )}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-semibold tracking-tight text-xl">
            Control Ganadero
          </CardTitle>
          <CardDescription>
            Bienvenido
            <span className="font-medium"> Querido Finquero</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2.5 grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pt-4 pb-1">
                <CardTitle className="text-sm font-medium">Toros</CardTitle>
                <GiCow className="text-2xl" />
              </CardHeader>
              <CardContent className="pb-4">
                <div className="text-xl font-bold">{bovineMCount}</div>
                {/* <p className="text-xs text-muted-foreground">+20.1%</p> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pt-4 pb-1">
                <CardTitle className="text-sm font-medium">Vacas</CardTitle>
                <GiCow className="text-2xl" />
              </CardHeader>
              <CardContent className="pb-4">
                <div className="text-xl font-bold">{bovineFCount}</div>
                {/* <p className="text-xs text-muted-foreground">+20.1%</p> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pt-4 pb-1">
                <CardTitle className="text-sm font-medium">Cerdos</CardTitle>
                <GiPig className="text-2xl" />
              </CardHeader>
              <CardContent className="pb-4">
                <div className="text-xl font-bold">{porcineMCount}</div>
                {/* <p className="text-xs text-muted-foreground">+20.1%</p> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pt-4 pb-1">
                <CardTitle className="text-sm font-medium">Cerdas</CardTitle>
                <GiPig className="text-2xl" />
              </CardHeader>
              <CardContent className="pb-4">
                <div className="text-xl font-bold">{porcineFCount}</div>
                {/* <p className="text-xs text-muted-foreground">+20.1%</p> */}
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
