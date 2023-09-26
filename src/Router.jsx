import Bovines from "@/routes/Bovines.jsx";
import Dashboard from "@/routes/Dashboard.jsx";
import Nutrition from "@/routes/Nutrition.jsx";
import WeightHistory from "@/routes/WeightHistory.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import { GlobalProvider } from "./contexts/GlobalContext";

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
