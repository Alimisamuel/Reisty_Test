import { Typography, Box } from "@mui/material";
import React from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";


const COLORS = ["#FFC000", "#00FF47", "#06F", "#FF0025"];

const Reservation = ({Rdata}) => {


  const data = [
    { name: "Group A", value: Rdata?.TotalExpected },
    { name: "Group B", value: Rdata?.TotalSitted },
    { name: "Group C", value: Rdata?.TotalFinished },
    { name: "Group D", value: Rdata?.TotalCancelled },
  ];
  console.log(data,"Dashboad")

  const total = Rdata?.TotalCancelled + Rdata?.TotalExpected + Rdata?.TotalFinished + Rdata?.TotalSitted

  console.log(total)
  return (
    <>
      {total === 0 ? (
        <>
          <Box
            sx={{
              width: "200px ",
              height: "200px",
              borderRadius: "50%",
              border: "20px solid #999999b7",
              mt: 5,
              ml: 10,
              display: "grid",
              placeItems: "center",
            }}
          >
            <Typography sx={{ color: "#fff" }}>No Reservation</Typography>
          </Box>
        </>
      ) : (
        <PieChart width={500} height={400}>
          <Pie
            data={data}
            cx={170}
            cy={160}
            innerRadius={90}
            outerRadius={120}
            fill="#8884d8"
            paddingAngle={1}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      )}
    </>
  );
}

export default Reservation
