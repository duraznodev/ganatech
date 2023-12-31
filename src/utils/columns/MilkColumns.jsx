import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const MilkColumns = [
  {
    accessorKey: "milk",
    header: "Litros",
    cell: ({ row }) => {
      return (
        <div className="capitalize">
          {Number(row.getValue("milk")).toFixed(1)}
        </div>
      );
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
          Fecha
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
];
