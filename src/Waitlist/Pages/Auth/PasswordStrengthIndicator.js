// import React from "react";
// import { styled } from "@mui/material/styles";
// import { LinearProgress } from "@mui/material";
// import { linearProgressClasses } from "@mui/material/LinearProgress";
// import zxcvbn from "zxcvbn";

// const PasswordStrengthIndicator = (props) => {
//   const testResult = zxcvbn(props.password);
//   const num = (testResult.score * 100) / 4;

//   const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
//     height: 5,
//     transition: theme.transitions.create([
//       "background-color",
//       "transform",
//       "width",
//     ]),
//     // borderRadius: 5,
//     [`&.${linearProgressClasses.colorPrimary}`]: {
//       backgroundColor:
//         theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
//     },
//     [`& .${linearProgressClasses.bar}`]: {
//       // borderRadius: 5,
//       transition: theme.transitions.create([
//         "background-color",
//         "transform",
//         "width",
//       ]),

//       backgroundColor:
//         num === 100 ? "#018D25 " : num === 75 ? "#f0ad4e" : "#A71200",
//     },
//   }));
//   return <BorderLinearProgress variant="determinate" value={num} />;
// };

// export default PasswordStrengthIndicator;
