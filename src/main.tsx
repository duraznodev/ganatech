import Bovines from "@/routes/Bovines.jsx";
import Dashboard from "@/routes/Dashboard.jsx";
import Nutrition from "@/routes/Nutrition.jsx";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { registerSW } from "virtual:pwa-register";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "bovinos",
    element: <Bovines />,
  },
  {
    path: "nutricion",
    element: <Nutrition />,
  },
]);

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New content available. Reload?")) {
      updateSW(true);
    }
  },
});

// async function init() {
// const resp = await signIn("romaneduardorm@gmail.com", "durazno");
// console.log(resp);
//   seeder();
// }

// init();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
