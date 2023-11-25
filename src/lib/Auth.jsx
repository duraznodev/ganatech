import Layout from "@/components/Layout";
import { Navigate } from "react-router-dom";
import { NewFarm } from "../routes";
import { useState } from "react";
import { useEffect } from "react";
import LoadingSkeleton from "../components/LoadingSkeleton";

function render(c) {
  return c;
}

export function Private(Component, user, farm_id) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && farm_id) {
      setLoading(false);
    }
  }, [user, farm_id]);

  if (loading) return <LoadingSkeleton />;
  if (!user) return <Navigate to="/login" />;
  if (user && !farm_id) {
    return <NewFarm />;
  }
  return <Layout>{render(Component)}</Layout>;
}

export function Guest(Component, user) {
  return user ? <Navigate to={"/"} /> : render(Component);
}
