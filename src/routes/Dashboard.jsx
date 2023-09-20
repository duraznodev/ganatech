import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import { GiCow } from "react-icons/gi";
import { SiHappycow } from "react-icons/si";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Separator } from "@/components/ui/separator";

export default function Dashboard() {
  const [dynamicText, setDynamicText] = useState("estado");

  const [isMounted, setIsMounted] = useState(false);

  // const [chartDimensions, setChartDimensions] = useState({
  //     width: 300,
  //     height: 300,
  // })

  const [timeFilter, setTimeFilter] = useState("Hoy");

  const dataTipo = [
    { name: "Vacas", value: 400 },
    { name: "Toros", value: 300 },
    { name: "Cerdos", value: 200 },
  ];

  const dataEstado = [
    { name: "Activos", value: 700 },
    { name: "Muertos", value: 200 },
  ];

  const dataByTime = {
    Hoy: [
      { name: "Vacas", value: 100 },
      { name: "Toros", value: 80 },
      { name: "Cerdos", value: 50 },
    ],
    Semanal: [
      { name: "Vacas", value: 500 },
      { name: "Toros", value: 400 },
      { name: "Cerdos", value: 300 },
    ],
    Mensual: [
      { name: "Vacas", value: 2000 },
      { name: "Toros", value: 1500 },
      { name: "Cerdos", value: 1200 },
    ],
    Anual: [
      { name: "Vacas", value: 8000 },
      { name: "Toros", value: 7000 },
      { name: "Cerdos", value: 6000 },
    ],
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const handleButtonClick = (text) => {
    setDynamicText(text);
  };

  const renderLabel = (entry) => {
    const currentData =
      dynamicText === "tipo" ? dataByTime[timeFilter] : dataEstado;
    const total = currentData.reduce((acc, curr) => acc + curr.value, 0);
    return `${((entry.value / total) * 100).toFixed(1)}%`;
  };

  useEffect(() => {
    setIsMounted(true);
    // setChartDimensions({
    //     width: 300,
    //     height: 300,
    // })
  }, []);

  return (
    <div className="container py-8 flex flex-col gap-y-6">
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
          <div className="flex gap-x-1 w-full ">
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
          </div>
        </CardHeader>
        <CardContent className="h-72">
          {isMounted && (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={
                    dynamicText === "tipo" ? dataByTime[timeFilter] : dataEstado
                  }
                  // cx={chartDimensions.width / 2}
                  // cy={chartDimensions.height / 2}
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
            <span className="font-medium"> Roman Rizo</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2.5 grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pt-4 pb-1">
                  <CardTitle className="text-sm font-medium">Vacas</CardTitle>
                  <GiCow className="text-2xl" />
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="text-xl font-bold">34</div>
                  <p className="text-xs text-muted-foreground">+20.1%</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
