import React, {useState} from 'react'
import { Box, Typography, IconButton, Popover, Button, createTheme, ThemeProvider } from '@mui/material';
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import calenderTick from "../../../assets/Icons/calendar-tick2.svg";
import calender from "../../../assets/Icons/calendar.svg";
import messIcon from "../../../assets/Icons/messages.svg";
import { format, parseISO } from "date-fns";
import book from "../../../assets/Icons/book3.svg";
import NewWalkins from '../Reservations/NewWalkins';
import NewReservation from '../Reservations/NewReservation';
import Calender from './Calender';


const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#BC172F",
    },
    
  },
  typography:{
    fontFamily:'gordita',
    fontSize:'14px',
  }
});

const WalkinHeader = ({updateDate}) => {
const [drawerOpen, setDrawerOpen] = React.useState(false);
    const dateObject = new Date();

      const handleDrawerClose = () => {
        setDrawerOpen(false);
      };
        const handleDrawerOpen = () => {
          setDrawerOpen(true);
        };
    // Format the date if needed
    const toDate = dateObject.toISOString().split("T")[0];
   const [value, setValue] = React.useState(toDate);
   
 const [anchorEl, setAnchorEl] = React.useState(null);

  const parsedDate = parseISO(value);
    const formattedDate = format(parsedDate, "EEEE, MMMM d");
 const handleClick = (event) => {
   setAnchorEl(event.currentTarget);
 };

 const handleClose = () => {
   setAnchorEl(null);
 };

 const open = Boolean(anchorEl);
 const id = open ? "simple-popover" : undefined;

 const handleFilter = async () =>{
  console.log(value)
  updateDate(value)
  handleClose()
 }
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            p: 2,
            bgcolor: "#000",
            borderBottom: "0.5px solid #fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              p: 0,
              bgcolor: "#333",
              border: "0.5px solid #fff",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={handleClick}
          >
            <IconButton>
              <ChevronLeftIcon sx={{ color: "#fff" }} />
            </IconButton>
            <IconButton>
              <img src={calenderTick} />
            </IconButton>
            <Typography
              sx={{ color: "#fff", fontSize: "11px", fontWeight: 500 }}
            >
              {formattedDate}
            </Typography>
            <IconButton>
              <img src={calender} />
            </IconButton>
            <IconButton>
              <ChevronRightIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Box>
          <Box sx={{ display: "flex", columnGap: 2, alignItems: "center" }}>
            {/* <Box
              sx={{
                p: 0,
                bgcolor: "#333",
                border: "0.5px solid #fff",
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconButton>
                <img src={messIcon} />
              </IconButton>
              <Typography
                sx={{ color: "#fff", fontSize: "11px", fontWeight: 500 }}
              >
                Messages
              </Typography>
              <IconButton></IconButton>
            </Box> */}
            <NewWalkins />
            <Button
            // disabled
              onClick={handleDrawerOpen}
              sx={{
                p: 0,
                pr: 2,
                bgcolor: "#333",
                border: "0.5px solid #fff",
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconButton>
                <img src={book} />
              </IconButton>
              <Typography
                sx={{ color: "#fff", fontSize: "11px", fontWeight: 500 }}
              >
                New Reservation
              </Typography>

              {/* <IconButton></IconButton> */}
            </Button>
            <NewReservation open={drawerOpen} onClose={handleDrawerClose} />
          </Box>
        </Box>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Calender
            future={false}
            past={false}
            onChildValue={(value) => setValue(value)}
          />
          <Box sx={{ p: 2 }} align="right">
            <Button onClick={handleFilter} variant="contained" sx={{ px: 4 }}>
              Filter
            </Button>
          </Box>
        </Popover>
      </ThemeProvider>
    </>
  );
}

export default WalkinHeader