import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";

const data = [
  {
    name: "6 Jun ",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "8 Jun",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "9 Jun",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "10 Jun",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "11 Jun",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "12 Jun",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "13 Jun",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "14 Jun",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const CoverOverview = () => {
  return (
    <div>
      <AreaChart
        width={600}
        height={300}
        data={data}
        syncId="anyId"
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="uv" stroke="#00FF47" fill="#82ca9d" />
      </AreaChart>
    </div>
  );
};

export default CoverOverview;
