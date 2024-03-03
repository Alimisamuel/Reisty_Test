import React, { useEffect, useState } from "react";
import {
  IconButton,
  Modal,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Autocomplete from "@mui/material/Autocomplete";
import { debounce } from "@mui/material/utils";
import parse from "autosuggest-highlight/parse";
import axios from "axios";

const theme = createTheme({
  palette:{
    mode:'dark'
  }
})

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { lg: 500, xs: 330 },
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
};

const GOOGLE_MAPS_API_KEY = "AIzaSyCoybA7QMl3eQP8of1wWW-FhUeYwrk0V1o";

function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

const CustomAddress = ({ onAddressChange, updateAddress }) => {
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const loaded = React.useRef(false);
  useEffect(()=>{
if(updateAddress){
  setValue(updateAddress)
}
  },[updateAddress])

  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector("head"),
        "google-maps"
      );
    }
    loaded.current = true;
  }

  const fetch = React.useMemo(
    () =>
      debounce((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 400),
    []
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  const [locationValue, setLocationValue] = useState()

  const handleGeocodeByPlaceId = async (placeId) => {
 await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${GOOGLE_MAPS_API_KEY}
`      ).then((res)=>{
const {data} = res;
console.log(data.results[0])
setLocationValue(data?.results[0]?.geometry?.location);


      onAddressChange({
        address: data?.results[0].formatted_address,
        longitude: data?.results[0]?.geometry?.location?.lng,
        latitude: data?.results[0]?.geometry?.location?.lat,
      });

      }).catch((err)=>{
        console.log(err)
      })


  };

  const handleAddressChange = (newValue) => {

    handleGeocodeByPlaceId(newValue?.place_id);
console.log(newValue)



  };






  return (
    <>
      <ThemeProvider theme={theme}>
        <Autocomplete
          id="google-map-demo"
          getOptionLabel={(option) =>
            typeof option === "string" ? option : option.description
          }
          filterOptions={(x) => x}
          options={options}
          autoComplete
          // onChange={handleAddressChange}
          includeInputInList
          filterSelectedOptions
          value={value}
          noOptionsText="No locations"
          onChange={(event, newValue) => {
            setOptions(newValue ? [newValue, ...options] : options);
            setValue(newValue);
            handleAddressChange(newValue);
          }}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Find a location"
              fullWidth
              InputProps={{
                ...params.InputProps,
                startAdornment: <>{params.InputProps.startAdornment}</>,
                style: {
                  ...params.InputProps.style,
                  fontFamily: "Gordita",
                  fontSize: "13px",
                  borderRadius: "10px",
                  offset: " 1px solid #ccc",
                  color: "#ccc",
                  border: "1px solid #ccc",
                },
              }}
            />
          )}
          renderOption={(props, option) => {
            const matches =
              option.structured_formatting.main_text_matched_substrings || [];
            const parts = parse(
              option.structured_formatting.main_text,
              matches.map((match) => [
                match.offset,
                match.offset + match.length,
              ])
            );

            return (
              <li {...props}>
                <Grid container alignItems="center">
                  <Grid item sx={{ display: "flex", width: 44 }}>
                    <LocationOnIcon
                      sx={{ color: "text.secondary", fontSize: "18px" }}
                    />
                  </Grid>
                  <Grid
                    item
                    sx={{
                      width: "calc(100% - 44px)",
                      wordWrap: "break-word",
                    }}
                  >
                    {parts.map((part, index) => (
                      <Box
                        key={index}
                        component="span"
                        sx={{
                          fontWeight: part.highlight ? "bold" : "regular",
                          fontSize: "13px",
                          fontFamily: "Gordita",
                        }}
                      >
                        {part.text}
                      </Box>
                    ))}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontFamily: "Gordita" }}
                    >
                      {option.structured_formatting.secondary_text}
                    </Typography>
                  </Grid>
                </Grid>
              </li>
            );
          }}
        />
      </ThemeProvider>
    </>
  );
};

export default CustomAddress;
