import React from "react";
import { RadioGroup, FormControlLabel, Checkbox } from "@mui/material";

const CustomCheckbox = ({ onChange,  label, checked }) => {
  return (
    <>
      <FormControlLabel
        sx={{
          color: "#ccc",
          "& > span": {
            fontWeight: 400,
            fontFamily: "Gordita",
            fontSize: "12px",
            color: "#ccc",
          },
        }}
        onChange={onChange}
        name={label}
        value={label}
        control={<Checkbox checked={checked} />}
        label={label}
      />
    </>
  );
};

export default CustomCheckbox;
