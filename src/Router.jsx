import Bovines from "@/routes/Bovines.jsx";
import Dashboard from "@/routes/Dashboard.jsx";
import Nutrition from "@/routes/Nutrition.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Animal from "./routes/Animal";
import Animals from "./routes/Animals";
import Diets from "./routes/Diets";
import Login from "./routes/Login";
import Porcines from "./routes/Porcines";
import Register from "./routes/Register";
import WeightHistory from "./routes/WeightHistory";
import { useGlobal } from "./contexts/GlobalContext";
import { Navigate } from "react-router-dom";
import { Suspense } from "react";
import { getJSDocReturnType } from "typescript";

const guestRouter = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);

const authRouter = createBrowserRouter([
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
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default function Router() {
  const global = useGlobal();
  if (global?.user) {
    return <RouterProvider router={authRouter} />;
  } else {
    return <RouterProvider router={guestRouter} />;
  }
}
