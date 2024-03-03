import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import hero1 from "../../../assets/hero1.png";
import hero2 from "../../../assets/hero2.png";
import hero3 from "../../../assets/hero3.png";
import hero4 from "../../../assets/hero4.png";
import { Link } from "react-router-dom";
import { HashLink  } from 'react-router-hash-link'

const Banner = () => {
  const texts = [
    "Seamlessly receive and manage  ",
    "Seamlessly get  ",
    "Seamlessly get  ",
  ];

  const words = [
    "Reservations", "customer reviews","more diners"
  ]
  const prefixs=[
"online with reisty","with Reisty", "with Reisty"
  ]
  const captions = [
    "Minimize wait times and maximize guest satisfaction by accepting reservations online", "Make your diners your evangelists - Harness the power of reviews to build a stellar online reputation","Attract a wider audience and increase online visibility to our network of diners in your area"
  ]
  const [currentWord, setCurrentWord]= useState(0)

  const [prefixWord, setPrefixWord]= useState(0)

  const [caption, setCaption]= useState(0)

  const [currentText, setCurrentText] = useState(0);

  const [isFadingOut, setIsFadingOut] = useState(false);

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFadingOut(true);
      setTimeout(() => {

        setCurrentText((prevText) => (prevText + 1) % texts.length);
        setCurrentWord((prevText) => (prevText + 1) % texts.length); 
        setPrefixWord((prevText) => (prevText + 1) % texts.length); 
        setCaption((prevText) => (prevText + 1) % texts.length); // Cycle through the texts
        setIsFadingOut(false);
      }, 900);

    }, 4000); // Change the text every 2 seconds

    return () => {
      clearInterval(interval); // Clean up the interval when the component unmounts
    };
  }, []);

  return (
    <>
      <Navbar  />
      {isMobile ? (
        <>
          <Box className="hero" sx={{ overflow: "hidden", pb: 5 }} >
            <Box sx={{ margin: "0 auto", width: "93%" }}>
              <Grid container spacing={7} sx={{ pt: 6 }}>
                <Grid item sm={12} xs={12}>
                  <Typography
                    variant="h1"
                    className={`changing-text ${
                      isFadingOut ? "fade-out" : "fade-in"
                    }`}
                    sx={{
                      color: "#2B2B2B",
                      fontSize: "28px",
                      lineHeight: "40px",
                      textAlign: "center",
                      textTransform: "capitalize",
                    }}
                  >
                    {texts[currentText]}
                    <span style={{ color: "#BC172F" }}> {words[currentWord]} </span>
                    {prefixs[prefixWord]}
                  </Typography>
                  <Typography
                      className={`changing-text ${
                        isFadingOut ? "fade-out" : "fade-in"
                      }`}
                    variant="body1"
                    sx={{
                      color: "#2B2B2B",
                      lineHeight: "26px",
                      mt: 2,
                      textAlign: "center",
                      fontSize: "14px",
                    }}
                  >
               {captions[caption]}
                  </Typography>
                  <Box sx={{ mt: 5, display:'flex', justifyContent:'space-around' }} >
                    <Link to="/get-started">
                      <Button
                        variant="contained"
                        sx={{ borderRadius: "10px", py: 1.2, px: 2 }}
                      >
                        Get Started For Free
                      </Button>
                    </Link>
                    <HashLink   to="#learn_more" spy={true} smooth={true} offset={-100} duration={500}>
                      <Button
                        variant="outlined"
                        sx={{ ml: 2, borderRadius: "10px", py: 1.2, px: 3 }}
                      >
                        Learn More
                      </Button>
                    </HashLink>
                  </Box>
                </Grid>
                <Grid item sm={12} xs={12} sx={{ bgcolor: "#fff" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={6} sx={{ mt: 7 }}>
                      <Box
                        sx={{ height: "195px", mb: 2, borderRadius: "20px" }}
                      >
                        <Avatar
                          src={hero1}
                          sx={{
                            height: "100%",
                            width: "100%",
                            borderRadius: "10px",
                          }}
                        />
                      </Box>
                      <Box sx={{ height: "195px", borderRadius: "20px" }}>
                        <Avatar
                          src={hero4}
                          sx={{
                            height: "100%",
                            width: "100%",
                            borderRadius: "10px",
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item sm={6} xs={6}>
                      <Box
                        sx={{
                          height: "198px",
                          mb: 2,
                          borderRadius: "20px",
                          width: { lg: "100%", md: "140%" },
                        }}
                      >
                        <Avatar
                          src={hero3}
                          sx={{
                            height: "100%",
                            width: "100%",
                            borderRadius: "10px",
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          height: "198px",
                          borderRadius: "10px",
                          width: { lg: "100%", md: "140%" },
                        }}
                      >
                        <Avatar
                          src={hero2}
                          sx={{
                            height: "100%",
                            width: "100%",
                            borderRadius: "10px",
                          }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </>
      ) : (
        <>
          <Box className="hero" sx={{ height: "650px", pt:15, overflow: "hidden" }}>
            <Box sx={{ margin: "0 auto", width: "85%" }}>
              <Grid container spacing={7} sx={{ pt: 10 }}>
                <Grid item lg={6} md={6} sx={{ mt: 9, transition:'0.2s all linear' }} >
                  <Typography
                    variant="h1"
                    className={`changing-text ${
                      isFadingOut ? "fade-out" : "fade-in"
                    }`}
                    sx={{ color: "#2B2B2B", lineHeight: "60px", textTransform:'capitalize' }}
                  >
         
                    {texts[currentText]}
                    <span style={{ color: "#BC172F" }}> {words[currentWord]} </span>
                    {prefixs[prefixWord]}
                  </Typography>
                  <Typography
                      className={`changing-text ${
                        isFadingOut ? "fade-out" : "fade-in"
                      }`}
                    variant="body1"
                    sx={{ color: "#2B2B2B", lineHeight: "26px", mt: 3 }}
                  >
                 {captions[caption]}
                  </Typography>
                  <Box sx={{ mt: 3 }}>
                    <Link to="/get-started">
                      <Button
                        variant="contained"
                        sx={{ borderRadius: "10px", py: 1.2, px: 4 }}
                      >
                        Get Started For Free
                      </Button>
                    </Link>
                    <HashLink   to="#learn_more" spy={true} smooth={true} offset={-100} duration={500}>
                      <Button
                        variant="outlined"
                        sx={{ ml: 3, borderRadius: "10px", py: 1.2, px: 4 }}
                      >
                        Learn More
                      </Button>
                    </HashLink>
                  </Box>
                </Grid>
                <Grid item lg={6} md={6} sx={{ bgcolor: "#fff" }}>
                  <Grid container spacing={2}>
                    <Grid item lg={6} md={7} sx={{ mt: 7 }}>
                      <Box
                        sx={{ height: "300px", mb: 2, borderRadius: "20px" }}
                      >
                        <Avatar
                          src={hero1}
                          sx={{
                            height: "100%",
                            width: "100%",
                            borderRadius: "20px",
                          }}
                        />
                      </Box>
                      <Box sx={{ height: "300px", borderRadius: "20px" }}>
                        <Avatar
                          src={hero4}
                          sx={{
                            height: "100%",
                            width: "100%",
                            borderRadius: "20px",
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item lg={6} md={5}>
                      <Box
                        sx={{
                          height: "300px",
                          mb: 2,
                          borderRadius: "20px",
                          width: { lg: "100%", md: "140%" },
                        }}
                      >
                        <Avatar
                          src={hero3}
                          sx={{
                            height: "100%",
                            width: "100%",
                            borderRadius: "20px",
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          height: "300px",
                          borderRadius: "20px",
                          width: { lg: "100%", md: "140%" },
                        }}
                      >
                        <Avatar
                          src={hero2}
                          sx={{
                            height: "100%",
                            width: "100%",
                            borderRadius: "20px",
                          }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default Banner;
