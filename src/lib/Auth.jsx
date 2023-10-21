import Layout from "@/components/Layout";
import { Navigate } from "react-router-dom";
import { NewFarm } from "../routes";

function render(c) {
  return c;
}

export function Private(Component, user, farm_id) {
  if (!user) return <Navigate to="/login" />;
  if (user && !farm_id) {
    return <NewFarm />;
  }
  return <Layout>{render(Component)}</Layout>;
}

export function Guest(Component, user) {
  return user ? <Navigate to={"/"} /> : render(Component);
}
