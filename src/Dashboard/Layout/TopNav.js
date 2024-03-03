import {
  Box,
  AppBar,
  Grid,
  IconButton,
  Typography,
  List,
  ListItemButton,
  useMediaQuery,
  useTheme,
  Avatar,
  Popover,
  MenuItem,
} from "@mui/material";
import React from "react";
import logo from "../../assets/Logo/single.svg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link, useLocation, useNavigate,  } from "react-router-dom";
import Drawers from "./Drawers";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/userSlice";


const TopNav = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const router = useLocation();
  const user = JSON.parse(window.localStorage.getItem("userInfo"));
  const restaurantName = localStorage.getItem('restaurantName');
  const restaurantLogo = localStorage.getItem('restaurantLogo')

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const backHome = () =>{
    navigate('/')
  }
  const handleLogout = () =>{
    dispatch(logoutUser());
    localStorage.removeItem('userInfo')
    navigate('/login')
  }
  return (
    <>
      <AppBar
        sx={{
          // height:'100px',
          bgcolor: "#000",
          py: 1,
          borderBottom: "0.5px solid #ffffff80",
        }}
      >
        {isMatch ? (
          <>
            <Drawers />
          </>
        ) : (
          <Grid
            container
            sx={{
              margin: "0 auto",
              width: "98%",
              display: "flex",
              // height: "100%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Grid item lg={2.2} md={2.2}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Link to="/dashboard">
                  <img src={logo} alt="reistry_logo" />
                </Link>
                <List sx={{ display: "flex" }}>
                  <Link to="/reservation-management">
                    <ListItemButton
                      selected={router.pathname === "/reservation-management"}
                      variant="caption"
                      sx={{
                        color: "#ffffff80",
                        fontSize: "14px",
                        fontFamily: "gordita",
                        "&.Mui-selected": {
                          background: "none",
                          color: "#fff",
                          borderBottom: "4px solid #BC172F",
                        },
                      }}
                    >
                      Reservations
                    </ListItemButton>
                  </Link>
                  <Link to="/guest-book">
                    <ListItemButton
                      variant="caption"
                      sx={{
                        color: "#ffffff80",
                        fontSize: "14px",
                        fontFamily: "gordita",
                      }}
                    >
                      Guests
                    </ListItemButton>
                  </Link>
                  {/* <ListItemButton
                  variant="caption"
                  sx={{
                    color: "#ffffff80",
                    fontSize: "14px",
                    fontFamily: "gordita",
                  }}
                >
                  POS
                </ListItemButton> */}
                  <Link to="/dashboard/restaurantprofile">
                    <ListItemButton
                      selected={
                        router.pathname === "/dashboard/restaurantprofile"
                      }
                      variant="caption"
                      sx={{
                        color: "#ffffff80",
                        fontSize: "14px",
                        fontFamily: "gordita",
                        "&.Mui-selected": {
                          background: "none",
                          color: "#fff",
                          borderBottom: "4px solid #BC172F",
                        },
                      }}
                    >
                      Settings
                    </ListItemButton>
                  </Link>
                </List>
              </Box>
            </Grid>
            <Grid item xl={1.5} lg={2} md={3.5}>
              <Box
                // align="right"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Avatar variant="rounded" src={restaurantLogo} />
                  <Box>
                    <Typography
                      sx={{
                        color: "#ffffff",
                        fontSize: "14px",
                        fontFamily: "gordita",
                        fontWeight: 500,
                        textTransform: "capitalize",
                      }}
                    >
                      {restaurantName ? restaurantName : ""}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        color: "#ffffff",
                        fontSize: "12px",
                        fontFamily: "gordita",
                        fontWeight: 300,
                        // textTransform:'lowercase'
                        // textTransform: "capitalize",
                      }}
                    >
                      {`${user.first_name} ${" " + " "} ${user.last_name.charAt(
                        0
                      )}.`}
                    </Typography>
                  </Box>
                </Box>
                <IconButton onClick={handleClick}>
                  <MoreVertIcon sx={{ color: "#fff" }} />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        )}
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
        <Box sx={{ p: 1, bgcolor: "#000", border: "0.5px solid #333" }}>
          <Link to="/dashboard/select">
            <MenuItem onClick={backHome}>
              <Typography
                sx={{ color: "#fff", fontSize: "12px", fontWeight: 400 }}
              >
                {" "}
                Select Restaurant
              </Typography>
            </MenuItem>
          </Link>
          <MenuItem onClick={backHome}>
            <Typography
              sx={{ color: "#fff", fontSize: "12px", fontWeight: 400 }}
            >
              {" "}
              Back to Homepage
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleLogout} sx={{ borderTop: "0.5px solid " }}>
            {" "}
            <Typography
              sx={{ color: "#fff", fontSize: "12px", fontWeight: 400 }}
            >
              {" "}
              Logout
            </Typography>
          </MenuItem>
        </Box>
      </Popover>
    </>
  );
};

export default TopNav;
