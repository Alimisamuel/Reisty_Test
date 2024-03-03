import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Drawer,
  IconButton,
  List,
  Button,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  Grid,
  Box
} from "@mui/material";
import logo from "../../assets/Logo/single.svg";
import MenuIcon from "@mui/icons-material/Menu";
import homeIcon from "../../assets/NavIcons/home-hashtag.svg";
import basicIcon from "../../assets/NavIcons/document-text.svg";
import icon3 from "../../assets/NavIcons/clipboard-text.svg";
import icon4 from "../../assets/NavIcons/clock.svg";
import icon5 from "../../assets/NavIcons/element-1.svg";
import icon6 from "../../assets/NavIcons/element-3.svg";
import icon7 from "../../assets/NavIcons/gallery.svg";
import icon8 from "../../assets/NavIcons/menu-board.svg";
import icon9 from "../../assets/NavIcons/user.svg";

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

const Drawers = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [restaurantCreated, setRestaurantCreated] = useState(true);
    const router = useLocation();
  return (
<>
<Drawer open={openDrawer} onClose={() => setOpenDrawer(false)} sx={{width:'60%'}}>
<List sx={{  bgcolor: "#1a1a1a", }}>
    <Box sx={{borderBottom:'1px solid #BC172F', p:2, py:1.1, width:'50vw'}}>
    <Link to="/dashboard">
              <img src={logo} width={30} alt="reistry_logo" />
            </Link>
            <Box sx={{display:'flex', mt:2}}>
            <ListItemButton
              variant="caption"
              sx={{ color: "#ffffff80", fontSize: "12px", fontFamily:'gordita' }}
            >
              Guests
            </ListItemButton>
            <ListItemButton
              variant="caption"
              sx={{ color: "#ffffff80", fontSize: "12px",fontFamily:'gordita' }}
            >
             POS
            </ListItemButton>
            </Box>
    </Box>
<List sx={{ mt: 2 }}>
        <Link to="/dashboard/restaurantprofile">
          <ListItemButton
            onClick={() => setOpenDrawer(false)}
            selected={router.pathname === "/dashboard/restaurantprofile"}
            sx={{
              display: "flex",
              alignItems: "center",
              "&.Mui-selected": { bgcolor: "#484848" },
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
              }}
            >
              {" "}
              Restaurant Profile{" "}
            </Typography>
          </ListItemButton>
        </Link>
      </List>

      { restaurantCreated && 
      <>
      <Box sx={{ margin: "0 auto", width: "85%", mt: 2 }}>
        <Typography
          variant="caption"
          sx={{
            color: "#B3B3B3",
            fontFamily: "Gordita-thin",
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
              onClick={() => setOpenDrawer(false)}
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
                }}
              >
                {" "}
                {nav.label}{" "}
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
            fontFamily: "Gordita-thin",
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
              }}
            >
              {" "}
              Tables & Rooms
            </Typography>
          </ListItemButton>
        </Link>

        <Link to="/dashboard/reservation-hours">
          <ListItemButton
            selected={router.pathname === "/dashboard/reservation-hours"}
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
              }}
            >
              {" "}
              Reservation Hours{" "}
            </Typography>
          </ListItemButton>
        </Link>
      </List>
      </>
      }
</List>
    </Drawer>

    <Grid container sx={{px:2}}>
            <Grid item sm={8} xs={8}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link to="/dashboard">
              <img src={logo} width={30} alt="reistry_logo" />
            </Link>
            <List sx={{display:'flex'}}>
            <ListItemButton
            
              variant="caption"
              sx={{ color: "#ffffff80", fontSize: "12px", fontFamily:'gordita' }}
            >
              Reservations
            </ListItemButton>
        
    
            <Link to="/dashboard/restaurantprofile">
            <ListItemButton
             selected={router.pathname === "/dashboard/restaurantprofile"}
              variant="caption"
              sx={{ color: "#ffffff80", fontSize: "12px", fontFamily:'gordita','&.Mui-selected':{background:'none', color:'#fff', borderBottom:'4px solid #BC172F'} }}
            >
              Settings
            </ListItemButton>
            </Link>
            </List>
          </Box>
        </Grid>
        <Grid item sm={4} xs={4} align="right" sx={{display:'flex', alignItems:'center', justifyContent:'right'}}>
        <IconButton
              sx={{ color: "#fff" }}
              onClick={() => setOpenDrawer(!openDrawer)}
            >
              <MenuIcon />
            </IconButton>
        </Grid>
            </Grid>
</>
  )
}

export default Drawers
