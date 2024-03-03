import {
  Box,
  Grid,
  Typography,
  Popover,
  Button,
  TextField,
  MenuItem,
  InputAdornment,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import React, { useState } from "react";
import tag from "../../../assets/Icons/table/filled/tag.svg";
import clock from "../../../assets/Icons/table/filled/clock.svg";
import flag from "../../../assets/Icons/table/filled/flag.svg";
import calendarIcon from "../../../assets/Icons/calendar-tick.svg";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Reservation from "./Reservation";
import Calender from "../../Components/Common/Calender";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { format, parseISO } from "date-fns";
import Statistics from "./Statistics";
import emptyIcon from "../../../assets/emptyRes.svg";
import searchIcon from "../../../assets/Icons/search.svg";
import Analytics from "./Chart/Analytics";
import dataSet from "./Chart/data";
import ReGraph from "./Chart/ReGraph";
import DropdownSelector from "./Chart/DropdownSelector";

const GeneralOverview = ({ data, handleFilter }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dateObject = new Date();
  const toDate = dateObject.toISOString().split("T")[0];
  const [value, setValue] = React.useState(toDate);
  const [isLoading, setIsLoading] = useState(false);

  const parsedDate = parseISO(value);
  const formattedDate1 = format(parsedDate, "EEEE, MMMM d");
  const date = new Date();
  const formatDate = () => {
    const options = { weekday: "long", month: "long", day: "numeric" };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [data2, setData2] = useState(dataSet.Today);

  const fetchCustomData = (key) => {
    setData2(dataSet[key]);
  };
  return (
    <>
      <Box>
        <Grid container spacing={2}>
          <Grid item md={4}>
            <Box
              sx={{
                bgcolor: "#1a1a1a",
                p: 3,
                borderRadius: "10px",
                height: "135px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxSizing: "border-box",
              }}
            >
              <Box>
                <Typography
                  sx={{ color: "#fff", fontSize: "14px", fontWeight: 400 }}
                >
                  No of reservations
                </Typography>
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: "28px",
                    fontWeight: 500,
                    mt: 1,
                  }}
                >
                  240
                </Typography>
              </Box>
              <Typography sx={{ color: "#189B62", fontSize: "12px" }}>
                +24%
              </Typography>
            </Box>
          </Grid>
          <Grid item md={4}>
            <Box
              sx={{
                bgcolor: "#1a1a1a",
                p: 3,
                borderRadius: "10px",
                height: "135px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxSizing: "border-box",
              }}
            >
              <Box>
                <Typography
                  sx={{ color: "#fff", fontSize: "14px", fontWeight: 400 }}
                >
                  No of walk-ins
                </Typography>
                <Typography
                  sx={{
                    color: "#fff",
                    fontSize: "28px",
                    fontWeight: 500,
                    mt: 1,
                  }}
                >
                  240
                </Typography>
              </Box>
              <Typography sx={{ color: "#189B62", fontSize: "12px" }}>
                +24%
              </Typography>
            </Box>
          </Grid>
          <Grid item md={4}>
            <Box
              sx={{
                bgcolor: "#BC172F",
                p: 3,
                borderRadius: "10px",
                height: "135px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxSizing: "border-box",
              }}
            >
              <Box>
                <Typography
                  sx={{ color: "#fff", fontSize: "14px", fontWeight: 500 }}
                >
                  Upcoming Reservations
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <Box sx={{ display: "flex", columnGap: 2, mt: 1 }}>
                    <img src={tag} />
                    <Typography
                      sx={{ color: "#fff", fontSize: "12px", fontWeight: 500 }}
                    >
                      Michael, Nelson
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", columnGap: 2, mt: 1 }}>
                    <img src={flag} />
                    <Typography
                      sx={{ color: "#fff", fontSize: "12px", fontWeight: 500 }}
                    >
                      Table 5
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", columnGap: 2, mt: 1 }}>
                    <img src={clock} />
                    <Typography
                      sx={{ color: "#fff", fontSize: "12px", fontWeight: 500 }}
                    >
                      12.00 PM -30 mins
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item md={12}>
            <Box sx={{ p: 3, bgcolor: "#1a1a1a", borderRadius: "10px" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Typography sx={{ color: "#fff" }}>
                  Reservations & Walk-ins Overview
                </Typography>
                <DropdownSelector fetchCustomData={fetchCustomData} />
              </Box>
              <Box sx={{ mt: 2 }}>
                <ReGraph data={data2} />
              </Box>
            </Box>
          </Grid>

          <Grid item lg={8} md={8} sm={12} xs={12}>
            <Box
              sx={{
                bgcolor: "#1a1a1a",
                height: "400px",
                borderRadius: "10px",
              }}
            >
              <Box sx={{ p: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ color: "#fff" }}>Reservations</Typography>
                  <Box
                    sx={{
                      bgcolor: "#1A1A1A",
                      cursor: "pointer",
                      px: 1.5,
                      pt: 0.8,
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      border: "1px solid #fff",
                    }}
                    onClick={handleClick}
                  >
                    <Box>
                      <img src={calendarIcon} alt="calendar" width="100%" />
                    </Box>
                    <Typography
                      sx={{ color: "#fff", display: "flex", fontSize: "12px" }}
                    >
                      {formattedDate1}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", columnGap: 5 }}>
                  <Box
                    sx={{
                      width: "50%",
                      height: "300px",
                    }}
                  >
                    <Reservation Rdata={data} />
                  </Box>
                  <Box sx={{ mt: 5, width: "40%" }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography sx={{ color: "#fff", fontWeight: 400 }}>
                        Status
                      </Typography>
                      <Typography sx={{ color: "#fff", fontWeight: 400 }}>
                        Cover
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          columnGap: 1,
                        }}
                      >
                        <FiberManualRecordIcon sx={{ color: "#00FF47" }} />
                        <Typography sx={{ color: "#fff", fontSize: "11px" }}>
                          Seated
                        </Typography>
                      </Box>
                      <Typography
                        sx={{ color: "#fff", fontSize: "11px", mt: 0.5 }}
                      >
                        {data?.TotalSitted}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          columnGap: 1,
                        }}
                      >
                        <FiberManualRecordIcon sx={{ color: "#FFC000" }} />
                        <Typography sx={{ color: "#fff", fontSize: "11px" }}>
                          Expected
                        </Typography>
                      </Box>
                      <Typography
                        sx={{ color: "#fff", fontSize: "11px", mt: 0.5 }}
                      >
                        {data?.TotalExpected}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          columnGap: 1,
                        }}
                      >
                        <FiberManualRecordIcon sx={{ color: "#06F" }} />
                        <Typography sx={{ color: "#fff", fontSize: "11px" }}>
                          Finished
                        </Typography>
                      </Box>
                      <Typography
                        sx={{ color: "#fff", fontSize: "11px", mt: 0.5 }}
                      >
                        {data?.TotalFinished}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          columnGap: 1,
                        }}
                      >
                        <FiberManualRecordIcon sx={{ color: "#FF0025" }} />
                        <Typography sx={{ color: "#fff", fontSize: "11px" }}>
                          Cancelled
                        </Typography>
                      </Box>
                      <Typography
                        sx={{ color: "#fff", fontSize: "11px", mt: 0.5 }}
                      >
                        {data?.TotalCancelled}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{ color: "#fff", mt: 4, fontSize: "13px" }}
                      >
                        Total
                      </Typography>
                      <Typography
                        sx={{ color: "#fff", mt: 4, fontSize: "13px" }}
                      >
                        {data?.TotalCancelled +
                          data?.TotalFinished +
                          data?.TotalExpected +
                          data?.TotalSitted}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12} sx={{}}>
            <Box
              sx={{
                bgcolor: "#1a1a1a",
                height: "400px",
                borderRadius: "10px",
              }}
            >
              <Box sx={{ p: 2 }}>
                <Typography sx={{ color: "#fff" }}>Statistics</Typography>
                <Box
                  sx={{
                    width: "100%",
                    height: "300px",
                    display: "grid",
                    placeItems: "center",
                    // border:'1px solid red'
                  }}
                >
                  <Statistics data={data} />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    columnGap: 3,
                    mt: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      columnGap: 1,
                    }}
                  >
                    <FiberManualRecordIcon sx={{ color: "#FF0025" }} />
                    <Typography sx={{ color: "#fff", fontSize: "10px" }}>
                      {data?.TotalOnline} Booked Online
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      columnGap: 1,
                    }}
                  >
                    <FiberManualRecordIcon sx={{ color: "#fff" }} />
                    <Typography sx={{ color: "#fff", fontSize: "10px" }}>
                      {data?.TotalWalkIn} Walk-ins
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item md={12}>
            <Box
              sx={{
                bgcolor: "#1a1a1a",
                borderRadius: "10px",
                p: 3,
                boxSizing: "border-box",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{ color: "#fff", fontWeight: 500, fontSize: "14px" }}
                >
                  Experiences Overview
                </Typography>
                <Box
                  sx={{ display: "flex", alignItems: "center", columnGap: 2 }}
                >
                  <TextField
                    size="small"
                    sx={{ width: "300px" }}
                    placeholder="Search experiences"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment>
                          <img
                            src={searchIcon}
                            style={{ marginRight: "8px" }}
                          />
                        </InputAdornment>
                      ),
                      style: {
                        borderRadius: "8px",
                        fontFamily: "gordita",
                        fontSize: "12px",
                      },
                    }}
                  />
                  {/* <TextField select placeholder="Samm">
                    <MenuItem>Sammuek</MenuItem>
                    <MenuItem>Sammuek</MenuItem>
                    <MenuItem>Sammuek</MenuItem>
                    <MenuItem>Sammuek</MenuItem>
                  </TextField> */}
                </Box>
              </Box>
              <Table sx={{ mt: 2 }}>
                <TableHead sx={{ bgcolor: "#262626", borderRadius: "5px" }}>
                  <TableRow>
                    <TableCell sx={{ color: "#ccc" }}>Date</TableCell>
                    <TableCell>Name of experience</TableCell>
                    <TableCell>No of Tickets sold</TableCell>
                    <TableCell>Amount Made</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{ bgcolor: "#333" }}>
                    <TableCell sx={{color:'#ccc', fontSize:'12px'}}>4/12/2023</TableCell>
                    <TableCell  sx={{color:'#ccc', fontSize:'12px'}}>Bistro at the Theatre</TableCell>
                    <TableCell  sx={{color:'#ccc', fontSize:'12px'}}>200</TableCell>
                    <TableCell  sx={{color:'#ccc', fontSize:'12px'}}>₦1,154,400</TableCell>
                  </TableRow>
                  <TableRow sx={{ bgcolor: "#333" }}>
                   <TableCell sx={{color:'#ccc', fontSize:'12px'}}>4/12/2023</TableCell>
                    <TableCell  sx={{color:'#ccc', fontSize:'12px'}}>Bistro at the Theatre</TableCell>
                    <TableCell  sx={{color:'#ccc', fontSize:'12px'}}>200</TableCell>
                    <TableCell  sx={{color:'#ccc', fontSize:'12px'}}>₦1,154,400</TableCell>
                  </TableRow>
                  <TableRow sx={{ bgcolor: "#333" }}>
                  <TableCell sx={{color:'#ccc', fontSize:'12px'}}>4/12/2023</TableCell>
                    <TableCell  sx={{color:'#ccc', fontSize:'12px'}}>Bistro at the Theatre</TableCell>
                    <TableCell  sx={{color:'#ccc', fontSize:'12px'}}>200</TableCell>
                    <TableCell  sx={{color:'#ccc', fontSize:'12px'}}>₦1,154,400</TableCell>
                  </TableRow>
                  <TableRow sx={{ bgcolor: "#333" }}>
                  <TableCell sx={{color:'#ccc', fontSize:'12px'}}>4/12/2023</TableCell>
                    <TableCell  sx={{color:'#ccc', fontSize:'12px'}}>Bistro at the Theatre</TableCell>
                    <TableCell  sx={{color:'#ccc', fontSize:'12px'}}>200</TableCell>
                    <TableCell  sx={{color:'#ccc', fontSize:'12px'}}>₦1,154,400</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Grid>
        </Grid>
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
    </>
  );
};

export default GeneralOverview;
