import {
  Box,
  Grid,
  TextField,
  Typography,
  InputLabel,
  createTheme,
  ThemeProvider,
  Autocomplete,
  Button,
  Avatar,
  ListItem,
  Snackbar,
  Alert,
  ListItemIcon,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import galleryIcon from "../../../../assets/Icons/gallery.svg";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { MuiTelInput } from "mui-tel-input";
import parse from "autosuggest-highlight/parse";
import { debounce, useForkRef } from "@mui/material/utils";
import { useFormik } from "formik";
import { BasicInfo } from "../../shema/BasicShema";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import axiosFetch from "../../../../axios/custom";
import Loader from "../../Common/Loader";
import { createBasicInfo } from "../../../../axios/api";
import { useSnackbar } from "notistack";
import CustomAddress from "../../CustomField/CustomAddress";

const theme = createTheme({
  palette: {
    mode:'dark',
    primary: {
      main: "#ccc",
    },
   
  },
});

const themeRadio = createTheme({
  palette: {
    primary: {
      main: "#BC172F",
    },
    secondary: {
      main: "#fff",
    },
  },
  Typography: {
    fontFamily: "Gordita",
    color: "#fff",
    label: {
      fontFamily: "Gordita",
    },
  },
});

const BasicInformations = ({ updateState, updateId }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [state, setState] = useState("");
  const [LGA, setLGA] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [location, setLocation] = useState(null);
  const [averageCost, setAverageCost] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [locationValue, setLocationValue] = useState(null)

  const handleRadioChange = (event) => {
    setAverageCost(event.target.value);
  };

  const handleAlert = (variant, message) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { variant });
  };

    const handleLocationChange = (locationData) => {
      console.log("Location changed:", locationData);
      setLocationValue(locationData)

    };


  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(" ");

  console.log(selectedFile);
  const handleButtonClick = () => {
    fileInputRef.current.click(); // Trigger file input click
  };

  const [selectedFileURL, setSelectedFileURL] = useState(null);
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataURL = e.target.result;
        setSelectedFileURL(dataURL);
      };
      reader.readAsDataURL(file);
    }
  };



  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      restuarantName: "",
      adminsFullName: "",
      email: "",
      restuarantWebsite: "",
      phoneNumber: "",
      description: "",
      Address: "",
    },
    validationSchema: BasicInfo,
    onSubmit: () => {
      handleCreateBasicInfo();
      // alert("Hurray");
      console.log(location);
    },
  });
  const {
    restuarantName,
    adminsFullName,
    email,
    restuarantWebsite,
    phoneNumber,
    description,
    Address,
  } = values;

  const handleCreateBasicInfo = async () => {
    setIsLoading(true);
    setSuccess(false);

    console.log(
      state,
      locationValue.address,
      averageCost,
      selectedFile,
      description,
      locationValue?.latitude,
      locationValue?.longitude
    );

    await createBasicInfo(
      restuarantName,
      adminsFullName,
      email,
      restuarantWebsite,
      phoneNumber,
      selectedCountry,
      "LGA",
      "null",
      locationValue.address,
      averageCost,
      selectedFile,
      description,
   locationValue?.latitude,
locationValue?.longitude
    )
      .then((res) => {
        console.log(res);
        if (res?.data?.status) {
          handleAlert("success", `${res?.data?.success_message}`);
          updateState(1);
          updateId(res?.data?.result[0]?.RestaurantId);
        } else {
          handleAlert("error", `${res?.data?.result.map((item) => item)}`);
        }

        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        handleAlert("error", "Error sending request");
      });
  };
  // console.log("=>Seleceted File", selectedFile, selectedFileURL);
  return (
    <>
      {isLoading && <Loader />}
      <Box sx={{ bgcolor: "#1A1A1A", mt: 2, borderRadius: "5px" }}>
        <Box sx={{ margin: "0 auto", width: "85%", py: 5 }}>
          <Typography variant="caption" sx={{ color: "#fff" }}>
            To enhance the visibility of your business on Reisty, ensure to fill
            out your profile completely.
          </Typography>
          <ThemeProvider theme={theme}>
            <Grid container sx={{ mt: 3 }} spacing={2} rowGap={1}>
              <Grid item md={6} lg={6} xs={12}>
                <InputLabel
                  sx={{
                    color: "#ccc",
                    fontSize: "13px",
                    fontFamily: "Gordita",
                    mb: 1,
                  }}
                >
                  Restaurant Names
                </InputLabel>
                <TextField
                  error={errors.restuarantName}
                  helperText={errors.restuarantName}
                  id="restuarantName"
                  value={values.restuarantName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Restaurant Name"
                  size="large"
                  fullWidth
                  InputProps={{
                    style: {
                      fontFamily: "Gordita",
                      fontSize: "13px",
                      borderRadius: "10px",
                      offset: " 1px solid #ccc",
                      color: "#ccc",
                      border: "1px solid #ccc",

                      // Replace with your desired font family
                    },
                  }}
                />
              </Grid>
              <Grid item md={6} lg={6} xs={12}>
                <InputLabel
                  sx={{
                    color: "#ccc",
                    fontSize: "13px",
                    fontFamily: "Gordita",
                    mb: 1,
                  }}
                >
                  Admins Full Name
                </InputLabel>
                <TextField
                  error={errors.adminsFullName}
                  helperText={errors.adminsFullName}
                  id="adminsFullName"
                  value={values.adminsFullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Admins Full Name"
                  size="large"
                  fullWidth
                  InputProps={{
                    style: {
                      fontFamily: "Gordita",
                      fontSize: "13px",
                      borderRadius: "10px",
                      offset: " 1px solid #ccc",
                      color: "#ccc",
                      border: "1px solid #ccc",

                      // Replace with your desired font family
                    },
                  }}
                />
              </Grid>
              <Grid item md={6} lg={6} xs={12}>
                <InputLabel
                  sx={{
                    color: "#ccc",
                    fontSize: "13px",
                    fontFamily: "Gordita",
                    mb: 1,
                  }}
                >
                  Email Address
                </InputLabel>
                <TextField
                  error={errors.email}
                  helperText={errors.email}
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Email Address"
                  size="large"
                  fullWidth
                  InputProps={{
                    style: {
                      fontFamily: "Gordita",
                      fontSize: "13px",
                      borderRadius: "10px",
                      offset: " 1px solid #ccc",
                      color: "#ccc",
                      border: "1px solid #ccc",

                      // Replace with your desired font family
                    },
                  }}
                />
              </Grid>
              <Grid item md={6} lg={6} xs={12}>
                <InputLabel
                  sx={{
                    color: "#ccc",
                    fontSize: "13px",
                    fontFamily: "Gordita",
                    mb: 1,
                  }}
                >
                  Restuarant Website
                </InputLabel>
                <TextField
                  error={errors.restuarantWebsite}
                  helperText={errors.restuarantWebsite}
                  id="restuarantWebsite"
                  value={values.restuarantWebsite}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Restuarant Website"
                  size="large"
                  fullWidth
                  InputProps={{
                    style: {
                      fontFamily: "Gordita",
                      fontSize: "13px",
                      borderRadius: "10px",
                      offset: " 1px solid #ccc",
                      color: "#ccc",
                      border: "1px solid #ccc",

                      // Replace with your desired font family
                    },
                  }}
                />
              </Grid>
              <Grid item md={6} lg={6} xs={12}>
                <InputLabel
                  sx={{
                    color: "#ccc",
                    fontSize: "13px",
                    fontFamily: "Gordita",
                    mb: 1,
                  }}
                >
                  Phone Number
                </InputLabel>

                <TextField
                  error={errors.phoneNumber}
                  helperText={errors.phoneNumber}
                  id="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="phoneNumber"
                  size="large"
                  fullWidth
                  type="number"
                  InputProps={{
                    style: {
                      fontFamily: "Gordita",
                      fontSize: "13px",
                      borderRadius: "10px",
                      offset: " 1px solid #ccc",
                      color: "#ccc",
                      border: "1px solid #ccc",

                      // Replace with your desired font family
                    },
                  }}
                />
              </Grid>
              <Grid item md={6} lg={6} xs={12}>
                <InputLabel
                  sx={{
                    color: "#ccc",
                    fontSize: "13px",
                    fontFamily: "Gordita",
                    mb: 1,
                  }}
                >
                  Country
                </InputLabel>
                <Autocomplete
                  id="country-select-demo"
                  sx={{
                    width: "100%",

                    "& > div": {
                      borderRadius: "10px",
                      border: "1px solid #ccc",
                      offset: "1px solid #fff",
                    },
                  }}
                  options={countries}
                  autoHighlight
                  onInputChange={(event, newValue) => {
                    setSelectedCountry(newValue);
                  }}
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{
                        fontFamily: "Gordita",
                        borderRadius: "10px",
                        fontSize: "13px",
                        "& > img": { mr: 2, flexShrink: 0 },
                      }}
                      {...props}
                    >
                      <img
                        loading="lazy"
                        width="20"
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        alt=""
                      />
                      {option.label} ({option.code}) +{option.phone}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      placeholder="Please Select"
                      {...params}
                      fullWidth
                      inputProps={{
                        style: {
                          fontFamily: "Gordita",
                          fontSize: "13px",
                          color: "#ccc",
                        },
                        ...params.inputProps,
                        autoComplete: "new-password", // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item md={6} lg={6} xs={12}>
                <InputLabel
                  sx={{
                    color: "#ccc",
                    fontSize: "13px",
                    fontFamily: "Gordita",
                    mb: 1,
                  }}
                >
                  Address 1
                </InputLabel>
                <CustomAddress onAddressChange={handleLocationChange} />
              </Grid>
              <Grid item md={6} lg={6} xs={12}>
                <InputLabel
                  sx={{
                    color: "#ccc",
                    fontSize: "13px",
                    fontFamily: "Gordita",
                    mb: 1,
                  }}
                >
                  Address 2 (optional)
                </InputLabel>
                <TextField
                  placeholder="Address 2 (optional) "
                  size="large"
                  fullWidth
                  InputProps={{
                    style: {
                      fontFamily: "Gordita",
                      fontSize: "13px",
                      borderRadius: "10px",
                      offset: " 1px solid #ccc",
                      color: "#ccc",
                      border: "1px solid #ccc",

                      // Replace with your desired font family
                    },
                  }}
                />
              </Grid>
              <Grid item md={12} lg={12} xs={12} sx={{ mt: 2 }}>
                <InputLabel
                  sx={{
                    color: "#ccc",
                    fontSize: "13px",
                    fontFamily: "Gordita",
                    mb: 1,
                  }}
                >
                  What is the average cost per guest at your restaurant?
                </InputLabel>
                <Box
                  sx={{ border: "1px solid #ccc", borderRadius: "5px", p: 3 }}
                >
                  <ThemeProvider theme={themeRadio}>
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
                        label="₦10,000 and below (₦)"
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
                        value="100,000 "
                        control={<Radio />}
                        label="₦50,000 and above (₦₦₦)"
                      />
                    </RadioGroup>
                  </ThemeProvider>
                </Box>
              </Grid>
            </Grid>
          </ThemeProvider>
        </Box>
      </Box>
      <Box sx={{ bgcolor: "#1A1A1A", mt: 2, borderRadius: "5px" }}>
        <Box sx={{ margin: "0 auto", width: "85%", py: 5 }}>
          <Typography variant="caption" sx={{ color: "#fff" }}>
            Add a brightly illuminated image of your restaurant's logo.
          </Typography>

          <Typography
            sx={{
              color: "#fff",
              fontFamily: "Gordita",
              fontSize: "12px",
              mt: 1,
            }}
          >
            By including a well-lit logo image, you can instantly enhance your
            restaurant's branding and make it more easily recognizable to
            customers
          </Typography>
          <Box
            sx={{
              mt: 3,
              border: "1px dashed #ccc",
              borderRadius: "5px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 8,
            }}
          >
            {selectedFileURL ? (
              <Box>
                <Avatar
                  variant="square"
                  src={selectedFileURL}
                  alt="Selected File"
                  onClick={handleButtonClick}
                />
              </Box>
            ) : (
              <img
                src={galleryIcon}
                alt="gallery_icon"
                onClick={handleButtonClick}
              />
            )}

            <Typography
              sx={{
                color: "#ccc",
                mt: 2,
                fontFamily: "gordita",
                fontSize: "10px",
              }}
            >
              Drag or drop your photo here
            </Typography>
            <Button
              onClick={handleButtonClick}
              variant="contained"
              sx={{
                mt: 2,
                background: "#ccc",
                color: "#2b2b2b",
                "&:hover": { background: "#fff" },
              }}
            >
              Browse Files
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileSelect}
            />
          </Box>
          <Box
            sx={{
              mt: 3,
              bgcolor: "#ffffff1a",
              borderRadius: "5px",
              p: 3,
              width: { lg: "50%" },
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <TipsAndUpdatesIcon sx={{ mr: 1 }} /> Tips for adding logos
              </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#fff",
                  display: "flex",
                  fontFamily: "gordita",
                  alignItems: "center",
                }}
              >
                <CheckCircleIcon sx={{ mr: 1, fontSize: "18px" }} /> Do not use
                photos with people
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#fff",
                  display: "flex",
                  fontFamily: "gordita",
                  alignItems: "center",
                }}
              >
                <CheckCircleIcon sx={{ mr: 1, fontSize: "18px" }} /> Use only
                jpeg or png formats
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#fff",
                  display: "flex",
                  fontFamily: "gordita",
                  alignItems: "center",
                }}
              >
                <CheckCircleIcon sx={{ mr: 1, fontSize: "18px" }} />
                The bigger image size should be “1280 * 720” pixels
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#fff",
                  display: "flex",
                  fontFamily: "gordita",
                  alignItems: "center",
                }}
              >
                <CheckCircleIcon sx={{ mr: 1, fontSize: "18px" }} />
                Ensure the picture sizes are 10mb max
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ bgcolor: "#1A1A1A", mt: 2, borderRadius: "5px" }}>
        <Box sx={{ margin: "0 auto", width: "85%", py: 5 }}>
          <Typography variant="caption" sx={{ color: "#fff" }}>
            Crafting a distinctive description enables guests to discover your
            establishment and what sets it apart.
          </Typography>
          <Typography
            sx={{
              color: "#fff",
              fontFamily: "Gordita",
              fontSize: "12px",
              mt: 1,
            }}
          >
            Highlight what sets your establishment apart with a unique
            description on Reisty. Guests can easily discover your restaurant,
            making a well-crafted description essential for driving bookings and
            repeat business.
          </Typography>
          <Box sx={{ mt: 3 }}>
            <TextField
              error={errors.description}
              helperText={errors.description}
              id="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              multiline
              rows={8}
              // value={description}
              // onChange={(e) => setDescription(e.target.value)}
              InputProps={{
                style: {
                  fontFamily: "Gordita",
                  fontSize: "13px",
                  borderRadius: "10px",
                  offset: " 1px solid #ccc",
                  color: "#ccc",
                  border: "1px solid #ccc",

                  // Replace with your desired font family
                },
              }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Typography
                sx={{
                  color: "#fff",
                  fontFamily: "Gordita",
                  fontSize: "12px",
                  mt: 1,
                }}
              >
                Minimum 50
              </Typography>
              <Typography
                sx={{
                  color: "#fff",
                  fontFamily: "Gordita",
                  fontSize: "12px",
                  mt: 1,
                }}
              >
                {values.description.length} / 1000
              </Typography>
            </Box>
          </Box>
          <Button
            fullWidth
            sx={{ mt: 2 }}
            variant="contained"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default BasicInformations;

const countries = [
  { code: "AD", label: "Andorra", phone: "376" },
  {
    code: "AE",
    label: "United Arab Emirates",
    phone: "971",
  },
  { code: "AF", label: "Afghanistan", phone: "93" },
  {
    code: "AG",
    label: "Antigua and Barbuda",
    phone: "1-268",
  },
  { code: "AI", label: "Anguilla", phone: "1-264" },
  { code: "AL", label: "Albania", phone: "355" },
  { code: "AM", label: "Armenia", phone: "374" },
  { code: "AO", label: "Angola", phone: "244" },
  { code: "AQ", label: "Antarctica", phone: "672" },
  { code: "AR", label: "Argentina", phone: "54" },
  { code: "AS", label: "American Samoa", phone: "1-684" },
  { code: "AT", label: "Austria", phone: "43" },
  {
    code: "AU",
    label: "Australia",
    phone: "61",
    suggested: true,
  },
  { code: "AW", label: "Aruba", phone: "297" },
  { code: "AX", label: "Alland Islands", phone: "358" },
  { code: "AZ", label: "Azerbaijan", phone: "994" },
  {
    code: "BA",
    label: "Bosnia and Herzegovina",
    phone: "387",
  },
  { code: "BB", label: "Barbados", phone: "1-246" },
  { code: "BD", label: "Bangladesh", phone: "880" },
  { code: "BE", label: "Belgium", phone: "32" },
  { code: "BF", label: "Burkina Faso", phone: "226" },
  { code: "BG", label: "Bulgaria", phone: "359" },
  { code: "BH", label: "Bahrain", phone: "973" },
  { code: "BI", label: "Burundi", phone: "257" },
  { code: "BJ", label: "Benin", phone: "229" },
  { code: "BL", label: "Saint Barthelemy", phone: "590" },
  { code: "BM", label: "Bermuda", phone: "1-441" },
  { code: "BN", label: "Brunei Darussalam", phone: "673" },
  { code: "BO", label: "Bolivia", phone: "591" },
  { code: "BR", label: "Brazil", phone: "55" },
  { code: "BS", label: "Bahamas", phone: "1-242" },
  { code: "BT", label: "Bhutan", phone: "975" },
  { code: "BV", label: "Bouvet Island", phone: "47" },
  { code: "BW", label: "Botswana", phone: "267" },
  { code: "BY", label: "Belarus", phone: "375" },
  { code: "BZ", label: "Belize", phone: "501" },
  {
    code: "CA",
    label: "Canada",
    phone: "1",
    suggested: true,
  },
  {
    code: "CC",
    label: "Cocos (Keeling) Islands",
    phone: "61",
  },
  {
    code: "CD",
    label: "Congo, Democratic Republic of the",
    phone: "243",
  },
  {
    code: "CF",
    label: "Central African Republic",
    phone: "236",
  },
  {
    code: "CG",
    label: "Congo, Republic of the",
    phone: "242",
  },
  { code: "CH", label: "Switzerland", phone: "41" },
  { code: "CI", label: "Cote d'Ivoire", phone: "225" },
  { code: "CK", label: "Cook Islands", phone: "682" },
  { code: "CL", label: "Chile", phone: "56" },
  { code: "CM", label: "Cameroon", phone: "237" },
  { code: "CN", label: "China", phone: "86" },
  { code: "CO", label: "Colombia", phone: "57" },
  { code: "CR", label: "Costa Rica", phone: "506" },
  { code: "CU", label: "Cuba", phone: "53" },
  { code: "CV", label: "Cape Verde", phone: "238" },
  { code: "CW", label: "Curacao", phone: "599" },
  { code: "CX", label: "Christmas Island", phone: "61" },
  { code: "CY", label: "Cyprus", phone: "357" },
  { code: "CZ", label: "Czech Republic", phone: "420" },
  {
    code: "DE",
    label: "Germany",
    phone: "49",
    suggested: true,
  },
  { code: "DJ", label: "Djibouti", phone: "253" },
  { code: "DK", label: "Denmark", phone: "45" },
  { code: "DM", label: "Dominica", phone: "1-767" },
  {
    code: "DO",
    label: "Dominican Republic",
    phone: "1-809",
  },
  { code: "DZ", label: "Algeria", phone: "213" },
  { code: "EC", label: "Ecuador", phone: "593" },
  { code: "EE", label: "Estonia", phone: "372" },
  { code: "EG", label: "Egypt", phone: "20" },
  { code: "EH", label: "Western Sahara", phone: "212" },
  { code: "ER", label: "Eritrea", phone: "291" },
  { code: "ES", label: "Spain", phone: "34" },
  { code: "ET", label: "Ethiopia", phone: "251" },
  { code: "FI", label: "Finland", phone: "358" },
  { code: "FJ", label: "Fiji", phone: "679" },
  {
    code: "FK",
    label: "Falkland Islands (Malvinas)",
    phone: "500",
  },
  {
    code: "FM",
    label: "Micronesia, Federated States of",
    phone: "691",
  },
  { code: "FO", label: "Faroe Islands", phone: "298" },
  {
    code: "FR",
    label: "France",
    phone: "33",
    suggested: true,
  },
  { code: "GA", label: "Gabon", phone: "241" },
  { code: "GB", label: "United Kingdom", phone: "44" },
  { code: "GD", label: "Grenada", phone: "1-473" },
  { code: "GE", label: "Georgia", phone: "995" },
  { code: "GF", label: "French Guiana", phone: "594" },
  { code: "GG", label: "Guernsey", phone: "44" },
  { code: "GH", label: "Ghana", phone: "233" },
  { code: "GI", label: "Gibraltar", phone: "350" },
  { code: "GL", label: "Greenland", phone: "299" },
  { code: "GM", label: "Gambia", phone: "220" },
  { code: "GN", label: "Guinea", phone: "224" },
  { code: "GP", label: "Guadeloupe", phone: "590" },
  { code: "GQ", label: "Equatorial Guinea", phone: "240" },
  { code: "GR", label: "Greece", phone: "30" },
  {
    code: "GS",
    label: "South Georgia and the South Sandwich Islands",
    phone: "500",
  },
  { code: "GT", label: "Guatemala", phone: "502" },
  { code: "GU", label: "Guam", phone: "1-671" },
  { code: "GW", label: "Guinea-Bissau", phone: "245" },
  { code: "GY", label: "Guyana", phone: "592" },
  { code: "HK", label: "Hong Kong", phone: "852" },
  {
    code: "HM",
    label: "Heard Island and McDonald Islands",
    phone: "672",
  },
  { code: "HN", label: "Honduras", phone: "504" },
  { code: "HR", label: "Croatia", phone: "385" },
  { code: "HT", label: "Haiti", phone: "509" },
  { code: "HU", label: "Hungary", phone: "36" },
  { code: "ID", label: "Indonesia", phone: "62" },
  { code: "IE", label: "Ireland", phone: "353" },
  { code: "IL", label: "Israel", phone: "972" },
  { code: "IM", label: "Isle of Man", phone: "44" },
  { code: "IN", label: "India", phone: "91" },
  {
    code: "IO",
    label: "British Indian Ocean Territory",
    phone: "246",
  },
  { code: "IQ", label: "Iraq", phone: "964" },
  {
    code: "IR",
    label: "Iran, Islamic Republic of",
    phone: "98",
  },
  { code: "IS", label: "Iceland", phone: "354" },
  { code: "IT", label: "Italy", phone: "39" },
  { code: "JE", label: "Jersey", phone: "44" },
  { code: "JM", label: "Jamaica", phone: "1-876" },
  { code: "JO", label: "Jordan", phone: "962" },
  {
    code: "JP",
    label: "Japan",
    phone: "81",
    suggested: true,
  },
  { code: "KE", label: "Kenya", phone: "254" },
  { code: "KG", label: "Kyrgyzstan", phone: "996" },
  { code: "KH", label: "Cambodia", phone: "855" },
  { code: "KI", label: "Kiribati", phone: "686" },
  { code: "KM", label: "Comoros", phone: "269" },
  {
    code: "KN",
    label: "Saint Kitts and Nevis",
    phone: "1-869",
  },
  {
    code: "KP",
    label: "Korea, Democratic People's Republic of",
    phone: "850",
  },
  { code: "KR", label: "Korea, Republic of", phone: "82" },
  { code: "KW", label: "Kuwait", phone: "965" },
  { code: "KY", label: "Cayman Islands", phone: "1-345" },
  { code: "KZ", label: "Kazakhstan", phone: "7" },
  {
    code: "LA",
    label: "Lao People's Democratic Republic",
    phone: "856",
  },
  { code: "LB", label: "Lebanon", phone: "961" },
  { code: "LC", label: "Saint Lucia", phone: "1-758" },
  { code: "LI", label: "Liechtenstein", phone: "423" },
  { code: "LK", label: "Sri Lanka", phone: "94" },
  { code: "LR", label: "Liberia", phone: "231" },
  { code: "LS", label: "Lesotho", phone: "266" },
  { code: "LT", label: "Lithuania", phone: "370" },
  { code: "LU", label: "Luxembourg", phone: "352" },
  { code: "LV", label: "Latvia", phone: "371" },
  { code: "LY", label: "Libya", phone: "218" },
  { code: "MA", label: "Morocco", phone: "212" },
  { code: "MC", label: "Monaco", phone: "377" },
  {
    code: "MD",
    label: "Moldova, Republic of",
    phone: "373",
  },
  { code: "ME", label: "Montenegro", phone: "382" },
  {
    code: "MF",
    label: "Saint Martin (French part)",
    phone: "590",
  },
  { code: "MG", label: "Madagascar", phone: "261" },
  { code: "MH", label: "Marshall Islands", phone: "692" },
  {
    code: "MK",
    label: "Macedonia, the Former Yugoslav Republic of",
    phone: "389",
  },
  { code: "ML", label: "Mali", phone: "223" },
  { code: "MM", label: "Myanmar", phone: "95" },
  { code: "MN", label: "Mongolia", phone: "976" },
  { code: "MO", label: "Macao", phone: "853" },
  {
    code: "MP",
    label: "Northern Mariana Islands",
    phone: "1-670",
  },
  { code: "MQ", label: "Martinique", phone: "596" },
  { code: "MR", label: "Mauritania", phone: "222" },
  { code: "MS", label: "Montserrat", phone: "1-664" },
  { code: "MT", label: "Malta", phone: "356" },
  { code: "MU", label: "Mauritius", phone: "230" },
  { code: "MV", label: "Maldives", phone: "960" },
  { code: "MW", label: "Malawi", phone: "265" },
  { code: "MX", label: "Mexico", phone: "52" },
  { code: "MY", label: "Malaysia", phone: "60" },
  { code: "MZ", label: "Mozambique", phone: "258" },
  { code: "NA", label: "Namibia", phone: "264" },
  { code: "NC", label: "New Caledonia", phone: "687" },
  { code: "NE", label: "Niger", phone: "227" },
  { code: "NF", label: "Norfolk Island", phone: "672" },
  { code: "NG", label: "Nigeria", phone: "234" },
  { code: "NI", label: "Nicaragua", phone: "505" },
  { code: "NL", label: "Netherlands", phone: "31" },
  { code: "NO", label: "Norway", phone: "47" },
  { code: "NP", label: "Nepal", phone: "977" },
  { code: "NR", label: "Nauru", phone: "674" },
  { code: "NU", label: "Niue", phone: "683" },
  { code: "NZ", label: "New Zealand", phone: "64" },
  { code: "OM", label: "Oman", phone: "968" },
  { code: "PA", label: "Panama", phone: "507" },
  { code: "PE", label: "Peru", phone: "51" },
  { code: "PF", label: "French Polynesia", phone: "689" },
  { code: "PG", label: "Papua New Guinea", phone: "675" },
  { code: "PH", label: "Philippines", phone: "63" },
  { code: "PK", label: "Pakistan", phone: "92" },
  { code: "PL", label: "Poland", phone: "48" },
  {
    code: "PM",
    label: "Saint Pierre and Miquelon",
    phone: "508",
  },
  { code: "PN", label: "Pitcairn", phone: "870" },
  { code: "PR", label: "Puerto Rico", phone: "1" },
  {
    code: "PS",
    label: "Palestine, State of",
    phone: "970",
  },
  { code: "PT", label: "Portugal", phone: "351" },
  { code: "PW", label: "Palau", phone: "680" },
  { code: "PY", label: "Paraguay", phone: "595" },
  { code: "QA", label: "Qatar", phone: "974" },
  { code: "RE", label: "Reunion", phone: "262" },
  { code: "RO", label: "Romania", phone: "40" },
  { code: "RS", label: "Serbia", phone: "381" },
  { code: "RU", label: "Russian Federation", phone: "7" },
  { code: "RW", label: "Rwanda", phone: "250" },
  { code: "SA", label: "Saudi Arabia", phone: "966" },
  { code: "SB", label: "Solomon Islands", phone: "677" },
  { code: "SC", label: "Seychelles", phone: "248" },
  { code: "SD", label: "Sudan", phone: "249" },
  { code: "SE", label: "Sweden", phone: "46" },
  { code: "SG", label: "Singapore", phone: "65" },
  { code: "SH", label: "Saint Helena", phone: "290" },
  { code: "SI", label: "Slovenia", phone: "386" },
  {
    code: "SJ",
    label: "Svalbard and Jan Mayen",
    phone: "47",
  },
  { code: "SK", label: "Slovakia", phone: "421" },
  { code: "SL", label: "Sierra Leone", phone: "232" },
  { code: "SM", label: "San Marino", phone: "378" },
  { code: "SN", label: "Senegal", phone: "221" },
  { code: "SO", label: "Somalia", phone: "252" },
  { code: "SR", label: "Suriname", phone: "597" },
  { code: "SS", label: "South Sudan", phone: "211" },
  {
    code: "ST",
    label: "Sao Tome and Principe",
    phone: "239",
  },
  { code: "SV", label: "El Salvador", phone: "503" },
  {
    code: "SX",
    label: "Sint Maarten (Dutch part)",
    phone: "1-721",
  },
  {
    code: "SY",
    label: "Syrian Arab Republic",
    phone: "963",
  },
  { code: "SZ", label: "Swaziland", phone: "268" },
  {
    code: "TC",
    label: "Turks and Caicos Islands",
    phone: "1-649",
  },
  { code: "TD", label: "Chad", phone: "235" },
  {
    code: "TF",
    label: "French Southern Territories",
    phone: "262",
  },
  { code: "TG", label: "Togo", phone: "228" },
  { code: "TH", label: "Thailand", phone: "66" },
  { code: "TJ", label: "Tajikistan", phone: "992" },
  { code: "TK", label: "Tokelau", phone: "690" },
  { code: "TL", label: "Timor-Leste", phone: "670" },
  { code: "TM", label: "Turkmenistan", phone: "993" },
  { code: "TN", label: "Tunisia", phone: "216" },
  { code: "TO", label: "Tonga", phone: "676" },
  { code: "TR", label: "Turkey", phone: "90" },
  {
    code: "TT",
    label: "Trinidad and Tobago",
    phone: "1-868",
  },
  { code: "TV", label: "Tuvalu", phone: "688" },
  {
    code: "TW",
    label: "Taiwan, Republic of China",
    phone: "886",
  },
  {
    code: "TZ",
    label: "United Republic of Tanzania",
    phone: "255",
  },
  { code: "UA", label: "Ukraine", phone: "380" },
  { code: "UG", label: "Uganda", phone: "256" },
  {
    code: "US",
    label: "United States",
    phone: "1",
    suggested: true,
  },
  { code: "UY", label: "Uruguay", phone: "598" },
  { code: "UZ", label: "Uzbekistan", phone: "998" },
  {
    code: "VA",
    label: "Holy See (Vatican City State)",
    phone: "379",
  },
  {
    code: "VC",
    label: "Saint Vincent and the Grenadines",
    phone: "1-784",
  },
  { code: "VE", label: "Venezuela", phone: "58" },
  {
    code: "VG",
    label: "British Virgin Islands",
    phone: "1-284",
  },
  {
    code: "VI",
    label: "US Virgin Islands",
    phone: "1-340",
  },
  { code: "VN", label: "Vietnam", phone: "84" },
  { code: "VU", label: "Vanuatu", phone: "678" },
  { code: "WF", label: "Wallis and Futuna", phone: "681" },
  { code: "WS", label: "Samoa", phone: "685" },
  { code: "XK", label: "Kosovo", phone: "383" },
  { code: "YE", label: "Yemen", phone: "967" },
  { code: "YT", label: "Mayotte", phone: "262" },
  { code: "ZA", label: "South Africa", phone: "27" },
  { code: "ZM", label: "Zambia", phone: "260" },
  { code: "ZW", label: "Zimbabwe", phone: "263" },
];
