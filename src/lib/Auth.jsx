import Layout from "@/components/Layout";
import { useSearchParams, Navigate } from "react-router-dom";
import {} from "react-router-dom";
import { userFarms } from "../firebase/api";

function render(c) {
  return c;
}

export function Private(Component, user) {
  if (!user) return <Navigate to="/login" />;

  // if () {
  //   console.log("no farm");
  //   window.location.replace("/new-farm");
  // }

  return <Layout>{render(Component)}</Layout>;
}

export function Guest(Component, user) {
  return user ? <Navigate to={"/"} /> : render(Component);
}
