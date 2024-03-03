import React, { useEffect, useState } from "react";
import TopNav from "../../Layout/TopNav";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Grid,
  Popover,
  MenuItem,
  Modal,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ExpandCircleDownOutlinedIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import SquareIcon from "@mui/icons-material/Square";
import SellIcon from "@mui/icons-material/Sell";
import TourOutlinedIcon from "@mui/icons-material/TourOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import ForwardOutlinedIcon from "@mui/icons-material/ForwardOutlined";
import Person4OutlinedIcon from "@mui/icons-material/Person4Outlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import crown from "../../../assets/Icons/crown.svg";
import { Link } from "react-router-dom";
import { CloseOutlined } from "@mui/icons-material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import img1 from "../../../assets/Icons/guestMgt/1.svg";
import img2 from "../../../assets/Icons/guestMgt/2.svg";
import img3 from "../../../assets/Icons/guestMgt/3.svg";
import img4 from "../../../assets/Icons/guestMgt/4.svg";
import img5 from "../../../assets/Icons/guestMgt/5.svg";
import img6 from "../../../assets/Icons/guestMgt/5.svg";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined";
import NewReservation from "./NewReservation";
import NewWalkins from "./NewWalkins";
import { changeBookingStatus, getReservations } from "../../../axios/api";
import WalkinHeader from "../Common/WalkinHeader";
import Loader from "../Common/Loader";
import AirlineSeatReclineExtraIcon from "@mui/icons-material/AirlineSeatReclineExtra";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  background: "#333",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <ExpandCircleDownOutlinedIcon
        sx={{ fontSize: "1.5rem", color: "#fff" }}
      />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const ReservationManagement = () => {
  const [expanded, setExpanded] = React.useState("panel1");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const [finished, setFinished] = useState(null)
const [seated, setSeated] = useState(null)
const [upcoming, setUpcoming] = useState(null)
const [cancelled, setIsCancelled] = useState(null)

console.log(finished)

const filterFinished = data?.filter((item) => item.BookingStatus == "Finished")
const filterExpected = data?.filter((item) => item.BookingStatus == "Expected")
const filterSitted = data?.filter((item) => item.BookingStatus == "Sitted")
const filterCancelled = data?.filter((item) => item.BookingStatus === "Cancelled")

useEffect(()=>{
  if(data){

    setIsCancelled(filterCancelled || [])
    setUpcoming(filterExpected || [])
    setFinished(filterFinished || [])
    setSeated(filterSitted || [])
  }
}, [data])
   const inputDate = new Date();






 

    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(inputDate.getDate()).padStart(2, "0");

    const formattedDateString = `${year}-${month}-${day}`;

  const [formattedDate, setFormattedDate] = useState(formattedDateString);


  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleWalkin = () => {};

  const handleGetReservations = async () =>{

    setIsLoading(true)
    await getReservations(formattedDate)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        const { data } = res;
        setData(data?.result);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }

  useEffect(()=>{

      handleGetReservations();
      console.log(formattedDate, "Formatted Date")

  }, [formattedDate])



  const filterDate = (value)=>{
    setFormattedDate(value)
  }

  return (
    <>
      {isLoading && <Loader />}
      <Box>
        <Box
          sx={{
            p: 1,
            px: 2,
            borderBottom: "0.5px solid #fff",
            bgcolor: "#1A1A1A",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", columnGap: 3 }}>
            <Typography sx={{ color: "#fff", fontWeight: 500 }}>
              Manage Reservations
            </Typography>
          </Box>
          {/* <Button
            sx={{ border: "0.5px solid #fff", color: "#fff" }}
            onClick={handleClick}
          >
            Edit
          </Button> */}
        </Box>

        <WalkinHeader updateDate={filterDate} />
        <Box>
        <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
            sx={{ background: expanded === "panel3" ? "#1A1A1A" : "#333" }}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
              sx={{ border: "0.5px solid #fff" }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", columnGap: 2 }}>
                  <SquareIcon
                    sx={{ color: "#E6BF47", width: "20px", height: "20px" }}
                  />
                  <Typography
                    sx={{ color: "#fff", fontWeight: 400, fontSize: "12px" }}
                  >
                    UPCOMING
                  </Typography>
                </Box>
                <Typography
                  sx={{ color: "#fff", fontWeight: 400, fontSize: "12px" }}
                >
                  {upcoming && `${upcoming.length} guests`}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {!upcoming || upcoming.length === 0 ? (
                  <>
                    <Box
                      sx={{
                        p: 4,
                        display: "grid",
                        placeItems: "center",
                        width: "100%",
                      }}
                    >
                      <Typography sx={{ textAlign: "center", color:'#fff' }}>
                        No Reservations Available
                      </Typography>
                    </Box>
                  </>
                ) : (
                  upcoming &&
                  upcoming.map((item, index) => (
                    <Grid item lg={3} md={3} key={index}>
                      <Card
                        action={handleGetReservations}
                        borderColor="#E6BF47"
                        data={item}
                      />
                    </Grid>
                  ))
                )}
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
            sx={{ background: expanded === "panel2" ? "#1A1A1A" : "#333" }}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
              sx={{ border: "0.5px solid #fff" }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", columnGap: 2 }}>
                  <SquareIcon
                    sx={{ color: "#47E673", width: "20px", height: "20px" }}
                  />
                  <Typography
                    sx={{ color: "#fff", fontWeight: 400, fontSize: "12px" }}
                  >
                    SEATED
                  </Typography>
                </Box>
                <Typography
                  sx={{ color: "#fff", fontSize: "12px", fontWeight: 500 }}
                >
                  {seated && `${seated.length} guests`}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {!seated || seated.length === 0 ? (
                  <>
                    <Box
                      sx={{
                        p: 4,
                        display: "grid",
                        placeItems: "center",
                        width: "100%",
                      }}
                    >
                      <Typography sx={{ textAlign: "center", color:'#fff' }}>
                        No Reservations Available
                      </Typography>
                    </Box>
                  </>
                ) : (
                  seated &&
                  seated.map((item, index) => (
                    <Grid item lg={3} md={3} key={index}>
                      <Card
                        borderColor="#47E673"
                        data={item}
                        action={handleGetReservations}
                      />
                    </Grid>
                  ))
                )}
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
            sx={{ background: expanded === "panel1" ? "#1A1A1A" : "#333" }}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
              sx={{ border: "0.5px solid #fff" }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", columnGap: 2 }}>
                  <SquareIcon
                    sx={{ color: "#4787E6", width: "20px", height: "20px" }}
                  />
                  <Typography
                    sx={{ color: "#fff", fontWeight: 400, fontSize: "12px" }}
                  >
                    FINISHED
                  </Typography>
                </Box>
                <Typography
                  sx={{ color: "#fff", fontSize: "12px", fontWeight: 500 }}
                >
                  {finished && `${finished.length} guests`}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {!finished || finished.length === 0 ? (
                  <>
                    <Box
                      sx={{
                        p: 4,
                        display: "grid",
                        placeItems: "center",
                        width: "100%",
                      }}
                    >
                      <Typography sx={{ textAlign: "center", color:'#fff' }}>
                        No Reservations Available
                      </Typography>
                    </Box>
                  </>
                ) : (
                  finished &&
                  finished.map((item, index) => (
                    <Grid item lg={3} md={3} key={index}>
                      <Card
                      finished
                        action={handleGetReservations}
                        borderColor="#4787E6"
                        data={item}
                      />
                    </Grid>
                  ))
                )}
              </Grid>
            </AccordionDetails>
          </Accordion>
         
          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
            sx={{ background: expanded === "panel4" ? "#1A1A1A" : "#333" }}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
              sx={{ border: "0.5px solid #fff" }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", columnGap: 2 }}>
                  <SquareIcon
                    sx={{ color: "#BC172F", width: "20px", height: "20px" }}
                  />
                  <Typography
                    sx={{ color: "#fff", fontWeight: 400, fontSize: "12px" }}
                  >
                    CANCELLED
                  </Typography>
                </Box>
                <Typography
                  sx={{ color: "#fff", fontSize: "12px", fontWeight: 500 }}
                >
                  {cancelled && `${cancelled.length} guests`}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {!cancelled || cancelled.length === 0 ? (
                  <>
                    <Box
                      sx={{
                        p: 4,
                        display: "grid",
                        placeItems: "center",
                        width: "100%",
                      }}
                    >
                      <Typography sx={{ textAlign: "center", color:'#fff' }}>
                        No Reservations Available
                      </Typography>
                    </Box>
                  </>
                ) : (
                  cancelled &&
                  cancelled.map((item, index) => (
                    <Grid item lg={3} md={3} key={index}>
                      <Card
                        action={handleGetReservations}
                        borderColor="#BC172F"
                        data={item}
                      />
                    </Grid>
                  ))
                )}
              </Grid>
            </AccordionDetails>
          </Accordion>
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
        <Box
          sx={{ border: "1px solid #fff", bgcolor: "#1a1a1a", borderRadius: 2 }}
        >
          <MenuItem sx={{ px: 2, py: 1.5, borderBottom: "1px solid #fff" }}>
            <SquareIcon sx={{ fontSize: "15px", mr: 1, color: "#E6BF47" }} />{" "}
            <Typography
              sx={{ color: "#fff", fontSize: "12px", fontWeight: 400 }}
            >
              Expected
            </Typography>
          </MenuItem>
          <MenuItem sx={{ px: 2, py: 1.5, borderBottom: "1px solid #fff" }}>
            <SquareIcon sx={{ fontSize: "15px", mr: 1, color: "#47E673" }} />{" "}
            <Typography
              sx={{ color: "#fff", fontSize: "12px", fontWeight: 400 }}
            >
              Sitted
            </Typography>
          </MenuItem>
          <MenuItem sx={{ px: 2, py: 1.5, borderBottom: "1px solid #fff" }}>
            <SquareIcon sx={{ fontSize: "15px", mr: 1, color: "#4787E6" }} />{" "}
            <Typography
              sx={{ color: "#fff", fontSize: "12px", fontWeight: 400 }}
            >
              Finished
            </Typography>
          </MenuItem>
          <MenuItem sx={{ px: 2, py: 1.5, borderBottom: "1px solid #fff" }}>
            <SquareIcon sx={{ fontSize: "15px", mr: 1, color: "#E6475E" }} />{" "}
            <Typography
              sx={{ color: "#fff", fontSize: "12px", fontWeight: 400 }}
            >
              Cancelled
            </Typography>
          </MenuItem>
        </Box>
      </Popover>
    </>
  );
};

export default ReservationManagement;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,

  bgcolor: "#1a1a1a",

  boxShadow: 24,
  p: 0,
};

const Card = ({ borderColor, data, action, finished }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isLoading, setIsLoading] = useState(false)

  const handleModifyReservation = async (status) =>{
    setIsLoading(true)
await changeBookingStatus(data?.BoookingId, status).then((res) =>{
  console.log(res)
  setIsLoading(false)
  action()
  setOpen(false)
}).catch((err)=>{
  setIsLoading(false)
  console.log(err)
})
  }
  return (
    <>
      {isLoading && <Loader />}
      <Box
        onClick={handleOpen}
        sx={{
          p: 1,
          border: `2px solid ${borderColor}`,
          borderRadius: 1,
          height: "150px",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          "&:hover": {
            bgcolor: "#333",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", columnGap: 2 }}>
            <SellIcon sx={{ color: "#fff", fontSize: "12px" }} />
            <Typography
              sx={{
                color: "#fff",
                fontWeight: 500,
                fontSize: "12px",
                lineHeight: "15px",
              }}
            >
              {data?.bookingUserDetails?.Name
                ? data?.bookingUserDetails?.Name
                : "No Name"}
            </Typography>
          </Box>
          <Box
            sx={{
              bgcolor: "rgba(223, 142, 20, 0.40)",
              px: 1,
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              columnGap: 1,
            }}
          >
            <img src={crown} />
            <Typography
              sx={{ color: "#fff", fontSize: "10px", lineHeight: "15px" }}
            >
              {data?.RestaurantName ? data?.RestaurantName : "--"}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", columnGap: 2 }}>
          <TourOutlinedIcon sx={{ color: "#565660", fontSize: "12px" }} />
          <Typography sx={{ color: "#fff", fontWeight: 400, fontSize: "12px" }}>
            {data?.TableName ? data?.TableName : "--"}
          </Typography>
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "center", columnGap: 2, mt: 1 }}
        >
          <Box sx={{ display: "flex", alignItems: "center", columnGap: 2 }}>
            <WidgetsOutlinedIcon sx={{ color: "#565660", fontSize: "12px" }} />
            <Typography
              sx={{ color: "#fff", fontWeight: 400, fontSize: "12px" }}
            >
              {`${data?.BookingTime} - ${data?.TimeCount}`}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", columnGap: 2 }}>
            <Person4OutlinedIcon sx={{ color: "#565660", fontSize: "12px" }} />
            <Typography
              sx={{ color: "#fff", fontWeight: 400, fontSize: "12px" }}
            >
              {data?.Guest ? data?.Guest : "--"}
            </Typography>
          </Box>
          <IconButton>
            <MoreHorizOutlinedIcon sx={{ color: "#fff" }} />
          </IconButton>
        </Box>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              p: 2,
              px: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: `1px solid ${borderColor}`,
            }}
          >
            <Typography sx={{ color: borderColor, fontWeight: 400 }}>
              Reservation
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseOutlined sx={{ color: "#fff" }} />
            </IconButton>
          </Box>
          <Box sx={{ py: 3, px: 4 }}>
            <Grid container spacing={2}>
              <Grid item lg={finished ? 12 : 8} md={finished ? 12 : 8}>
                <Box
                  sx={{
                    p: 2,
                    py: 1,
                    borderRadius: "10px 10px 0px 0px",
                    bgcolor: "#4d4d4d",
                    borderBottom: `1px solid ${borderColor}`,
                    display: "flex",
                    columnGap: 8,
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{ display: "flex", alignItems: "center", columnGap: 2 }}
                  >
                    <AccountCircleRoundedIcon
                      sx={{ color: "#D9D9D9", fontSize: "50px" }}
                    />
                    <Typography
                      sx={{ fontWeight: 400, color: "#fff", fontSize: "12px" }}
                    >
                      {data?.bookingUserDetails?.Name
                        ? data?.bookingUserDetails?.Name
                        : "No Name"}
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", alignItems: "center", columnGap: 2 }}
                  >
                    <Diversity1Icon sx={{ color: "#fff" }} />
                    <Typography
                      sx={{ fontWeight: 400, color: "#fff", fontSize: "12px" }}
                    >
                      {data?.Guest ? data?.Guest : "--"}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ bgcolor: "#333", py: 3, px: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item lg={6} md={6}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          columnGap: 2,
                        }}
                      >
                        <img src={img1} />{" "}
                        <Typography sx={{ color: "#fff", fontSize: "12px" }}>
                          {data?.RestaurantName ? data?.RestaurantName : "--"}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          columnGap: 2,
                        }}
                      >
                        <img src={img2} />{" "}
                        <Typography sx={{ color: "#fff", fontSize: "12px" }}>
                          {data?.BookingTime ? data?.BookingTime : "--"}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          columnGap: 2,
                        }}
                      >
                        <img src={img3} />{" "}
                        <Typography sx={{ color: "#fff", fontSize: "12px" }}>
                          {data?.bookingUserDetails?.PhoneNumber
                            ? data?.bookingUserDetails?.PhoneNumber
                            : "No Name"}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          columnGap: 2,
                        }}
                      >
                        <img src={img4} />{" "}
                        <Typography sx={{ color: "#fff", fontSize: "12px" }}>
                          {data?.BookingDate ? data?.BookingDate : "No Name"}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          columnGap: 2,
                        }}
                      >
                        <img src={img5} />{" "}
                        <Typography sx={{ color: "#fff", fontSize: "12px" }}>
                          {data?.bookingUserDetails?.Email
                            ? data?.bookingUserDetails?.Email
                            : "No Name"}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>

                <Box sx={{ mt: 5 }}>
                  <Grid container spacing={2}>
                    <Grid item lg={6} md={6}>
                      <Box
                        sx={{
                          border: "1px dashed #fff",
                          p: 1.5,
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            columnGap: 2,
                          }}
                        >
                          <img src={img1} />
                          <Typography
                            sx={{
                              color: "#fff",
                              fontWeight: 400,
                              fontSize: "12px",
                            }}
                          >
                            Visit Notes
                          </Typography>
                        </Box>
                        <Typography
                          sx={{
                            cursor: "pointer",
                            color: "#fff",
                            fontWeight: 400,
                            fontSize: "12px",
                            textDecoration: "underline",
                          }}
                        >
                          view
                        </Typography>
                      </Box>
                    </Grid>

                    {/* <Grid item lg={6}>
                      <Box
                        sx={{
                          border: "1px dashed #fff",
                          p: 1.5,
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            columnGap: 2,
                          }}
                        >
                          <img src={img2} />
                          <Typography
                            sx={{
                              color: "#fff",
                              fontWeight: 400,
                              fontSize: "12px",
                            }}
                          >
                            Guest diary restrictions
                          </Typography>
                        </Box>
                        <Typography
                          sx={{
                            cursor: "pointer",
                            color: "#fff",
                            fontWeight: 400,
                            fontSize: "12px",
                            textDecoration: "underline",
                          }}
                        >
                          Add
                        </Typography>
                      </Box>
                    </Grid> */}
                    <Grid item lg={6} md={6}>
                      <Box
                        sx={{
                          border: "1px dashed #fff",
                          p: 1.5,
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            columnGap: 2,
                          }}
                        >
                          <img src={img5} />
                          <Typography
                            sx={{
                              color: "#fff",
                              fontWeight: 400,
                              fontSize: "12px",
                            }}
                          >
                            Dietary Restrictions
                          </Typography>
                        </Box>
                        <Typography
                          sx={{
                            cursor: "pointer",
                            color: "#fff",
                            fontWeight: 400,
                            fontSize: "12px",
                            textDecoration: "underline",
                          }}
                        >
                          view
                        </Typography>
                      </Box>
                    </Grid>
                    {/* <Grid item lg={6}>
                      <Box
                        sx={{
                          border: "1px dashed #fff",
                          p: 1.5,
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            columnGap: 2,
                          }}
                        >
                          <img src={img3} />
                          <Typography
                            sx={{
                              color: "#fff",
                              fontWeight: 400,
                              fontSize: "12px",
                            }}
                          >
                            Food & drink preference
                          </Typography>
                        </Box>
                        <Typography
                          sx={{
                            cursor: "pointer",
                            color: "#fff",
                            fontWeight: 400,
                            fontSize: "12px",
                            textDecoration: "underline",
                          }}
                        >
                          Add
                        </Typography>
                      </Box>
                    </Grid> */}
                  </Grid>
                </Box>
              </Grid>
              {!finished && (
                <Grid item lg={4} md={4}>
                  <Box
                    sx={{
                      p: 2,
                      py: 1,
                      borderRadius: "10px 10px 0px 0px",
                      bgcolor: "#4d4d4d",
                      borderBottom: `1px solid ${borderColor}`,
                      display: "flex",
                      columnGap: 8,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 400,
                        color: "#fff",
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                    >
                      Modify Reservation
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: "#333",
                      borderRadius: "0px 0px 10px 10px",
                    }}
                  >
                    <Button
                      disabled
                      variant="outlined"
                      sx={{
                        color: "#fff",
                        borderRadius: 2,
                        border: "1px solid #fff",
                        fontWeight: 400,
                        fontSize: "12px",
                      }}
                      fullWidth
                      size="large"
                      startIcon={
                        <DriveFileRenameOutlineIcon sx={{ fontSize: "12px" }} />
                      }
                    >
                      Edit Reservation
                    </Button>
                    <Button
                      variant="outlined"
                      disabled
                      sx={{
                        color: "#fff",
                        mt: 2,
                        borderRadius: 2,
                        border: "1px solid #fff",
                        fontWeight: 400,
                      }}
                      fullWidth
                      size="large"
                      startIcon={
                        <ForumOutlinedIcon sx={{ fontSize: "12px" }} />
                      }
                    >
                      Message
                    </Button>

                    <Button
                      onClick={() => handleModifyReservation("Cancelled")}
                      variant="outlined"
                      sx={{
                        color: "#E6475E",
                        mt: 2,
                        borderRadius: 2,
                        border: "1px solid #E6475E",
                        fontWeight: 400,
                        fontSize: "12px",
                      }}
                      fullWidth
                      size="large"
                      startIcon={
                        <HighlightOffOutlinedIcon
                          sx={{ color: "#E6475E", fontSize: "12px" }}
                        />
                      }
                    >
                      Cancel Reservation
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        color: "#E6475E",
                        mt: 2,
                        borderRadius: 2,
                        border: "1px solid #E6475E",
                        fontWeight: 400,
                        fontSize: "12px",
                      }}
                      fullWidth
                      size="large"
                      startIcon={
                        <VisibilityOffOutlinedIcon
                          sx={{ color: "#E6475E", fontSize: "12px" }}
                        />
                      }
                    >
                      Mark as no show
                    </Button>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Box>
          <Box
            sx={{
              px: 4,
              py: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "1px solid #fff",
              bgcolor: "#333",
            }}
          >
            <Box>
              {/* <Button
                variant="outlined"
                sx={{
                  color: "#fff",
                  mr: 2,
                  borderRadius: 2,
                  border: "1px solid #fff",
                  fontWeight: 400,
                }}
                size="large"
                startIcon={<CompareArrowsOutlinedIcon />}
              >
                Move
              </Button> */}
              {/* <Button
                variant="outlined"
                sx={{
                  color: "#fff",
                  mr: 2,
                  borderRadius: 2,
                  border: "1px solid #fff",
                  fontWeight: 400,
                }}
                size="large"
                startIcon={<CompareArrowsOutlinedIcon />}
              >
                Table s14
              </Button> */}
              {!finished && (
                <Button
                  onClick={() => handleModifyReservation("Sitted")}
                  variant="outlined"
                  sx={{
                    color: "#fff",
                    mr: 2,
                    borderRadius: 2,
                    border: "1px solid #fff",
                    fontWeight: 400,
                    fontSize: "12px",
                  }}
                  size="large"
                  startIcon={
                    <AirlineSeatReclineExtraIcon sx={{ fontSize: "12px" }} />
                  }
                >
                  Seated
                </Button>
              )}
            </Box>
            {!finished && (
              <Button
                onClick={() => handleModifyReservation("Finished")}
                variant="contained"
                sx={{
                  // color: "#2b2b2b",
                  borderRadius: 2,
                  // bgcolor: "#4787E6",
                  fontWeight: 400,
                }}
                size="large"
              >
                Finished
              </Button>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
};
