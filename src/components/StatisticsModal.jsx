import { ImStatsBars } from "react-icons/im";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Timestamp } from "firebase/firestore";
import { DialogDescription } from "@radix-ui/react-dialog";

export default function StatisticsModal({ data, description, itemName }) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          asChild
          variant="outline"
          className="absolute bottom-20 right-6 gap-x-2 "
        >
          <ImStatsBars />
          Estadísticas
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3 flex aspect-[4/3.5] flex-col px-4">
        <DialogHeader>
          <DialogTitle>Estadísticas</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} className="-translate-x-3.5">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis dataKey="item" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="item"
                name={itemName}
                stroke="#16a34a"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </DialogContent>
    </Dialog>
  );
}
