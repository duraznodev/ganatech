import React from "react";
import ReactDOM from "react-dom/client";
import Root from "@/routes/Root.jsx";
import Dashboard from "@/routes/Dashboard.jsx";
import Bovinos from "@/routes/Bovinos.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import { registerSW } from "virtual:pwa-register";
import signIn from "@/firebase/auth/signin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "bovinos",
    element: <Bovinos />,
  },
]);

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New content available. Reload?")) {
      updateSW(true);
    }
  },
});

async function init() {
  const resp = await signIn("romaneduardorm@gmail.com", "durazno");
}

init();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
