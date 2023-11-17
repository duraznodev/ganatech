import React from "react";
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function FarmStatsPieChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={dynamicText === "type" ? dataType : dataState}
          labelLine={true}
          label={renderLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {(dynamicText === "type" ? dataType : dataState).map(
            (entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ),
          )}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
