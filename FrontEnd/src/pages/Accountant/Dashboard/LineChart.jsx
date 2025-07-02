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
    date: "16 March",
    amount: 100000,
  },
  {
    date: "17 March",
    amount: 0,
  },
  {
    date: "18 March",
    amount: 25000,
  },
  {
    date: "19 March",
    amount: 75000,
  },
  {
    date: "20 March",
    amount: 50000,
  },
  {
    date: "21 March",
    amount: 200000,
  },
  {
    date: "22 March",
    amount: 0,
  },
  {
    date: "23 March",
    amount: 150000,
  },
  {
    date: "24 March",
    amount: 0,
  },
  {
    date: "25 March",
    amount: 25000,
  },
  {
    date: "26 March",
    amount: 35000,
  },
];

export default function FeesLineChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="amount"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
