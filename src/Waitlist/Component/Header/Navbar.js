import {
  AppBar,
  Box,
  Button,
  Grid,
  Typography,
  MenuItem,
  useTheme,
  useMediaQuery,
  Tabs,
  Tab,
  MenuList
} from "@mui/material";
import React, { useState } from "react";
import logo from "../../../assets/Logo/logo.svg";
import Popover from "@mui/material/Popover";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Drawers from "./Drawers";
import { Link, useLocation } from "react-router-dom";
import { HashLink  } from 'react-router-hash-link'
import { useSelector } from "react-redux";
// import { HashLink as Link } from "react-router-hash-link";

const Navbar = () => {
  const theme = useTheme();
  const isAuthenticated = useSelector((state)=> state.user.isAuthenticated)
const [value, setValue] = useState(null)
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const router = useLocation()


  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);

  const [color, setColor] = React.useState(false);

  const changeColor = () => {
    if (window.scrollY >= 90) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  window.addEventListener("scroll", changeColor);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const open2 = Boolean(anchorEl2);
  const id2 = open2 ? "simple-popover" : undefined;
  return (
    <>
      <Box sx={{  }} id="index">
        <AppBar
          sx={{
        
            background: "#fff",
            borderBottom: "1px solid #dadada",
            boxShadow: !color && "none",
          }}
        >
          <Box
            sx={{
              margin: "0 auto",
              width: "85%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Grid
              container
              sx={{ display: "flex", alignItems: "center", py:1.5 }}
            >
              <Grid item lg={2} md={2}>
                <Link to="/">
                  <img src={logo} alt="Reisty_Logo" />
                </Link>
              </Grid>
              {isMobile ? (
                <>
                  <Drawers />
                </>
              ) : (
                <>
                  <Grid
                    item
                    lg={7}
                    md={6}
                    display="flex"
                    sx={{ alignItems: "center" }}
                  >
                    <Tabs value={value}>
                      <Tab
                        value={0}
                        onMouseOver={handleClick}
                        label="Solutions"
                        sx={{
                          fontSize: "14px",
                          fontWeight: 400,
                    
                        }}
                      />
                      <Link to="/pricing" style={{ color: "#2b2b2b" }}>
                        {/* <Link   to="#reservations" spy={true} smooth={true} offset={-100} duration={500}> */}
                        <Tab
                          onClick={(e) => setValue("/pricing")}
                          value="/pricing"
                          label="Pricing"
                          sx={{
                            fontSize: "14px",
                            fontWeight: 400,
                            color:
                              router.pathname === "/pricing"
                                ? "#BC172F"
                                : "#000",
                          }}
                        />
                      </Link>
                      <Link to="/customer-support">
                        <Tab
                          onMouseOver={handleClick2}
                          value={2}
                          label="Support"
                          sx={{
                            fontSize: "14px",
                            fontWeight: 400,
                            color: "#000",
                          }}
                        />
                      </Link>
                      {/* </Link> */}
                    </Tabs>
                  </Grid>
                  <Grid item lg={3} md={4} align="right">
                    {isAuthenticated ? (
                      <Link to="/dashboard">
                        <Button
                          variant="contained"
                          sx={{
                            ml: 3,
                            py: 1.1,
                            borderRadius: "5px",
                            fontSize: "14px",
                            fontWeight: "bolder",
                          }}
                        >
                          Go to Dashboard
                        </Button>
                      </Link>
                    ) : (
                      <>
                        <Link to="/login">
                          <Button
                            variant="outlined"
                            sx={{
                              border: "1px solid #dadada",
                              color: " #2B2B2B",
                              py: 1.1,
                              px: 3,
                              borderRadius: "5px",
                              fontSize: "14px",
                              fontWeight: "bolder",
                            }}
                          >
                            Log in
                          </Button>
                        </Link>
                        <Link to="/get-started">
                          <Button
                            variant="contained"
                            sx={{
                              ml: 3,
                              py: 1.1,
                              borderRadius: "5px",
                              fontSize: "14px",
                              fontWeight: "bolder",
                            }}
                          >
                            Get Started
                          </Button>
                        </Link>
                      </>
                    )}
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
        </AppBar>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <MenuList onMouseLeave={handleClose}>
            <HashLink
              to="/#reservation_management"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
            >
              <MenuItem onClick={handleClose}>Reservation Management</MenuItem>
            </HashLink>
            <HashLink
              to="/#menu_management"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
            >
              <MenuItem onClick={handleClose}>Menu Management</MenuItem>
            </HashLink>
            <HashLink
              to="/#boosting"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
            >
              <MenuItem onClick={handleClose}>Boost Online Presence</MenuItem>
            </HashLink>
            <HashLink
              to="/#review"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
            >
              <MenuItem onClick={handleClose}>Review Management</MenuItem>
            </HashLink>
          </MenuList>
        </Popover>

        <Popover
          id={id2}
          open={open2}
          anchorEl={anchorEl2}
          onClose={handleClose2}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <MenuList onMouseLeave={handleClose2}>
            <HashLink
              to="/customer-support"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
            >
              <MenuItem onClick={handleClose2}>Customer Support</MenuItem>
            </HashLink>
            <HashLink
              to="/tuttorial"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
            >
              {/* <MenuItem onClick={handleClose2}>Tutorials</MenuItem> */}
            </HashLink>
            <HashLink
              to="/faq"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
            >
              <MenuItem onClick={handleClose2}>FAQ</MenuItem>
            </HashLink>
          </MenuList>
        </Popover>
      </Box>
    </>
  );
};

export default Navbar;
