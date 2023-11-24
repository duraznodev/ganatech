import { BiFoodMenu } from "react-icons/bi";
import CardLink from "./CardLink";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TbWeight } from "react-icons/tb";
import { FaBirthdayCake } from "react-icons/fa";
import { MdVaccines } from "react-icons/md";
import { LuMilk } from "react-icons/lu";

export default function AnimalRegisters({ type, genre }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Registros</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        <CardLink to="diets">
          <BiFoodMenu className="text-xl" />
          Dietas
        </CardLink>
        <CardLink to="weight_history">
          <TbWeight className="text-xl" />
          Pesajes
        </CardLink>

        <CardLink to="vaccine">
          <MdVaccines className="text-xl" />
          Vacunas
        </CardLink>
        {type === "bovines" &&
          genre == "F" && [
            <CardLink to="milk_history">
              <LuMilk className="text-xl" />
              Leche
            </CardLink>,
            <CardLink to="calving">
              <FaBirthdayCake className="text-xl" />
              Partos
            </CardLink>,
          ]}
      </CardContent>
    </Card>
  );
}
