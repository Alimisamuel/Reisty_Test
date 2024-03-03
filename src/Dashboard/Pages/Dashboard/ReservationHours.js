import {
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Grid,
  Button,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomInput from "../../Components/CustomField/CustomInput";
import deleteIcon from "../../../assets/Icons/delete.svg";
import CreateReservationHour from "../../Components/Reservations/CreateReservationHour";
import {
  deleteReservationHours,
  getReservationHours,
} from "../../../axios/api";
import { useScroll } from "@react-spring/web";
import Loader from "../../Components/Common/Loader";
import { useSnackbar } from "notistack";
import { Helmet } from "react-helmet";

const ReservationHours = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);

  const [hoursData, setHoursData] = useState(null);

  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };

  const handleGetReservationHours = async () => {
    setIsLoading(true);
    await getReservationHours()
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        const { data } = res;
        if (data.status) {
          setHoursData(data?.result);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    handleGetReservationHours();
  }, []);

  const handleDeleteReservationHours = async (id) => {
    setIsLoading(true);
    await deleteReservationHours(id)
      .then((res) => {
        setIsLoading(false);
        console.log(res);
        if (res.data.status) {
          handleAlert("success", `${res.data.success_message}`);
          handleGetReservationHours();
        } else {
          handleAlert("error", `${res.data.error_message}`);
        }
      })
      .catch((err) => {
        handleAlert("error", `${err.message}`);
        setIsLoading(false);
        console.log(err);
      });
  };
  return (
    <>
      <Helmet> </Helmet>
      {isLoading && <Loader />}
      <Box sx={{ p: 2, borderBottom: "1px solid #fff", bgcolor: "#333" }}>
        <Typography sx={{ color: "#fff", fontWeight: 500 }}>
          Reservation Hours
        </Typography>
      </Box>

      <Box sx={{ p: 2 }}>
        <Typography sx={{ color: "#fff", fontWeight: 500, fontSize: "14px" }}>
          Inform your guests about your availability.
        </Typography>
        <Typography
          sx={{ color: "#fff", fontWeight: 200, fontSize: "12px", mt: 1 }}
        >
          Tell guests when you are open
        </Typography>

        {!hoursData || hoursData.length === 0 ? (
          <></>
        ) : (
          hoursData &&
          hoursData.map((item, index) => (
            <>
              <Box
                sx={{
                  mt: 4,
                  bgcolor: "#333",
                  borderRadius: 2,
                  p: 2,
                  width: {lg:"70%", md:'90%'}
                }}
              >
                <Box sx={{ px: 2, display: "flex", columnGap: 3 }}>
                  <Typography sx={{ color: "#fff", fontSize: "14px" }}>
                    Opening days:
                  </Typography>
                  <Box>
                    <Typography sx={{ color: "#fff", fontSize: "13px" }}>
                      {item?.Days}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    px: 2,
                    display: "flex",
                    columnGap: 3,
                    mt: 8,
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ color: "#fff", fontSize: "14px" }}>
                    Opening Hours :
                  </Typography>
                  <Box sx={{ flex: 1 }}>
                    <Grid
                      container
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Grid item lg={3} md={4}>
                        <Box
                          sx={{
                            borderRadius: 2,
                            border: "1px solid #fff",
                            p: 1,
                            px: 4,
                            width: "fit-content",
                            color: "#fff",
                            bgcolor: "#3333",
                          }}
                        >
                          {item?.MealType}
                        </Box>
                      </Grid>
                      <Grid item lg={6} md={6}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            columnGap: 2,
                          }}
                        >
                          <Typography sx={{ fontSize: "10px", color: "#fff" }}>
                            From:
                          </Typography>
                          <CustomInput value={item?.From} />
                          <Typography sx={{ fontSize: "10px", color: "#fff" }}>
                            To:
                          </Typography>
                          <CustomInput value={item?.To} />
                        </Box>
                      </Grid>
                      <Grid item lg={3} md={2}>
                        <Box align="right">
                          <IconButton
                            onClick={() =>
                              handleDeleteReservationHours(item?.Id)
                            }
                          >
                            <img src={deleteIcon} />
                          </IconButton>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Box>
            </>
          ))
        )}
        <Box sx={{ mt: 7 }}>
          <CreateReservationHour action={handleGetReservationHours} />
        </Box>
      </Box>
    </>
  );
};

export default ReservationHours;
