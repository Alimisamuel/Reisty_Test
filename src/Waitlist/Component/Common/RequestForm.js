import { ThemeProvider, Grid, InputLabel, TextField, createTheme, Box, Button, Autocomplete, Select, MenuItem , Typography, IconButton, Alert} from '@mui/material'
import React, { useState } from 'react'
import { useFormik } from "formik";
import { Schema } from './Schema';
import { useRequest } from '../../Hooks/useRequest';
import Modal from '@mui/material/Modal';
import emailIcon from '../../../assets/Icons/email.svg'
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { Countries } from '../../../assets/Data/Countries';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {lg:400, xs:300},
  bgcolor: 'background.paper',
  borderRadius:'20px',
  boxShadow: 24,
  p: 4,
};

const theme = createTheme({
    palette: {
      primary: {
        main: "#000",
      },
    },
  });
const RequestForm = (props) => {
  const [open, setOpen] = React.useState(true);

  const handleOpen = () => setOpen(true);

  const url = "https://reisty-ap1.azurewebsites.net/api/waitlist/submit_request"

  const [role, setRole] = React.useState("");

  const [restaurant, setRestaurant] = React.useState("");

  const { request, isPending, error, success } = useRequest(url);

  const [privacy, setPrivacy] = useState(props.privacy);

  const handleChangeSelect = (event) => {
    setRole(event.target.value);
  };
  const handleChangeRestaurant = (event) => {
    setRestaurant(event.target.value);
  };

  const country = "Nigeria";
  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      firstName: "",
      surName: "",
      email: "",
      phoneNumber: "",
      restuarantName: "",
      country: "",
      category: "",
      role: "",
    },
    validationSchema: Schema,
    onSubmit: () => {
      sendRequest();
    },
  });
  const sendRequest = () => {
    request(
      values.firstName,
      values.surName,
      values.email,
      values.phoneNumber,
      values.restuarantName,
      country,
      restaurant,
      role
    );
  };
  const handleClose = () => {
    setOpen(false);
    values.firstName = "";
    values.surName = "";
    values.email = "";
    values.phoneNumber = "";
    values.restuarantName = "";
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        {error && <p>{error}</p>}
        <Grid container sx={{ mt: 3 }} spacing={3}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <InputLabel
              sx={{
                color: "#2B2B2B",
                fontSize: "13px",
                fontFamily: "Gordita",
              }}
            >
              First Name*
            </InputLabel>
            <TextField
              error={errors.firstName}
              helperText={errors.firstName}
              id="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="First Name"
              margin="normal"
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
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <InputLabel
              sx={{
                color: "#2B2B2B",
                fontSize: "13px",
                fontFamily: "Gordita",
              }}
            >
              Last Name*
            </InputLabel>
            <TextField
              error={errors.surName}
              helperText={errors.surName}
              id="surName"
              value={values.surName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Last Name"
              margin="normal"
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
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <InputLabel
              sx={{
                color: "#2B2B2B",
                fontSize: "13px",
                fontFamily: "Gordita",
              }}
            >
              Email Address*
            </InputLabel>
            <TextField
              error={errors.email}
              helperText={errors.email}
              id="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Email Address"
              margin="normal"
              type="email"
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
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <InputLabel
              sx={{
                color: "#2B2B2B",
                fontSize: "13px",
                fontFamily: "Gordita",
              }}
            >
              Mobile Number*
            </InputLabel>
            <TextField
              type="number"
              error={errors.phoneNumber}
              helperText={errors.phoneNumber}
              id="phoneNumber"
              value={values.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Mobile Number"
              margin="normal"
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
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <InputLabel
              sx={{
                color: "#2B2B2B",
                fontSize: "13px",
                fontFamily: "Gordita",
              }}
            >
              Restaurant Name*
            </InputLabel>
            <TextField
              error={errors.restuarantName}
              helperText={errors.restuarantName}
              id="restuarantName"
              value={values.restuarantName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Restaurant Name"
              margin="normal"
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
          </Grid>
          {/* <Grid item lg={6} md={6} sm={12} xs={12}>
                <InputLabel
                  sx={{
                    color: "#2B2B2B",
                    fontSize: "13px",
                    fontFamily: "Gordita",
                  }}
                >
                  Postal Code*
                </InputLabel>
                <TextField
                    error={errors.postalCode}
                    helperText={errors.postalCode}
                    id="postalCode"
                    value={values.postalCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  placeholder="Postal Code"
                  margin="normal"
                  type="number"
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
              </Grid> */}
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <InputLabel
              sx={{
                color: "#2B2B2B",
                fontSize: "13px",
                fontFamily: "Gordita",
              }}
            >
              Country*
            </InputLabel>
            <Autocomplete
              id="country-select-demo"
              sx={{
                width: "100%",
                mt: 2,
                "& div": { borderRadius: "10px" },
              }}
              options={Countries}
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
          </Grid>
          {/* <Grid item lg={6} md={6} sm={12} xs={12}>
                <InputLabel
                  sx={{
                    color: "#2B2B2B",
                    fontSize: "13px",
                    fontFamily: "Gordita",
                  }}
                >
               Number of Restaurants Units*
                </InputLabel>
                <TextField
                  error={errors.restaurantNo}
                  helperText={errors.restaurantNo}
                  id="restaurantNo"
                  value={values.restaurantNo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Number of Restaurants Units"
                  margin="normal"
                  type="number"
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
              </Grid> */}
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <InputLabel
              sx={{
                color: "#2B2B2B",
                fontSize: "13px",
                fontFamily: "Gordita",
              }}
            >
              What category does your restaurant fit into <br /> the most?*
            </InputLabel>
            <Select
              fullWidth
              value={restaurant}
              onChange={handleChangeRestaurant}
              sx={{
                borderRadius: "10px",
                mt: 2,
                fontFamily: "Gordita",
                color: "#717171",
                fontSize: "13px",
              }}
              displayEmpty
              inputProps={{
                "aria-label": "Without label",
                style: {
                  fontSize: "13px",
                  borderRadius: "10px",
                  offset: " 1px solid #737373",
                  // Replace with your desired font family
                },
              }}
            >
              <MenuItem
                sx={{ fontFamily: "gordita", fontSize: "13px" }}
                value=""
              >
                Please Select
              </MenuItem>
              <MenuItem
                sx={{ fontFamily: "gordita", fontSize: "13px" }}
                value="Fine Dining"
              >
                Fine Dining
              </MenuItem>
              <MenuItem
                sx={{ fontFamily: "gordita", fontSize: "13px" }}
                value="Buffet"
              >
                Buffet
              </MenuItem>
              <MenuItem
                sx={{ fontFamily: "gordita", fontSize: "13px" }}
                value="Family"
              >
                Family
              </MenuItem>
              <MenuItem
                sx={{ fontFamily: "gordita", fontSize: "13px" }}
                value="Cafe"
              >
                Cafe
              </MenuItem>
            </Select>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <InputLabel
              sx={{
                color: "#2B2B2B",
                fontSize: "13px",
                fontFamily: "Gordita",
                mb: 2.2,
              }}
            >
              What role do you identify with the most?
            </InputLabel>

            <Select
              fullWidth
              value={role}
              onChange={handleChangeSelect}
              sx={{
                borderRadius: "10px",
                mt: 2,
                fontFamily: "Gordita",
                color: "#717171",
                fontSize: "13px",
              }}
              displayEmpty
              inputProps={{
                "aria-label": "Without label",
                style: {
                  fontSize: "13px",
                  borderRadius: "10px",
                  offset: " 1px solid #737373",
                  // Replace with your desired font family
                },
              }}
            >
              <MenuItem
                sx={{ fontFamily: "gordita", fontSize: "13px" }}
                value=""
              >
                Please Select
              </MenuItem>
              <MenuItem
                sx={{ fontFamily: "gordita", fontSize: "13px" }}
                value="Restaurant Owner"
              >
                Restaurant Owner
              </MenuItem>
              <MenuItem
                sx={{ fontFamily: "gordita", fontSize: "13px" }}
                value="Manager"
              >
                Manager
              </MenuItem>
              <MenuItem
                sx={{ fontFamily: "gordita", fontSize: "13px" }}
                value="Head Chef"
              >
                Head Chef
              </MenuItem>
              <MenuItem
                sx={{ fontFamily: "gordita", fontSize: "13px" }}
                value="Server"
              >
                Server
              </MenuItem>
              <MenuItem
                sx={{ fontFamily: "gordita", fontSize: "13px" }}
                value="Reservation Coordinator"
              >
                Reservation Coordinator
              </MenuItem>
              <MenuItem
                sx={{ fontFamily: "gordita", fontSize: "13px" }}
                value="Other "
              >
                Other{" "}
              </MenuItem>
            </Select>
          </Grid>
        </Grid>
      </ThemeProvider>
      {privacy ? (
        <Box sx={{ mt: 2 }}>
          <Typography
            variant="caption"
            sx={{ fontSize: "13px", fontFamily: "gordita" }}
          >
            Upon clicking Submit, you acknowledge and accept our{" "}
            <Box component="span" sx={{ color: "#BC172F" }}>
              Privacy Policy .
            </Box>
            <br />
            Furthermore, you consent to receiving marketing communications from
            Reisty regarding news, events, promotions, and monthly newsletters.
            You retain the right to unsubscribe from Reisty emails at any given
            time.
          </Typography>
          <br />
          {!isPending && (
            <>
              <LoadingButton
                variant="contained"
                sx={{ py: 2, mt: 2, borderRadius: "10px" }}
                onClick={handleSubmit}
              >
                Submit Request
              </LoadingButton>
            </>
          )}
          {isPending && (
            <>
              <LoadingButton
                loading
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                disabled
                sx={{ py: 2, borderRadius: "10px" }}
              >
                Submitting Request
              </LoadingButton>
            </>
          )}
        </Box>
      ) : (
        <Box align="center" sx={{ mt: 5 }}>
          {/* <Button variant="contained" onClick={handleSubmit} sx={{py:2, borderRadius:'10px'}}>Submit Request</Button> */}

          {!isPending && (
            <>
              <LoadingButton
                variant="contained"
                sx={{ py: 2, borderRadius: "10px" }}
                onClick={handleSubmit}
              >
                Submit Request
              </LoadingButton>
              {error && (
                <Alert
                  severity="error"
                  sx={{ mt: 3, width: "fit-content", fontFamily: "Gordita" }}
                >
                  {error}
                </Alert>
              )}
            </>
          )}
          {isPending && (
            <LoadingButton
              loading
              loadingPosition="start"
              startIcon={<SaveIcon />}
              sx={{ py: 2, borderRadius: "10px" }}
              variant="contained"
              disabled
            >
              Submitting Request
            </LoadingButton>
          )}
        </Box>
      )}

      {success && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box align="right">
              <IconButton
                onClick={handleClose}
                sx={{ border: "1px solid #dadada" }}
              >
                <CloseIcon sx={{ fontSize: "20px" }} />
              </IconButton>
            </Box>
            <Box align="center" mt={3}>
              <img src={emailIcon} alt="email_icon" />
              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#717171",
                    fontSize: "13px",
                    textAlign: "center",
                    lineHeight: "30px",
                  }}
                >
                  An email verification link has been dispatched to{" "}
                  <span style={{ color: "#BC172F" }}>{values.email}</span>. To
                  activate your Reisty account, kindly click on the link
                  provided in the email to verify your email address.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
}

export default RequestForm


