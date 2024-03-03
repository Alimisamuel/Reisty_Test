import React from 'react'
import { TextField, InputLabel , createTheme, ThemeProvider} from '@mui/material';


const theme = createTheme({
  palette:{
    primary: {
      main: "#BC172F",
    },
    mode:"dark"
  }
})

const CustomTextField = ({
  name,
  value,
  onChange,
  helpertext,
  type,
  multiLine,
  rows
}) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <InputLabel
          sx={{
            color: "#ccc",
            fontWeight: 500,
            fontSize: "13px",
            fontFamily: "Gordita",
            mb: 1,
          }}
        >
          {name}
        </InputLabel>
        <TextField
          helperText={helpertext}
          type={type}
          sx={{ color: "#fff","&  svg":{color:'#fff'} }}
          placeholder={name}
          size="large"
          fullWidth
          multiline={multiLine}
          value={value}
          rows={rows}
          onChange={onChange}
          InputProps={{
            style: {
              fontFamily: "Gordita",
              fontSize: "13px",
              borderRadius: "10px",
              offset: " 1px solid #ccc",
              fontWeight: 500,
              color: "#ccc",
              border: "1px solid #ccc",

              // Replace with your desired font family
            },
          }}
        />
      </ThemeProvider>
    </>
  );
};

export default CustomTextField