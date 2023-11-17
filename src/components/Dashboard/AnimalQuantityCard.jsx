import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { GiCow, GiPig } from "react-icons/gi";

export default function AnimalQuantityCard({ title, type, count, percentage }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-4">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {type === "bovine" ? (
          <GiCow className="text-2xl" />
        ) : (
          <GiPig className="text-2xl" />
        )}
      </CardHeader>
      <CardContent className="pb-4">
        <div className="text-xl font-bold">{count}</div>
        {/* <p className="text-xs text-muted-foreground">+20.1%</p> */}
      </CardContent>
    </Card>
  );
}
