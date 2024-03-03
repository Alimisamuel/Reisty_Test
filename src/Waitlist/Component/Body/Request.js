import {
  Box,
  Button,
  Grid,
  InputLabel,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import RequestForm from "../Common/RequestForm";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000",
    },
  },
});

const Request = () => {
  return (
    <>
      <Box sx={{}}>
        <Box sx={{ margin: "0 auto", width: {lg:"50%", md:'60%', sm:'90%', xs:'90%'}, py: 8 }}>
          <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
            Request Info
          </Typography>
<RequestForm/>
        </Box>
      </Box>
    </>
  );
};

export default Request;


