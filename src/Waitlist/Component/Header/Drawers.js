import React, { useState } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Container,
  Button,
  Divider,
  Box,
  useTheme,
  Typography,
  ListItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../../../assets/Logo/logo.svg";
import CloseIcon from "@mui/icons-material/Close";
import { HashLink  as Link} from "react-router-hash-link";

const NAVDATA = [
  {
    title: "Home",
    link: "/#index",
  },
  {
    title: "Solutions",
    link: "/#learn_more",
  },
  {
    title: "Pricing",
    link: "/pricing",
  },
];

const Drawers = () => {
  const theme = useTheme();
  const router = useLocation();
  const navigate= useNavigate()

  const [openDrawer, setOpenDrawer] = useState(false);
  const [color, setColor] = useState(false);

  const changeColor = () => {
    if (window.scrollY >= 90) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  window.addEventListener("scroll", changeColor);

  const handleClick = ()=>{
    navigate('/get-started')
  }
  return (
    <>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List sx={{ width: "100vw", height: "100vh", overflowY: "hidden" }}>
          <Box sx={{ borderBottom: "1px solid #dadada" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "0 auto",
                width: "85%",
                height: "75px",
              }}
            >
              <Link to="/">
                <img src={Logo} alt="Logo" width={90} />
              </Link>
              <Box>
                <Link to='/get-started'>
                <Button
                onClick={() => setOpenDrawer(false)}
                  variant="contained"
                  sx={{
                    marginLeft: "auto",
                    fontSize: "13px",
                    borderRadius: "2px",
                    py: 1.2,
                    mr: 1,
                  }}
                >
                  Get Started
                </Button></Link>
                <IconButton onClick={() => setOpenDrawer(false)}>
                  <CloseIcon sx={{ color: "#bc172f", fontSize: "30px" }} />
                </IconButton>
              </Box>
            </Box>
          </Box>
          <Box  sx={{ margin:'0 auto', width:'85%', borderBottom:'1px solid #dadada', mt: 4, pb:3 }}>
            {NAVDATA.map((nav) => (
              <Link
                to={nav.link}
                spy={true} smooth={true} offset={-100} duration={500}
                style={{ textDecoration: "none",  }}
                onClick={() => setOpenDrawer(false)}
              >
                <ListItem
                  selected={router.pathname === nav.link}
                  sx={{
                    fontFamily: "Gordita",
                    color: "#2b2b2b",
                    fontWeight: 400,
                    fontSize: "18px",
                    mb: 1,
                    width: "fit-content",
                    pl:0,
                    "&.Mui-selected": {
                      color: "#bc172f",
                      background: "none",
                    //   textDecoration:'underline',
                      
                    },
                  }}
                >
                  {nav.title}{" "}
                </ListItem>
              </Link>
            ))}
          </Box>
          <Box sx={{ flexGrow: 1 }} />
      <Box sx={{margin:'0 auto', width:'85%', mt:5}}>
        <Link to="/" style={{textDecoration:'none'}}>
            <Typography variant="body1" sx={{color:'#2b2b2b', mb:2}}>Privacy Policy</Typography>
        </Link>
        <Link to="/" style={{textDecoration:'none'}}>
            <Typography variant="body1" sx={{color:'#2b2b2b', mb:2}}>Terms of service</Typography>
        </Link>
        <Link to="/" style={{textDecoration:'none'}}>
            <Typography variant="body1" sx={{color:'#2b2b2b', mb:2}}>Cookie Policy</Typography>
        </Link>
        <Link to='/login'>
        <Button
        fullWidth
                  variant="contained"
                  sx={{
                    marginLeft: "auto",
                    fontSize: "13px",
                    borderRadius: "5px",
                    py: 1.2,
                    mr: 1,
                    mt:3
                  }}
                >
               Login
                </Button>
                </Link>
        
      </Box>
        </List>
      </Drawer>

      <Button
      onClick={handleClick}
        variant="contained"
        sx={{
          marginLeft: "auto",
          fontSize: "13px",
          borderRadius: "2px",
          py: 1,
        }}
      >
        Get Started
      </Button>

      <IconButton sx={{ ml: 2 }} onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon sx={{ color: theme.palette.primary.main }} />
      </IconButton>
    </>
  );
};

export default Drawers;
