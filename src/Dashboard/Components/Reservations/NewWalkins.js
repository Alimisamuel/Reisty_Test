import React, { useEffect, useState } from 'react'
import { Box,Button, IconButton, Typography, Modal , Grid, TextField, InputLabel, InputAdornment, RadioGroup, MenuItem, Avatar, ThemeProvider, createTheme, LinearProgress} from '@mui/material';
import walk from "../../../assets/Icons/walk.svg";

import {  CloseOutlined } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { createWalkin, searchGuestBook } from '../../../axios/api';
import AddIcon from "@mui/icons-material/Add";
import { Link } from 'react-router-dom';
import RemoveIcon from "@mui/icons-material/Remove";
import {useSelector} from 'react-redux'
import CustomRadio from '../CustomField/CustomRadio';
import CustomTextField from '../CustomField/CustomTextField';
import Loader from '../Common/Loader';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useSnackbar } from "notistack";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";



  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "#1a1a1a",
    boxShadow: 24,
    p: 0,
    borderRadius: 2,
    // zIndex: -1,
 
  };


const NewWalkins = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [searchParams, setSearchParams] = useState("")
    const [data, setData] = useState(null);
    const [isCard, setIsCard] = useState(false);
    const [cardData, setCardData] = useState(null);
    const restaurantList = useSelector((state)=>state?.restaurants?.data?.result)
    const [time, setTime] = useState(null)
    const [date, setDate] = useState(null);
    const [guestId, setGuestId] = useState("")
    const [restaurantId, setRestaurantId] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [partySize, setPartySize] = useState(1)


     const handleAlert = (variant, message) => {
       enqueueSnackbar(message, { variant });
     };
    const handleSearch = async () =>{
      setIsLoading(true)
      await searchGuestBook(searchParams).then((res)=>{
   setIsLoading(false)
        setData(res?.data?.result)
      }).catch((err)=>{
        console.log(err)
        setIsLoading(false)
      })
    }

    useEffect(()=>{
      if(searchParams.length >= 3){
handleSearch()

      }
    }, [searchParams])

      const [anchorEl, setAnchorEl] = React.useState(false);

      const handleClick = (event) => {
        setSearchParams(event.target.value)
if(searchParams.length > 1){
        setAnchorEl(true);
}
else(
  setAnchorEl(false)
)

        
      };

      const openPoper = Boolean(anchorEl);
      const id = openPoper ? "simple-popper" : undefined;

        const handleDateChange = (newDate) => {
          // Format the date to "YYYY-MM-DD" and set it in the state
          setDate(newDate ? dayjs(newDate).format("YYYY-MM-DD") : null);
        };
         const formattedTime = time ? dayjs(time).format("HH:mm") : "";

      const handleWalkin = async () =>{
        setLoading(true)
        console.log(date, formattedTime)
        await createWalkin(restaurantId, date, formattedTime, guestId, partySize).then((res)=>{
             if (res?.data?.status) {
               handleAlert("success", `${res?.data?.success_message}`);
              //  handleClose();
         
             } else {
               handleAlert("error", `${res?.data?.error_message}`);
             }
             setLoading(false)
          console.log(res)
        }).catch((err)=>{
          setLoading(false)
          console.log(err)
               handleAlert("error", `${err}`);
        })
      }


  return (
    <>
      <Box
        onClick={handleOpen}
        sx={{
          cursor: "pointer",
          p: 0,
          bgcolor: "#333",
          border: "0.5px solid #fff",
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton>
          <img src={walk} />
        </IconButton>
        <Typography sx={{ color: "#fff", fontSize: "11px", fontWeight: 500 }}>
          Wak-ins
        </Typography>
        <IconButton></IconButton>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {
            loading && <Loader/>
          }
          <Box sx={{ py: 2, px: 3, borderBottom: "1px solid #BC172F" }}>
            <Grid container sx={{ display: "flex", alignItems: "center" }}>
              <Grid item md={2}></Grid>
              <Grid item md={8}>
                <Typography
                  sx={{ color: "#fff", textAlign: "center", fontWeight: 500 }}
                >
                  New Walk-in
                </Typography>
              </Grid>
              <Grid item md={2} align="right">
                <IconButton onClick={handleClose}>
                  <CloseOutlined sx={{ color: "#fff" }} />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ maxHeight: "72vh", overflow: "scroll" }}>
            {!isCard ? (
              <>
                <Box sx={{ p: 4 }} aria-describedby={id}>
                  <InputLabel
                    sx={{ color: "#fff", fontSize: "12px", fontWeight: 400 }}
                  >
                    Search guest information
                  </InputLabel>

                  <TextField
                    fullWidth
                    value={searchParams}
                    onChange={handleClick}
                    aria-describedby={id}
                    placeholder="Enter name, phone or email address"
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
                                {isLoading ? "Searching..." : "Guest Not Found"}
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
            ) : (
              <>
                <Box sx={{ p: 4 }}>
                  <Box align="center">
                    <IconButton onClick={() => setIsCard(false)}>
                      <CloseOutlined />
                    </IconButton>
                  </Box>
                  <Box
                    sx={{
                      bgcolor: "#333",
                      height: "200px",
                      border: "1px solid #fff",
                      borderRadius: 2,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Avatar />
                    <Typography
                      sx={{
                        color: "#fff",
                        fontSize: "12px",
                        fontFamily: "gordita",
                        fontWeight: 500,
                        mt: 2,
                      }}
                    >
                      {`${cardData?.FirstName} ${cardData?.LastName}`}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#fff",
                        fontSize: "10px",
                        fontFamily: "gordita",
                        fontWeight: 500,
                        mt: 0.5,
                      }}
                    >
                      {cardData?.EmailAddress}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#fff",
                        fontSize: "10px",
                        fontFamily: "gordita",
                        fontWeight: 300,
                        mt: 0.5,
                      }}
                    >
                      {cardData?.PhoneNumber}
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 3 }}>
                    <Typography
                      sx={{
                        color: "#fff",
                        fontWeight: 500,
                        fontSize: "14px",
                        fontFamily: "gordita",
                      }}
                    >
                      Party Size
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 1,
                      }}
                    >
                      <IconButton
                        disabled={partySize < 2}
                        sx={{ p: 1.5, bgcolor: "#333", borderRadius: 2 }}
                        onClick={() => {
                          if (partySize > 1) {
                            setPartySize(partySize - 1);
                          }
                        }}
                      >
                        <RemoveIcon sx={{ color: "#fff" }} />
                      </IconButton>
                      <Box
                        sx={{
                          p: 2,
                          bgcolor: "#333",
                          borderRadius: 2,
                          width: "70%",
                          color: "#fff",
                          textAlign: "center",
                        }}
                      >
                        {partySize}
                      </Box>
                      <IconButton
                        sx={{ p: 1.5, bgcolor: "#333", borderRadius: 2 }}
                        onClick={() => setPartySize(partySize + 1)}
                      >
                        <AddIcon sx={{ color: "#fff" }} />
                      </IconButton>
                    </Box>
                  </Box>
                  <Box sx={{ mt: 3 }}>
                    <Typography
                      sx={{
                        color: "#fff",
                        fontWeight: 500,
                        fontSize: "14px",
                        fontFamily: "gordita",
                      }}
                    >
                      Experiences
                    </Typography>
                    <Box
                      className="show_scrollbar"
                      sx={{
                        mt: 1,
                        py: 2,
                        maxHeight: "150px",
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
                            gridTemplateColumns: "auto auto auto",
                          }}
                        >
                          {restaurantList.map((item, index) => (
                            <CustomRadio
                              label={item.Name}
                              onChange={(e) => setRestaurantId(item.Id)}
                            />
                          ))}
                        </Box>
                      </RadioGroup>
                    </Box>

                    <Grid container spacing={2} sx={{ mt: 1 }}>
                      <Grid item md={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <TimePicker
                            // disablePast
                            label="Time"
                            value={time}
                            onChange={(newValue) => setTime(newValue)}
                            sx={{
                              fontFamily: "Gordita",
                              fontSize: "13px",
                              borderRadius: "10px",
                              offset: " 1px solid #ccc",
                              fontWeight: 500,
                              color: "#ccc",
                              border: "1px solid #ccc",
                              width: "100%",
                              // Replace with your desired font family
                            }}
                          />
                        </LocalizationProvider>
                      </Grid>
                      <Grid item md={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            // disablePast
                            label="Date"
                            value={date}
                            onChange={handleDateChange}
                            sx={{
                              fontFamily: "Gordita",
                              fontSize: "13px",
                              borderRadius: "10px",
                              offset: " 1px solid #ccc",
                              fontWeight: 500,
                              color: "#ccc",
                              border: "1px solid #ccc",
                              width: "100%",

                              // Replace with your desired font family
                            }}
                          />
                        </LocalizationProvider>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
                <Box
                  align="right"
                  sx={{
                    bgcolor: "#333",
                    py: 2,
                    px: 3,
                    borderTop: "1px solid #fff",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{ textTransform: "initial", fontFamily: "gordita" }}
                    onClick={handleWalkin}
                  >
                    Add Walk-in
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default NewWalkins