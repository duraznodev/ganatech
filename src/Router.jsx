import Bovines from "@/routes/Bovines.jsx";
import Dashboard from "@/routes/Dashboard.jsx";
import Nutrition from "@/routes/Nutrition.jsx";
import WeightHistory from "@/routes/WeightHistory.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import { GlobalProvider } from "./contexts/GlobalContext";
import Porcines from "./routes/Porcines";
import Animals from "./routes/Animals";
import Animal from "./routes/Animal";

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
        path: "animales/porcinos",
        element: <Porcines />,
      },
      {
        path: "animales/porcinos/:id",
        element: <Animal type="porcines" />,
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
