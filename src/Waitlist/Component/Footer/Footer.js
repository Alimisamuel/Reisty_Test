import {
  Box,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import logo from "../../../assets/Logo/logo-white.svg";
import icon1 from "../../../assets/Icons/Vector (5).svg";
import icon2 from "../../../assets/Icons/Vector (6).svg";
import icon3 from "../../../assets/Icons/Vector (7).svg";
import icon4 from "../../../assets/Icons/Vector (8).svg";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import { RiTwitterXFill } from "react-icons/ri";
import { FaLinkedinIn } from "react-icons/fa6";

const Footer = () => {
  const theme = useTheme();
  return (
    <>
      <Box sx={{ background: theme.palette.primary.main, pb: 8 }}>
        <Box
          sx={{
            margin: "0 auto",
            width: "85%",
            pt: 8,
            borderBottom: "1px solid #fff",
            pb: 8,
          }}
        >
          <Grid container spacing={5}>
            <Grid item lg={4} md={4}>
              <Box>
                <Link to="/">
                  <img src={logo} alt="Logo" />
                </Link>
                <Box sx={{ mt: 4 }}>
                  <Typography
                    variant="caption"
                    sx={{ color: "#fff", fontSize: "12px" }}
                  >
                    With its innovative use of technology, Reisty is
                    revolutionizing the hospitality industry by providing
                    cutting-edge solutions to some of the world's finest dining
                    establishments.
                  </Typography>
                </Box>
                <Stack direction="row" spacing={4} sx={{ mt: 3 }}>
                  <a href="https://www.facebook.com/profile.php?id=61551987707359&mibextid=ZbWKwL">
                    <IconButton
                      sx={{
                        background: "rgba(255, 255, 255, 0.2)",
                        width: "50px",
                        height: "50px",
                      }}
                    >
                      <img src={icon1} alt="" />
                    </IconButton>
                  </a>
                  <a href="https://instagram.com/reistyapp?igshid=YTQwZjQ0NmI0OA==">
                    <IconButton
                      sx={{
                        background: "rgba(255, 255, 255, 0.2)",
                        width: "50px",
                        height: "50px",
                      }}
                    >
                      <img src={icon2} alt="" />
                    </IconButton>
                  </a>
                  <a href="https://www.linkedin.com/company/reisty/">
                    <IconButton
                      sx={{
                        background: "rgba(255, 255, 255, 0.2)",
                        width: "50px",
                        height: "50px",
                      }}
                    >
                      <FaLinkedinIn
                        style={{ color: "#fff", fontSize: "18px" }}
                      />
                    </IconButton>
                  </a>
                  <a href="https://x.com/reistyapp?s=21">
                    <IconButton
                      sx={{
                        background: "rgba(255, 255, 255, 0.2)",
                        width: "50px",
                        height: "50px",
                      }}
                    >
                      <RiTwitterXFill
                        style={{ color: "#fff", fontSize: "18px" }}
                      />
                    </IconButton>
                  </a>
                </Stack>
              </Box>
            </Grid>
            <Grid item lg={8} md={8} sm={12} xs={12}>
              <Grid container spacing={2} rowGap={4}>
                <Grid item lg={3} md={4} sm={6} xs={6}>
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: "Gordita",
                        fontWeight: 500,
                        color: "#fff",
                      }}
                    >
                      Features
                    </Typography>
                    <Box
                      sx={{ border: "1.2px solid #fff", width: "20%", mb: 3 }}
                    />
                    <HashLink
                      to="/#reservation_management"
                      spy={true}
                      smooth={true}
                      offset={-100}
                      duration={500}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color: "#fff",
                          fontSize: "12px",
                          lineHeight: "40px",
                          transition: "0.2s all linear",
                          "&:hover": {
                            borderBottom: "3px solid #fff",
                          },
                        }}
                      >
                        Reservation Management
                      </Typography>
                    </HashLink>
                    <br />
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#fff",
                        fontSize: "12px",
                        lineHeight: "40px",
                        transition: "0.2s all linear",
                        "&:hover": {
                          borderBottom: "3px solid #fff",
                        },
                      }}
                    >
                      Table Management
                    </Typography>
                    <br />
                    <HashLink
                      to="/#menu_management"
                      spy={true}
                      smooth={true}
                      offset={-100}
                      duration={500}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color: "#fff",
                          fontSize: "12px",
                          lineHeight: "40px",
                          transition: "0.2s all linear",
                          "&:hover": {
                            borderBottom: "3px solid #fff",
                          },
                        }}
                      >
                        Menu Management
                      </Typography>
                    </HashLink>
                    <br />
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#fff",
                        fontSize: "12px",
                        lineHeight: "40px",

                        transition: "0.2s all linear",
                        "&:hover": {
                          borderBottom: "3px solid #fff",
                        },
                      }}
                    >
                      Waitlist Management
                    </Typography>
                  </Box>
                </Grid>
                <Grid item lg={3} md={3} sm={6} xs={6}>
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: "Gordita",
                        fontWeight: 500,
                        color: "#fff",
                      }}
                    >
                      Useful Links
                    </Typography>
                    <Box
                      sx={{ border: "1.2px solid #fff", width: "20%", mb: 3 }}
                    />
                    <Link to="/pricing">
                      <Typography
                        variant="caption"
                        sx={{
                          color: "#fff",
                          fontSize: "12px",
                          lineHeight: "40px",
                          transition: "0.2s all linear",
                          "&:hover": {
                            borderBottom: "3px solid #fff",
                          },
                        }}
                      >
                        Plans and Pricing
                      </Typography>
                    </Link>
                    <br />
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#fff",
                        fontSize: "12px",
                        lineHeight: "40px",
                        transition: "0.2s all linear",
                        "&:hover": {
                          borderBottom: "3px solid #fff",
                        },
                      }}
                    >
                      FAQs
                    </Typography>
                    <br />
                    <Link to="/customer-support">
                      <Typography
                        variant="caption"
                        sx={{
                          color: "#fff",
                          fontSize: "12px",
                          lineHeight: "40px",
                          transition: "0.2s all linear",
                          "&:hover": {
                            borderBottom: "3px solid #fff",
                          },
                        }}
                      >
                        Help Center
                      </Typography>
                    </Link>
                    <br />
                    {/* <Typography
                      variant="caption"
                      sx={{
                        color: "#fff",
                        fontSize: "12px",
                        lineHeight: "40px",
                           transition:'0.2s all linear',
                          '&:hover':{
                            borderBottom:'3px solid #fff'
                          }
                      }}
                    >
                      Blog
                    </Typography> */}
                  </Box>
                </Grid>
                <Grid item lg={3} md={2.5} sm={6} xs={6}>
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: "Gordita",
                        fontWeight: 500,
                        color: "#fff",
                      }}
                    >
                      Company
                    </Typography>
                    <Box
                      sx={{ border: "1.2px solid #fff", width: "20%", mb: 3 }}
                    />

                    <Typography
                      variant="caption"
                      sx={{
                        color: "#fff",
                        fontSize: "12px",
                        lineHeight: "40px",
                        transition: "0.2s all linear",
                        "&:hover": {
                          borderBottom: "3px solid #fff",
                        },
                      }}
                    >
                      Contact Us
                    </Typography>
                    <br />
                    {/* <Typography
                      variant="caption"
                      sx={{
                        color: "#fff",
                        fontSize: "12px",
                        lineHeight: "40px",
                           transition:'0.2s all linear',
                          '&:hover':{
                            borderBottom:'3px solid #fff'
                          }
                      }}
                    >
                      Careers
                    </Typography> */}
                    <br />
                  </Box>
                </Grid>
                <Grid item lg={3} md={2.5}>
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: "Gordita",
                        fontWeight: 500,
                        color: "#fff",
                      }}
                    >
                      For Diners
                    </Typography>
                    <Box
                      sx={{ border: "1.2px solid #fff", width: "20%", mb: 3 }}
                    />

                    <Typography
                      variant="caption"
                      sx={{
                        color: "#fff",
                        fontSize: "12px",
                        lineHeight: "40px",
                        transition: "0.2s all linear",
                        "&:hover": {
                          borderBottom: "3px solid #fff",
                        },
                      }}
                    >
                      Book a Restaurant
                    </Typography>
                    <br />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Grid container sx={{ margin: "0 auto", width: "85%" }}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography
              variant="body1"
              sx={{
                color: "#fff",
                fontSize: { lg: "12px", md: "12px", sm: "10px", xs: "10px" },
                mt: 2,
                fontFamily: "Gordita",
                textAlign: {
                  lg: "left",
                  md: "left",
                  sm: "center",
                  xs: "center",
                },
              }}
            >
              {" "}
              &#169; {new Date().getFullYear()} Reisty. All rights reserved.
            </Typography>
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            sm={12}
            xs={12}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "#fff",
                fontSize: { lg: "12px", md: "12px", sm: "10px", xs: "10px" },
                mt: 2,
                fontFamily: "Gordita",
              }}
            >
              Global Privacy Policy
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#fff",
                fontSize: { lg: "12px", md: "12px", sm: "10px", xs: "10px" },
                mt: 2,
                fontFamily: "Gordita",
              }}
            >
              Terms of Service
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#fff",
                fontSize: { lg: "12px", md: "12px", sm: "10px", xs: "10px" },
                mt: 2,
                fontFamily: "Gordita",
              }}
            >
              Cookie Policy
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Footer;
