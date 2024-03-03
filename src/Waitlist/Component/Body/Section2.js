import {
  Box,
  Grid,
  Typography,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect } from "react";
import ipad from "../../../assets/iPad Air (2020) 3 (1).png";
import menu_mockup from '../../../assets/mockupss/menu.png'
import boosting_mockup from "../../../assets/mockupss/boosting.png";
import review_mockup from "../../../assets/mockupss/review.png"


import Aos from "aos";
import "aos/dist/aos.css";


const Section2 = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <>
      <Box sx={{ bgcolor: "#FEF6F7" }}>
        {isMobile ? (
          <>
            <Box sx={{ margin: "0 auto", width: "90%", py: 5 }}>
              <Grid container spacing={4} id="reservations">
                <Grid item lg={6} md={8}>
                <Typography
                    variant="subtitle1"
                    color="primary"
                    sx={{ mb: 2 }}
                    data-aos="fade-right"
                  >
                    Reservation Management
                  </Typography>
                  <Typography variant="caption" data-aos="fade-up">
                  We whisk away the stress of managing reservations and tables, allowing you to orchestrate your dining experience effortlessly and indulge your guests with satisfaction. With our culinary-friendly table management tools, seamlessly streamlined reservation processes, and real-time updates, Reisty guarantees a dining symphony that harmonizes efficiency and always delights your patrons.
                  </Typography>
               
                </Grid>
                <Grid
                  item
                  sm={12}
                  xs={12}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Box sx={{ width: "100%" }} data-aos="zoom-in">
                    <Avatar
                      src={ipad}
                      variant="square"
                      sx={{ height: "100%", width: "100%" }}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={4} sx={{ mt: 3 }}>
                <Grid item lg={6} md={12}>
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    sx={{ mb: 2, fontSize: "20px" }}
                    data-aos="fade-up"
                  >
            Menu Management
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ fontSize: "14px" }}
                    data-aos="fade-up"
                  >
           With Reisty you can make menu creation, updates, and management a piece of cake. Our software offers delectable templates for crafting mouthwatering menus, handy tools for categorizing dishes and setting prices, and the flexibility to easily adapt and tweak your offerings whenever your culinary inspiration strikes
                  </Typography>
               
                </Grid>
                <Grid
                  item
                  sm={12}
                  md={12}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                        <Box sx={{ width: "100%" }} data-aos="zoom-in">
                    <Avatar
                      src={menu_mockup}
                      variant="square"
                      sx={{ height: "100%", width: "100%" }}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={4} sx={{ mt: 2 }}>
                <Grid item sm={12} xs={12}>
                <Typography
                    variant="subtitle1"
                    color="primary"
                    sx={{ mb: 2 }}
                    data-aos="fade-right"
                  >
                    Boost Online Presence
                  </Typography>
                  <Typography variant="caption" data-aos="fade-up">
                  We're your secret sauce for online triumph, turning your restaurant into an internet sensation, captivating diners, and cashing in on the rewards. With our digital superpowers of targeted campaigns, online charisma, and reputation alchemy, Reisty propels your restaurant into the digital stratosphere, where fame and fortune await your flavorful creations.
                  </Typography>
              
                </Grid>
                <Grid
                  item
                  sm={12}
                  xs={12}
                  sx={{ display: "flex", alignItems: "center" }}
                >
              <Box sx={{ width: "100%" }} data-aos="zoom-out">
                    <Avatar
                      src={boosting_mockup}
                      variant="square"
                      sx={{ height: "100%", width: "100%" }}
                    />
                  </Box>
               
                </Grid>
              </Grid>
              <Grid container spacing={4} sx={{ mt: 0 }}>
                <Grid item lg={6} md={8}>
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    sx={{ mb: 2 }}
                    data-aos="fade-up"
                  >
                 Review Management
                  </Typography>
                  <Typography variant="caption" data-aos="fade-up">
                  We're the flavorful ingredient that enhances your culinary reputation, infusing your restaurant with mouthwatering feedback, glowing testimonials, and a sprinkle of online acclaim. With our expert tools for monitoring, responding, and showcasing customer reviews, Reisty helps you create a delectable dining experience that keeps food lovers coming back for seconds.
                  </Typography>
             
                </Grid>
                <Grid
                  item
                  sm={12}
                  xs={12}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Box sx={{ width: "100%" }} data-aos="zoom-out">
                    <Avatar
                      src={review_mockup}
                      variant="square"
                      sx={{ height: "100%", width: "100%" }}
                    />
                  </Box>
              
                </Grid>
              </Grid>
            </Box>
          </>
        ) : (
          <>
            <Box sx={{ margin: "0 auto", width: "85%", py: 5 }}>
              <Grid container spacing={4}>
                <Grid item lg={6} md={6} sx={{ display:'flex', flexDirection:'column', justifyContent:'center', pr:6}} id="reservation_management">
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    sx={{ mb: 2 }}
                    data-aos="fade-right"
                  >
                    Reservation Management
                  </Typography>
                  <Typography variant="caption" data-aos="fade-up">
                  We whisk away the stress of managing reservations and tables, allowing you to orchestrate your dining experience effortlessly and indulge your guests with satisfaction. With our culinary-friendly table management tools, seamlessly streamlined reservation processes, and real-time updates, Reisty guarantees a dining symphony that harmonizes efficiency and always delights your patrons.
                  </Typography>
              
                </Grid>
                <Grid
                  item
                  lg={6}
                  md={6}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Box sx={{ width: "100%" }} data-aos="zoom-in">
                    <Avatar
                      src={ipad}
                      variant="square"
                      sx={{ height: "100%", width: "100%" }}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={4} sx={{ mt: 8 }} id="menu_management">

                   <Grid
                  item
                  lg={6}
                  md={6}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Box sx={{ width: "100%" }} data-aos="zoom-in">
                    <Avatar
                      src={menu_mockup}
                      variant="square"
                      sx={{ height: "100%", width: "100%" }}
                    />
                  </Box>
                </Grid>
                <Grid item lg={6} md={6} sx={{ display:'flex', flexDirection:'column', justifyContent:'center', }}>
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    sx={{ mb: 2, ml:4 }}
                    data-aos="fade-right"
                  >
                Menu Management
                  </Typography>
                  <Typography variant="caption" data-aos="fade-up" sx={{ml:4}}>
                  With Reisty you can make menu creation, updates, and management a piece of cake. Our software offers delectable templates for crafting mouthwatering menus, handy tools for categorizing dishes and setting prices, and the flexibility to easily adapt and tweak your offerings whenever your culinary inspiration strikes
                  </Typography>
               
                </Grid>
              </Grid>
              <Grid container spacing={4} sx={{ mt: 16 }} id="boosting">
                <Grid item lg={6} md={6} sx={{pr:10, display:'flex', flexDirection:'column', justifyContent:'center'}}>
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    sx={{ mb: 2 }}
                    data-aos="fade-left"
                  >
                  Boost Online Presence
                  </Typography>
                  <Typography variant="caption" data-aos="fade-up">
                  We're your secret sauce for online triumph, turning your restaurant into an internet sensation, captivating diners, and cashing in on the rewards. With our digital superpowers of targeted campaigns, online charisma, and reputation alchemy, Reisty propels your restaurant into the digital stratosphere, where fame and fortune await your flavorful creations.
                  </Typography>
                
                </Grid>
                <Grid
                  item
                  lg={6}
                  md={6}
                  sx={{  }}
                >
            
                  <Box sx={{ width: "100%" }} data-aos="zoom-out">
                    <Avatar
                      src={boosting_mockup}
                      variant="square"
                      sx={{ height: "100%", width: "100%" }}
                    />
                  </Box>
               
                </Grid>
              </Grid>
              <Grid container spacing={4} sx={{ mt: 8 }} id="review">
              <Grid
                  item
                  lg={6}
                  md={6}
                  sx={{  }}
                >
                  <Box align="center">
            
                  <Box sx={{ width: "100%" }} data-aos="zoom-out" >
                    <Avatar
                      src={review_mockup}
                      variant="square"
                      sx={{ height: "100%", width: "100%" }}
                    />
                  </Box>
             
                  </Box>
                </Grid>
                <Grid item lg={6} md={6} sx={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    sx={{ mb: 2, ml:5 }}
                    data-aos="fade-right"
                  >
                 Review Management
                  </Typography>
                  <Box sx={{pl:5}}>
                  <Typography variant="caption" data-aos="fade-up" >
                  We're the flavorful ingredient that enhances your culinary reputation, infusing your restaurant with mouthwatering feedback, glowing testimonials, and a sprinkle of online acclaim. With our expert tools for monitoring, responding, and showcasing customer reviews, Reisty helps you create a delectable dining experience that keeps food lovers coming back for seconds.
                  </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default Section2;
