import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  InputLabel,
  TextField,
  IconButton,
} from "@mui/material";
import emptyIcon from "../../../assets/emptyRes.svg";
import userAdd from "../../../assets/Icons/user-add.svg";
import Modal from "@mui/material/Modal";

import { alpha, styled } from "@mui/material/styles";
import NewGuest from "../../Components/NewGuest";
import { getGuestBook } from "../../../axios/api";
import GuestList from "../../Components/Guest/GuestList";
import Loader from "../../Components/Common/Loader";
import { Helmet } from "react-helmet";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
};

const GuestBook = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const updateClose = (state) => {
    setOpen(state);
  };
  const [isLoading, setIsLoading] = useState(false);

  const [guestData, setGuestData] = useState(null);

  const handleGetGuest = async () => {
    setIsLoading(true);
    await getGuestBook()
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        const { data } = res;
        setGuestData(data?.result);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    handleGetGuest();
  }, []);
  return (
    <>
      <Helmet> </Helmet>
      {isLoading && <Loader />}
      {!guestData || guestData.length === 0 ? (
        <>
          <Box
            sx={{
              // border: "1px solid red",
              height: "80vh",
              display: "grid",
              placeItems: "center",
            }}
          >
            <Box align="center" sx={{ width: "70%" }}>
              <img src={emptyIcon} />
              <Typography
                sx={{ color: "#fff", fontSize: "16px", fontWeight: 400 }}
              >
                You have no guests on your guestbook{" "}
              </Typography>
              <Typography
                sx={{ color: "#fff", fontSize: "14px", fontWeight: 300, mt: 2 }}
              >
                There are currently no guests in your guestbook list. To add a
                new list of guests, please click on the "Create Guest" button
                below.
              </Typography>
              <Button
                onClick={handleOpen}
                sx={{
                  bgcolor: "#fff",
                  color: "#2B2B2B",
                  mt: 3,
                  px: 3,
                  "&:hover": { bgcolor: "#ffffffb7", color: "#2b2b2b" },
                }}
              >
                <img
                  src={userAdd}
                  alt="user_add"
                  style={{ marginRight: "5px" }}
                />
                Create Guest
              </Button>
            </Box>
          </Box>
        </>
      ) : (
        <>
          <Box
            sx={{
              borderBottom: "1px solid #fff",
              p: 2,
              bgcolor: "#1a1a1a",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{ fontSize: "19px", color: "#fff", fontWeight: 400 }}
            >
              Guestbook
            </Typography>
            <Button variant="contained" onClick={handleOpen}>
              Create Guest
            </Button>
          </Box>
          <GuestList data={guestData} />
        </>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <NewGuest handleCloses={updateClose} callBack={handleGetGuest} />
        </Box>
      </Modal>
    </>
  );
};

export default GuestBook;
