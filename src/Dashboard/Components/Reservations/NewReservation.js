import React, { useEffect, useState } from "react";
import book from "../../../assets/Icons/book3.svg";
import { Drawer } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  IconButton,
  Typography,
  Modal,
  Grid,
  LinearProgress,
  MenuItem,
  ListItemButton,
  InputLabel,
  TextField,

  InputAdornment,
  RadioGroup,

  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import dayjs from "dayjs";
import AddIcon from "@mui/icons-material/Add";
import { createWalkin, findUserByEmail, searchGuestBook } from "../../../axios/api";
import { useSnackbar } from "notistack";
import { BackpackOutlined, CloseOutlined, TextFields } from "@mui/icons-material";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import AdjustOutlinedIcon from "@mui/icons-material/AdjustOutlined";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import Calender from "../Common/Calender";
import CustomTextField from "../CustomField/CustomTextField";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { useSelector } from "react-redux";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 0,
};

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 640,
    flexShrink: 0,
    p: 4,
  },
  drawerPaper: {
    width: 640,
    p: 4,
  },
  toolbar: theme.mixins.toolbar,
}));
const NewReservation = ({ open, onClose }) => {
  const [value, setValue] = useState("");
    const { enqueueSnackbar } = useSnackbar();
        const [searchParams, setSearchParams] = useState("");
            const [loading, setLoading] = useState(false);
                const [isLoading, setIsLoading] = useState(false);
                    const [data, setData] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const [experience, setExperience] = useState("");
  const [meal, setMeal] = useState("");
      const [isCard, setIsCard] = useState(false);
      const [cardData, setCardData] = useState(null);
        const [guestId, setGuestId] = useState("");
  const [partySize, setPartySize] = useState("")
      const [time, setTime] = useState(null);
  const restaurantList = useSelector((state) => state.restaurants.data?.result);

   const handleAlert = (variant, message) => {
     enqueueSnackbar(message, { variant });
   };
   const handleSearch = async () => {
     setIsLoading(true);
     await findUserByEmail(searchParams)
       .then((res) => {
         setIsLoading(false);
         setData(res?.data?.result);
       })
       .catch((err) => {
         console.log(err);
         setIsLoading(false);
       });
   };

   useEffect(() => {
     if (searchParams.length >= 3) {
       handleSearch();
     }
   }, [searchParams]);

   const [anchorEl, setAnchorEl] = React.useState(false);

   const handleClick = (event) => {
     setSearchParams(event.target.value);
     if (searchParams.length > 1) {
       setAnchorEl(true);
     } else setAnchorEl(false);
   };

   const openPoper = Boolean(anchorEl);
   const id = openPoper ? "simple-popper" : undefined;


   const formattedTime = time ? dayjs(time).format("HH:mm") : "";


  const handleExperience = (value) => {
    setExperience(value);
  };
  const handleMeal = (value) => {
    setMeal(value);
  };

  useEffect(() => {
    if (activeStep === 0) {
      setProgressValue(0);
    } else if (activeStep === 1) {
      setProgressValue(25);
    } else if (activeStep === 2) {
      setProgressValue(50);
    } else if (activeStep === 3) {
      setProgressValue(75);
    }
  }, [activeStep]);

  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{ bgcolor: "#1a1a1a", overflowY: "scroll" }}
          className={classes.toolbar}
        >
          <Box>
            <Box sx={{ py: 2, px: 3 }}>
              <Grid container sx={{ display: "flex", alignItems: "center" }}>
                <Grid item lg={2}>
                  {activeStep > 0 && (
                    <IconButton
                      onClick={() => setActiveStep((prev) => prev - 1)}
                    >
                      <ArrowBackIosOutlinedIcon sx={{ color: "#fff" }} />
                    </IconButton>
                  )}
                </Grid>
                <Grid item lg={8}>
                  <Typography
                    sx={{ color: "#fff", textAlign: "center", fontWeight: 500 }}
                  >
                    Create a reservation
                  </Typography>
                </Grid>
                <Grid item lg={2} align="right">
                  <IconButton onClick={onClose}>
                    <CloseOutlined sx={{ color: "#fff" }} />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
            <LinearProgress variant="determinate" value={progressValue} />
            <Box
              sx={{
                bgcolor: "#1a1a1a",
                p: 5,
                px: 4,
              }}
            >
              <Box
                sx={{
                  borderRadius: 2,
                  border: "1px solid #fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  align="center"
                  sx={{
                    p: 1,
                    borderRight: "1px solid #fff",
                    width: "25%",
                    bgcolor: activeStep === 0 && "#333",
                    borderRadius: "10px 0px 0px 10px",
                  }}
                >
                  <Typography
                    sx={{ color: "#fff", fontWeight: 400, fontSize: "12px" }}
                  >
                    Select date
                  </Typography>
                </Box>
                <Box
                  align="center"
                  sx={{
                    p: 1,
                    borderRight: "1px solid #fff",
                    width: "25%",
                    bgcolor: activeStep === 1 && "#333",
                  }}
                >
                  <Typography
                    sx={{ color: "#fff", fontWeight: 400, fontSize: "12px" }}
                  >
                    Party size
                  </Typography>
                </Box>
                <Box
                  align="center"
                  sx={{
                    p: 1,
                    borderRight: "1px solid #fff",
                    width: "25%",
                    bgcolor: activeStep === 2 && "#333",
                  }}
                >
                  <Typography
                    sx={{ color: "#fff", fontWeight: 400, fontSize: "12px" }}
                  >
                    Select time
                  </Typography>
                </Box>
                <Box
                  align="center"
                  sx={{
                    p: 1,
                    width: "25%",
                    bgcolor: activeStep === 3 && "#333",
                  }}
                >
                  <Typography
                    sx={{ color: "#fff", fontWeight: 400, fontSize: "12px" }}
                  >
                    Add guest info
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ mt: 5 }}>
                {activeStep === 0 && (
                  <>
                    <Box sx={{ display: "grid", placeItems: "center" }}>
                      <Box
                        sx={{
                          width: "100%",
                          bgcolor: "#333",
                          display: "grid",
                          placeItems: "center",
                          pt: 3,
                        }}
                      >
                        <Calender
                          future={false}
                          past={false}
                          onChildValue={(value) => setValue(value)}
                        />
                      </Box>
                    </Box>
                    <Box align="right" sx={{ mt: 3 }}>
                      <Button
                        disabled={!value}
                        variant="contained"
                        onClick={() => setActiveStep(1)}
                      >
                        Proceed
                      </Button>
                    </Box>
                  </>
                )}
                {activeStep === 1 && (
                  <>
                    <Box sx={{ display: "grid", placeItems: "center" }}>
                      <Box
                        sx={{
                          width: "100%",
                          // height: "500px",
                          bgcolor: "#333",
                          borderRadius: 2,
                        }}
                      >
                        <Box
                          align="center"
                          sx={{ p: 2, borderBottom: "1px solid #1a1a1a" }}
                        >
                          <Typography sx={{ color: "#fff", fontWeight: 400 }}>
                            Input the party size
                          </Typography>
                        </Box>
                        <Box sx={{ p: 3 }}>
                          <CustomTextField
                            type="number"
                            label="Select the party size"
                            name="Select the party size"
                            helpertext="input number of guest only (1, 2, 3 ...)"
                            value={partySize}
                            onChange={(e) => setPartySize(e.target.value)}
                          />
                        </Box>
                      </Box>
                    </Box>
                    <Box align="right" sx={{ mt: 3 }}>
                      <Button
                        disabled={!partySize}
                        variant="contained"
                        onClick={() => setActiveStep(2)}
                      >
                        Proceed
                      </Button>
                    </Box>
                  </>
                )}
                {activeStep === 2 && (
                  <>
                    <Box
                      sx={{
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: "90%",
                        }}
                      >
                        <Box sx={{ maxHeight: "200px", overflow: "scroll" }}>
                          <Typography sx={{ color: "#fff", fontWeight: 400 }}>
                            Experience
                          </Typography>
                          <Grid container sx={{ mt: 2 }} spacing={2}>
                            {restaurantList.map((item, index) => (
                              <Grid item lg={4} key={index}>
                                <ListItemButton
                                  selected={experience === item.Id}
                                  onClick={() => handleExperience(item.Id)}
                                  sx={{
                                    borderRadius: 2,
                                    p: 1,
                                    height: "50px",
                                    bgcolor: "#333",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    "&.Mui-selected": {
                                      bgcolor: "#BC172F",
                                    },
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      color: "#fff",
                                      width: "60%",
                                      fontSize: "12px",
                                    }}
                                  >
                                    {item?.Name}
                                  </Typography>
                                  {experience === item?.Id ? (
                                    <AdjustOutlinedIcon
                                      sx={{ color: "#fff" }}
                                    />
                                  ) : (
                                    <CircleOutlinedIcon
                                      sx={{ color: "#fff" }}
                                    />
                                  )}
                                </ListItemButton>
                              </Grid>
                            ))}
                          </Grid>
                        </Box>
                        <Box sx={{ mt: 3 }}>
                          <Typography sx={{ color: "#fff", fontWeight: 500 }}>
                            Meal Period
                          </Typography>
                          <Grid container spacing={2} sx={{ mt: 2 }}>
                            <Grid item lg={4}>
                              <ListItemButton
                                selected={meal === "Breakfast"}
                                onClick={() => setMeal("Breakfast")}
                                sx={{
                                  borderRadius: 2,
                                  p: 2,
                                  bgcolor: "#333",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  "&.Mui-selected": {
                                    bgcolor: "#BC172F",
                                  },
                                }}
                              >
                                <Typography
                                  sx={{ color: "#fff", width: "60%" }}
                                >
                                  Breakfast
                                </Typography>
                                {meal === "Breakfast" ? (
                                  <AdjustOutlinedIcon sx={{ color: "#fff" }} />
                                ) : (
                                  <CircleOutlinedIcon sx={{ color: "#fff" }} />
                                )}
                              </ListItemButton>
                            </Grid>
                            <Grid item lg={4}>
                              <ListItemButton
                                selected={meal === "Lunch"}
                                onClick={() => setMeal("Lunch")}
                                sx={{
                                  borderRadius: 2,
                                  p: 2,
                                  bgcolor: "#333",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  "&.Mui-selected": {
                                    bgcolor: "#BC172F",
                                  },
                                }}
                              >
                                <Typography
                                  sx={{ color: "#fff", width: "60%" }}
                                >
                                  Lunch
                                </Typography>
                                {meal === "Lunch" ? (
                                  <AdjustOutlinedIcon sx={{ color: "#fff" }} />
                                ) : (
                                  <CircleOutlinedIcon sx={{ color: "#fff" }} />
                                )}
                              </ListItemButton>
                            </Grid>
                            <Grid item lg={4}>
                              <ListItemButton
                                selected={meal === "Dinner"}
                                onClick={() => setMeal("Dinner")}
                                sx={{
                                  borderRadius: 2,
                                  p: 2,
                                  bgcolor: "#333",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  "&.Mui-selected": {
                                    bgcolor: "#BC172F",
                                  },
                                }}
                              >
                                <Typography
                                  sx={{ color: "#fff", width: "60%" }}
                                >
                                  Dinner
                                </Typography>
                                {meal === "Dinner" ? (
                                  <AdjustOutlinedIcon sx={{ color: "#fff" }} />
                                ) : (
                                  <CircleOutlinedIcon sx={{ color: "#fff" }} />
                                )}
                              </ListItemButton>
                            </Grid>
                          </Grid>
                        </Box>
                        <Box sx={{ mt: 4 }}>
                          <Typography sx={{ color: "#fff", fontWeight: 500 }}>
                            Time
                          </Typography>
                          {/* <CustomTextField type="time" /> */}
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker fullWidth sx={{ width: "100%" }} />
                          </LocalizationProvider>
                        </Box>
                      </Box>
                    </Box>
                    <Box align="right" sx={{ mt: 3 }}>
                      <Button
                        variant="contained"
                        onClick={() => setActiveStep(3)}
                      >
                        Proceed
                      </Button>
                    </Box>
                  </>
                )}

                {activeStep === 3 && (
                  <>
                    <Box
                      sx={{
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: "90%",
                        }}
                      >
                        <>
                          <Box sx={{ p: 4 }} aria-describedby={id}>
                            <InputLabel
                              sx={{
                                color: "#fff",
                                fontSize: "12px",
                                fontWeight: 400,
                              }}
                            >
                              Search guest information
                            </InputLabel>

                            <TextField
                              fullWidth
                              value={searchParams}
                              onChange={handleClick}
                              aria-describedby={id}
                              placeholder="Enter user email"
                              margin="normal"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <IconButton>
                                      <SearchIcon sx={{ color: "#fff" }} />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      onClick={() => {
                                        setAnchorEl(false);
                                        setSearchParams("");
                                      }}
                                    >
                                      <CloseOutlined sx={{ color: "#fff" }} />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                                style: {
                                  fontFamily: "Gordita",
                                  fontSize: "13px",
                                  borderRadius: "10px",
                                  border: "1px solid #fff",
                                  color: "#fff",
                                  offset: " 1px solid #fff",
                                },
                              }}
                            />

                            {anchorEl && (
                              <>
                                <Box
                                  sx={{
                                    bgcolor: "#333",
                                    borderRadius: 2,
                                    maxHeight: "300px",
                                  }}
                                >
                                  {!data || data.length === 0 ? (
                                    <>
                                      <Link to="/dashboard/guest-book">
                                        <MenuItem
                                          sx={{
                                            borderBottom: "1px solid #BC172F",
                                            py: 1,
                                            px: 2,
                                            display: "flex",
                                            columnGap: 3,
                                          }}
                                        >
                                          <Box
                                            sx={{
                                              bgcolor: "#555",
                                              display: "grid",
                                              placeItems: "center",
                                              width: "40px",
                                              height: "40px",
                                              borderRadius: 1,
                                            }}
                                          >
                                            <AddIcon sx={{ color: "#fff" }} />
                                          </Box>
                                          <Typography
                                            sx={{
                                              color: "#fff",
                                              fontFamily: "gordita",
                                              fontSize: "14px",
                                              fontWeight: 400,
                                            }}
                                          >{`Add "${searchParams}" to guestbook`}</Typography>
                                        </MenuItem>
                                        {isLoading && <LinearProgress />}
                                      </Link>
                                      <Box sx={{ p: 2 }}>
                                        <Typography
                                          sx={{
                                            color: "#fff",
                                            fontFamily: "gordita",
                                            fontSize: "14px",
                                            fontWeight: 500,
                                            textAlign: "center",
                                          }}
                                        >
                                          {isLoading
                                            ? "Searching..."
                                            : "Guest Not Found"}
                                        </Typography>
                                      </Box>
                                    </>
                                  ) : (
                                    <>
                                      <Link to="/dashboard/guest-book">
                                        <MenuItem
                                          sx={{
                                            borderBottom: "1px solid #BC172F",
                                            py: 1,
                                            px: 2,
                                            display: "flex",
                                            columnGap: 3,
                                          }}
                                        >
                                          <Box
                                            sx={{
                                              bgcolor: "#555",
                                              display: "grid",
                                              placeItems: "center",
                                              width: "40px",
                                              height: "40px",
                                              borderRadius: 1,
                                            }}
                                          >
                                            <AddIcon sx={{ color: "#fff" }} />
                                          </Box>
                                          <Typography
                                            sx={{
                                              color: "#fff",
                                              fontFamily: "gordita",
                                              fontSize: "14px",
                                              fontWeight: 400,
                                            }}
                                          >{`Add "${searchParams}" to guestbook`}</Typography>
                                        </MenuItem>
                                      </Link>
                                      {isLoading && <LinearProgress />}
                                      {data?.map((item, index) => (
                                        <MenuItem
                                          sx={{ columnGap: 2, py: 1 }}
                                          key={index}
                                          onClick={() => {
                                            setIsCard(true);
                                            setCardData(item);
                                            setGuestId(item.Id);
                                          }}
                                        >
                                          <Avatar />
                                          <Box>
                                            <Typography
                                              sx={{
                                                color: "#fff",
                                                fontSize: "12px",
                                                fontFamily: "gordita",
                                                fontWeight: 500,
                                              }}
                                            >
                                              {`${item?.FirstName} ${item?.LastName}`}
                                            </Typography>
                                            <Typography
                                              sx={{
                                                color: "#fff",
                                                fontSize: "10px",
                                                fontFamily: "gordita",
                                                fontWeight: 500,
                                              }}
                                            >
                                              {item?.EmailAddress}
                                            </Typography>
                                            <Typography
                                              sx={{
                                                color: "#fff",
                                                fontSize: "10px",
                                                fontFamily: "gordita",
                                                fontWeight: 300,
                                              }}
                                            >
                                              {item?.PhoneNumber}
                                            </Typography>
                                          </Box>
                                        </MenuItem>
                                      ))}
                                    </>
                                  )}
                                </Box>
                              </>
                            )}
                          </Box>
                        </>
                      </Box>
                    </Box>
                  </>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
export default NewReservation;
