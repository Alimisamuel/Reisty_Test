import { Box, Button, Typography } from "@mui/material";
import React from "react";

const Header = (props) => {
  return (
    <Box
      sx={{
        height: "60px",
        bgcolor: "#333",
        borderBottom: "0.5px solid #fff",
        display: "flex",
        justifyContent: "space-between",
        px: 2,
        alignItems: "center",
      }}
    >
      <Typography
        variant="caption"
        sx={{ color: "#fff", fontSize: "15px", fontFamily: "gordita" }}
      >
        {props.title}
      </Typography>
      {/* <Button variant="contained">Quick Setup</Button> */}
    </Box>
  );
};

export default Header;
