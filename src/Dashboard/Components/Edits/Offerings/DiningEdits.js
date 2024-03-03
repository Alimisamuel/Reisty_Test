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
import CustomRadio from "../../CustomField/CustomRadio";
import Loader from "../../Common/Loader";
import CustomCheckbox from "../../CustomField/CustomCheckbox";
import { editDining } from "../../../../axios/api";
import { useSnackbar } from "notistack";

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

  pb: 3,
};

const cuisineTypes = [
  "Italian",
  "Steakhouse",
  "Seafood",
  "French",
  "Indian",
  "Mexican",
  "Japanese",
  "Chinese",
  "German",
  "Spanish",
  "Pizzeria",
  "Fusion/ Eclectic",
  "Barbecue",
  "Tapas Small Plates",
  "Grill",
  "Comfort food",
  "Turkish",
  "Irish",
  "Argentinian",
  "Tea",
  "Burgers",
  "Lebanese",
  "Brazilian",
  "Korean",
  "Cuban",
  "Moroccan",
  "Russian",
  "Vegetarian / Vegan",
  "Breakfast",
  "Fish",
  "Dessert",
  "Meat",
  "Swiss",
  "European",
  "West African",
  "African",
  "East African",
  "Latin American",
  "Cafe Dining",
  "Mediterranean",
  "American",
  "Continental",
  "Bistro",
  "Latin",
  "Caribbean",
  "Asian",
  "Farm - to - table",
  "Thai",
];

const amenitiesData = [
  "Free Parking",
  "Child Friendly",
  "Pet Friendly",
  "Family Friendly",
  "Playground",
  "Oceanview",
  "Poolside",
  "Rooftop"
]

const DiningEdit = ({ data, action }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const [amenities, setAmenities] = useState([]);

  const [smokingOption, setSmokingOption] = useState([]);

  const [restaurantType, setRestaurantType] = useState("");

  const [otherCuisines, setOtherCuisines] = useState([]);
 
  const [isLoading, setIsLoading] = useState(false);

  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };


    // ////////////////////////

  const handleRestaurantType = (event) => {
    setRestaurantType(event.target.value);
  };


  // ////////////////////////
  const handleOtherCuisines = (event) => {
    const checkboxValue = event.target.value;
    if (event.target.checked) {
   
      setOtherCuisines((prevBeverages) => [
        ...prevBeverages,
        { description: checkboxValue },
      ]);
    } else {
   
      setOtherCuisines((prevBeverages) =>
        prevBeverages.filter(
          (beverage) => beverage.description !== checkboxValue
        )
      );
    }
  };

    // ////////////////////////

  const handleAmenities = (event) => {
    const checkboxValue = event.target.value;
    if (event.target.checked) {
   
      setAmenities((prevBeverages) => [
        ...prevBeverages,
        { description: checkboxValue },
      ]);
    } else {
   
      setAmenities((prevBeverages) =>
        prevBeverages.filter(
          (beverage) => beverage.description !== checkboxValue
        )
      );
    }
  };

    // ////////////////////////


  const handleSmoking = (event) => {
    console.log(smokingOption);
    const checkboxValue = event.target.value;
    if (event.target.checked) {
   
      setSmokingOption((prevBeverages) => [
        ...prevBeverages,
        { description: checkboxValue },
      ]);
    } else {
   
      setSmokingOption((prevBeverages) =>
        prevBeverages.filter(
          (beverage) => beverage.description !== checkboxValue
        )
      );
    }
  };


  useEffect(()=>{
    const Amenities = data?.Amenities && data?.Amenities.map((option) => option.Description).map(item => ({ description: item }))
    const SmokingOptions = data?.SmokingOptions
    && data?.SmokingOptions
    .map((option) => option.Description).map(item => ({ description: item }))
    setSmokingOption(SmokingOptions)
    setAmenities(Amenities);
    setRestaurantType(data?.Restaurant)
  }, [data])
  console.log(amenities)

    // ////////////////////////

  const handleEditDining = async () => {
    setIsLoading(true);
    console.log(
      data.OfferingsId,
      restaurantType,
      amenities,
      smokingOption,
      otherCuisines
    );
    await editDining(
      data.OfferingsId,
      restaurantType,
      amenities,
      smokingOption,
      otherCuisines
    )
      .then((res) => {
        const { data } = res;
        setIsLoading(false);
        if (data.status) {
          action();
          handleAlert("success", `${res?.data?.success_message}`);
          setOpen(false);
          console.log(res);
        } else {
          handleAlert("error", `${res?.data?.result.map((item) => item)}`);
        }
      })
      .catch((err) => {
        console.log(err);
        handleAlert("error", `${err.message}}`);
        setIsLoading(false);
      });
  };

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
          {isLoading && <Loader />}
          <Box sx={{ height: "70vh", overflowY: "scroll" }}>
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
                    Dining Experience
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
                Clarify the atmosphere and style of your establishment,
                providing guests with an idea of what to anticipate.
              </Typography>

              <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item lg={6} xs={12}>
                    <Box>
                      <InputLabel
                        sx={{
                          color: "#fff",
                          fontSize: "13px",
                          fontWeight: 500,
                          fontFamily: "Gordita",
                          mb: 1,
                        }}
                      >
                        What cuisine best describes your restaurant?
                      </InputLabel>
                      <Box
                        sx={{
                          border: "1px solid #DADADA",
                          borderRadius: "10px",
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          px: 3,
                          py: 2,
                          height: "200px",
                          overflow: "scroll",
                        }}
                      >
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          name="radio-buttons-group"
                        >
                          <Box
                            sx={{
                              display: "grid",
                              gridTemplateColumns: "auto auto",
                            }}
                          >
                            {cuisineTypes.map((cuisine, index) => (
                              <CustomRadio
                              checked={restaurantType == cuisine}
                                label={cuisine}
                                onChange={handleRestaurantType}
                              />
                            ))}
                          </Box>
                        </RadioGroup>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item lg={6} xs={12}>
                    <Box>
                      <InputLabel
                        sx={{
                          color: "#fff",
                          fontSize: "13px",
                          fontWeight: 500,
                          fontFamily: "Gordita",
                          mb: 1,
                        }}
                      >
                        What other cuisines best describes your restaurant?
                      </InputLabel>
                      <Box
                        sx={{
                          border: "1px solid #DADADA",
                          borderRadius: "10px",
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          px: 3,
                          py: 2,
                          display: "grid",
                          gridTemplateColumns: "auto auto ",
                          height: "200px",
                          overflow: "scroll",
                        }}
                      >
                        {cuisineTypes.map((cuisine, index) => (
                          <CustomCheckbox
                            label={cuisine}
                            onChange={handleOtherCuisines}
                          />
                        ))}
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
                <Box sx={{ mt: 3 }}>
                  <InputLabel
                    sx={{
                      color: "#fff",
                      fontSize: "13px",
                      fontWeight: 500,
                      fontFamily: "Gordita",
                      mb: 1,
                    }}
                  >
                    Amenities
                  </InputLabel>
                  <Box
                    sx={{
                      border: "1px solid #DADADA",
                      borderRadius: "10px",
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      px: 3,
                      py: 2,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                    >
                      <CustomCheckbox
                          checked={amenities?.some(item => item.description === "Free Parking")}
                        label="Free Parking"
                        onChange={handleAmenities}
                      />

                      <CustomCheckbox
                          checked={amenities?.some(item => item.description === "Family Friendly")}
                        label="Family Friendly"
                        onChange={handleAmenities}
                      />
                      <CustomCheckbox
                          checked={amenities?.some(item => item.description === "Oceanview")}
                        label="Oceanview"
                        onChange={handleAmenities}
                      />
                      <CustomCheckbox
                          checked={amenities?.some(item => item.description === "Rooftop")}
                        label="Rooftop"
                        onChange={handleAmenities}
                      />
                    </RadioGroup>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                    >
                      <CustomCheckbox
                          checked={amenities?.some(item => item.description === "Child Friendly")}
                        label="Child Friendly"
                        onChange={handleAmenities}
                      />
                      <CustomCheckbox
                         checked={amenities?.some(item => item.description === "Playground")}
                        label="Playground"
                        onChange={handleAmenities}
                      />
                      <CustomCheckbox
                       checked={amenities?.some(item => item.description === "Poolside")}
                        label="Poolside"
                        onChange={handleAmenities}
                      />
                    </RadioGroup>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                    >
                      <CustomCheckbox
                      checked={amenities?.some(item => item.description === "Pet Friendly")}
                        label="Pet Friendly"
                        onChange={handleAmenities}
                      />
                    </RadioGroup>
                  </Box>
                </Box>

                <InputLabel
                  sx={{
                    color: "#fff",
                    fontSize: "13px",
                    fontWeight: 500,
                    fontFamily: "Gordita",
                    mb: 1,
                    mt: 4,
                  }}
                >
                  Smoking options
                </InputLabel>
                <Box
                  sx={{
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    p: 2,
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                  }}
                >
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <CustomCheckbox
                     checked={smokingOption?.some(item => item.description === "Indoor smoking Area")}
                      label="Indoor smoking Area"
                      onChange={handleSmoking}
                    />
                    <CustomCheckbox
                     checked={smokingOption?.some(item => item.description === "Non smoking area")}
                      label="Non smoking area"
                      onChange={handleSmoking}
                    />
                    <CustomCheckbox
                     checked={smokingOption?.some(item => item.description === "Outdoor smoking area")}
                      label="Outdoor smoking area"
                      onChange={handleSmoking}
                    />
                  </Box>
                </Box>
              </Box>
              <Box align="right" sx={{ mt: 2 }} onClick={handleEditDining}>
                <Button variant="contained">Edit Dining</Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default DiningEdit;
