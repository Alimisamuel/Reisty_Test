import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import storyHero from "../../../assets/story.png";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import "../../../STYLES/main.css";
import { Link } from "react-router-dom";

const Stories = () => {
  const theme = useTheme();
  return (
    <>
      <Box
        className="food_background"
        sx={{
          //   height: "220px",
          bgcolor: theme.palette.primary.main,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          py: 10,
          //   alignItems: "center",
        }}
      >
        <Box
          sx={{
            margin: "0 auto",
            width: "90%",
            display: "flex",
            flexDirection: { lg: "row", md: "row", sm: "column", xs: "column" },
            justifyContent: "space-between",
            alignItems: {
              lg: "initial",
              md: "initial",
              sm: "center",
              xs: "center",
            },
            rowGap: 3,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              color: "#fff",
              fontFamily: "gordita",
              textAlign: {
                lg: "initial",
                md: "initial",
                sm: "center",
                xs: "center",
              },
            }}
          >
            Ready to elevate your dining
            <br /> experience in less than 5 minutes?
          </Typography>
          <Link to="/get-started">
            <Button
              variant="contained"
              sx={{
                background: "#fff",
                color: theme.palette.primary.main,
                px: 5,
                height: "50px",
                "&:hover": { background: "#ffffffb7" },
              }}
            >
              Let's Do It!
            </Button>
          </Link>
        </Box>
      </Box>

      {/* <Box  sx={{ bgcolor:theme.palette.primary.main}}>

    <Grid container>
        <Grid item lg={7} md={7} sm={12} xs={12} sx={{mb:3}}>
            <Box sx={{margin:'0 auto', width:'85%', mt:6}}>
                <Grid container>
                    <Grid item lg={9} md={9} sm={12} xs={12}>
                    <Typography variant='caption' sx={{color:'#fff', fontSize:{lg:'30px', md:'30px', sm:'20px', xs:'18px'}, lineHeight:{lg:'37px', md:'37px', sm:'30px', xs:'30px'} }}>Real Stories, Real Success: Hear What Our Customers Have to Say About Reisty</Typography>
                    </Grid>
                    <Grid item lg={3} md={3} sm={0} xs={0}  sx={{display:{lg:'block', md:'block', sm:'none', xs:'none'}}} >
                        <Box align="right" mt={3}>
                            <Typography variant='subtitle1' sx={{color:'#fff'}}>03</Typography>
                        </Box>
                    </Grid>
                </Grid>
<Typography variant='body1' sx={{color:'#fff', mt:3, width:{lg:'80%', md:'80%', sm:'100%', xs:'100%'}, fontSize:{lg:'15px', md:'15px', sm:'14px', xs:'14px'}}}>“The waitlist management feature of Reisty has been a game-changer for our restaurant. The ability to manage our waitlist in real-time has significantly reduced wait times and improved guest satisfaction. It's a must-have tool for any restaurant looking to optimize their seating process.”</Typography>

<Grid container sx={{mt:4}}>
    <Grid item sm={8} xs={8}>
        <Typography variant='body1' sx={{color:'#fff', fontSize:{lg:'15px', md:'15px', sm:'12px', xs:'12px'}}}>Michael Jackson, Chef/Co-owner</Typography>
        <Typography variant='body1' sx={{color:'#fff', fontSize:{lg:'12px', md:'12px', sm:'10px', xs:'10px'}}}>Orchid Bistro</Typography>
    </Grid>
    <Grid item sm={4} xs={4}>
<Stack direction="row" spacing={2}>
    <IconButton><WestIcon sx={{color:'#fff'}}/></IconButton>
    <IconButton><EastIcon sx={{color:'#fff'}}/></IconButton>
</Stack>
    </Grid>
</Grid>
            </Box>
        </Grid>
        <Grid item lg={5} md={5}>
            <Box sx={{height:'500px'}}>
                <Avatar src={storyHero} variant='square' sx={{height:'100%', width:'100%'}}/>
            </Box>
        </Grid>
    </Grid>

  </Box> */}
    </>
  );
};

export default Stories;
