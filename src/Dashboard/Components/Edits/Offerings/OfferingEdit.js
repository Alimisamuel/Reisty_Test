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
import { editOfferings } from "../../../../axios/api";
import Loader from "../../Common/Loader";
import { useSnackbar } from "notistack";
import CustomCheckbox from "../../CustomField/CustomCheckbox";

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

const OfferingEdit = ({ data, action }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [menuLink, setMenuLink] = useState("");
  const [executiveChef, setExecutiveChef] = useState("");
  const [dietaryOptions, setDietaryOptions] = useState([]);
  const [beverages, setBeverages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAlert = (variant, message) => {
  
    enqueueSnackbar(message, { variant });
  };

  useEffect(() => {
    setMenuLink(data?.MenuLink);
    setExecutiveChef(data?.ExecutiveChef);
    const Dietary =
      data?.DietaryOptions &&
      data?.DietaryOptions.map((option) => option.Name).map((item) => ({
        name: item,
      }));
    const Beverage =
      data?.Beverages &&
      data?.Beverages.map((option) => option.Name).map((item) => ({
        name: item,
      }));
    setBeverages(Beverage);
    setDietaryOptions(Dietary);
  }, [data]);

  const handleBeverage = (event) => {
    console.log(beverages);
    const checkboxValue = event.target.value;
    if (event.target.checked) {
      // If checkbox is checked, add it to beverages array
      setBeverages((prevBeverages) => [
        ...prevBeverages,
        { name: checkboxValue },
      ]);
    } else {
      // If checkbox is unchecked, remove it from beverages array
      setBeverages((prevBeverages) =>
        prevBeverages.filter((beverage) => beverage.name !== checkboxValue)
      );
    }
  };
  const handleDietary = (event) => {
    console.log(beverages);
    const checkboxValue = event.target.value;
    if (event.target.checked) {
      // If checkbox is checked, add it to beverages array
      setDietaryOptions((prevBeverages) => [
        ...prevBeverages,
        { name: checkboxValue },
      ]);
    } else {
      // If checkbox is unchecked, remove it from beverages array
      setDietaryOptions((prevBeverages) =>
        prevBeverages.filter((beverage) => beverage.name !== checkboxValue)
      );
    }
  };

  const handleEdit = async () => {
    setIsLoading(true);
    await editOfferings(
      data?.OfferingsId,

      menuLink,
      executiveChef,
      dietaryOptions,
      beverages
    )
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        setOpen(false);
        action();
        if (res?.data?.status) {
          handleAlert("success", `${res?.data?.success_message}`);
        } else {
          handleAlert("error", `${res?.data?.result.map((item) => item)}`);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        handleAlert("error", `${err.message}}`);
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
                  Offerings
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
              Entice guests by showcasing what sets your business apart.
            </Typography>
            <Box
              sx={{
                mt: 2,
                p: 1,
                background: "rgba(255, 255, 255, 0.20)",
                borderRadius: "5px",
              }}
            >
              <Typography
                sx={{ color: "#fff", fontSize: "12px", lineHeight: "20px" }}
              >
                Giving information about the services and offerings of your
                business can significantly influence a guest's decision on where
                to dine or visit.
              </Typography>
            </Box>

            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item lg={6} md={6}>
                  <CustomTextField
                    name="Menu Link"
                    value={menuLink}
                    onChange={(e) => setMenuLink(e.target.value)}
                  />
                </Grid>
                <Grid item lg={6} md={6}>
                  <CustomTextField
                    name="Executive chef"
                    value={executiveChef}
                    onChange={(e) => setExecutiveChef(e.target.value)}
                  />
                </Grid>
                <Grid item lg={6} md={6}>
                  <InputLabel
                    sx={{
                      color: "#ccc",
                      fontSize: "13px",
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
                        checked={dietaryOptions?.some(
                          (item) => item.name === "Vegetarian"
                        )}
                        label="Vegetarian"
                        onChange={handleDietary}
                      />

                      <CustomCheckbox
                        checked={dietaryOptions?.some(
                          (item) => item.name === "Vegan"
                        )}
                        label="Vegan"
                        onChange={handleDietary}
                      />
                      <CustomCheckbox
                        checked={dietaryOptions?.some(
                          (item) => item.name === "Gluten free"
                        )}
                        label="Gluten free"
                        onChange={handleDietary}
                      />
                      <CustomCheckbox
                        checked={dietaryOptions?.some(
                          (item) => item.name === "Organic"
                        )}
                        label="Organic"
                        onChange={handleDietary}
                      />
                    </RadioGroup>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                    >
                      <CustomCheckbox
                        checked={dietaryOptions?.some(
                          (item) => item.name === "Halal"
                        )}
                        label="Halal"
                        onChange={handleDietary}
                      />
                      <CustomCheckbox
                        checked={dietaryOptions?.some(
                          (item) => item.name === "Kosher"
                        )}
                        label="Kosher"
                        onChange={handleDietary}
                      />
                      <CustomCheckbox
                        checked={dietaryOptions?.some(
                          (item) => item.name === "Dairy free"
                        )}
                        label="Dairy free"
                        onChange={handleDietary}
                      />
                    </RadioGroup>
                  </Box>
                </Grid>
                <Grid item lg={6} md={6}>
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
                      <CustomCheckbox
                       checked={beverages?.some(
                          (item) => item.name === "Beer"
                        )}
                      label="Beer" onChange={handleBeverage} />

                      <CustomCheckbox
 checked={beverages?.some(
                          (item) => item.name === "Full Bar"
                        )}

                        label="Full Bar"
                        onChange={handleBeverage}
                      />

                      <CustomCheckbox
 checked={beverages?.some(
                          (item) => item.name === "Cocktails"
                        )}

                        label="Cocktails"
                        onChange={handleBeverage}
                      />
                      <CustomCheckbox
                       checked={beverages?.some(
                          (item) => item.name === "Wine"
                        )}
                      label="Wine" onChange={handleBeverage} />
                    </RadioGroup>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box align="right" sx={{ mt: 2 }}>
              <Button variant="contained" onClick={handleEdit}>
                Done
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default OfferingEdit;
