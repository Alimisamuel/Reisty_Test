import {
  Button,
  Box,
  Typography,
  Grid,
  IconButton,
  Autocomplete,
  InputLabel,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  createTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import CustomInput from "../../../CustomField/CustomInput";
import CustomTextField from "../../../CustomField/CustomTextField";
import { Countries } from "../../../../../assets/Data/Countries";
import { editBasicInfo } from "../../../../../axios/api";
import Loader from "../../../Common/Loader";
import { useSnackbar } from "notistack";
import CustomAddress from "../../../CustomField/CustomAddress";

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
const Section1 = ({ data, action }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [restaurantName, setRestaurantName] = useState("");
  const [adminName, setAdminName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [averageCost, setAverageCost] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [locationValue, setLocationValue] = useState({
    address: "",
 
  });

  const handleLocationChange = (locationData) => {
    console.log("Location changed:", locationData);
    setLocationValue(locationData);
  };
  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };

  useEffect(() => {
    // console.log(data)
    setRestaurantName(data?.RestaurantName);
    setAdminName(data?.AdminFullName);
    setEmail(data?.EmailAddress);
    setWebsite(data?.Restaurantwebsite);
    setPhone(data?.PhoneNumaber);
    setLocationValue({ ...locationValue, address: data?.Address });
    setAverageCost(data?.AverageCost);
  }, [data]);

  const handleRadioChange = (event) => {
    setAverageCost(event.target.value);
  };

  const handleEdit = async () => {
    setIsLoading(true);
    await editBasicInfo(
      restaurantName,
      adminName,
      email,
      website,
      phone,
      locationValue?.address,
      locationValue?.longitude,
      locationValue?.latitude,
      averageCost
    )
      .then((res) => {
        setIsLoading(false);
        if (res.data.status) {
          handleAlert("success", `${res?.data?.success_message}`);
          setOpen(false);
          action();
        } else {
          handleAlert("error", `${res?.data?.result.map((item) => item)}`);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        handleAlert("error", `${err.message}}`);
      });
  };

  console.log(averageCost, "Sammy");
  return (
    <>
      <Button
        onClick={handleOpen}
        sx={{ border: "1px solid #fff", bgcolor: "#333", color: "#fff" }}
      >
        Edit
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {isLoading && <Loader />}
          <Box
            sx={{
              height: "60px",
              bgcolor: "#333333",
              borderBottom: "1px solid #BC172F",
            }}
          >
            <Grid
              container
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
                py: 2,
              }}
            >
              <Grid item lg={4} md={4}></Grid>
              <Grid item lg={4} md={4}>
                <Typography
                  sx={{
                    fontFamily: "gordita",
                    color: "#fff",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                >
                  Name, contact & price
                </Typography>
              </Grid>
              <Grid item align="right" lg={4} md={4}>
                <IconButton onClick={handleClose}>
                  <CloseIcon sx={{ color: "#fff" }} />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              bgcolor: "#1A1A1A",
              px: 5,
              height: "600px",
              overflow: "scroll",
              py: 2,
            }}
          >
            <Typography
              sx={{
                fontFamily: "gordita",
                color: "#fff",
                textAlign: "center",
                fontSize: "14px",
              }}
            >
              To enhance the visibility of your business on Reisty, ensure to
              fill out your profile completely.
            </Typography>

            <Grid container sx={{ mt: 3 }} spacing={2} rowGap={1}>
              <Grid item lg={6} md={6} xs={12}>
                <CustomTextField
                  name="Restaurant Name"
                  value={restaurantName}
                  onChange={(e) => setRestaurantName(e.target.value)}
                />
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <CustomTextField
                  name="Admins Full Name"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                />
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <CustomTextField
                  name="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <CustomTextField
                  name="Restuarant Website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </Grid>
              <Grid item lg={6} md={6} xs={12}>
                <CustomTextField
                  name="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Grid>

              <Grid item lg={6} md={6} xs={12}>
                <InputLabel
                  sx={{
                    color: "#ccc",
                    fontWeight: 500,
                    fontSize: "13px",
                    fontFamily: "Gordita",
                    mb: 1,
                  }}
                >
                  Restaurant Address
                </InputLabel>
                <CustomAddress
                  onAddressChange={handleLocationChange}
                  updateAddress={data?.Address}
                />
              </Grid>
              {/* <Grid item lg={6} xs={12}>
       <CustomTextField name="Address Two"/>
              </Grid> */}
              <Grid item lg={12} xs={12}>
                <InputLabel
                  sx={{
                    color: "#ccc",
                    fontSize: "13px",
                    fontFamily: "Gordita",
                    mb: 1,
                    fontWeight: 500,
                  }}
                >
                  What is the average cost per guest at your restaurant?
                </InputLabel>
                <Box
                  sx={{ border: "1px solid #ccc", borderRadius: "5px", p: 3 }}
                >
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    value={averageCost}
                    onChange={handleRadioChange}
                  >
                    <FormControlLabel
                      sx={{
                        "& > span": {
                          fontFamily: "Gordita",
                          fontSize: "12px",
                          color: "#cccccc",
                        },
                      }}
                      value="10000"
                      control={<Radio />}
                      label="₦10,000 and under (₦₦)"
                    />
                    <FormControlLabel
                      sx={{
                        "& > span": {
                          fontFamily: "Gordita",
                          fontSize: "12px",
                          color: "#cccccc",
                        },
                      }}
                      value="50000"
                      control={<Radio />}
                      label="₦10,000- ₦50,000 (₦₦)"
                    />
                    <FormControlLabel
                      sx={{
                        "& > span": {
                          fontFamily: "Gordita",
                          fontSize: "12px",
                          color: "#cccccc",
                        },
                      }}
                      value="100000"
                      control={<Radio />}
                      label="₦50,000 and above (₦₦₦)"
                    />
                  </RadioGroup>
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ mt: 2, mb: 3 }} align="right">
              <Button variant="contained" onClick={handleEdit}>
                Save Changes
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Section1;
