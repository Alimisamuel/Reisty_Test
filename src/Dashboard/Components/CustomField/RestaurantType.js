import React, {useState} from "react";
import { Select, MenuItem, InputLabel , Box} from "@mui/material";
import { RestaurantData } from "../../../assets/Data/RestaurantData";

const RestaurantType = ({ updateSelectRestaurant }) => {
  const [restaurantType, setRestaurantType] = useState("");

  const handleChangeSelect = (event) => {
    setRestaurantType(event.target.value);
    updateSelectRestaurant(event.target.value);
  };

  return (
    <>
      <InputLabel
        sx={{
          color: "#ccc",
          fontSize: "13px",
          fontFamily: "Gordita",
          mb: 1,
        }}
      >
        Restaurant Type
      </InputLabel>
      <Select
        fullWidth
        value={restaurantType}
        onChange={handleChangeSelect}
        sx={{
          borderRadius: "10px",
          fontFamily: "Gordita",
          color: "#717171",
          fontSize: "13px",
          border: "1px solid #ccc",
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
        <MenuItem sx={{ fontWeight: 200, fontSize: "13px" }} value="">
          Please Select
        </MenuItem>
        {RestaurantData.map((type, index) => (
          <MenuItem
            sx={{ fontWeight: 400, fontSize: "12px" }}
            value={type.label}
            key={index}
          >
            {type.label}
          </MenuItem>
        ))}
 
      </Select>
    </>
  );
};

export default RestaurantType;
