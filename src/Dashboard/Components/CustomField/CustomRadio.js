import React from 'react'
import { RadioGroup, FormControlLabel, Checkbox,Radio  } from '@mui/material';


const CustomRadio = ({onChange, label,checked }) => {
  return (
    <>
      <FormControlLabel
        sx={{
          color: "#ccc",
          "& > span": {
            fontWeight: 400,
            fontFamily: "Gordita",
            fontSize: "13px",
            color: "#ccc",
          },
        }}
        onChange={onChange}
        name={label}
        value={label}
        control={<Radio checked={checked} />}
        label={label}
      />
    </>
  );
}

export default CustomRadio