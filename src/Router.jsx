import Bovines from "@/routes/Bovines.jsx";
import Nutrition from "@/routes/Nutrition.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { firebase_auth } from "./firebase/config";
import {
  Animal,
  Animals,
  Dashboard,
  Diets,
  Login,
  NewFarm,
  Porcines,
  Register,
  WeightHistory,
} from "./routes";
import { Private, Guest } from "./lib/Auth";
import { userFarms } from "./firebase/api";
import { useGlobal } from "./contexts/GlobalContext";

export default function Router() {
  const { user, farmId, setFarmId, setUser } = useGlobal();

  useEffect(() => {
    if (user)
      userFarms(user)
        .then((res) => res.docs[0].id)
        .then(setFarmId);
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebase_auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="new-farm" element={Private(<NewFarm />, user)} />
        <Route path="/" element={Private(<Dashboard />, user)} />
        <Route path="/animales" element={Private(<Animals />, user)} />
        <Route path="/animales/bovinos" element={Private(<Bovines />, user)} />
        <Route
          path="/animales/bovinos/:id"
          element={Private(<Animal type="bovines" />, user)}
        />
        <Route
          path="/animales/bovinos/:id/weight_history"
          element={Private(<WeightHistory type="bovines" />, user)}
        />
        <Route
          path="/animales/bovinos/:id/diets"
          element={Private(<Diets type="bovines" />, user)}
        />
        <Route
          path="/animales/porcinos"
          element={Private(<Porcines />, user)}
        />
        <Route
          path="/animales/porcinos/:id"
          element={Private(<Animal type="porcines" />, user)}
        />
        <Route
          path="/animales/porcinos/:id/weight_history"
          element={Private(<WeightHistory type="porcines" />, user)}
        />
        <Route
          path="/animales/porcinos/:id/diets"
          element={Private(<Diets type="porcines" />, user)}
        />
        <Route path="/nutricion" element={Private(<Nutrition />, user)} />
        <Route path="/login" element={Guest(<Login />, user)} />
        <Route path="/register" element={Guest(<Register />, user)} />
      </Routes>
    </BrowserRouter>
  );
}
