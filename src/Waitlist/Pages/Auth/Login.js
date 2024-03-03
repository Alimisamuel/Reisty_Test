import React from "react";
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
  TextField,
  IconButton,
  InputAdornment,
  Alert,
} from "@mui/material";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import GoogleIcon from "@mui/icons-material/Google";
import logo from "../../../assets/Logo/logo.svg";
import AppleIcon from "@mui/icons-material/Apple";
import { Link } from "react-router-dom";
import Modal from "@mui/material/Modal";
import ClearIcon from "@mui/icons-material/Clear";
import google from "../../../assets/Icons/google.svg";
import { useLogin } from "../../Hooks/useLogin";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import Snackbar from "@mui/material/Snackbar";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#BC172F",
    },
  },
  typography: {
    h1: {
      fontFamily: "Gordita",
      fontWeight: 700,
      fontSize: "48px",
      color: "#fff",
      lineHeight: "58px",
    },
    h2: {
      fontFamily: "Gordita",
      fontWeight: 300,
      color: "#fff",
      fontSize: "20px",
      lineHeight: "30px",
    },
    button: {
      fontFamily: "Gordita",
      textTransform: "initial",
      color: "#2b2b2b",
      fontSize: "13px",
    },
    caption: {
      fontFamily: "Gordita",
      fontWeight: 300,
      fontSize: "16px",
      color: "#2B2B2B",
    },
    subtitle1: {
      fontFamily: "Gordita",
      color: "#000",
      fontWeight: 600,
      fontSize: "24px",
      lineHeight: "34px",
    },
    h3: {
      fontFamily: "Gordita",
      fontWeight: 700,
      color: "#333333",
      fontSize: "64px",
    },
    body1: {
      fontFamily: "Gordita",
      fontWeight: 300,
      fontSize: "15px",
      color: "#2b2b2b",
      lineHeight: "28px",
      letterSpacing: "0.01em",
    },
  },
});

const Login = () => {
  const [open, setOpen] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { error, request, isPending, message } = useLogin();
  const handleLogin = () => {
    request(email, password);
  };
  const fadeInOutVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };
  return (
    <>
      <Helmet> </Helmet>
      <motion.div
        variants={fadeInOutVariants}
        initial="initial"
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        animate="animate"
        exit="exit"
      >
        {error && (
          <Snackbar
            sx={{ fontFamily: "Gordita" }}
            open={error}
            autoHideDuration={3000}
            onClose={() => false}
            // message={message}
            // action={action}
          >
            <Alert
              sx={{ fontFamily: "Gordita", fontSize: "12px" }}
              severity="error"
            >
              {message}
            </Alert>
          </Snackbar>
        )}
        <ThemeProvider theme={theme}>
          <Navbar />
          <Box
            sx={{
              borderTop: "1px solid #dadada",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              py: { lg: 7, md: 7, sm: 6, xs: 0 },
            }}
          >
            <Box
              sx={{
                width: { lg: "50%", md: "70%", sm: "80%", xs: "100%" },
                boxShadow: {
                  lg: " 0px 4px 10px rgba(0, 0, 0, 0.25)",
                  md: " 0px 4px 10px rgba(0, 0, 0, 0.25)",
                  sm: " 0px 4px 10px rgba(0, 0, 0, 0.25)",
                  xs: " 0px",
                },
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
                    fontSize: {
                      lg: "14px",
                      md: "14px",
                      sm: "13px",
                      xs: "12px",
                    },
                    lineHeight: {
                      lg: "28px",
                      md: "28px",
                      sm: "26px",
                      xs: "22px",
                    },
                  }}
                >
                  Your account information and reservations are securely managed
                  by Reisty.
                </Typography>
                <Stack
                  sx={{ margin: "0 auto", width: "85%", mt: 2 }}
                  rowGap={2}
                >
                  <Button
                    variant="outlined"
                    sx={{
                      borderRadius: "30px",
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
                      borderRadius: "30px",
                      color: "#000",
                      py: 1,
                      border: "1px solid #dadada",
                    }}
                  >
                    <img
                      src={google}
                      alt="google_icon"
                      width="5%"
                      style={{ marginRight: "25px" }}
                    />{" "}
                    Log in with Google
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      borderRadius: "30px",
                      color: "#000",
                      py: 1,
                      border: "1px solid #dadada",
                    }}
                  >
                    <AppleIcon sx={{ mr: 3.5 }} /> Log in with Apple
                  </Button>

                  <Divider>Or</Divider>
                  <Box>
                    <InputLabel
                      sx={{
                        color: "#2B2B2B",
                        fontSize: "13px",
                        fontFamily: "Gordita",
                        textAlign: "left",
                      }}
                    >
                      Email address
                    </InputLabel>
                    <TextField
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address"
                      margin="dense"
                      size="large"
                      fullWidth
                      InputProps={{
                        style: {
                          fontFamily: "Gordita",
                          fontSize: "13px",
                          borderRadius: "10px",
                          offset: " 1px solid #737373",
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
                      Password*
                    </InputLabel>
                    <TextField
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="**********"
                      margin="dense"
                      size="large"
                      type={showPassword ? "text" : "password"}
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
                                <VisibilityOutlinedIcon
                                  sx={{ fontSize: "16px" }}
                                />
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

                    <Typography
                      onClick={handleOpen}
                      sx={{
                        textAlign: "left",
                        fontSize: "12px",
                        color: theme.palette.primary.main,
                        cursor: "pointer",
                        "&:hover": {
                          fontFamily: "Gordita",
                        },
                      }}
                    >
                      Forgot password?
                    </Typography>

                    {!isPending && (
                      <>
                        <LoadingButton
                          fullWidth
                          variant="contained"
                          sx={{ py: 2, mt: 2, borderRadius: "10px" }}
                          onClick={handleLogin}
                        >
                          Login
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
                          Login{" "}
                        </LoadingButton>
                      </>
                    )}
                  </Box>

                  <Divider />
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: theme.palette.primary.main,
                      fontFamily: "gordita",
                    }}
                  >
                    <span style={{ color: "#2b2b2b", fontFamily: "gordita" }}>
                      Don't have an account?{" "}
                    </span>
                    Create a free account
                  </Typography>
                </Stack>
              </Box>
            </Box>
          </Box>

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
                  sx={{ border: "1px solid #1a1a1a" }}
                >
                  <ClearIcon />
                </IconButton>
              </Box>
              <Box sx={{ margin: "0 auto", width: "85%" }}>
                <img src={logo} alt="logo" />
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                  Reset Password
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: "gordita",
                    mt: 2,
                    color: "#717171",
                    lineHeight: "24px",
                  }}
                >
                  Kindly provide us with the email address that you used during
                  the registration process, and we will send you a set of secure
                  instructions to reset your password
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <InputLabel
                    sx={{
                      color: "#2B2B2B",
                      fontSize: "13px",
                      fontFamily: "Gordita",
                      textAlign: "left",
                      mt: 2,
                    }}
                  >
                    Email address
                  </InputLabel>
                  <TextField
                    placeholder="Email address"
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
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{ mt: 3 }}
                  >
                    Send Instructions
                  </Button>
                </Box>
              </Box>
            </Box>
          </Modal>
        </ThemeProvider>
      </motion.div>
    </>
  );
};

export default Login;
