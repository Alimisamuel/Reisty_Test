import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import Navbar from "../Component/Header/Navbar";
import RequestForm from "../Component/Common/RequestForm";
import Footer from "../Component/Footer/Footer";
import { Helmet } from "react-helmet";

const GetStarted = () => {
  const theme = useTheme();
  return (
    <>
      <Helmet> </Helmet>
      <Navbar />
      <Box
        className="food_background"
        align="center"
        sx={{
          height: "270px",
          bgcolor: theme.palette.primary.main,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ color: "#fff", fontFamily: "gordita" }}
        >
          Request Info
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: "#fff", fontFamily: "gordita", fontSize: "13px" }}
        >
          Complete the form below, and a member of the Reisty team will promptly
          reach out to <br /> guide you through the next steps. We're excited to
          give you a tour!
        </Typography>
      </Box>

      <Box
        sx={{
          margin: "0 auto",
          width: { lg: "55%", md: "60%", sm: "80%", xs: "90%" },
          py: 5,
        }}
      >
        <Typography
          variant="body1"
          sx={{ textAlign: "center", fontSize: "13px" }}
        >
          To get in touch with our sales team and receive email marketing
          communications from Reisty, please complete the form provided below.
          Remember that you have the freedom to unsubscribe from Resy emails
          whenever you wish.
        </Typography>
        <RequestForm />
      </Box>
      <Footer />
    </>
  );
};

export default GetStarted;
