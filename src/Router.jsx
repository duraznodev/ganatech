import Bovines from "@/routes/Bovines.jsx";
import Dashboard from "@/routes/Dashboard.jsx";
import Nutrition from "@/routes/Nutrition.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import { GlobalProvider } from "./contexts/GlobalContext";
import Porcines from "./routes/Porcines";
import Animals from "./routes/Animals";
import Animal from "./routes/Animal";
import WeightHistory from "./routes/WeightHistory";
import Diets from "./routes/Diets";

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
        path: "animales",
        element: <Animals />,
      },
      {
        path: "animales/bovinos",
        element: <Bovines />,
      },
      {
        path: "animales/bovinos/:id",
        element: <Animal type="bovines" />,
      },
      {
        path: "animales/bovinos/:id/weight_history",
        element: <WeightHistory type="bovines" />,
      },
      {
        path: "animales/bovinos/:id/diets",
        element: <Diets type="bovines" />,
      },
      {
        path: "animales/porcinos",
        element: <Porcines />,
      },
      {
        path: "animales/porcinos/:id",
        element: <Animal type="porcines" />,
      },
      {
        path: "animales/porcinos/:id/weight_history",
        element: <WeightHistory type="porcines" />,
      },
      {
        path: "animales/porcinos/:id/diets",
        element: <Diets type="porcines" />,
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
