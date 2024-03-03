import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { FilledInput, createTheme , ThemeProvider, Input} from "@mui/material";
import  {RestaurantData} from '../../../assets/Data/RestaurantData'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      fontFamily:'Gordita'
      
    },
  },
};

const names = [
  "American",
  "Pizzeria",
  "Brazillian",
  "Italian",
  "Sushi",
  "Korean",
  "Steakhouse",
  "Fusion",
  "Vegetarian / Vegan ",
  "Seafood",
  "Barbecue",
  "Fish",
  "French",
];

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#BC172F",
    },
    typography:{
      fontFamily:'Gordita'
    }
  },
});

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function RestaurantType({ updateSelectRestaurant }) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
        updateSelectRestaurant(personName);
  };

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <InputLabel
          sx={{
            color: "#ccc",
            fontSize: "13px",
            fontFamily: "Gordita",
            mb: 1,
          }}
        >
          Restuarant Type
        </InputLabel>
        <FormControl fullWidth sx={{ m: 1 }}>
          <Select
            fullWidth
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={personName}
            onChange={handleChange}
            input={
              <FilledInput
                fullWidth
                id="select-multiple-chip"
                label="Restaurant types"
                inputProps={{
                  "aria-label": "Without label",
                  style: {
                    fontSize: "13px",
                    borderRadius: "10px",
                    // offset: " 1px solid #737373",

                    // Replace with your desired font family
                  },
                }}
              />
            }
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem
                sx={{ fontFamily: "gordita", fontSize:'12px' }}
                key={name}
                value={name}
                style={getStyles(name, personName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </ThemeProvider>
    </div>
  );
}
