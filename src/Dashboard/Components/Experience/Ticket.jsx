import { Box, Grid, Typography, Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateTicket from "./CreateTicket";
import { deleteTicket, getAllTickets } from "../../../axios/api";
import emptyImg from "../../../assets/emptyRes.svg";
import Loader from "../Common/Loader";
import { Link } from "react-router-dom";
import { RiEditBoxLine } from "react-icons/ri";
import { TbTicketOff } from "react-icons/tb";
import { useSnackbar } from "notistack";
import EditTicket from "./EditTicket";

const Ticket = () => {
    const { enqueueSnackbar } = useSnackbar();
  const { id, name } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };

  const handleGetTickets = async () => {
    setLoading(true);
    await getAllTickets(id)
      .then((res) => {
        setLoading(false);
        setData(res?.data?.result);
        console.log(res?.data?.result[0]?.Tickets);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    handleGetTickets();
  }, []);


  const handleDelete = async (TicketId) => {
    setLoading(true);
    await deleteTicket(TicketId)
      .then((res) => {
        console.log(res);
        setLoading(false);
        if (res.data.status) {
          handleAlert("success", ` Ticket, deleted successfully`);
        
          handleGetTickets();

        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        handleAlert("error", `${err.message} `);
      });
  };

  return (
    <>
      {loading && <Loader />}
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
          {name} - Ticket List
        </Typography>
        <CreateTicket action={handleGetTickets} id={id} />
      </Box>

      <Box sx={{ p: 2 }}>
        <Link to="/dashboard/experience">
          <Button>Back</Button>
        </Link>
      </Box>

      <Box sx={{ mt: 3, p: 2 }}>
        {!data || data[0].Tickets?.length === 0 ? (
          <>
            <Box
              sx={{
                width: "100%",
                height: "400px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection:'column'
              }}
            >
              <img src={emptyImg} />
              <Typography sx={{mt:2, color:'#fff', fontWeight:600}}>No Ticket Available</Typography>
            </Box>
          </>
        ) : (
          <>
            <Grid container spacing={2}>
              {data[0].Tickets?.map((item, index) => (
                <Grid item md={4}>
                  <Box
                    sx={{
                      bgcolor: "#1a1a1a",
                      p: 1,
                      background: `url('${data[0]?.EventImage}')`,
                      backgroundSize: "cover",
                    }}
                  >
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: "#1a1a1a",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#fff",
                          fontWeight: 500,
                          textAlign: "left",
                        }}
                      >
                        {item?.TicketName}
                      </Typography>
                      <Box>
                      
                        <EditTicket action={handleGetTickets} data={item} id={item?.TicketId}/>
                        <IconButton onClick={()=>handleDelete(item?.TicketId)}>
                          <TbTicketOff
                            style={{ color: "#BC172F", fontSize: "15px" }}
                          />
                        </IconButton>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        height: "200px",
                        backdropFilter: "blur(5px)",
                        backgroundColor: "#333333b7",
                        px: 2,
                        py: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#fff",
                          fontSize: "12px",
                          fontWeight: 400,
                          textDecoration: "underline",
                        }}
                      >
                        Description
                      </Typography>
                      <Box sx={{ mt: 0, height: "32px" }}>
                        {item?.TicketDescription.length > 105 ? (
                          <Typography
                            sx={{
                              color: "#fff",
                              fontSize: "10px",
                              lineHeight: "15px",
                              fontWeight: 400,
                            }}
                          >
                            {item?.TicketDescription.slice(0, 105)}...
                          </Typography>
                        ) : (
                          <Typography
                            sx={{
                              fontWeight: 400,
                              color: "#fff",
                              fontSize: "10px",
                              lineHeight: "15px",
                            }}
                          >
                            {item?.TicketDescription}
                          </Typography>
                        )}
                      </Box>

                      <Box
                        sx={{
                          p: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Box sx={{ borderRight: "1px solid #fff", pr: 3 }}>
                          <Typography
                            sx={{
                              fontSize: "10px",
                              fontWeight: 400,
                              color: "#ccc",
                            }}
                          >
                            Total Ticket
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "13px",
                              fontWeight: 500,
                              color: "#fff",
                              mt: -1,
                              textAlign: "right",
                            }}
                          >
                           {item?.TotalTicket}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "10px",
                              fontWeight: 400,
                              color: "#ccc",
                            }}
                          >
                            Ticket Price
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "13px",
                              fontWeight: 500,
                              color: "#fff",
                              mt: -1,
                              textAlign: "right",
                            }}
                          >
                           {item?.
TicketPrice.toLocaleString()
}
                          </Typography>
                        </Box>
                        <Box sx={{ pl: 3 }}>
                          <Typography
                            sx={{
                              fontSize: "10px",
                              fontWeight: 400,
                              color: "#ccc",
                            }}
                          >
                            Ticket Sold
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "13px",
                              fontWeight: 500,
                              color: "#fff",
                              mt: -1,
                              textAlign: "left",
                            }}
                          >
                            {item?.
TicketBought}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "10px",
                              fontWeight: 400,
                              color: "#ccc",
                            }}
                          >
                            Ticket Left
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "13px",
                              fontWeight: 500,
                              color: "#fff",
                              mt: -1,
                              textAlign: "left",
                            }}
                          >
                            {item?.
TicketLeft
}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Box>
    </>
  );
};

export default Ticket;
