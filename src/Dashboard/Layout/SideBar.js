import {
  Box,
  List,
  ListItemButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import homeIcon from "../../assets/NavIcons/home-hashtag.svg";
import { Link, useLocation } from "react-router-dom";
import basicIcon from "../../assets/NavIcons/document-text.svg";
import icon3 from "../../assets/NavIcons/clipboard-text.svg";
import icon4 from "../../assets/NavIcons/clock.svg";
import icon5 from "../../assets/NavIcons/element-1.svg";
import icon6 from "../../assets/NavIcons/element-3.svg";
import icon7 from "../../assets/NavIcons/gallery.svg";
import icon8 from "../../assets/NavIcons/menu-board.svg";
import icon9 from "../../assets/NavIcons/user.svg";
import { useSelector } from "react-redux";

const menuData = [
  {
    label: "Basic Information",
    link: "/dashboard/basic-information",
    icon: basicIcon,
  },
  {
    label: "Offerings",
    link: "/dashboard/offerings",
    icon: icon3,
  },
  {
    label: "Experience",
    link: "/dashboard/experience",
    icon: icon5,
    new: false,
  },
  {
    label: "Gallery Photos",
    link: "/dashboard/gallery-photos",
    icon: icon7,
  },
  {
    label: "Guestbook",
    link: "/dashboard/guest-book",
    icon: icon9,
  },
  {
    label: "Menu",
    link: "/dashboard/menu",
    icon: icon8,
  },
];
const SideBar = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const [shrink, setShrink] = useState();
  const router = useLocation();
  const restaurantCreated = useSelector(
    (state) => state.restaurants.data.result
  );
  return (
    <>
      {isMatch ? (
        <></>
      ) : (
        <>
          <Box
            sx={{
              height: "100%",
              // bgcolor: "#000",
              pt: { xl: 8, lg: 6, md: 6 },
              overflow: "scroll",
              borderRight: "0.5px solid #fff",
              "&::-webkit-scrollbar": {
                display: "none", // Hide scrollbar for WebKit browsers
              },
            }}
          >
            <Box sx={{ margin: "0 auto", width: "85%", mt: 0 }}>
              <Typography
                variant="caption"
                sx={{
                  color: "#B3B3B3",
                  fontFamily: "Gordita",
                  fontSize: "14px",
                }}
              >
                Overview
              </Typography>
            </Box>
            <List sx={{ mt: 1.5 }}>
              <Link to="/dashboard/restaurantprofile">
                <ListItemButton
                  selected={router.pathname === "/dashboard/restaurantprofile"}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    "&.Mui-selected": { bgcolor: "#333" },
                  }}
                >
                  <img src={homeIcon} alt="icon" width={20} />
                  <Typography
                    sx={{
                      fontFamily: "Gordita",
                      color: "#fff",
                      ml: 2,
                      mt: 1,
                      fontSize: "12px",
                      fontWeight: 500,
                    }}
                  >
                    {" "}
                    Restaurant Profile{" "}
                  </Typography>
                </ListItemButton>
              </Link>
            </List>

            {restaurantCreated && (
              <>
                <Box sx={{ margin: "0 auto", width: "85%", mt: 2 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#B3B3B3",
                      fontFamily: "Gordita",
                      fontSize: "14px",
                    }}
                  >
                    Menu
                  </Typography>
                </Box>
                <List sx={{ mt: 2 }}>
                  {menuData.map((nav) => (
                    <Link to={nav.link}>
                      <ListItemButton
                        selected={router.pathname === nav.link}
                        sx={{
                          display: "flex",
                          py: 1.5,
                          alignItems: "center",
                          "&.Mui-selected": { bgcolor: "#484848" },
                        }}
                      >
                        <img src={nav.icon} alt="icon" width={20} />
                        <Typography
                          sx={{
                            fontFamily: "Gordita",
                            color: "#fff",
                            fontSize: "12px",
                            ml: 2,
                            mt: 1,
                            fontWeight: 500,
                          
                          }}
                        >
                          {" "}
                          {nav.label}{" "}
                          {nav.new && (
                            <span
                              style={{
                                background: "#C1E647",
                                padding: "2px",
                                borderRadius: "2px",
                                fontWeight: 600,
                                fontSize: "8px",
                                color: "#000",
                                // marginTop:'-50px'
                              }}
                            >
                              New
                            </span>
                          )}
                        </Typography>
                      </ListItemButton>
                    </Link>
                  ))}
                </List>
                <Box sx={{ margin: "0 auto", width: "85%", mt: 2 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#B3B3B3",
                      fontFamily: "Gordita",
                      fontSize: "14px",
                    }}
                  >
                    Configuration
                  </Typography>
                </Box>
                <List sx={{ mt: 2 }}>
                  <Link to="/dashboard/table-rooms">
                    <ListItemButton
                      selected={router.pathname === "/dashboard/table-rooms"}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        "&.Mui-selected": { bgcolor: "#484848" },
                      }}
                    >
                      <img src={icon6} alt="icon" width={20} />
                      <Typography
                        sx={{
                          fontFamily: "Gordita",
                          color: "#fff",
                          ml: 2,
                          mt: 1,
                          fontSize: "12px",
                          fontWeight: 500,
                        }}
                      >
                        {" "}
                        Tables & Rooms
                      </Typography>
                    </ListItemButton>
                  </Link>

                  <Link to="/dashboard/reservation-hours">
                    <ListItemButton
                      selected={
                        router.pathname === "/dashboard/reservation-hours"
                      }
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        "&.Mui-selected": { bgcolor: "#484848" },
                      }}
                    >
                      <img src={icon4} alt="icon" width={20} />
                      <Typography
                        sx={{
                          fontFamily: "Gordita",
                          color: "#fff",
                          ml: 2,
                          mt: 1,
                          fontSize: "12px",
                          fontWeight: 500,
                        }}
                      >
                        {" "}
                        Reservation Hours{" "}
                      </Typography>
                    </ListItemButton>
                  </Link>
                </List>
              </>
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default SideBar;
