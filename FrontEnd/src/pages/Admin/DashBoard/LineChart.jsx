import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    date: "1 Jun",
    present: 220,
    absent: 30,
  },
  {
    date: "Today",
    present: 222,
    absent: 28,
  },
  {
    date: "3 Jun",
    present: 180,
    absent: 70,
  },
  {
    date: "4 Jun",
    present: 190,
    absent: 60,
  },
];

export default function StudentCountLineChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart
        // isAnimationActive={true}
        data={data}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="present"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="absent"
          activeDot={{ r: 8 }}
          stroke="#82ca9d"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
