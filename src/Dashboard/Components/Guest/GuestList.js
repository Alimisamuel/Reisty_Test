import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React, { useState } from "react";
import calender from '../../../assets/Icons/calendar.svg'
import SearchIcon from "@mui/icons-material/Search";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";

const GuestList = ({ data }) => {
  const [selected, setSelected] = useState(null)
  const [outletData, setOutletData] = useState(null)
    const [alignment, setAlignment] = React.useState("left");

    const handleAlignment = (event, newAlignment) => {
      setAlignment(newAlignment);
    };

const handleSelect = (index, data) =>{
  console.log(selected, outletData)
  setSelected(index)
  setOutletData(data)
}
  return (
    <>
      <Grid container>
        <Grid
          item
          lg={3}
          md={4}
          sx={{ }}
        >
          <Box
            sx={{ p: 2, bgcolor: "#1a1a1a", borderBottom: "0.5px solid #fff" }}
          >
            <TextField
              fullWidth
              placeholder="Search contact, email or phone no"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#333" }} />
                  </InputAdornment>
                ),
                style: {
                  fontFamily: "Gordita",
                  fontSize: "13px",
                  borderRadius: "10px",
                  offset: " 1px solid #ccc",
                  color: "#333",
                  border: "1px solid #ccc",
                  background: "#fff",

                  // Replace with your desired font family
                },
              }}
            />
          </Box>
          <Box sx={{ bgcolor: "#1a1a1a", p: 2 }}>
            <Typography sx={{ color: "#fff", fontSize: "12px" }}>
              Recently update guests
            </Typography>
          </Box>
          <Box>
            <List sx={{ mt: 1 }}>
              {data &&
                data.map((item, index) => (
                  <ListItemButton
                    selected={index === selected}
                    key={index}
                    onClick={() => handleSelect(index, item)}
                    sx={{
                      "&.Mui-selected": { background: "#1a1a1a" },
                      cursor: "pointer",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        // justifyContent: "space-between",
                        columnGap: 3,
                      }}
                    >
                      <Avatar
                        sx={{ width: "50px", height: "50px" }}
                      >{`${item.FirstName?.charAt(0)}${item.LastName?.charAt(
                        0
                      )}`}</Avatar>
                      <Box>
                        <Typography sx={{ color: "#fff", fontSize: "12px", fontWeight:500 }}>
                          {`${item?.FirstName} ${item?.LastName}`}
                        </Typography>
                        <Typography
                          sx={{
                            color: "#fff",
                            fontSize: "10px",
                            fontWeight: 400,
                            mt: -0.5,
                          }}
                        >
                          {item?.EmailAddress}
                        </Typography>
                        <Typography
                          sx={{
                            color: "#fff",
                            fontSize: "10px",
                            fontWeight: 300,
                            mt: -0.8,
                          }}
                        >
                          {item?.PhoneNumber}
                        </Typography>
                      </Box>
                    </Box>
                  </ListItemButton>
                ))}
            </List>
          </Box>
        </Grid>
        <Grid item lg={9} md={8} sx={{ height: "90vh" }}>
          {!outletData ? (
            <>
              <Box
                sx={{ height: "90vh", display: "grid", placeItems: "center" }}
              >
                <Typography sx={{ color: "#fff" }}>
                  No guest selected{" "}
                </Typography>
              </Box>
            </>
          ) : (
            <>
              <Box sx={{   borderLeft: "0.5px solid #fff", height:'100vh'}}>
                <Box
                  sx={{
                    px: 2,
                    py:2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "0.3px solid #fff",
                  }}
                >
                  <Typography
                    sx={{ color: "#fff", fontWeight:500 }}
                  >{`${outletData?.FirstName} ${outletData?.LastName}`}</Typography>
                  <ToggleButtonGroup
                    value={alignment}
                    exclusive
                    onChange={handleAlignment}
                    aria-label="text alignment"
                  >
                    {/* <ToggleButton
                      value="left"
                      aria-label="left aligned"
                      sx={{ py: 2 }}
                    >
                      <EventNoteOutlinedIcon sx={{ color: "#fff" }} />
                    </ToggleButton>
                    <ToggleButton value="center" aria-label="centered">
                      <AccountCircleOutlinedIcon sx={{ color: "#fff" }} />
                    </ToggleButton>
                    <ToggleButton value="right" aria-label="right aligned">
                      <AccessTimeIcon sx={{ color: "#fff" }} />
                    </ToggleButton> */}
                  </ToggleButtonGroup>
                </Box>
                <Box sx={{ mt: 10, px: 2,  }}>
                  <Typography sx={{ color: "#fff", fontWeight:500 }}>
                    Contact Information
                  </Typography>
                  <Box
                    sx={{
                      mt: 2,
                      bgcolor: "#1a1a1a",
                      borderRadius: 2,
                      px: 0,
                      py: 4,
                    }}
                  >
                    <Grid
                      container
                      sx={{ borderBottom: "0.5px solid #fff", px: 3, py: 2 }}
                    >
                      <Grid item lg={6}>
                        <Typography sx={{ color: "#fff", fontSize: "12px" }}>
                          First Name
                        </Typography>
                      </Grid>
                      <Grid item lg={6}>
                        <Typography
                          sx={{ color: "#fff", fontSize: "12px" }}
                        >{`${outletData?.FirstName} `}</Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      sx={{ borderBottom: "0.5px solid #fff", px: 3, py: 2 }}
                    >
                      <Grid item lg={6}>
                        <Typography sx={{ color: "#fff", fontSize: "12px" }}>
                          Last Name
                        </Typography>
                      </Grid>
                      <Grid item lg={6}>
                        <Typography
                          sx={{ color: "#fff", fontSize: "12px" }}
                        >{`${outletData?.LastName}`}</Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      sx={{ borderBottom: "0.5px solid #fff", px: 3, py: 2 }}
                    >
                      <Grid item lg={6}>
                        <Typography sx={{ color: "#fff", fontSize: "12px" }}>
                          Phone Number
                        </Typography>
                      </Grid>
                      <Grid item lg={6}>
                        <Typography
                          sx={{ color: "#fff", fontSize: "12px" }}
                        >{`${outletData?.PhoneNumber}`}</Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      sx={{ borderBottom: "0.5px solid #fff", px: 3, py: 2 }}
                    >
                      <Grid item lg={6}>
                        <Typography sx={{ color: "#fff", fontSize: "12px" }}>
                          Email Address
                        </Typography>
                      </Grid>
                      <Grid item lg={6}>
                        <Typography
                          sx={{ color: "#fff", fontSize: "12px" }}
                        >{`${outletData?.EmailAddress}`}</Typography>
                      </Grid>
                    </Grid>
                    
                  </Box>
                </Box>
                <Box sx={{ mt: 5, px: 2 }}>
                  <Typography sx={{ color: "#fff", fontWeight:500 }}>Notable Dates</Typography>
                  <Box
                    sx={{
                      mt: 2,
                      bgcolor: "#1a1a1a",
                      borderRadius: 2,
                      px: 0,
                      py: 4,
                    }}
                  >
                    <Grid
                      container
                      sx={{ borderBottom: "0.5px solid #fff", px: 3, py: 2 }}
                    >
                      <Grid item lg={6}>
                        <Typography sx={{ color: "#fff", fontSize: "12px" }}>
                          Birthday
                        </Typography>
                      </Grid>
                      <Grid item lg={6}>
                        <Typography
                          sx={{ color: "#fff", fontSize: "12px" }}
                        >{`${outletData?.Birthday}`}</Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      sx={{ borderBottom: "0.5px solid #fff", px: 3, py: 2 }}
                    >
                      <Grid item lg={6}>
                        <Typography sx={{ color: "#fff", fontSize: "12px" }}>
                      Anniversary
                        </Typography>
                      </Grid>
                      <Grid item lg={6}>
                        <Typography
                          sx={{ color: "#fff", fontSize: "12px" }}
                        >{`${outletData?.WeddingAnniversary}`}</Typography>
                      </Grid>
                    </Grid>
       
                  </Box>
                </Box>
              </Box>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default GuestList;
