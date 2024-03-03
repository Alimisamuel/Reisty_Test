import {
  Button,
  Box,
  Typography,
  ToggleButton,
  Grid,
  ToggleButtonGroup,
  IconButton,
  TextField,
  Select,
  MenuItem,
  Paper,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import React, {useState} from 'react'
import Modal from "@mui/material/Modal";
import CustomInput from '../CustomField/CustomInput';
import { createReservationHour } from '../../../axios/api';
import Loader from '../Common/Loader'
import { useSnackbar } from "notistack";
import { daysInWeek } from 'date-fns';
import {  styled } from "@mui/material/styles";
import CustomModal from '../Common/CustomModal'



const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));


const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#BC172F",
    },
  },
});

const CreateReservationHour = ({action}) => {
    const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isLoading, setIsLoading] = useState(false)
  const [from , setFrom] = useState("")
  const [to, setTo ] = useState("")
  const [days, setDays] = useState("");
  const handleDays = (day) =>{
setDays((prev)=> prev + day)
  }

    const handleAlert = (variant, message) => {

      enqueueSnackbar(message, { variant });
    };
    const [formats, setFormats] = React.useState(() => []);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };
      const [restaurantType, setRestaurantType] = useState("");

      const handleChangeSelect = (event) => {
        setRestaurantType(event.target.value);
        
      };

      const dayOfWeeks = formats.join(',')

      const handleCreateReservationHour = async () =>{
        setIsLoading(true)
        await createReservationHour(dayOfWeeks, restaurantType, from, to).then((res)=>{
          setIsLoading(false)
          if(res.data.status){
            handleAlert('success', "Reservation hour created")
            setOpen(false)
            action()
          }
          else{
                handleAlert("error", `${res?.data.error_message}`);
          }
          console.log(res)
        }).catch((err)=>{
          setIsLoading(false)
          console.log(err)
                handleAlert("error", `${err}`);
        })
      }
      
        const [openModal, setOpenModal] = useState(false);

        const handleOpenModal = () => {
          setOpenModal(true);
        };

        const handleCloseModal = () => {
          setOpenModal(false);
        };
  return (
    <>

      <Button variant="contained" color="primary" onClick={handleOpenModal}>
        Add New
      </Button>

      <ThemeProvider theme={theme}>
        {/* <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        ></Modal> */}

        <CustomModal
          open={openModal}
          onClose={handleCloseModal}
          title="       Create Reservation Hour"
          width={500}
        >
          <Box>
            {isLoading && <Loader />}

            <Box sx={{ mt: 4, bgcolor: "", borderRadius: 2, p: 2 }}>
              <Typography
                sx={{ color: "#fff", fontSize: "14px", fontWeight: 500 }}
              >
                Opening days:
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box>
                  <Paper
                    elevation={0}
                    sx={{
                      display: "flex",
                      border: (theme) => `1px solid ${theme.palette.divider}`,
                      flexWrap: "wrap",
                    }}
                  >
                    <StyledToggleButtonGroup
                      fullWidth
                      value={formats}
                      color="primary"
                      // exclusive
                      onChange={handleFormat}
                      aria-label="text alignment"
                    >
                      <ToggleButton
                        sx={{
                          "&.Mui-selected": {
                            bgcolor: "#BC172F",
                          },
                        }}
                        // onClick={() => handleDays("Monday,")}
                        value="Monday"
                        aria-label="left aligned"
                      >
                        <Typography
                          sx={{
                            color: "#fff",
                            fontWeight: 400,
                            fontSize: "12px",
                          }}
                        >
                          Mon
                        </Typography>
                      </ToggleButton>
                      <ToggleButton
                        sx={{
                          "&.Mui-selected": {
                            bgcolor: "#BC172F",
                          },
                        }}
                        // onClick={() => handleDays("Tuesday,")}
                        value="Tuesday"
                        aria-label="centered"
                      >
                        <Typography
                          sx={{
                            color: "#fff",
                            fontWeight: 400,
                            fontSize: "12px",
                          }}
                        >
                          Tue
                        </Typography>
                      </ToggleButton>
                      <ToggleButton
                        sx={{
                          "&.Mui-selected": {
                            bgcolor: "#BC172F",
                          },
                        }}
                        // onClick={() => handleDays("Wednessday,")}
                        value="Wednesday"
                        aria-label="right aligned"
                      >
                        <Typography
                          sx={{
                            color: "#fff",
                            fontWeight: 400,
                            fontSize: "12px",
                          }}
                        >
                          Wed
                        </Typography>
                      </ToggleButton>
                      <ToggleButton
                        sx={{
                          "&.Mui-selected": {
                            bgcolor: "#BC172F",
                          },
                        }}
                        value="Thursday"
                        // onClick={() => handleDays("Thursday,")}
                        aria-label="justified"
                      >
                        <Typography
                          sx={{
                            color: "#fff",
                            fontWeight: 400,
                            fontSize: "12px",
                          }}
                        >
                          Thur
                        </Typography>
                      </ToggleButton>
                      <ToggleButton
                        sx={{
                          "&.Mui-selected": {
                            bgcolor: "#BC172F",
                          },
                        }}
                        onClick={() => handleDays("Friday,")}
                        value="Friday"
                        aria-label="justified"
                      >
                        <Typography
                          sx={{
                            color: "#fff",
                            fontWeight: 400,
                            fontSize: "12px",
                          }}
                        >
                          Fri
                        </Typography>
                      </ToggleButton>
                      <ToggleButton
                        sx={{
                          "&.Mui-selected": {
                            bgcolor: "#BC172F",
                          },
                        }}
                        // onClick={() => handleDays("Saturday,")}
                        value="Saturday"
                        aria-label="justified"
                      >
                        <Typography
                          sx={{
                            color: "#fff",
                            fontWeight: 400,
                            fontSize: "12px",
                          }}
                        >
                          Sat
                        </Typography>
                      </ToggleButton>
                      <ToggleButton
                        sx={{
                          "&.Mui-selected": {
                            bgcolor: "#BC172F",
                          },
                        }}
                        // onClick={() => handleDays("Sunday,")}
                        value="Sunday"
                        aria-label="justified"
                      >
                        <Typography
                          sx={{
                            color: "#fff",
                            fontWeight: 400,
                            fontSize: "12px",
                          }}
                        >
                          Sun
                        </Typography>
                      </ToggleButton>
                    </StyledToggleButtonGroup>
                  </Paper>
                </Box>
              </Box>
              <Box sx={{ mt: 3 }}>
                <Typography
                  sx={{ color: "#fff", fontSize: "14px", fontWeight: 500 }}
                >
                  Meal Time?
                </Typography>
                <Select
                  fullWidth
                  value={restaurantType}
                  onChange={handleChangeSelect}
                  sx={{
                    my: 2,
                    borderRadius: "10px",
                    fontFamily: "Gordita",
                    color: "#fff",
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
                  <MenuItem
                    sx={{ fontWeight: 200, fontSize: "13px" }}
                    value="Breakfast"
                  >
                    Breakfast
                  </MenuItem>
                  <MenuItem
                    sx={{ fontWeight: 200, fontSize: "13px" }}
                    value="Brunch"
                  >
                    Brunch
                  </MenuItem>
                  <MenuItem
                    sx={{ fontWeight: 200, fontSize: "13px" }}
                    value="Lunch"
                  >
                    Lunch
                  </MenuItem>
                  <MenuItem
                    sx={{ fontWeight: 200, fontSize: "13px" }}
                    value="Dinner"
                  >
                    Dinner
                  </MenuItem>
                  <MenuItem
                    sx={{ fontWeight: 200, fontSize: "13px" }}
                    value="All Day"
                  >
                   All Day
                  </MenuItem>
                </Select>
              </Box>

              <Box
                sx={{
                  mt: 3,
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{ color: "#fff", fontSize: "14px", fontWeight: 500 }}
                >
                  Opening Hours:
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    columnGap: 2,
                  }}
                >
                  <Box sx={{ width: "45%" }}>
                    <Typography
                      sx={{ fontSize: "12px", color: "#fff", mt: 2, mb: 1 }}
                    >
                      From:
                    </Typography>
                    <CustomInput
                      size="normal"
                      type="time"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                    />
                  </Box>
                  <Box sx={{ width: "45%" }}>
                    <Typography
                      sx={{ fontSize: "12px", color: "#fff", mt: 2, mb: 1 }}
                    >
                      To:
                    </Typography>
                    <CustomInput
                      size="normal"
                      type="time"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                    />
                  </Box>
                </Box>

                <Box align="right" sx={{ mt: 4 }}>
                  <Button
                    disabled={!to || !from || !restaurantType || !daysInWeek}
                    variant="contained"
                    fullWidth
                    onClick={() => {
                      handleCreateReservationHour();
                    }}
                  >
                    Create
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </CustomModal>
      </ThemeProvider>
    </>
  );
}

export default CreateReservationHour