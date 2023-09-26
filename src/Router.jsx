import Bovines from "@/routes/Bovines.jsx";
import Dashboard from "@/routes/Dashboard.jsx";
import Nutrition from "@/routes/Nutrition.jsx";
import WeightHistory from "@/routes/WeightHistory.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import { GlobalProvider } from "./contexts/GlobalContext";
import Porcines from "./routes/Porcines";
import Animals from "./routes/Animals";

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
        path: "bovinos",
        element: <Bovines />,
      },
      {
        path: "porcinos",
        element: <Porcines />,
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
