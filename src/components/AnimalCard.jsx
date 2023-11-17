import { Check } from "lucide-react";
import { FaCircle, FaHeart, FaMars, FaTag, FaVenus } from "react-icons/fa6";
import { GiCow, GiPig } from "react-icons/gi";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";

export default function AnimalCard({
  id,
  name,
  attributes,
  interaction = true,
  onSelect = () => {},
  selected,
  multiple,
  simple,
  earring,
  type,
  className,
  badges = true,
  children,
}) {
  return (
    <Card className={cn("flex", selected && "bg-secondary", className)}>
      <Link
        to={
          multiple
            ? `/animales/${type === "bovines" ? "bovinos" : "porcinos"}/${id}`
            : null
        }
        disabled={!interaction}
        onClick={() => {
          !multiple && onSelect(id);
        }}
        className="flex-1"
      >
        <CardHeader
          className={cn(
            "flex flex-row items-center justify-between space-y-0 pb-2"
          )}
        >
          <CardTitle className="font-semibold tracking-tight text-lg">
            {name}
          </CardTitle>
          {type === "bovines" ? (
            <GiCow className="text-2xl" />
          ) : (
            <GiPig className="text-2xl" />
          )}
        </CardHeader>
        {badges ? (
          <CardContent className="flex flex-wrap gap-2">
            {earring && (
              <Badge variant="secondary" className="gap-x-1">
                <FaTag /> {earring}
              </Badge>
            )}
            {attributes?.genre === "M" ? (
              <Badge variant="secondary" className="gap-x-1">
                <FaMars className="text-blue-500" />
                {type === "bovines" ? "Toro" : "Cerdo"}
              </Badge>
            ) : (
              <Badge variant="secondary" className="gap-x-1">
                <FaVenus className="text-rose-500" />
                {type === "bovines" ? "Vaca" : "Cerda"}
              </Badge>
            )}
            {attributes?.its_pregnant && (
              <Badge variant="secondary" className="gap-x-1">
                <FaHeart className="text-rose-400" /> Embarazada
              </Badge>
            )}

            {attributes?.status === "alive" && (
              <Badge variant="secondary" className="gap-x-1">
                <FaCircle className="w-2 text-primary" /> Activo
              </Badge>
            )}
            {attributes?.status === "dead" && (
              <Badge variant="secondary" className="gap-x-1">
                <FaCircle className="w-2 text-slate-950" /> Muerto
              </Badge>
            )}
            {attributes?.status === "sold" && (
              <Badge variant="secondary" className="gap-x-1">
                <FaCircle className="w-2 text-yellow-500" /> Vendido
              </Badge>
            )}
            {attributes?.status === "lost" && (
              <Badge variant="secondary" className="gap-x-1">
                <FaCircle className="w-2 text-orange-900" /> Perdido
              </Badge>
            )}
          </CardContent>
        ) : (
          <CardContent>{children}</CardContent>
        )}
      </Link>
      <Separator orientation="vertical" className="h-auto" />
      {!simple && (
        <button
          onClick={() => onSelect(id)}
          className="flex justify-center items-center p-4"
        >
          <div
            aria-checked="true"
            data-state={selected ? "checked" : "unchecked"}
            value="on"
            className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground scale-125"
          >
            {selected && (
              <span
                data-state="checked"
                className="flex items-center justify-center text-current"
              >
                <Check className="h-4 w-4" />
              </span>
            )}
          </div>
        </button>
      )}
    </Card>
  );
}
