import { Box } from "@mui/material";
import React, { useState } from "react";
import TopNav from "./TopNav";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#BC172F",
    },
    background: {
      default: "#000",
    },
  },
  typography: {
    fontFamily: "gordita",
    button: {
      fontFamily: "gordita",
      textTransform: "initial",
    },
  },
});

const SharedLayout = () => {
  const [open, setOpen] = useState(false);
  const fadeInOutVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };
  return (
    <>
      <motion.div
        variants={fadeInOutVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box
            sx={{
              "&::-webkit-scrollbar": {
                display: "none", // Hide scrollbar for WebKit browsers
              },
            }}
          >
            <TopNav />
            <Box
              sx={{
                display: "flex",
                height: "99vh",
                overflow: "scroll",
                mt: {xl:9,  lg: 9, md: 9 },
              }}
            >
              <Box sx={{width:{xl:'16%', lg:'18%', md:'18%'}}}>

              <SideBar />
              </Box>
              <Box
                sx={{
                  // bgcolor: "#000",
                  width: { xl:'84%', lg: "82%",md:'82%', xs: "100%", sm: "100%" },
                  overflow: "scroll",
                  pb: 4,
                  "&::-webkit-scrollbar": {
                    display: "none", // Hide scrollbar for WebKit browsers
                  },
                }}
              >
                <Outlet />
              </Box>
            </Box>
          </Box>
        </ThemeProvider>
      </motion.div>
    </>
  );
};

export default SharedLayout;
