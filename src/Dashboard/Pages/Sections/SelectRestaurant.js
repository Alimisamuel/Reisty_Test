import {
  Avatar,
  Box,
  Button,
  List,
  ListItemButton,
  Skeleton,
  Typography,
  TextField,
  Grid,
  InputAdornment,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import logo from "../../../assets/Logo/logo2.svg";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../../store/userSlice";
import { getRestuarents } from "../../../store/restaurantSlice";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { Helmet } from "react-helmet";

const SelectRestaurant = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const restaurantLists = useSelector((state) => state.restaurants.data.result);
    const [value, setValue] = useState("");


  const [restaurantList, setRestaurantList] = useState(null);
  useEffect(() => {
    setRestaurantList(restaurantLists);
  }, [ restaurantLists]);

  useEffect(() => {
    dispatch(getRestuarents());
  }, []);

const handleSearch = (e) => {
  const searchTerm = e.target.value.toLowerCase();

  // Filter items based on the search term
  const filteredItems = restaurantLists.filter(
    (item) => item.Name.toLowerCase().includes(searchTerm)
  );

  setRestaurantList(filteredItems);
  setValue(searchTerm);
};

  const [selected, setSelected] = useState("");
  const handleSelect = (value, name, logo) => {
    setSelected(value);
    localStorage.setItem("restaurantID", value);
    localStorage.setItem("restaurantName", name);
    localStorage.setItem("restaurantLogo", logo);
  };
  // console.log(selected)

  const scaleVariants = {
    initial: { scale: 0 },
    animate: { scale: 1 },
    exit: { scale: 0 },
  };




  return (
    <>
      <Helmet> </Helmet>
      <motion.div
        variants={scaleVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Box sx={{ bgcolor: "#BC172F", height: "100vh" }}>
          <Box
            sx={{
              // height: "90vh",
              bgcolor: "#000",
              display: "grid",
              placeItems: "center",
            }}
          >
            <Box
              align="center"
              sx={{
                width: "70%",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                justifyContent: "content",
              }}
            >
              <img src={logo} width={140} />
              <Box sx={{ mt: 17 }}>
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: "18px",
                    textTransform: "capitalize",
                    fontWeight: 700,
                  }}
                >
                  Kindly choose a restaurant from the provided list
                </Typography>
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: "13px",
                    textTransform: "capitalize",
                    fontWeight: 300,
                  }}
                >
                  Your choice will help us personalize your experience and
                  ensure that you receive information tailored to your preferred
                  dining establishment
                </Typography>

                <Box sx={{ mt: 6 }}>
                  <Box sx={{ mb: 5 }}>
                    <TextField
                      placeholder="Search Restaurants"
                      size="small"
                      sx={{
                        width: "200px",
                        transition: "0.2s all linear",
                        "&:hover": {
                          width: "400px",
                        },
                      }}
                      // fullWidth
                      value={value}
                      onChange={handleSearch}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <FiSearch style={{ color: "#fff" }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment
                            onClick={() => setValue("")}
                            position="end"
                          >
                            <IoClose style={{ color: "#fff" }} />
                          </InputAdornment>
                        ),
                        style: {
                          fontFamily: "Gordita",
                          fontSize: "13px",
                          borderRadius: "10px",
                          offset: " 1px solid #ccc",
                          color: "#ccc",
                          border: "1px solid #ccc",
                          // width: "200px",
                          transition: "0.2s all linear",

                          // Replace with your desired font family
                        },
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      columnGap: 3,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {!restaurantList && (
                      <>
                        <Skeleton
                          sx={{ bgcolor: "#ffffff1a" }}
                          width={100}
                          height={100}
                          variant="circular"
                        />
                        <Skeleton
                          sx={{ bgcolor: "#ffffff1a" }}
                          width={100}
                          height={100}
                          variant="circular"
                        />
                      </>
                    )}
                    <Grid container spacing={2}>
                      {restaurantList &&
                        restaurantList.map((item, index) => (
                          <Grid item lg={2} md={2} key={index}>
                            <Box
                              onClick={() =>
                                handleSelect(item.Id, item.Name, item?.Logo)
                              }
                              sx={{ cursor: "pointer" }}
                            >
                              <Avatar
                                sx={{
                                  width: "100px",
                                  height: "100px",
                                  border:
                                    selected === item.Id
                                      ? "5px solid #fff"
                                      : "0.5px solid red",
                                  transition: "0.2s all linear",
                                  mt: selected === item.Id ? -2 : 0,
                                }}
                                src={item.Logo}
                              />
                              <Typography
                                sx={{
                                  color: "#fff",
                                  mt: 2,
                                  fontWeight: 500,
                                  fontSize: "12px",
                                  textTransform: "uppercase",
                                }}
                              >
                                {item.Name}
                              </Typography>
                            </Box>
                          </Grid>
                        ))}
                      <Grid item lg={2} md={3}>
                        <Box>
                          <Link to="/quick-setup">
                            <Button
                              sx={{
                                width: "100px",
                                height: "100px",
                                borderRadius: "50%",
                              }}
                              variant="outlined"
                            >
                              <AddIcon sx={{ fontSize: "46px" }} />
                            </Button>
                          </Link>
                          <Typography
                            sx={{ color: "#fff", mt: 2, fontWeight: 400 }}
                          >
                            Add More
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
                <Link to="/dashboard">
                  {" "}
                  <Button
                    disabled={!selected}
                    endIcon={<KeyboardDoubleArrowRightIcon />}
                    sx={{ mt: 10 }}
                    size="large"
                  >
                    Continue
                  </Button>
                </Link>
              </Box>
            </Box>
          </Box>
          <Box sx={{ mt: 0.2, bgcolor: "#000", height: "5px" }} />
          <Box sx={{ mt: 0.2, bgcolor: "#000", height: "3px" }} />
          <Box sx={{ mt: 0.2, bgcolor: "#000", height: "2px" }} />
          <Box align="right" sx={{ mt: 3, mr: 4 }}>
            <Button
              sx={{ color: "#000", fontSize: "14px" }}
              onClick={() => {
                dispatch(logoutUser());
                localStorage.removeItem("userInfo");
                navigate("/login");
              }}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </motion.div>
    </>
  );
};

export default SelectRestaurant;
