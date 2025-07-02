import React from "react";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";

const data = [
    { name: "On Leave", value: 25 },
  { name: "Off Leave", value: 225 },
];

const COLORS = ["#82ca9d", "#8884d8"];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function LeavePieChart() {
  return (
    <PieChart width={275} height={250}>
      <Pie
        dataKey="value"
        isAnimationActive={true}
        data={data}
        labelLine={true}
        label
        fill="#8884d8"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend />
      <Tooltip />

    </PieChart>
  );
}
