import Bovines from "@/routes/Bovines.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useGlobal } from "./contexts/GlobalContext";
import { userFarms } from "./firebase/api";
import { firebase_auth, firebase_storage } from "./firebase/config";
import { Guest, Private } from "./lib/Auth";
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
  Calving,
  Vaccine,
} from "./routes";
import Settings from "./routes/Settings";
import { MilkHistory } from "./routes";

export default function Router() {
  const {
    user,
    farmId,
    setFarm,
    setFarmId,
    setIronImgRef,
    setUser,
    setIsAdmin,
    setIronImgURL,
  } = useGlobal();

  useEffect(() => {
    if (user) {
      userFarms(user).then((res) => {
        const farm = res?.docs?.[0];
        if (farm?.id) {
          const ironImgPath = `images/${farm.id}.png`;
          const ironImgRef = ref(firebase_storage, ironImgPath);

          getDownloadURL(ironImgRef).then(setIronImgURL);
          setFarm(farm);
          setFarmId(farm.id);
          setIronImgRef(ironImgRef);
          farm?.data()?.owners?.includes(user.uid) && setIsAdmin(true);
        }
      });
    }
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
        <Route path="new-farm" element={Private(<NewFarm />, user, farmId)} />
        <Route path="/" element={Private(<Dashboard />, user, farmId)} />
        <Route path="/animales" element={Private(<Animals />, user, farmId)} />
        <Route
          path="/animales/bovinos"
          element={Private(<Bovines />, user, farmId)}
        />
        <Route
          path="/animales/bovinos/:id"
          element={Private(<Animal type="bovines" />, user, farmId)}
        />
        <Route
          path="/animales/bovinos/:id/calving"
          element={Private(<Calving type="bovines" />, user, farmId)}
        />
        <Route
          path="/animales/porcinos/:id/calving"
          element={Private(<Calving type="porcines" />, user, farmId)}
        />

        <Route
          path="/animales/bovinos/:id/vaccine"
          element={Private(<Vaccine type="bovines" />, user, farmId)}
        />
        <Route
          path="/animales/porcinos/:id/vaccine"
          element={Private(<Vaccine type="porcines" />, user, farmId)}
        />

        <Route
          path="/animales/bovinos/:id/weight_history"
          element={Private(<WeightHistory type="bovines" />, user, farmId)}
        />
        <Route
          path="/animales/bovinos/:id/milk_history"
          element={Private(<MilkHistory type="bovines" />, user, farmId)}
        />
        <Route
          path="/animales/bovinos/:id/milk_history"
          element={Private(<MilkHistory type="porcines" />, user, farmId)}
        />

        milk_history
        <Route
          path="/animales/bovinos/:id/diets"
          element={Private(<Diets type="bovines" />, user, farmId)}
        />
        <Route
          path="/animales/porcinos"
          element={Private(<Porcines />, user, farmId)}
        />
        <Route
          path="/animales/porcinos/:id"
          element={Private(<Animal type="porcines" />, user, farmId)}
        />
        <Route
          path="/animales/porcinos/:id/weight_history"
          element={Private(<WeightHistory type="porcines" />, user, farmId)}
        />
        <Route
          path="/animales/porcinos/:id/diets"
          element={Private(<Diets type="porcines" />, user, farmId)}
        />
        {/* <Route path="/nutricion" element={Private(<Nutrition />, user,farmId)} /> */}
        <Route path="/settings" element={Private(<Settings />, user, farmId)} />
        <Route path="/login" element={Guest(<Login />, user)} />
        <Route path="/register" element={Guest(<Register />, user)} />
      </Routes>
    </BrowserRouter>
  );
}
