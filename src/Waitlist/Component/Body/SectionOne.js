import { Avatar, Box, Grid, Typography } from '@mui/material'
import React,{useEffect} from 'react'
import video from '../../../assets/video.png'
import Aos from 'aos'
import 'aos/dist/aos.css'

const SectionOne = () => {

    useEffect(()=>{
        Aos.init({duration: 1000});
      },[])
  return (
    <>
      <Box sx={{ bgcolor: "#FDEDEF" }} id="learn_more">
        <Box
          sx={{
            margin: "0 auto",
            width: { lg: "85%", md: "85%", sm: "90%", xs: "90%" },
            py: 8,
          }}
        >
          <Grid container spacing={4}>
            <Grid item lg={6} md={6}>
              <Box sx={{ width: "100%" }}>
                <Avatar
                  src={video}
                  variant="square"
                  sx={{ height: "100%", width: "100%" }}
                />
              </Box>
            </Grid>
            <Grid
              item
              lg={6}
              md={6}
              sm={12}
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box data-aos="fade-up" sx={{ pr: { lg: 5, xs: 0 } }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    mb: 2,
                    fontSize: {
                      lg: "24px",
                      md: "24px",
                      sm: "20px",
                      xs: "20px",
                    },
                    color: "#BC172F",
                    textTransform: "capitalize",
                  }}
                >
                  What makes Reisty the ideal choice for restaurants?
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: {
                      lg: "14px",
                      md: "14px",
                      sm: "12px",
                      xs: "12px",
                    },
                    color: "#2B2B2B",
                    fontFamily: "Gordita",
                  }}
                >
                  With Innovative Features, and an intuitive Interface. Reisty
                  empowers restaurants looking to maximize efficiency and
                  customer satisfaction.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default SectionOne
