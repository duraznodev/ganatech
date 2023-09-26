import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Bovines from "@/routes/Bovines.jsx";
import Dashboard from "@/routes/Dashboard.jsx";
import Nutrition from "@/routes/Nutrition.jsx";
import WeightHistory from "@/routes/WeightHistory.jsx";
import { GlobalProvider } from "./contexts/GlobalContext";
import { FaCow, FaHouse, FaList } from "react-icons/fa6";
import { Button } from "./components/ui/button";
import { GiCow, GiPig } from "react-icons/gi";
import { HiChartPie, HiViewList } from "react-icons/hi";
import { SiHappycow } from "react-icons/si";
import { Link } from "react-router-dom";
import Layout from "./components/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "bovinos",
        element: <Bovines />,
      },
      {
        path: "bovinos/:id/weight_history",
        element: <WeightHistory />,
      },
      {
        path: "nutricion",
        element: <Nutrition />,
      },
    ],
  },
  ,
]);

export default function Router() {
  return (
    <>
      <GlobalProvider>
        <RouterProvider router={router} />
      </GlobalProvider>
    </>
  );
}
