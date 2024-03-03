import React from "react";
import Navbar from "../Component/Header/Navbar";
import Footer from "../Component/Footer/Footer";
import "../../STYLES/main.css";
import {
  Box,
  Button,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  InputLabel,
  TextField,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RequestForm from "../Component/Common/RequestForm";
import { motion } from "framer-motion";
import { GiCheckMark } from "react-icons/gi";
import { BsNodePlusFill } from "react-icons/bs";
import { FaHandshake } from "react-icons/fa";
import { Helmet } from "react-helmet";

const Pricing = () => {
  const theme = useTheme();
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
        animate="animate"
        exit="exit"
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
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
            Plans & Pricings
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "#fff", fontFamily: "gordita" }}
          >
            Choose a suitable plan for your restaurant.
          </Typography>
        </Box>

        <Box sx={{ fontFamily: "gordita" }}>
          <Box
            sx={{
              margin: "0 auto",
              width: { lg: "85%", md: "85%", sm: "90%", xs: "90%" },
              py: 5,
            }}
          >
            <Typography variant="subtitle2">Reservations</Typography>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 300, fontSize: "13px" }}
            >
              We charge restaurants a monthly subscription fee to access our
              platform and its features.
            </Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item lg={3.5} md={4} sm={6} xs={12}>
                <Box
                  sx={{
                    // border: "1px solid #dadada",
                    p: 3,
                    borderRadius: "2px",
                    boxShadow: " 0px 3px 3px #171a1f, 0px 0px 2px #171a1f",
                  }}
                >
                  <Typography
                    color="primary"
                    sx={{
                      fontFamily: "gordita",
                      fontWeight: 900,
                      fontSize: "24px",
                    }}
                  >
                    DOLLOP
                  </Typography>
                  <Typography
                    sx={{ fontWeight: "14px ", fontWeight: 500, mt: 1 }}
                  >
                    NGN 60,000 monthly
                  </Typography>
                  <Typography
                    sx={{
                      color: "#717171",
                      fontFamily: "gordita",
                      fontSize: "12px",
                    }}
                  >
                    Try free for 30 days, then N60,000/month.
                  </Typography>
                  <Typography
                    sx={{
                      color: "#333",
                      fontFamily: "gordita",
                      mt: 2,
                      fontWeight: 500,
                      fontSize:'12px',
                      lineHeight:'22px'
                    }}
                  >
                    Start your journey with the essential features of ReistyOS
                    and get your operations up and running.
                  </Typography>
                  <Box mt={2}>
                    <ListItem sx={{ p: 0 }}>
                      <ListItemIcon>
                        <GiCheckMark style={{ color: "#bc172f" , fontSize:'12px'}} />
                      </ListItemIcon>
                      <ListItemText>
                        {" "}
                        <Typography
                          variant="body2"
                          sx={{ color: "#333", fontFamily: "gordita" , fontSize:'12px',  ml:-2}}
                        >
                          Reservation and Waitlist Management
                        </Typography>
                      </ListItemText>
                    </ListItem>
                    <ListItem sx={{ p: 0 }}>
                      <ListItemIcon>
                        <GiCheckMark style={{ color: "#bc172f", fontSize:'12px' }} />
                      </ListItemIcon>
                      <ListItemText>
                        {" "}
                        <Typography
                          variant="body2"
                          sx={{ color: "#333", fontFamily: "gordita", fontSize:'12px',  ml:-2 }}
                        >
                          Menu Management
                        </Typography>
                      </ListItemText>
                    </ListItem>
                    <ListItem sx={{ p: 0 }}>
                      <ListItemIcon>
                        <GiCheckMark style={{ color: "#bc172f", fontSize:'12px' }} />
                      </ListItemIcon>
                      <ListItemText>
                        {" "}
                        <Typography
                          variant="body2"
                          sx={{ color: "#333", fontFamily: "gordita", fontSize:'12px',  ml:-2 }}
                        >
                          Events and Experiences Management
                        </Typography>
                      </ListItemText>
                    </ListItem>
                    <ListItem sx={{ p: 0 }}>
                      <ListItemIcon>
                        <GiCheckMark style={{ color: "#bc172f", fontSize:'12px' }} />
                      </ListItemIcon>
                      <ListItemText>
                        {" "}
                        <Typography
                          variant="body2"
                          sx={{ color: "#333", fontFamily: "gordita", fontSize:'12px',  ml:-2 }}
                        >
                          Guest Database with reservation notes, dietary
                          restrictions, etc.
                        </Typography>
                      </ListItemText>
                    </ListItem>
                    <ListItem sx={{ p: 0 }}>
                      <ListItemIcon>
                        <GiCheckMark style={{ color: "#bc172f", fontSize:'12px',  }} />
                      </ListItemIcon>
                      <ListItemText>
                        {" "}
                        <Typography
                          variant="body2"
                          sx={{ color: "#333", fontFamily: "gordita", fontSize:'12px',  ml:-2 }}
                        >
                          Post-dining guest survey management
                        </Typography>
                      </ListItemText>
                    </ListItem>
                    <ListItem sx={{ p: 0 }}>
                      <ListItemIcon>
                        <GiCheckMark style={{ color: "#bc172f", fontSize:'12px' }} />
                      </ListItemIcon>
                      <ListItemText>
                        {" "}
                        <Typography
                          variant="body2"
                          sx={{ color: "#333", fontFamily: "gordita", fontSize:'12px', ml:-2 }}
                        >
                          Data & Analytics Dashboards
                        </Typography>
                      </ListItemText>
                    </ListItem>

                    <Button
                      disabled
                      variant="contained"
                      fullWidth
                      sx={{ color: "#fff", py: 2, mt: 3 }}
                    >
                      Request Info
                    </Button>
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                lg={3.5}
                md={4}
                sm={6}
                xs={12}
                sx={{ display: "flex" }}
              >
                <Box
                  sx={{
                    // border: "1px solid #dadada",
                    p: 3,
                    borderRadius: "2px",
                    boxShadow: " 0px 3px 3px #171a1f, 0px 0px 2px #171a1f",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography
                      color="primary"
                      sx={{
                        fontWeight: 900,
                        fontSize: "24px",
                        fontFamily: "gordita",
                      }}
                    >
                      SPLASH
                    </Typography>
                    <Typography
                      sx={{ fontWeight: "14px ", fontWeight: 500, mt: 1 }}
                    >
                      NGN 100,000 monthly
                    </Typography>
                    <Typography
                      sx={{
                        color: "#717171",
                        fontFamily: "gordita",
                        fontSize: "12px",
                      }}
                    >
                      Try free for 30 days, then N100,000/month.
                    </Typography>
                    <Typography
                      sx={{
                        color: "#333",
                        fontFamily: "gordita",
                        mt: 2,
                        fontWeight: 500,
                        fontSize: "12px",
                        lineHeight:'22px'
                      }}
                    >
                      Experience the complete service solution with premium
                      support and exclusive customizations.
                    </Typography>
                    <Box mt={2}>
                      <ListItem sx={{ p: 0 }}>
                        <ListItemIcon>
                          <GiCheckMark style={{ color: "#bc172f",    fontSize: "12px", }} />
                        </ListItemIcon>
                        <ListItemText>
                          {" "}
                          <Typography
                            variant="body2"
                            sx={{ color: "#333", fontFamily: "gordita",    fontSize: "12px",ml:-2 }}
                          >
                            All of Dollop plan features
                          </Typography>
                        </ListItemText>
                      </ListItem>
                      <ListItem sx={{ p: 0 }}>
                        <ListItemIcon>
                          <GiCheckMark style={{ color: "#bc172f",    fontSize: "12px", }} />
                        </ListItemIcon>
                        <ListItemText>
                          {" "}
                          <Typography
                            variant="body2"
                            sx={{ color: "#333", fontFamily: "gordita",    fontSize: "12px", ml:-2 }}
                          >
                            Multiple locations management
                          </Typography>
                        </ListItemText>
                      </ListItem>
                    </Box>
                  </Box>
                  <Button
                    disabled
                    variant="contained"
                    fullWidth
                    sx={{ color: "#fff", py: 2, mt: 3 }}
                  >
                    Request Info
                  </Button>
                </Box>
              </Grid>
              <Grid item lg={1} md={0.5} sm={12} xs={12}>
                <Box
                  sx={{ height: "100%", display: "grid", placeItems: "center" }}
                >
                  <BsNodePlusFill style={{ fontSize: "30px" }} />
                </Box>
              </Grid>
              <Grid
                item
                lg={4}
                md={3.5}
                sm={6}
                xs={12}
                sx={{ display: "flex" }}
              >
                <Box
                  sx={{
                    p: 3,
                    borderRadius: "10px",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      // border: "1px solid #BC172F",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      borderRadius: 2,
                      p: 4,
                      boxShadow:
                        "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
                    }}
                  >
                    <FaHandshake
                      style={{ fontSize: "40px", color: "#BC172F" }}
                    />
                    <Typography
                      sx={{ fontWeight: 700, my: 2, fontSize: "16px" }}
                    >
                      Commission
                    </Typography>
                    <Typography
                      sx={{
                        color: "#BC172F",
                        fontWeight: 900,
                        fontSize: "40px",
                      }}
                    >
                      2.5%
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                      on reservation deposit
                    </Typography>
                    <Typography sx={{ mt: 3, fontWeight: 500 }}>
                      with a minimum of NGN300 <br /> and a maximum of NGN2,000
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box
          className="food_background"
          sx={{
            bgcolor: theme.palette.primary.main,
            py: { lg: 10, md: 10, sm: 10, xs: 0 },
            mb: 3,
          }}
        >
          <Box
            sx={{
              margin: "0 auto",
              width: { lg: "80%", md: "80%", sm: "85%", xs: "100%" },
              bgcolor: "#fff",
              borderRadius: { lg: "5px", md: "5px", sm: "5px", xs: "0px" },
              py: 10,
            }}
          >
            <Typography
              variant="body1"
              sx={{ textAlign: "center", fontSize: "18px" }}
            >
              Tell us about your restaurant business
            </Typography>
            <Box sx={{ margin: "0 auto", width: "80%", mt: 3 }}>
              <RequestForm privacy={true} />
            </Box>
          </Box>
        </Box>
        <Footer />
      </motion.div>
    </>
  );
};

export default Pricing;
