import React, { useState } from "react";
import Navbar from "../../Component/Header/Navbar";
import {
  Box,
  Button,
  Divider,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
  InputLabel,
  InputAdornment,
  TextField,
  IconButton,
  Autocomplete,
  Alert,
} from "@mui/material";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import GoogleIcon from "@mui/icons-material/Google";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import logo from "../../../assets/Logo/logo.svg";
import AppleIcon from "@mui/icons-material/Apple";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { Countries } from "../../../assets/Data/Countries";
import { Link } from "react-router-dom";
import { useRegister } from "../../Hooks/useRegister";
import { RegSchema } from "../../Component/Common/Schema";
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";
import LoginIcon from "@mui/icons-material/Login";
import { Helmet } from "react-helmet";

const Register = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleCountryChange = (event, newValue) => {
    setSelectedCountry(newValue);
  };

  const { request, isPending, error, success, message } = useRegister();

  console.log("Willm", request);

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: RegSchema,
    onSubmit: () => {
      sendRequest();
    },
  });

  const sendRequest = () => {
    console.log(selectedCountry.label);
    request(
      values.firstName,
      values.lastName,
      values.email,
      values.phoneNumber,
      selectedCountry.label,
      values.password,
      values.confirmPassword
    );
  };

  // const [open, setOpen] = React.useState(error);

  //       const handleClick = () => {
  // error = false
  //       };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    error = false;
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <>
      <Helmet> </Helmet>
      {error && (
        <Snackbar
          sx={{ fontFamily: "Gordita" }}
          open={error}
          autoHideDuration={3000}
          onClose={() => false}
          // message={message}
          action={action}
        >
          <Alert
            sx={{ fontFamily: "Gordita", fontSize: "12px" }}
            severity="error"
          >
            {message}
          </Alert>
        </Snackbar>
      )}
      {success && (
        <Snackbar
          sx={{ fontFamily: "Gordita" }}
          open={success}
          autoHideDuration={3000}
          onClose={() => false}
          // message={message}
          action={action}
        >
          <Alert
            sx={{ fontFamily: "Gordita", fontSize: "12px" }}
            severity="success"
          >
            Confirm Email to complete authentication
            <Link to="/login">
              {" "}
              <IconButton>
                <LoginIcon />
              </IconButton>
            </Link>
          </Alert>
        </Snackbar>
      )}

      <Navbar />
      <Box sx={{ py: 5, borderTop: "0.5px solid #dadada" }}>
        <Box
          sx={{
            margin: "0 auto",
            width: {xl:"40%", lg:'50%', md:'50%', sm:'90%', xs:'90%'},
            bgcolor: {lg:"#fff", md:'#fff', sm:'none', xs:'transparent'},
            boxShadow: {lg:"0px 1px 5px 0px rgba(0, 0, 0, 0.25)",md:"0px 1px 5px 0px rgba(0, 0, 0, 0.25)", sm:'none', xs:'none'},
          }}
        >
          <Box
            sx={{
              margin: "0 auto",
              width: { lg: "70%", md: "70%", sm: "80%", xs: "100%" },
              py: 6,
            }}
            align="center"
          >
            <img src={logo} alt="Resitry_Logo" />
            <Typography
              variant="body1"
              sx={{
                mt: 1.6,
                fontSize: { lg: "14px", md: "14px", sm: "13px", xs: "12px" },
                lineHeight: { lg: "28px", md: "28px", sm: "26px", xs: "22px" },
              }}
            >
              Sign up for a free account create and manage all your reservations
            </Typography>
            <Stack sx={{ margin: "0 auto", width: "85%", mt: 2 }} rowGap={2}>
              <Button
                variant="outlined"
                sx={{
                  borderRadius: "10px",
                  color: "#000",
                  py: 1,
                  border: "1px solid #dadada",
                }}
              >
                <FacebookRoundedIcon sx={{ mr: 1 }} /> Log in with Facebook
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderRadius: "10px",
                  color: "#000",
                  py: 1,
                  border: "1px solid #dadada",
                }}
              >
                <GoogleIcon sx={{ mr: 1 }} /> Log in with Google
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderRadius: "10px",
                  color: "#000",
                  py: 1,
                  border: "1px solid #dadada",
                }}
              >
                <AppleIcon sx={{ mr: 1 }} /> Log in with Apple
              </Button>

              <Divider>Or</Divider>
            </Stack>
            <Box sx={{ mt: 3, "& > p": { fontSize: "13px" } }}>
              <InputLabel
                sx={{
                  color: "#2B2B2B",
                  fontSize: "13px",
                  fontFamily: "Gordita",
                  textAlign: "left",
                }}
              >
                First Name <span style={{ color: "#BC172F" }}>*</span>
              </InputLabel>
              <TextField
                required
                error={errors.firstName}
                helperText={errors.firstName}
                id="firstName"
                sx={{ "& > p": { fontSize: "11px" } }}
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="First Name "
                margin="dense"
                size="large"
                fullWidth
                InputProps={{
                  style: {
                    fontFamily: "Gordita",
                    fontSize: "13px",
                    borderRadius: "10px",
                    offset: " 1px solid #737373",

                    // Replace with your desired font family
                  },
                }}
              />
              <InputLabel
                sx={{
                  color: "#2B2B2B",
                  fontSize: "13px",
                  fontFamily: "Gordita",
                  textAlign: "left",
                  mt: 2,
                }}
              >
                Last Name <span style={{ color: "#BC172F" }}>*</span>
              </InputLabel>
              <TextField
                required
                error={errors.lastName}
                helperText={errors.lastName}
                id="lastName"
                sx={{ "& > p": { fontSize: "11px" } }}
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Last Name "
                margin="dense"
                size="large"
                fullWidth
                InputProps={{
                  style: {
                    fontFamily: "Gordita",
                    fontSize: "13px",
                    borderRadius: "10px",
                    offset: " 1px solid #737373",
                    // Replace with your desired font family
                  },
                }}
              />
              <InputLabel
                sx={{
                  color: "#2B2B2B",
                  fontSize: "13px",
                  fontFamily: "Gordita",
                  textAlign: "left",
                  mt: 2,
                }}
              >
                Email Address <span style={{ color: "#BC172F" }}>*</span>
              </InputLabel>
              <TextField
                required
                error={errors.email}
                helperText={errors.email}
                sx={{ "& > p": { fontSize: "11px" } }}
                id="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Email Address  "
                margin="dense"
                size="large"
                fullWidth
                InputProps={{
                  style: {
                    fontFamily: "Gordita",
                    fontSize: "13px",
                    borderRadius: "10px",
                    offset: " 1px solid #737373",
                    // Replace with your desired font family
                  },
                }}
              />

              <InputLabel
                sx={{
                  color: "#2B2B2B",
                  fontSize: "13px",
                  fontFamily: "Gordita",
                  textAlign: "left",
                  mt: 2,
                }}
              >
                Country of residence <span style={{ color: "#BC172F" }}>*</span>
              </InputLabel>
              <Autocomplete
                id="country-select-demo"
                sx={{
                  width: "100%",
                  mt: 2,
                  "& div": { borderRadius: "10px" },
                }}
                options={Countries}
                value={selectedCountry}
                onChange={handleCountryChange}
                autoHighlight
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
                      },
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                  />
                )}
              />

              <InputLabel
                sx={{
                  color: "#2B2B2B",
                  fontSize: "13px",
                  fontFamily: "Gordita",
                  textAlign: "left",
                  mt: 2,
                }}
              >
                Phone Number <span style={{ color: "#BC172F" }}>*</span>
              </InputLabel>
              {/* <Autocomplete
                id="country-select-demo"
                options={Countries}
                getOptionLabel={(option) => option.label}
                value={selectedCountryPhone?.phone.toString()}
                onChange={handleCountryChangePhone}
                autoHighlight
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{
                      fontFamily: "Gordita",
                      borderRadius: "10px",
                      fontSize: "13px",
                      display:'none',
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
                    {...params}
                    label="Select Country"
                    variant="outlined"
                  />
                )}
              /> */}
              <TextField
                // label="Phone Number"
                // variant="standa"
                sx={{ "& > p": { fontSize: "11px" } }}
                fullWidth
                error={errors.phoneNumber}
                helperText={errors.phoneNumber}
                id="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {/* You can use an icon or label for the country selector */}
                      {selectedCountry && <span>{selectedCountry.phone}</span>}
                      {/* You can also use an icon from Mui Icons library */}
                      {/* <PhoneIcon /> */}
                    </InputAdornment>
                  ),
                  style: {
                    fontFamily: "Gordita",
                    fontSize: "13px",
                    borderRadius: "10px",
                    offset: " 1px solid #737373",
                    // Replace with your desired font family
                  },
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
              <InputLabel
                sx={{
                  color: "#2B2B2B",
                  fontSize: "13px",
                  fontFamily: "Gordita",
                  textAlign: "left",
                  mt: 2,
                }}
              >
                Password <span style={{ color: "#BC172F" }}>*</span>
              </InputLabel>
              <TextField
                required
                error={errors.password}
                helperText={errors.password}
                id="password"
                sx={{ "& > p": { fontSize: "11px" } }}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                type={showPassword ? "text" : "password"}
                placeholder="Hello123@ "
                margin="dense"
                size="large"
                fullWidth
                InputProps={{
                  style: {
                    fontFamily: "Gordita",
                    fontSize: "13px",
                    borderRadius: "10px",
                    offset: " 1px solid #737373",
                    // Replace with your desired font family
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOutlinedIcon sx={{ fontSize: "16px" }} />
                        ) : (
                          <VisibilityOffOutlinedIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box sx={{ width: "100%", mt: 1 }}>
                <Typography
                  sx={{ textAlign: "left", color: "#717171", fontSize: "12px" }}
                >
                  <CheckCircleRoundedIcon
                    sx={{ fontSize: "18px", mb: -0.5, mr: 1 }}
                  />
                  8 or more characters
                </Typography>
                <Typography
                  sx={{ textAlign: "left", color: "#717171", fontSize: "12px" }}
                >
                  <CheckCircleRoundedIcon
                    sx={{ fontSize: "18px", mb: -0.5, mr: 1 }}
                  />
                  Has a symbol, number, or upper-case letter
                </Typography>
              </Box>
              <InputLabel
                sx={{
                  color: "#2B2B2B",
                  fontSize: "13px",
                  fontFamily: "Gordita",
                  textAlign: "left",
                  mt: 2,
                }}
              >
                Confirm Password<span style={{ color: "#BC172F" }}>*</span>
              </InputLabel>
              <TextField
                required
                error={errors.confirmPassword}
                sx={{ "& > p": { fontSize: "11px" } }}
                helperText={errors.confirmPassword}
                id="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                type={showPassword ? "text" : "password"}
                placeholder="Hello123@ "
                margin="dense"
                size="large"
                fullWidth
                InputProps={{
                  style: {
                    fontFamily: "Gordita",
                    fontSize: "13px",
                    borderRadius: "10px",
                    offset: " 1px solid #737373",
                    // Replace with your desired font family
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOutlinedIcon sx={{ fontSize: "16px" }} />
                        ) : (
                          <VisibilityOffOutlinedIcon
                            sx={{ fontSize: "16px" }}
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Typography sx={{ fontSize: "12px", textAlign: "left" }}>
                By clicking the 'Create Account' button below, you agree to the
                Reisty
                <Link to="" style={{ color: "#BC172F", fontWeight: 400 }}>
                  {" "}
                  Terms of Use
                </Link>{" "}
                and{" "}
                <Link to="" style={{ color: "#BC172F", fontWeight: 400 }}>
                  Privacy Policy
                </Link>
                .
              </Typography>
              {/* 
              <Button
                onClick={handleSubmit}
                variant="contained"
                sx={{ mt: 2 }}
                size="large"
                fullWidth
              >
                Create account
              </Button> */}
              {!isPending && (
                <>
                  <LoadingButton
                    fullWidth
                    variant="contained"
                    sx={{ py: 2, mt: 2, borderRadius: "10px" }}
                    onClick={handleSubmit}
                  >
                    Create account
                  </LoadingButton>
                </>
              )}
              {isPending && (
                <>
                  <LoadingButton
                    fullWidth
                    loading
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained"
                    disabled
                    sx={{ py: 2, borderRadius: "10px" }}
                  >
                    Creating account
                  </LoadingButton>
                </>
              )}
              <Typography sx={{ fontSize: "12px", textAlign: "left" }}>
                Already have an account?
                <Link to="/login" style={{ color: "#BC172F", fontWeight: 400, marginLeft:'10px' }}>
                  Login
                </Link>
                .
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Register;
