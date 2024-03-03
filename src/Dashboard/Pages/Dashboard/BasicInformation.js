import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
  InputLabel,
  TextField,
  Autocomplete,
  ThemeProvider,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import restaurantLogo from "../../../assets/ressta.jpg";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { getBasicInfo } from "../../../axios/api";
import Loader from "../../Components/Common/Loader";
import Section1 from "../../Components/Edits/Offerings/BasicInfo/Section1";
import Section3 from "../../Components/Edits/Offerings/BasicInfo/Section3";
import Section2 from "../../Components/Edits/Offerings/BasicInfo/Section2";
import { Helmet } from "react-helmet";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 750,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
};

const BasicInformation = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const hanleGetBasic = async () => {
    setIsLoading(true);
    await getBasicInfo()
      .then((res) => {
        console.log(res?.data?.result[0]);
        setIsLoading(false);
        setData(res?.data?.result[0]);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    hanleGetBasic();
  }, []);
  return (
    <>
      <Helmet> </Helmet>
      {isLoading && <Loader />}
      <Header title="Basic Information" />
      <Box
        sx={{
          margin: "0 auto",
          width: "95%",
          height: "90vh",
          overflow: "scroll",
          "&::-webkit-scrollbar": {
            display: "none", // Hide scrollbar for WebKit browsers
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 6,
          }}
        >
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ color: "#fff", fontSize: "16px" }}
            >
              Name, contact & price
            </Typography>
            <Typography
              sx={{
                color: "#cccccc",
                fontSize: { lg: "14px", sm: "12px", xs: "11px" },
                fontWeight:500
              }}
            >
              Our map feature is linked to your restaurant name and address.
            </Typography>
          </Box>
          <Box>
            <Section1 data={data} action={hanleGetBasic} />
          </Box>
        </Box>
        <Box sx={{ bgcolor: "#333", borderRadius: "5px", mt: 1, px: 3, py: 3 }}>
          <Grid
            container
            sx={{ width: { lg: "55%", md: "100%", sm: "100%", xs: "100%" } }}
            spacing={2}
          >
            <Grid item lg={6} md={4} sm={6} xs={6}>
              <Typography sx={{ fontSize: "14px", color: "#fff",       fontWeight:500 }}>
                Restaurant Name:
              </Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <Typography sx={{ fontSize: "14px", color: "#fff",       fontWeight:500 }}>
                {data ? data?.RestaurantName : "--"}
              </Typography>
            </Grid>
            {/* Restaurant Admin: */}
            <Grid item lg={6} md={4} sm={6} xs={6}>
              <Typography sx={{ fontSize: "14px", color: "#fff" ,       fontWeight:500}}>
                Restaurant Admin:
              </Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <Typography sx={{ fontSize: "14px", color: "#fff",       fontWeight:500 }}>
                {data ? data?.AdminFullName : "--"}
              </Typography>
            </Grid>
            {/* Restaurant Website: */}
            <Grid item lg={6} md={4} sm={6} xs={6}>
              <Typography sx={{ fontSize: "14px", color: "#fff",       fontWeight:500 }}>
                Restaurant Website:
              </Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <Typography sx={{ fontSize: "14px", color: "#fff",       fontWeight:500 }}>
                {data ? (
                  <a
                    target="_blank"
                    href={`${data?.Restaurantwebsite}`}
                    style={{ cursor: "pointer", color: "#fff" }}
                  >
                    {data?.Restaurantwebsite}
                  </a>
                ) : (
                  "--"
                )}
              </Typography>
            </Grid>
            {/* Restaurant Email: */}
            <Grid item lg={6} md={4} sm={6} xs={6}>
              <Typography sx={{ fontSize: "14px", color: "#fff",       fontWeight:500 }}>
                Restaurant Email:
              </Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <Typography sx={{ fontSize: "14px", color: "#fff",       fontWeight:500 }}>
                {data ? data?.EmailAddress : "--"}
              </Typography>
            </Grid>
            {/* Restaurant Phone Number */}
            <Grid item lg={6} md={4} sm={6} xs={6}>
              <Typography sx={{ fontSize: "14px", color: "#fff",       fontWeight:500 }}>
                Restaurant Phone Number:
              </Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <Typography sx={{ fontSize: "14px", color: "#fff",       fontWeight:500 }}>
                {data ? data.PhoneNumaber : "--"}
              </Typography>
            </Grid>
       
            {/* Restaurant Address */}
            <Grid item   lg={6} md={4} sm={6} xs={6}>
              <Typography sx={{ fontSize: "14px", color: "#fff",       fontWeight:500 }}>
                Restaurant Address:
              </Typography>
            </Grid>
            <Grid item  md={6} sm={6} xs={6}>
              <Typography sx={{ fontSize: "14px", color: "#fff",       fontWeight:500 }}>
                {data ? data?.Address : "--"}
              </Typography>
            </Grid>
            {/* Typical check amount: */}
            <Grid item lg={6} md={4} sm={6} xs={6}>
              <Typography sx={{ fontSize: "14px", color: "#fff",       fontWeight:500 }}>
                Typical check amount:
              </Typography>
            </Grid>
            <Grid item lg={6} sm={6} xs={6}>
              <Typography sx={{ fontSize: "14px", color: "#fff",       fontWeight:500 }}>
                {data ? data?.AverageCost.toLocaleString() : "--"}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 6,
          }}
        >
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ color: "#fff", fontSize: "16px" }}
            >
              Restaurant Logo
            </Typography>
            <Typography sx={{ color: "#cccccc", fontSize: "14px",       fontWeight:500 }}>
              This will appear at the top left of your dashboard
            </Typography>
          </Box>
          <Box>
            <Section2 data={data} action={hanleGetBasic} />
          </Box>
        </Box>
        <Box sx={{ bgcolor: "#333", borderRadius: "5px", mt: 1, px: 3, py: 3 }}>
          <Avatar
            src={data && data?.Logo}
            variant="square"
            sx={{ width: "30%", height: "200px" }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 6,
          }}
        >
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ color: "#fff", fontSize: "16px" }}
            >
              Description
            </Typography>
            <Typography sx={{ color: "#cccccc", fontSize: "14px",       fontWeight:500 }}>
              Crafting a distinctive description of your restaurant aids
              potential diners in discovering your establishment and what sets
              it apart.
            </Typography>
          </Box>
          <Box>
            <Section3 data={data} action={hanleGetBasic} />
          </Box>
        </Box>
        <Box
          sx={{
            bgcolor: "#333",
            borderRadius: "5px",
            mt: 1,
            px: 3,
            py: 3,
            mb: 5,
          }}
        >
          <Grid container sx={{ width: "100%" }} spacing={2}>
            <Grid item md={3} sm={6} xs={6}>
              <Typography sx={{ fontSize: "14px", color: "#fff",       fontWeight:500 }}>
                Description:
              </Typography>
            </Grid>
            <Grid item md={9} sm={6} xs={6}>
              <Typography sx={{ fontSize: "14px", color: "#fff",       fontWeight:500 }}>
                {data ? data?.Description : "No description"}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Modal for Name, contact and price */}
    </>
  );
};

export default BasicInformation;
