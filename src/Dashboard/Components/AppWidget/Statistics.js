import React from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { Box, Typography } from "@mui/material";


const COLORS = ["#FF0025", "#fff"];

const Statistics = ({data}) => {
  const datas = [
    { name: "Group A", value: data?.TotalOnline },
    { name: "Group B", value: data?.TotalWalkIn },
  ];
  const total = data?.TotalOnline + data?.TotalWalkIn;
  return (
    <>
      {total === 0 && (
        <>
          <Box
            sx={{
              width: "200px ",
              height: "200px",
              borderRadius: "50%",
              border: "20px solid #999999b7",
         mt:5,
              ml:{xl:-12, lg:-25, md:-23},
              display: "grid",
              placeItems: "center",
            }}
          >
            <Typography sx={{ color: "#fff" }}>No Reservation</Typography>
          </Box>
        </>
      )}
      <PieChart width={500} height={400}>
        <Pie
          data={datas}
          cx={170}
          cy={150}
          innerRadius={100}
          outerRadius={120}
          fill="#8884d8"
          paddingAngle={2}
          dataKey="value"
        >
          {datas.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </>
  );
};

export default Statistics;
