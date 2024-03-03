import {
  Box,
  IconButton,
  Typography,
  Button,
  AppBar,
} from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Link } from "react-router-dom";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Gallery from "./QuickSetupForms/Gallery";
import BasicInformations from "./QuickSetupForms/BasicInformations";
import Offerings from "./QuickSetupForms/Offerings";
import Experience from "./QuickSetupForms/Experience";

import CssBaseline from "@material-ui/core/CssBaseline";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#BC172F",
    },
    background: {
      default: "#000",
    },
  },
  typography: {
    fontFamily: "gordita",
    button: {
      fontFamily: "gordita",
      textTransform: "initial",
    },
  },
});

const steps = [
  "Basic Information",
  "Offerings",
  "Bookings",
  "Gallery Photos",
];
const themeTop = createTheme({
  palette: {
    mode:"dark",
    primary: {
      main: "#cccccc",
      contrastText: "#fff",
    },
  },
});

const QuickSetup = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [restaurantId, setRestaurantId] = useState("")

    const updateActiveState = (childData) => {
      // Update the parent's state with data from the child
setActiveStep(childData)
    };
    const updateRestaurantId = (childData) => {
      // Update the parent's state with data from the child
setRestaurantId(childData)
    };

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar>
          <Box
            sx={{
              bgcolor: "#1a1a1a",
              height: "60px",
              borderBottom: "1px solid #BC172F",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: 3,
            }}
          >
            <Box>
              <Link to="/dashboard/restaurantprofile">
                <IconButton>
                  <KeyboardArrowLeftIcon sx={{ color: "#fff" }} />
                </IconButton>
              </Link>
            </Box>
            <Box>
              <Typography sx={{ color: "#fff", fontWeight: 500 }}>
                Quick Setup
              </Typography>
            </Box>
            <Box />
          </Box>
        </AppBar>
        <Box sx={{ py: 7 }}>
          <Box
            sx={{ width: { lg: "65%", xs: "90%" }, margin: "0 auto", pt: 4 }}
          >
            <Box sx={{ margin: "0 auto", width: { lg: "70%", xs: "100%" } }}>
              {/* <ThemeProvider theme={themeTop}> */}
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};

                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>
                        <Typography
                          sx={{
                            color: "#fff",
                            fontFamily: "Gordita",
                            fontSize: "12px",
                            fontWeight: 500,
                          }}
                        >
                          {label}
                        </Typography>
                      </StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              {/* </ThemeProvider> */}
            </Box>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Gallery />
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </React.Fragment>
            ) : activeStep === 0 ? (
              <React.Fragment>
                <BasicInformations
                  updateState={updateActiveState}
                  updateId={updateRestaurantId}
                />
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  {/* <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1, visibility: activeStep === 0 && "hidden" }}
                >
                  Back
                </Button> */}
                  <Box sx={{ flex: "1 1 auto" }} />
                  {/* {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )} */}

                  {/* <Button variant="contained" onClick={handleNext}>
                  {activeStep === steps.length - 1 ? "Finish" : "Proceed"}
                </Button> */}
                </Box>
              </React.Fragment>
            ) : activeStep === 1 ? (
              <>
                <Offerings
                  updateState={updateActiveState}
                  restaurantId={restaurantId}
                />
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  {/* <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{
                    mr: 1,
                    visibility: activeStep === 0 && "hidden",
                    color: "#fff",
                  }}
                >
                  Back
                </Button> */}
                  {/* <Box sx={{ flex: "1 1 auto" }} />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )}

                <Button variant="contained" onClick={handleNext}>
                  {activeStep === steps.length - 1 ? "Finish" : "Proceed"}
                </Button> */}
                </Box>
              </>
            ) : activeStep === 2 ? (
              <>
                <Experience
                  updateState={updateActiveState}
                  restaurantId={restaurantId}
                />
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  {/* <Button
                  color="inherit"
                  //   disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{
                    mr: 1,
                    visibility: activeStep === 0 && "hidden",
                    color: "#fff",
                  }}
                >
                  Back
                </Button> */}
                  <Box sx={{ flex: "1 1 auto" }} />
                  {isStepOptional(activeStep) && (
                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                      Skip
                    </Button>
                  )}

                  <Button variant="contained" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? "Finish" : "Proceed"}
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Gallery restaurantId={restaurantId} />
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  {/* <Button
                  color="inherit"
                  //   disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{
                    mr: 1,
                    visibility: activeStep === 0 && "hidden",
                    color: "#fff",
                  }}
                >
                  Back
                </Button> */}
                  <Box sx={{ flex: "1 1 auto" }} />
                  {isStepOptional(activeStep) && (
                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                      Skip
                    </Button>
                  )}
                  {/* <Link to="/floor-plan">
                  <Button variant="contained">Post</Button>
                </Link> */}
                </Box>
              </>
            )}
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default QuickSetup;
