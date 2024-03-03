import {
  Box,
  Modal,
  Typography,
  Button,
  Grid,
  IconButton,
  InputLabel,
  RadioGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CustomTextField from "../../CustomField/CustomTextField";
import { useSnackbar } from "notistack";

import CustomCheckbox from "../../CustomField/CustomCheckbox";
import { editSafetyPrecautions } from "../../../../axios/api";
import Loader from "../../Common/Loader";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 750,
  borderRadius: "5px",
  boxShadow: 24,
  bgcolor: "#1a1a1a",
  overflow: "scroll",
  maxHeight: "70vh",

  pb: 3,
};

const SafetyEdit = ({ data, action }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [sanitizationAndMaintainances, setSanitizationAndMaintainances] =
    useState([]);
  const [physicalDistancings, setPhysicalDistancings] = useState([]);
  const [protectiveEquipments, setProtectiveEquipments] = useState([]);
  const [screenings, setScreenings] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };

  useEffect(() => {
    const sanitize =
      data?.SanitizationAndMaintainances &&
      data?.SanitizationAndMaintainances.map(
        (option) => option.Description
      ).map((item) => ({ description: item }));
    const physical =
      data?.PhysicalDistancings &&
      data?.PhysicalDistancings.map((option) => option.Description).map(
        (item) => ({ description: item })
      );
    const protective =
      data?.ProtectiveEquipments &&
      data?.ProtectiveEquipments.map((option) => option.Description).map(
        (item) => ({ description: item })
      );
    const screen =
      data?.Screenings &&
      data?.Screenings.map((option) => option.Description).map((item) => ({
        description: item,
      }));
    setSanitizationAndMaintainances(sanitize);
    setPhysicalDistancings(physical);
    setProtectiveEquipments(protective);
    setScreenings(screen);
  }, [data]);


  const handleScreening = (event) => {
    const checkboxValue = event.target.value;
    if (event.target.checked) {
      // If checkbox is checked, add it to beverages array
      setScreenings((prevBeverages) => [
        ...prevBeverages,
        { description: checkboxValue },
      ]);
    } else {
      // If checkbox is unchecked, remove it from beverages array
      setScreenings((prevBeverages) =>
        prevBeverages.filter(
          (beverage) => beverage.description !== checkboxValue
        )
      );
    }
  };

    // //////////////////////////////////////
    const handleMaitainance = (event) => {
   
      const checkboxValue = event.target.value;
      if (event.target.checked) {
        // If checkbox is checked, add it to beverages array
        setSanitizationAndMaintainances((prevBeverages) => [
          ...prevBeverages,
          { description: checkboxValue },
        ]);
      } else {
        // If checkbox is unchecked, remove it from beverages array
        setSanitizationAndMaintainances((prevBeverages) =>
          prevBeverages.filter(
            (beverage) => beverage.description !== checkboxValue
          )
        );
      }
    };

  const handlePhysicalDistancing = (event) => {
    const checkboxValue = event.target.value;
    if (event.target.checked) {
      // If checkbox is checked, add it to beverages array
      setPhysicalDistancings((prevBeverages) => [
        ...prevBeverages,
        { description: checkboxValue },
      ]);
    } else {
      // If checkbox is unchecked, remove it from beverages array
      setPhysicalDistancings((prevBeverages) =>
        prevBeverages.filter(
          (beverage) => beverage.description !== checkboxValue
        )
      );
    }
  };

    // //////////////////////////////////////
    const handleProtective = (event) => {
      const checkboxValue = event.target.value;
      if (event.target.checked) {
        // If checkbox is checked, add it to beverages array
        setProtectiveEquipments((prevBeverages) => [
          ...prevBeverages,
          { description: checkboxValue },
        ]);
      } else {
        // If checkbox is unchecked, remove it from beverages array
        setProtectiveEquipments((prevBeverages) =>
          prevBeverages.filter(
            (beverage) => beverage.description !== checkboxValue
          )
        );
      }
    };


    const handleSafetyPrecautions = async () =>{
      setIsLoading(true)
      await editSafetyPrecautions(data?.OfferingsId,
        sanitizationAndMaintainances,
        physicalDistancings,
        protectiveEquipments,
        screenings
        ).then((res)=>{

          setIsLoading(false);
          if(res.data.status){
            handleAlert("success", `${res?.data?.success_message}`);
            action();
            setOpen(false)
          }
          else{
            handleAlert("error", `${res?.data?.result.map((item) => item)}`);
          }

        }).catch((err)=>{
          setIsLoading(false)
          console.log(err)
          handleAlert("error", `${err.message}}`);
          setIsLoading(false);
        })
    }

  return (
    <>
      <Button
        sx={{ border: "1px solid #fff", bgcolor: "#333", color: "#fff" }}
        onClick={handleOpen}
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
          {
            isLoading && <Loader/>
          }
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
                  Safety Precautions
                </Typography>
              </Grid>
              <Grid item align="right" lg={4} md={4}>
                <IconButton onClick={handleClose}>
                  <CloseIcon sx={{ color: "#fff" }} />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ margin: "0 auto", width: "85%", mt: 3 }}>
            <Typography sx={{ color: "#fff", fontWeight: 500 }}>
              Inform guests about the health and safety protocols in place at
              your establishment.
            </Typography>

            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item lg={12} md={12}>
                  <InputLabel
                    sx={{
                      color: "#ccc",
                      fontSize: "13px",
                      fontFamily: "Gordita",
                      mb: 1,
                      fontWeight: 500,
                    }}
                  >
                    Sanitizing and maintaining cleanliness
                  </InputLabel>
                  <Box
                    sx={{ border: "1px solid #ccc", borderRadius: "5px", p: 3 }}
                  >
                    <Grid container>
                      <Grid item lg={6} md={6}>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="female"
                          name="radio-buttons-group"
                        >
                          <CustomCheckbox
                            checked={sanitizationAndMaintainances?.some(
                              (item) =>
                                item.description ===
                                "Daily thorough cleaning of shared spaces."

                            )}
                            label="Daily thorough cleaning of shared spaces."
                            onChange={handleMaitainance}
                          />
                          <CustomCheckbox
                            checked={sanitizationAndMaintainances?.some(
                              (item) =>
                                item.description ===
                                "Payment methods without physical contact are accepted."
                            )}
                            label="Payment methods without physical contact are accepted."
                            onChange={handleMaitainance}
                          />
                          <CustomCheckbox
                            checked={sanitizationAndMaintainances?.some(
                              (item) =>
                                item.description ===
                                "Digital, disposable or sanitized menu provided"
                            )}
                            label="Digital, disposable or sanitized menu provided"
                            onChange={handleMaitainance}
                          />
                        </RadioGroup>
                      </Grid>
                      <Grid item lg={6} md={6}>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="female"
                          name="radio-buttons-group"
                        >
                          <CustomCheckbox
                            checked={sanitizationAndMaintainances?.some(
                              (item) =>
                                item.description ===
                                "Customers are provided with sanitizers or wipes."
                            )}
                            label="Customers are provided with sanitizers or wipes."
                            onChange={handleMaitainance}
                          />
                          <CustomCheckbox
                            checked={sanitizationAndMaintainances?.some(
                              (item) =>
                                item.description ===
                                "Sealed or wiped utensils used"
                            )}
                            label="Sealed or wiped utensils used"
                            onChange={handleMaitainance}
                          />
                          <CustomCheckbox
                            checked={sanitizationAndMaintainances?.some(
                              (item) =>
                                item.description ===
                                "After the meal, surfaces are thoroughly sanitized."
                            )}
                            label="After the meal, surfaces are thoroughly sanitized."
                            onChange={handleMaitainance}
                          />
                        </RadioGroup>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item lg={12} md={12}>
                  <InputLabel
                    sx={{
                      color: "#ccc",
                      fontSize: "13px",
                      fontFamily: "Gordita",
                      mb: 1,
                      fontWeight: 500,
                    }}
                  >
                    Physical Distancing
                  </InputLabel>
                  <Box
                    sx={{ border: "1px solid #ccc", borderRadius: "5px", p: 3 }}
                  >
                    <Grid container>
                      <Grid item lg={6} md={6}>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="female"
                          name="radio-buttons-group"
                        >
                          <CustomCheckbox
                            checked={physicalDistancings?.some(
                              (item) =>
                                item.description ===
                                "Distancing maintained in common area"
                            )}
                            label="Distancing maintained in common area"
                            onChange={handlePhysicalDistancing}
                          />
                          <CustomCheckbox
                            checked={physicalDistancings?.some(
                              (item) =>
                                item.description ===
                                "Extra Space between tables"
                            )}
                            label="Extra Space between tables"
                            onChange={handlePhysicalDistancing}
                          />
                          <CustomCheckbox
                            checked={physicalDistancings?.some(
                              (item) =>
                                item.description ===
                                "Limited number of seated diners"
                            )}
                            label="Limited number of seated diners"
                            onChange={handlePhysicalDistancing}
                          />
                        </RadioGroup>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item lg={12} md={12}>
                  <InputLabel
                    sx={{
                      color: "#ccc",
                      fontSize: "13px",
                      fontFamily: "Gordita",
                      mb: 1,
                      fontWeight: 500,
                    }}
                  >
                    Protective Equipment
                  </InputLabel>
                  <Box
                    sx={{ border: "1px solid #ccc", borderRadius: "5px", p: 3 }}
                  >
                    <Grid container>
                      <Grid item lg={12} md={12}>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="female"
                          name="radio-buttons-group"
                        >
                          <CustomCheckbox
                            checked={protectiveEquipments?.some(
                              (item) =>
                                item.description ===
                                "Diners must wear masks unless eating or drinking"

                            )}
                            label="Diners must wear masks unless eating or drinking"
                            onChange={handleProtective}
                          />
                          <CustomCheckbox
                            checked={protectiveEquipments?.some(
                              (item) =>
                                item.description ===
                                "Wasitwaff wear masks"
                            )}
                            label="Wasitwaff wear masks"
                            onChange={handleProtective}
                          />
                        </RadioGroup>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item lg={12} md={12}>
                  <InputLabel
                    sx={{
                      color: "#ccc",
                      fontSize: "13px",
                      fontFamily: "Gordita",
                      mb: 1,
                      fontWeight: 500,
                    }}
                  >
                    Screening
                  </InputLabel>
                  <Box
                    sx={{ border: "1px solid #ccc", borderRadius: "5px", p: 3 }}
                  >
                    <Grid container>
                      <Grid item lg={12} md={12}>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="female"
                          name="radio-buttons-group"
                        >
                          <CustomCheckbox
                             onChange={handleScreening}
                            checked={screenings?.some(
                              (item) =>
                                item.description ===
                                "Contact tracing information collected"
                            )}
                            label="Contact tracing information collected"
                          />
                          <CustomCheckbox
                           onChange={handleScreening}
                            checked={screenings?.some(
                              (item) =>
                                item.description ===
                                "Diner temperature check required"
                            )}
                            label="Diner temperature check required"
                          />
                          <CustomCheckbox
                           onChange={handleScreening}
                            checked={screenings?.some(
                              (item) =>
                                item.description ===
                                "Proof of vaccination required for indoor dining"
                            )}
                            label="Proof of vaccination required for indoor dining"
                          />
                          <CustomCheckbox
                           onChange={handleScreening}
                            checked={screenings?.some(
                              (item) =>
                                item.description ===
                                "Proof of  vaccination required before outdoor dinning"
                            )}
                            label="Proof of  vaccination required before outdoor dinning"
                          />
                          <CustomCheckbox
                           onChange={handleScreening}
                            checked={screenings?.some(
                              (item) =>
                                item.description ===
                                "Sick staff prohibited in the workplace"
                            )}
                            label="Sick staff prohibited in the workplace"
                          />
                          <CustomCheckbox
                           onChange={handleScreening}
                            checked={screenings?.some(
                              (item) =>
                                item.description ===
                                "Staff is vaccinated"
                            )}
                            label="Staff is vaccinated"
                          />
                          <CustomCheckbox
                           onChange={handleScreening}
                            checked={screenings?.some(
                              (item) =>
                                item.description ===
                                "Staff temperature check required"
                            )}
                            label="Staff temperature check required"
                          />
                        </RadioGroup>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box align="right" sx={{ mt: 2 }}>
              <Button variant="contained" onClick={handleSafetyPrecautions}>Edit Safety Precautions</Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default SafetyEdit;
