import { useState } from "react";
import { createUseStyles } from "react-jss";
import "antd/dist/antd";

// Sub Components
import ReGraph from "./ReGraph";
import DropdownSelector from "./DropdownSelector";
import dataSet from "./data";

const useStyles = createUseStyles(() => ({
  container: {
 color:'#fff',
 backgroundColor:'#1a1a1a',
    padding: "1rem",
    transition: "0.3s ease-in-out",


  },
}));

function Analytics() {
  const classes = useStyles();


  return (
    <div className={classes.container}>


    </div>
  );
}

export default Analytics;
