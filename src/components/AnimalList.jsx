import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import AnimalCard from "./AnimalCard";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function AnimalList({
  animals,
  onSelect,
  selectedAnimals,
  simple = false,
  multiple = true,
  type,
}) {
  const [filteredAnimals, setFilteredAnimals] = useState(animals);

  useEffect(() => {
    setFilteredAnimals(animals);
  }, [animals]);

  const handleSearch = (term) => {
    if (term.trim()) {
      setFilteredAnimals(
        animals.filter(
          (animal) =>
            animal.name.toLowerCase().includes(term) ||
            animal?.earring?.earring_code?.includes(term)
        )
      );
    } else {
      setFilteredAnimals(animals);
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="font-semibold tracking-tight text-lg ">
            Filtrar
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-2">
          <div className="flex justify-between gap-x-2">
            <Input
              className="ring-0"
              placeholder="Buscar animal por código o nombre"
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
            />
            {/* <Button className="aspect-square" size="icon">
              <FaFilter />
            </Button> */}
          </div>
        </CardContent>
      </Card>

      <div className="flex h-full flex-col gap-y-4 overflow-y-scroll">
        {filteredAnimals.length != 0 ? (
          filteredAnimals.map((animal) => {
            return (
              <AnimalCard
                type={type}
                selected={selectedAnimals?.includes(animal?.id)}
                onSelect={onSelect}
                simple={simple}
                multiple={multiple}
                key={animal?.id}
                {...animal}
              />
            );
          })
        ) : (
          <Card key={crypto.randomUUID()}>
            <div className="flex-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
                <CardTitle className="font-semibold tracking-tight text-lg">
                  No se encontraron resultados :(
                </CardTitle>
              </CardHeader>
            </div>
          </Card>
        )}
      </div>
    </>
  );
}
