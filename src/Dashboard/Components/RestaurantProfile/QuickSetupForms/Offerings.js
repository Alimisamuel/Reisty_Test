import {
  Box,
  Grid,
  Typography,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Button,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { BasicInfo } from "../../shema/BasicShema";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import axiosFetch from "../../../../axios/custom";
import { createOfferings } from "../../../../axios/api";
import { useSnackbar } from "notistack";
import Loader from "../../Common/Loader";
import { RestaurantData } from "../../../../assets/Data/RestaurantData";
import RestaurantType from "../../Common/RestaurantType";
import CustomRadio from "../../CustomField/CustomRadio";
import CustomCheckbox from "../../CustomField/CustomCheckbox";
import CustomTextField from "../../CustomField/CustomTextField";
import '../../../../index.css'

const theme = createTheme({
  palette: {
    mode: "dark",
  },
  typography: {
    fontFamily: "gordita",
  },
});

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

const Offerings = ({ updateState, restaurantId }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [role, setRole] = React.useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [menuLink, setMenuLink] = useState("");
  const [executiveChef, setExecutiveChef] = useState("");
  const [dietaryOptions, setDietaryOptions] = useState([]);
  const [beverages, setBeverages] = useState([]);
  const [restaurantType, setRestaurantType] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [smokingOption, setSmokingOption] = useState([]);
  const [maintenance, setMaintenance] = useState([]);
  const [physicalDistance, setPhysicalDistance] = useState([]);
  const [protectiveEquipment, setProtectiveEquipment] = useState([]);
  const [screening, setScreening] = useState([]);
  const [seatingOptions, setSeatingOptions] = useState([]);
  const [diningOptions, setDiningOptions] = useState([]);
  const [otherCuisines, setOtherCuisines] = useState([]);

  // //////////////////////////////////////

  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };

  // //////////////////////////////////////

  const handleRestaurantType = (event) => {
    setRestaurantType(event.target.value);
  };

  // //////////////////////////////////////
  const handleBeverage = (event) => {
    console.log(beverages);
    const checkboxValue = event.target.value;
    if (event.target.checked) {
      setBeverages((prevBeverages) => [
        ...prevBeverages,
        { name: checkboxValue },
      ]);
    } else {
      setBeverages((prevBeverages) =>
        prevBeverages.filter((beverage) => beverage.name !== checkboxValue)
      );
    }
  };

  // //////////////////////////////////////
  const handleDietary = (event) => {
    console.log(beverages);
    const checkboxValue = event.target.value;
    if (event.target.checked) {
      setDietaryOptions((prevBeverages) => [
        ...prevBeverages,
        { name: checkboxValue },
      ]);
    } else {
      setDietaryOptions((prevBeverages) =>
        prevBeverages.filter((beverage) => beverage.name !== checkboxValue)
      );
    }
  };

  // //////////////////////////////////////
  const handleAmenities = (event) => {
    const checkboxValue = event.target.value;
    if (event.target.checked) {
      // If checkbox is checked, add it to beverages array
      setAmenities((prevBeverages) => [
        ...prevBeverages,
        { description: checkboxValue },
      ]);
    } else {
      // If checkbox is unchecked, remove it from beverages array
      setAmenities((prevBeverages) =>
        prevBeverages.filter(
          (beverage) => beverage.description !== checkboxValue
        )
      );
    }
  };

  // //////////////////////////////////////

  const handleSmoking = (event) => {
    console.log(smokingOption);
    const checkboxValue = event.target.value;
    if (event.target.checked) {
      // If checkbox is checked, add it to beverages array
      setSmokingOption((prevBeverages) => [
        ...prevBeverages,
        { description: checkboxValue },
      ]);
    } else {
      // If checkbox is unchecked, remove it from beverages array
      setSmokingOption((prevBeverages) =>
        prevBeverages.filter(
          (beverage) => beverage.description !== checkboxValue
        )
      );
    }
  };

  // //////////////////////////////////////
  const handleMaitainance = (event) => {
    console.log(beverages);
    const checkboxValue = event.target.value;
    if (event.target.checked) {
      // If checkbox is checked, add it to beverages array
      setMaintenance((prevBeverages) => [
        ...prevBeverages,
        { description: checkboxValue },
      ]);
    } else {
      // If checkbox is unchecked, remove it from beverages array
      setMaintenance((prevBeverages) =>
        prevBeverages.filter(
          (beverage) => beverage.description !== checkboxValue
        )
      );
    }
  };

  // //////////////////////////////////////
  const handlePhysicalDistancing = (event) => {
    const checkboxValue = event.target.value;
    if (event.target.checked) {
      // If checkbox is checked, add it to beverages array
      setPhysicalDistance((prevBeverages) => [
        ...prevBeverages,
        { description: checkboxValue },
      ]);
    } else {
      // If checkbox is unchecked, remove it from beverages array
      setPhysicalDistance((prevBeverages) =>
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
      setProtectiveEquipment((prevBeverages) => [
        ...prevBeverages,
        { description: checkboxValue },
      ]);
    } else {
      // If checkbox is unchecked, remove it from beverages array
      setProtectiveEquipment((prevBeverages) =>
        prevBeverages.filter(
          (beverage) => beverage.description !== checkboxValue
        )
      );
    }
  };

  // //////////////////////////////////////
  const handleScreening = (event) => {
    const checkboxValue = event.target.value;
    if (event.target.checked) {
      // If checkbox is checked, add it to beverages array
      setScreening((prevBeverages) => [
        ...prevBeverages,
        { description: checkboxValue },
      ]);
    } else {
      // If checkbox is unchecked, remove it from beverages array
      setScreening((prevBeverages) =>
        prevBeverages.filter(
          (beverage) => beverage.description !== checkboxValue
        )
      );
    }
  };

  // //////////////////////////////////////

  const handleSeatingOptions = (event) => {
    const checkboxValue = event.target.value;
    if (event.target.checked) {
      // If checkbox is checked, add it to beverages array
      setSeatingOptions((prevBeverages) => [
        ...prevBeverages,
        { description: checkboxValue },
      ]);
    } else {
      // If checkbox is unchecked, remove it from beverages array
      setSeatingOptions((prevBeverages) =>
        prevBeverages.filter(
          (beverage) => beverage.description !== checkboxValue
        )
      );
    }
  };
  // //////////////////////////////////////

  const handleDiningOptions = (event) => {
    const checkboxValue = event.target.value;
    if (event.target.checked) {
      // If checkbox is checked, add it to beverages array
      setDiningOptions((prevBeverages) => [
        ...prevBeverages,
        { description: checkboxValue },
      ]);
    } else {
      // If checkbox is unchecked, remove it from beverages array
      setDiningOptions((prevBeverages) =>
        prevBeverages.filter(
          (beverage) => beverage.description !== checkboxValue
        )
      );
    }
  };
  // //////////////////////////////////////

  const handleOtherCuisines = (event) => {
    const checkboxValue = event.target.value;
    if (event.target.checked) {
      // If checkbox is checked, add it to beverages array
      setOtherCuisines((prevBeverages) => [
        ...prevBeverages,
        { description: checkboxValue },
      ]);
    } else {
      // If checkbox is unchecked, remove it from beverages array
      setOtherCuisines((prevBeverages) =>
        prevBeverages.filter(
          (beverage) => beverage.description !== checkboxValue
        )
      );
    }
  };

  // //////////////////////////////////////
  // //////////////////////////////////////
  // //////////////////////////////////////

  const sendRequest = async () => {
    setIsLoading(true);

    console.log({
      restaurantId,
      menuLink,
      restaurantType,
      executiveChef,
      dietaryOptions,
      beverages,
      smokingOption,
      maintenance,
      physicalDistance,
      protectiveEquipment,
      screening,
      amenities,
      seatingOptions,
      diningOptions,
      otherCuisines,
    });
    await createOfferings(
      restaurantId,
      menuLink,
      restaurantType,
      executiveChef,
      dietaryOptions,
      beverages,
      smokingOption,
      maintenance,
      physicalDistance,
      protectiveEquipment,
      screening,
      amenities,
      seatingOptions,
      diningOptions,
      otherCuisines
    )
      .then((res) => {
        console.log(res);
        if (res?.data?.status) {
          handleAlert("success", `${res?.data?.success_message}`);
          updateState(2);
        } else {
          handleAlert("error", `${res?.data?.result.map((item) => item)}`);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        handleAlert("error", "Error sending request");

        console.log(err);
      });
  };

  // //////////////////////////////////////
  // //////////////////////////////////////
  return (
    <>
      {isLoading && <Loader />}
      <Box sx={{ bgcolor: "#1a1a1a", mt: 2, borderRadius: "5px" }}>
        <Box sx={{ margin: "0 auto", width: "85%", py: 5 }}>
          <Typography variant="caption" sx={{ color: "#fff", fontWeight: 500 }}>
            Entice guests by showcasing what sets your business apart.
          </Typography>
          <Box
            sx={{
              mt: 3,
              bgcolor: "#ffffff1a",
              borderRadius: "5px",
              p: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                fontFamily: "gordita",
                fontWeight: 400,
              }}
            >
              <TipsAndUpdatesIcon sx={{ mr: 1 }} /> Giving information about the
              services and offerings of your business can significantly
              influence a guest's decision on where to dine or visit.
            </Typography>
          </Box>

          <Grid container spacing={2} rowSpacing={4} sx={{ mt: 2 }}>
            <Grid item lg={6} xs={12}>
              <CustomTextField
                value={menuLink}
                onChange={(e) => setMenuLink(e.target.value)}
                name="Menu Link"
              />
            </Grid>
            <Grid item lg={6} xs={12}>
              <CustomTextField
                value={executiveChef}
                onChange={(e) => setExecutiveChef(e.target.value)}
                name="Executive Chef"
              />
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
                  What cuisine best describes your restaurant?
                </InputLabel>
                <Box
                  className="show_scrollbar"
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
                  className="show_scrollbar"
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
                  Beverages
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
                    <CustomCheckbox label="Beer" onChange={handleBeverage} />

                    <CustomCheckbox
                      label="Full Bar"
                      onChange={handleBeverage}
                    />

                    <CustomCheckbox
                      label="Cocktails"
                      onChange={handleBeverage}
                    />
                    <CustomCheckbox label="Wine" onChange={handleBeverage} />
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
                  Dietary options
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
                      label="Vegetarian"
                      onChange={handleDietary}
                    />

                    <CustomCheckbox label="Vegan" onChange={handleDietary} />
                    <CustomCheckbox
                      label="Gluten free"
                      onChange={handleDietary}
                    />
                    <CustomCheckbox label="Organic" onChange={handleDietary} />
                  </RadioGroup>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                  >
                    <CustomCheckbox label="Halal" onChange={handleDietary} />
                    <CustomCheckbox label="Kosher" onChange={handleDietary} />
                    <CustomCheckbox
                      label="Dairy free"
                      onChange={handleDietary}
                    />
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
                  Seating Options
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
                      label="Standard (Indoors)"
                      onChange={handleSeatingOptions}
                    />

                    <CustomCheckbox
                      label="Outdoor"
                      onChange={handleSeatingOptions}
                    />
                    <CustomCheckbox
                      label="High top"
                      onChange={handleSeatingOptions}
                    />
                  </RadioGroup>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                  >
                    <CustomCheckbox
                      label="Bar"
                      onChange={handleSeatingOptions}
                    />
                    <CustomCheckbox
                      label="Counter"
                      onChange={handleSeatingOptions}
                    />
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
                  What are the dining options at your restaurant?
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
                      label="Breakfast"
                      onChange={handleDiningOptions}
                    />

                    <CustomCheckbox
                      label="Lounge"
                      onChange={handleDiningOptions}
                    />
                  </RadioGroup>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                  >
                    <CustomCheckbox
                      label="Cafe-dining"
                      onChange={handleDiningOptions}
                    />
                    <CustomCheckbox
                      label="Winebar"
                      onChange={handleDiningOptions}
                    />
                  </RadioGroup>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                  >
                    <CustomCheckbox
                      label="Bistro"
                      onChange={handleDiningOptions}
                    />
                  </RadioGroup>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box sx={{ bgcolor: "#1a1a1a", mt: 2, borderRadius: "5px" }}>
        <Box sx={{ margin: "0 auto", width: "85%", py: 5 }}>
          <Typography
            variant="caption"
            sx={{ color: "#fff", fontSize: "12px" }}
          >
            Clarify the atmosphere and style of your establishment, providing
            guests with an idea of what to anticipate.
          </Typography>
          {/* <Box sx={{ mt: 3 }}>
            <RestaurantType updateSelectRestaurant={updateSelectRestaurant} />
          </Box> */}

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
                  label="Free Parking"
                  onChange={handleAmenities}
                />

                <CustomCheckbox
                  label="Family Friendly"
                  onChange={handleAmenities}
                />
                <CustomCheckbox label="Oceanview" onChange={handleAmenities} />
                <CustomCheckbox label="Rooftop" onChange={handleAmenities} />
              </RadioGroup>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
              >
                <CustomCheckbox
                  label="Child Friendly"
                  onChange={handleAmenities}
                />
                <CustomCheckbox label="Playground" onChange={handleAmenities} />
                <CustomCheckbox label="Poolside" onChange={handleAmenities} />
              </RadioGroup>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
              >
                <CustomCheckbox
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
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FormControlLabel
                sx={{
                  color: "#cccccc",
                  "& > span": {
                    fontFamily: "Gordita",
                    fontSize: "12px",
                    color: "#cccccc",
                  },
                }}
                value="Indoor smoking Area"
                // name="Indoor smoking Area"
                onChange={handleSmoking}
                control={<Checkbox />}
                label="Indoor smoking Area"
              />
              <FormControlLabel
                sx={{
                  "& > span": {
                    fontFamily: "Gordita",
                    fontSize: "12px",
                    color: "#cccccc",
                  },
                }}
                value="Non smoking area"
                // name="Non smoking area"
                onChange={handleSmoking}
                control={<Checkbox />}
                label="Non smoking area"
              />
              <FormControlLabel
                sx={{
                  "& > span": {
                    fontFamily: "Gordita",
                    fontSize: "12px",
                    color: "#cccccc",
                  },
                }}
                value="Outdoor smoking area"
                // name="Outdoor smoking area"
                onChange={handleSmoking}
                control={<Checkbox />}
                label="Outdoor smoking area"
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ bgcolor: "#1a1a1a", mt: 2, borderRadius: "5px" }}>
        <Box sx={{ margin: "0 auto", width: "85%", py: 5 }}>
          <Typography variant="caption" sx={{ color: "#fff", fontWeight: 500 }}>
            Inform guests about the health and safety protocols in place at your
            establishment.
          </Typography>
          <InputLabel
            sx={{
              color: "#fff",
              fontSize: "13px",
              fontFamily: "Gordita",
              mb: 1,
              mt: 3,
              fontWeight: 500,
            }}
          >
            Sanitizing and maintaining cleanliness
          </InputLabel>
          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              p: 3,
              backgroundColor: "rgba(255, 255, 255, 0.05)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="Daily thorough cleaning of shared spaces."
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    sx={{
                      color: "#cccccc",
                      "& > span": {
                        fontFamily: "Gordita",
                        fontSize: "12px",
                        color: "#cccccc",
                      },
                    }}
                    value="Daily thorough cleaning of shared spaces."
                    onChange={handleMaitainance}
                    control={<Checkbox />}
                    label="Daily thorough cleaning of shared spaces."
                  />

                  <FormControlLabel
                    sx={{
                      "& > span": {
                        fontFamily: "Gordita",
                        fontSize: "12px",
                        color: "#cccccc",
                      },
                    }}
                    onChange={handleMaitainance}
                    control={<Checkbox />}
                    label="Payment methods without physical contact are accepted."
                    value="Payment methods without physical contact are accepted."
                  />
                  <FormControlLabel
                    sx={{
                      "& > span": {
                        fontFamily: "Gordita",
                        fontSize: "12px",
                        color: "#cccccc",
                      },
                    }}
                    value="Digital, disposable or sanitized menu provided"
                    onChange={handleMaitainance}
                    control={<Checkbox />}
                    label="Digital, disposable or sanitized menu provided"
                  />
                </RadioGroup>
              </Box>
              <Box>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    sx={{
                      color: "#cccccc",
                      "& > span": {
                        fontFamily: "Gordita",
                        fontSize: "12px",
                        color: "#cccccc",
                      },
                    }}
                    value="Customers are provided with sanitizers or wipes."
                    onChange={handleMaitainance}
                    control={<Checkbox />}
                    label="Customers are provided with sanitizers or wipes."
                  />
                  <FormControlLabel
                    sx={{
                      "& > span": {
                        fontFamily: "Gordita",
                        fontSize: "12px",
                        color: "#cccccc",
                      },
                    }}
                    value="Sealed or wiped utensils used"
                    onChange={handleMaitainance}
                    control={<Checkbox />}
                    label="Sealed or wiped utensils used"
                  />
                  <FormControlLabel
                    sx={{
                      "& > span": {
                        fontFamily: "Gordita",
                        fontSize: "12px",
                        color: "#cccccc",
                      },
                    }}
                    value="After the meal, surfaces are thoroughly sanitized."
                    onChange={handleMaitainance}
                    control={<Checkbox />}
                    label="After the meal, surfaces are thoroughly sanitized."
                  />
                </RadioGroup>
              </Box>
            </Box>
          </Box>
          <InputLabel
            sx={{
              color: "#fff",
              fontSize: "13px",
              fontFamily: "Gordita",
              mb: 1,
              mt: 3,
              fontWeight: 500,
            }}
          >
            Physical Distancing
          </InputLabel>
          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              p: 3,
              backgroundColor: "rgba(255, 255, 255, 0.05)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    sx={{
                      color: "#cccccc",
                      "& > span": {
                        fontFamily: "Gordita",
                        fontSize: "12px",
                        color: "#cccccc",
                      },
                    }}
                    value="Distancing maintained in common area"
                    onChange={handlePhysicalDistancing}
                    control={<Checkbox />}
                    label="Distancing maintained in common area"
                  />

                  <FormControlLabel
                    sx={{
                      "& > span": {
                        fontFamily: "Gordita",
                        fontSize: "12px",
                        color: "#cccccc",
                      },
                    }}
                    onChange={handlePhysicalDistancing}
                    control={<Checkbox />}
                    label="Extra Space between tables"
                    value="Extra Space between tables"
                  />
                  <FormControlLabel
                    sx={{
                      "& > span": {
                        fontFamily: "Gordita",
                        fontSize: "12px",
                        color: "#cccccc",
                      },
                    }}
                    onChange={handlePhysicalDistancing}
                    control={<Checkbox />}
                    label="Limited number of seated diners"
                    value="Limited number of seated diners"
                  />
                </RadioGroup>
              </Box>
            </Box>
          </Box>
          <InputLabel
            sx={{
              color: "#fff",
              fontSize: "13px",
              fontFamily: "Gordita",
              mb: 1,
              mt: 3,
              fontWeight: 500,
            }}
          >
            Protective Equipment
          </InputLabel>
          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              p: 3,
              backgroundColor: "rgba(255, 255, 255, 0.05)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    sx={{
                      color: "#cccccc",
                      "& > span": {
                        fontFamily: "Gordita",
                        fontSize: "12px",
                        color: "#cccccc",
                      },
                    }}
                    value="Diners must wear masks unless eating or drinking"
                    onChange={handleProtective}
                    control={<Checkbox />}
                    label="Diners must wear masks unless eating or drinking"
                  />

                  <FormControlLabel
                    sx={{
                      "& > span": {
                        fontFamily: "Gordita",
                        fontSize: "12px",
                        color: "#cccccc",
                      },
                    }}
                    value="Wasitwaff wear masks"
                    onChange={handleProtective}
                    control={<Checkbox />}
                    label="Wasitwaff wear masks"
                  />
                </RadioGroup>
              </Box>
            </Box>
          </Box>
          <InputLabel
            sx={{
              color: "#fff",
              fontSize: "13px",
              fontFamily: "Gordita",
              mb: 1,
              mt: 3,
              fontWeight: 500,
            }}
          >
            Screening
          </InputLabel>
          <Box
            sx={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              p: 3,
              backgroundColor: "rgba(255, 255, 255, 0.05)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    sx={{
                      color: "#cccccc",
                      "& > span": {
                        fontFamily: "Gordita",
                        fontSize: "12px",
                        color: "#cccccc",
                      },
                    }}
                    value="Contact tracing information collected"
                    onChange={handleScreening}
                    control={<Checkbox />}
                    label="Contact tracing information collected"
                  />

                  <FormControlLabel
                    sx={{
                      "& > span": {
                        fontFamily: "Gordita",
                        fontSize: "12px",
                        color: "#cccccc",
                      },
                    }}
                    onChange={handleScreening}
                    control={<Checkbox />}
                    label="Diner temperature check required"
                    value="Diner temperature check required"
                  />
                  <FormControlLabel
                    sx={{
                      "& > span": {
                        fontFamily: "Gordita",
                        fontSize: "12px",
                        color: "#cccccc",
                      },
                    }}
                    onChange={handleScreening}
                    control={<Checkbox />}
                    label="Proof of vaccination required for indoor dining"
                    value="Proof of vaccination required for indoor dining"
                  />
                  <FormControlLabel
                    sx={{
                      "& > span": {
                        fontFamily: "Gordita",
                        fontSize: "12px",
                        color: "#cccccc",
                      },
                    }}
                    onChange={handleScreening}
                    control={<Checkbox />}
                    label="Proof of  vaccination required before outdoor dinning"
                    value="Proof of  vaccination required before outdoor dinning"
                  />
                  <FormControlLabel
                    sx={{
                      "& > span": {
                        fontFamily: "Gordita",
                        fontSize: "12px",
                        color: "#cccccc",
                      },
                    }}
                    onChange={handleScreening}
                    control={<Checkbox />}
                    label="Sick staff prohibited in the workplace"
                    value="Sick staff prohibited in the workplace"
                  />
                  <FormControlLabel
                    sx={{
                      "& > span": {
                        fontFamily: "Gordita",
                        fontSize: "12px",
                        color: "#cccccc",
                      },
                    }}
                    onChange={handleScreening}
                    control={<Checkbox />}
                    label="Staff is vaccinated"
                    value="Staff is vaccinated"
                  />
                  <FormControlLabel
                    sx={{
                      "& > span": {
                        fontFamily: "Gordita",
                        fontSize: "12px",
                        color: "#cccccc",
                      },
                    }}
                    onChange={handleScreening}
                    control={<Checkbox />}
                    label="Staff temperature check required"
                    value="Staff temperature check required"
                  />
                </RadioGroup>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Button
        variant="contained"
        fullWidth
        onClick={sendRequest}
        sx={{ mt: 3 }}
      >
        Proceed
      </Button>
    </>
  );
};

export default Offerings;
