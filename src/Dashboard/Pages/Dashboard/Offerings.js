import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
  InputLabel,
  TextField,
  Autocomplete,
  ThemeProvider,
} from "@mui/material";

import { getOfferings } from "../../../axios/api";
import Loader from "../../Components/Common/Loader";
import OfferingEdit from "../../Components/Edits/Offerings/OfferingEdit";
import DiningEdit from "../../Components/Edits/Offerings/DiningEdits";
import SafetyEdit  from "../../Components/Edits/Offerings/SafetyEdit";



const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 750,
  borderRadius: "5px",
  boxShadow: 24,
  bgcolor: '#1a1a1a',
  overflow: "scroll",
  height: '60vh',
  pb:3
};

const BasicInformation = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [offeringData, setOfferingData] = useState(null)

  const handleGetOfferings = async () =>{
    setIsLoading(true)
    await getOfferings()
    .then((res)=>{
      const {data} = res;
      console.log(data?.result[0], "Offerings")
      setOfferingData(data?.result[0])
      setIsLoading(false)
    }).catch((err)=>{
      console.log(err)
            setIsLoading(false);
    })
  }

  useEffect(()=>{
handleGetOfferings()
  },[])


  const Beverages = offeringData?.Beverages ? offeringData?.Beverages.map((option) => option.Name).join(', ') : "Empty";
  const Amenities = offeringData?.Amenities ? offeringData?.Amenities.map((option) => option.Description).join(', ') : "Empty";
  const dietaryOptions = offeringData?.DietaryOptions ? offeringData?.DietaryOptions
      ?.map((option) => option.Name).join(', ') : "Empty";
  const SmokingOptions
      = offeringData?.SmokingOptions
      ? offeringData?.SmokingOptions
          ?.map((option) => option.Description).join(', ') : "Empty";
  const physicalDistancings = offeringData?.PhysicalDistancings
    ? offeringData?.PhysicalDistancings?.map(
        (option) => option.Description
      ).join(", ")
    : "Empty";
  const ProtectiveEquipments = offeringData?.ProtectiveEquipments
    ? offeringData?.ProtectiveEquipments?.map(
        (option) => option.Description
      ).join(", ")
    : "Empty";

          

  const SanitizationAndMaintainances =
    offeringData?.SanitizationAndMaintainances
      ? offeringData?.SanitizationAndMaintainances?.map((option) => (
          <React.Fragment key={option.Id}>
            {option.Description}
            <br />
          </React.Fragment>
        ))
      : "Empty";


  const Screenings = offeringData?.Screenings
    ? offeringData?.Screenings?.map((option) => (
    <React.Fragment key={option.Id}>
      {option.Description}
      <br />
    </React.Fragment>
  ))
    : "Empty";
  return (
    <>
      {isLoading && <Loader />}
      <Header title="Offerings" />
      <Box
        sx={{
          margin: "0 auto",
          width: "95%",
          // height: "100%",
          overflow: "scroll",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 6,
          }}
        >
          <Box>
            <Typography
              variant="body1"
              sx={{ color: "#fff", fontSize: "16px", fontWeight: 400 }}
            >
              Offerings
            </Typography>
            <Typography
              sx={{
                color: "#cccccc",
                fontSize: { lg: "14px", sm: "12px", xs: "11px" },
              }}
            >
              Tell us what makes your restuarant special.
            </Typography>
          </Box>
          <Box>
            <OfferingEdit data={offeringData} action={handleGetOfferings} />
          </Box>
        </Box>
        <Box sx={{ bgcolor: "#333", borderRadius: "5px", mt: 1, px: 3, py: 3 }}>
          <Grid
            container
            sx={{ width: { lg: "75%", md: "75%", sm: "100%", xs: "100%" } }}
            spacing={2}
          >
            <Grid item lg={3} md={3} sm={6} xs={6}>
              <Typography sx={{ fontSize: "14px", color: "#fff" }}>
                Menu link:
              </Typography>
            </Grid>
            <Grid item lg={9} md={9} sm={6} xs={6}>
              <Typography sx={{ fontSize: "14px", color: "#fff" }}>
                {offeringData?.MenuLink ? offeringData.MenuLink : "--"}
              </Typography>
            </Grid>
            {/* Restaurant Admin: */}
            <Grid item lg={3} md={3} sm={6} xs={6}>
              <Typography sx={{ fontSize: "14px", color: "#fff" }}>
                Executive chef
              </Typography>
            </Grid>
            <Grid item lg={9} md={9} sm={6} xs={6}>
              <Typography sx={{ fontSize: "14px", color: "#fff" }}>
                {offeringData?.ExecutiveChef
                  ? offeringData?.ExecutiveChef
                  : "--"}
              </Typography>
            </Grid>
            {/* Restaurant Website: */}
            <Grid item lg={3} md={3} sm={6} xs={6}>
              <Typography sx={{ fontSize: "14px", color: "#fff" }}>
                Dietary options
              </Typography>
            </Grid>
            <Grid item lg={9} md={9} sm={6} xs={6}>
              <Typography sx={{ fontSize: "14px", color: "#fff" }}>
                {dietaryOptions}
              </Typography>
            </Grid>

            <Grid item lg={3} md={3} sm={6} xs={6}>
              <Typography sx={{ fontSize: "14px", color: "#fff" }}>
                Beverages
              </Typography>
            </Grid>
            <Grid item lg={9} md={9} sm={6} xs={6}>
              <Typography sx={{ fontSize: "14px", color: "#fff" }}>
                {Beverages}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 6,
          }}
        >
          <Box>
            <Typography
              variant="body1"
              sx={{ color: "#fff", fontSize: "16px", fontWeight: 400 }}
            >
              Dining Experience
            </Typography>
            <Typography
              sx={{
                color: "#cccccc",
                fontSize: { lg: "14px", sm: "12px", xs: "11px" },
              }}
            >
              Clarify the atmosphere and style of your establishment, providing
              guests with an idea of what to anticipate.
            </Typography>
          </Box>
          <Box>
            <DiningEdit data={offeringData} action={handleGetOfferings} />
          </Box>
        </Box>
        <Box sx={{ bgcolor: "#333", borderRadius: "5px", mt: 1, px: 3, py: 3 }}>
          <Grid
            container
            sx={{ width: { lg: "75%", md: "75%", sm: "100%", xs: "100%" } }}
            spacing={2}
          >
            <Grid item lg={3} md={3} sm={6} xs={6}>
              <Typography sx={{ fontSize: "14px", color: "#fff" }}>
                Restaurant Type:
              </Typography>
            </Grid>
            <Grid item lg={9} md={9} sm={6} xs={6}>
              <Typography sx={{ fontSize: "14px", color: "#fff" }}>
                -
              </Typography>
            </Grid>
            {/* Restaurant Admin: */}
            <Grid item lg={3} md={3} sm={6} xs={6}>
              <Typography sx={{ fontSize: "14px", color: "#fff" }}>
                Amenities:
              </Typography>
            </Grid>
            <Grid item lg={9} md={9} sm={6} xs={6}>
              <Typography sx={{ fontSize: "14px", color: "#fff" }}>
                {Amenities || ""}
              </Typography>
            </Grid>
            {/* Restaurant Website: */}
            <Grid item lg={3} md={3} sm={6} xs={6}>
              <Typography sx={{ fontSize: "14px", color: "#fff" }}>
                Smoking:
              </Typography>
            </Grid>
            <Grid item lg={9} md={9} sm={6} xs={6}>
              <Typography sx={{ fontSize: "14px", color: "#fff" }}>
                {SmokingOptions}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 6,
          }}
        >
          <Box>
            <Typography
              variant="body1"
              sx={{ color: "#fff", fontSize: "16px", fontWeight: 400 }}
            >
              Safety Precautions
            </Typography>
            <Typography
              sx={{
                color: "#cccccc",
                fontSize: { lg: "14px", sm: "12px", xs: "11px" },
              }}
            >
              Inform guests about the health and safety protocols in place at
              your establishment.
            </Typography>
          </Box>
          <Box>
            <SafetyEdit data={offeringData} action={handleGetOfferings}  />
          </Box>
        </Box>
        <Box sx={{ bgcolor: "#333", borderRadius: "5px", mt: 1, px: 3, py: 3 }}>
          <Grid
            container
            sx={{ width: { lg: "100%", md: "100%", sm: "100%", xs: "100%" } }}
            spacing={2}
          >
            <Grid item lg={3} md={4} sm={6} xs={6}>
              <Typography sx={{ fontSize: "14px", color: "#fff" }}>
                Sanitizing & Cleanliness
              </Typography>
            </Grid>
            <Grid item lg={9} md={8} sm={6} xs={6}>
              <Typography sx={{ fontSize: "14px", color: "#fff" }}>
                {SanitizationAndMaintainances}
              </Typography>
            </Grid>

            <Grid item lg={3} md={4} sm={6} xs={6}>
              <Typography sx={{ fontSize: "14px", color: "#fff" }}>
                Physical distancing
              </Typography>
            </Grid>
            <Grid item lg={9} md={8} sm={6} xs={6}>
              <Typography sx={{ fontSize: "14px", color: "#fff" }}>
                {physicalDistancings}
              </Typography>
            </Grid>

            <Grid item lg={3} md={4} sm={6} xs={6}>
              <Typography sx={{ fontSize: "14px", color: "#fff" }}>
                Protective equipment:
              </Typography>
            </Grid>
            <Grid item lg={9} md={8} sm={6} xs={6}>
              <Typography sx={{ fontSize: "14px", color: "#fff" }}>
                {ProtectiveEquipments}
              </Typography>
            </Grid>
            <Grid item lg={3} md={4} sm={6} xs={6}>
              <Typography sx={{ fontSize: "14px", color: "#fff" }}>
                Screening
              </Typography>
            </Grid>
            <Grid item lg={9} md={8} sm={6} xs={6}>
              <Typography sx={{ fontSize: "14px", color: "#fff" }}>
                {Screenings}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default BasicInformation;


