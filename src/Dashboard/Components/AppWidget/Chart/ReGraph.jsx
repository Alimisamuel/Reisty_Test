import React from "react";
import { createUseStyles } from "react-jss";
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

/**
 * Stylesheet using react-jss
 */

const useStyles = createUseStyles(() => ({
  container: {
    color: "#fff",

    transition: "0.3s ease-in-out",
    width: "100%",
    height: "400px",
  },
}));

/**
 * Define all colors for linear gradient with an id
 */
const GradientColors = () => {
  return (
    <>
      <linearGradient id="colorView" x1="0" y1="0" x2="0" y2="1">
        <stop offset="30%" stopColor="#00FF47" stopOpacity={1} />
        <stop offset="75%" stopColor="#00FF47" stopOpacity={"45%"} />
        <stop offset="95%" stopColor="#00FF47" stopOpacity={0} />
      </linearGradient>
      <linearGradient id="colorView2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="30%" stopColor="#BC172F" stopOpacity={1} />
        <stop offset="75%" stopColor="#BC172F" stopOpacity={"45%"} />
        <stop offset="95%" stopColor="#BC172F" stopOpacity={0} />
      </linearGradient>
    </>
  );
};

const ReGraph = ({ data }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <GradientColors />
          </defs>
          <Tooltip
            itemStyle={{ color: "#fff", backgroundColor: "#0A1322" }}
            contentStyle={{ backgroundColor: "#0A1322" }}
          />

          <XAxis
            dataKey="name"
            tick={{ fill: "#fff", fontSize: "12px" }}
            stroke="#1a1a1a"
          />

          <YAxis tick={{ fill: "#fff", fontSize: "12px"}} stroke="#1a1a1a" />
          <Area
            dataKey="view"
            type="monotone"
            stroke="#00FF47"
            strokeWidth={3}
            strokeOpacity={1}
            fill="url(#colorView)"
          />
          <Area
            dataKey="view2"
            type="monotone"
            stroke="#BC172F"
            strokeWidth={3}
            strokeOpacity={1}
            fill="url(#colorView2)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReGraph;
