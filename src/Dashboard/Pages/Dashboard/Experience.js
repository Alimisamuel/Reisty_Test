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
  Divider,
} from "@mui/material";
import { Helmet } from "react-helmet";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";

import CreateExperience from "../../Components/Experience/CreateExperience";
import { deleteEvent, getEvent } from "../../../axios/api";
import Loader from "../../Components/Common/Loader";
import { useSnackbar } from "notistack";
import emptyRes from "../../../assets/emptyRes.svg";
import deleteIcon from "../../../assets/Icons/delete.svg";
import { Link } from "react-router-dom";
import { PiShareFat } from "react-icons/pi";
import { ImWhatsapp } from "react-icons/im";
import { RiTwitterXFill } from "react-icons/ri";
import { LiaCopy } from "react-icons/lia";
import CustomTextField from "../../Components/CustomField/CustomTextField";
import { FiFacebook } from "react-icons/fi";
import { MdOutlineDone } from "react-icons/md";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  borderRadius: "5px",
  boxShadow: 24,
  bgcolor: "#1a1a1a",

  pb: 3,
};

const Experience = () => {
  const selectedRestaurant = localStorage.getItem("restaurantID");
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [copied, setCopied] = useState(false)
  const handleOpen = (id, name) => {
    setEventId(id);
    setName(name);
    setOpen(true);
  };
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = (name) =>{
    setOpen2(true);
    setName(name);
  }
  const handleClose = () => setOpen(false);
  const [eventId, setEventId] = useState("");

  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };

  const handleGetEvents = async () => {
    setLoading(true);
    await getEvent()
      .then((res) => {
        console.log(res);
        setLoading(false);
        if (res.data.status) {
          setData(res?.data?.result);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        handleAlert("error", `${err.message} `);
      });
  };

  const handleDelete = async () => {
    setLoading(true);
    await deleteEvent(eventId)
      .then((res) => {
        console.log(res);
        setLoading(false);
        if (res.data.status) {
          handleAlert("success", `${name} Event, deleted successfully`);
          setOpen(false);
          handleGetEvents();
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        handleAlert("error", `${err.message} `);
      });
  };

  useEffect(() => {
    handleGetEvents();
  }, []);

  const url_event = `https://ticket.reisty.com/${name?.split(' ').join('-')}/${selectedRestaurant}`

  const handleCopy = () =>{
    navigator.clipboard.writeText(url_event)
    .then((res)=>{
setCopied(true)
    }).catch((err)=>{
      console.log(err)
    })
  }

  useEffect(()=>{
if(copied){
  setTimeout(()=>{
setCopied(false)
  }, 2000)
}
  },[copied])

  const shareOnWhatsApp = () => {
    const message = `Check out our latest event: ${name} ${url_event}`;
    const url = `whatsapp://send?text=${encodeURIComponent(message)}`;
    window.open(url);

  };
  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url_event
    )}`;
    window.open(url, "_blank");
  };

  const shareOnTwitter = () => {
    const tweetText = encodeURIComponent(
      `Check out our latest event: ${name} ${url_event}`
    );
    const url = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(url, "_blank");
  };
  return (
    <>
      {loading && <Loader />}
      <Helmet> </Helmet>
      <Box
        sx={{
          bgcolor: "#1a1a1a",
          p: 2,
          borderBottom: "1px solid #fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ color: "#fff", fontWeight: 500 }}>
          {" "}
          Experience
        </Typography>
        <CreateExperience action={handleGetEvents} />
      </Box>
      <Box
        sx={{
          margin: "0 auto",
          width: "95%",
          height: "80vh",
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
              Restaurant Experience
            </Typography>
          </Box>
          <Box></Box>
        </Box>
        {!data || data.length === 0 ? (
          <>
            <Box
              sx={{
                height: "40vh",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                mt: 5,
              }}
            >
              <img src={emptyRes} />
              <Typography sx={{ mt: 5, color: "#fff", fontWeight: 500 }}>
                No Events Available
              </Typography>
            </Box>
          </>
        ) : (
          <>
            <Grid container spacing={2}>
              {data.map((item, index) => (
                <Grid item md={4} key={index}>
               
                  <Box
                    sx={{
                      width: "100%",
                      // height: "300px",
                      bgcolor: "#1a1a1a",
                      p: 1,
                      pb: 0,
                      overflow: "hidden",
                      cursor: "pointer",
                      transition: "0.2s all linear",
                      "&:hover": {
                        border: "1px solid #BC172F",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        height: "150px",
                        backgroundImage: `url('${item?.EventImage}')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        p: 2,
                      }}
                    >
                      <Box
                        align="center"
                        sx={{
                          bgcolor: "#1a1a1ab7",
                          width: "fit-content",
                          p: 1,
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 900,
                            color: "#fff",
                            fontSize: "20px",
                          }}
                        >
                          {new Date(item?.EventDate).getDate()}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "12px",
                            fontWeight: 500,
                            color: "#fff",
                          }}
                        >
                          {new Date(item?.EventDate).toLocaleString("default", {
                            month: "short",
                          })}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ p: 1, mt: 0 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 700,
                            color: "#fff",
                            fontSize: "17px",
                          }}
                        >
                          {item?.EventName}
                        </Typography>
                        <Box>
                          <Typography sx={{ color: "#ccc", fontSize: "11px" }}>
                            Time
                          </Typography>
                          <Typography
                            sx={{
                              color: "#fff",
                              fontWeight: 600,
                              fontSize: "14px",
                              mt: -1,
                            }}
                          >
                            {item?.EventTime}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ mt: 0, height: "32px" }}>
                        {item?.Description.length > 105 ? (
                          <Typography
                            sx={{
                              color: "#fff",
                              fontSize: "10px",
                              lineHeight: "15px",
                            }}
                          >
                            {item?.Description.slice(0, 105)}...
                          </Typography>
                        ) : (
                          <Typography
                            sx={{
                              color: "#fff",
                              fontSize: "10px",
                              lineHeight: "15px",
                            }}
                          >
                            {item?.Description}
                          </Typography>
                        )}
                      </Box>
                      <Box
                        sx={{
                          borderTop: "0.2px solid #ccc",
                          mt: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          pt: 2,
                        }}
                      >
                        <Link to={`/dashboard/experience/tickets/${item?.EventName}/${item?.EventId}`}>
                        <Button variant="contained">Ticket</Button></Link>
                        <Box sx={{}}>
                          <IconButton onClick={()=>handleOpen2(item?.EventName)}>
                          <PiShareFat style={{color:'#fff'}} />
                          </IconButton>

                        <IconButton onClick={()=>handleOpen(item?.EventId, item?.EventName)}>
                          <img src={deleteIcon} />
                        </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  
                </Grid>
              ))}
            </Grid>
          </>
        )}
        {/* <Button variant="contained" sx={{ mt: 3 }}>
          Add New
        </Button> */}
      </Box>

      {/* Modal for Name, contact and price */}
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
              px: 3,
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              bgcolor: "#333",
            }}
          >
            <Typography
              sx={{ color: "#fff", fontWeight: 400, fontSize: "14px" }}
            >
              Are you sure you want to delete <b>"{name}"</b>{" "}
            </Typography>
          </Box>

          <Box
            sx={{
              p: 4,
              px: 7,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button variant="outlined" onClick={handleClose}>
              No
            </Button>
            <Button variant="contained" onClick={handleDelete}>
              Yes
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={open2}
        onClose={()=>setOpen2(!open2)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              p: 1,
              px: 3,
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              bgcolor: "#333",
            }}
          >
            <Typography
              sx={{ color: "#fff", fontWeight: 400, fontSize: "14px" }}
            >
             Share
            </Typography>
            <IconButton onClick={()=>setOpen2(!open2)}>
              <CloseIcon sx={{color:'#fff'}}/>
            </IconButton>
          </Box>
<Box sx={{display:'flex', alignItems:'center',justifyContent:'space-between',py:3, px:8}}>
<IconButton onClick={shareOnWhatsApp}>
<ImWhatsapp style={{color:'#fff', fontSize:'40px'}} />
</IconButton>
<IconButton onClick={shareOnTwitter}>
<RiTwitterXFill style={{color:'#fff', fontSize:'40px'}} />
</IconButton>
<IconButton onClick={shareOnFacebook}>
<FiFacebook style={{color:'#fff', fontSize:'40px'}} />
</IconButton>
</Box>

<Box sx={{px:2, display:'flex'}}>
  <CustomTextField value={url_event}/>
  {
    copied ? (
      <IconButton>
       <MdOutlineDone style={{color:'#56b85c'}} /> 
      </IconButton>
    ):(
      <IconButton onClick={handleCopy}>
  <LiaCopy style={{color:'#fff'}} />
  </IconButton>
    )
  }
</Box>
        </Box>
      </Modal>
    </>
  );
};

export default Experience;
