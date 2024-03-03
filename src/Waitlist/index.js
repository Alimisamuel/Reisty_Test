import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import Banner from "./Component/Header/Banner";
import { motion } from "framer-motion";

import SectionOne from "./Component/Body/SectionOne";
import Section2 from "./Component/Body/Section2";
import Stories from "./Component/Body/Stories";
import Request from "./Component/Body/Request";
import Footer from "./Component/Footer/Footer";
import { Helmet } from "react-helmet";

const theme = createTheme({
  palette: {
    primary: {
      main: "#BC172F",
    },
  },
  typography: {
    fontFamily: "Gordita",
    h1: {
      fontFamily: "Gordita",
      fontWeight: 700,
      fontSize: "45px",
      color: "#fff",
      lineHeight: "58px",
    },
    h2: {
      fontFamily: "Gordita",
      fontWeight: 300,
      color: "#fff",
      fontSize: "20px",
      lineHeight: "30px",
    },
    button: {
      fontFamily: "Gordita",
      textTransform: "initial",
    },
    caption: {
      fontFamily: "Gordita",
      fontWeight: 300,
      fontSize: "14px",
      color: "#2B2B2B",
    },
    subtitle1: {
      fontFamily: "Gordita",
      color: "#000",
      fontWeight: 600,
      fontSize: "24px",
      lineHeight: "34px",
    },
    h3: {
      fontFamily: "Gordita",
      fontWeight: 700,
      color: "#333333",
      fontSize: "64px",
    },
    body1: {
      fontFamily: "Gordita",
      fontWeight: 300,
      fontSize: "15px",
      color: "#00000080",
      lineHeight: "28px",
      letterSpacing: "0.01em",
    },
  },
});

const index = () => {
  const fadeInOutVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };
  return (
    <>
      <Helmet> </Helmet>
      <motion.div
        variants={fadeInOutVariants}
        initial="initial"
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        animate="animate"
        exit="exit"
      >
        <ThemeProvider theme={theme}>
          <Banner />
          <SectionOne />
          <Section2 />
          <Stories />
          <Request />
          <Footer />
        </ThemeProvider>
      </motion.div>
    </>
  );
};

export default index;
