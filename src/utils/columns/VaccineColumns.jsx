import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const VaccineColumns = [
  {
    accessorKey: "VaccineType",
    header: "Vaccine",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("VaccineType")}</div>;
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha de vacunación
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase ">
        {new Date(row.getValue("date").seconds * 1000).toLocaleDateString("es")}
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Precio
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div>
        {row?.getValue("price") != null ? Number(row?.getValue("price")) : 0}
      </div>
    ),
  },
];
