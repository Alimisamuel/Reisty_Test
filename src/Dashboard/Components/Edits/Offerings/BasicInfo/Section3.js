import {
  Button,
  Box,
  Typography,
  Grid,
  IconButton,
  Autocomplete,
  InputLabel,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import CustomInput from "../../../CustomField/CustomInput";
import CustomTextField from "../../../CustomField/CustomTextField";
import { Countries } from "../../../../../assets/Data/Countries";
import { editBasicInfo, editBasicInfoDescription } from "../../../../../axios/api";
import Loader from "../../../Common/Loader";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 750,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
};
const Section3 = ({ data, action }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    setDescription(data?.Description
);

  }, [data]);



  const handleEdit = async () => {
    setIsLoading(true);
    await editBasicInfoDescription(
description
    )
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        setOpen(false);
        action();
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };
  return (
    <>
      <Button
        onClick={handleOpen}
        sx={{ border: "1px solid #fff", bgcolor: "#333", color: "#fff" }}
      >
        Edit
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {isLoading && <Loader />}
          <Box
            sx={{
              height: "60px",
              bgcolor: "#333333",
              borderBottom: "1px solid #BC172F",
            }}
          >
            <Grid
              container
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
                py: 2,
              }}
            >
              <Grid item lg={4} md={4}></Grid>
              <Grid item lg={4} md={4}>
                <Typography
                  sx={{
                    fontFamily: "gordita",
                    color: "#fff",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                >
                  Edit Description
                </Typography>
              </Grid>
              <Grid item align="right" lg={4} md={4}>
                <IconButton onClick={handleClose}>
                  <CloseIcon sx={{ color: "#fff" }} />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              bgcolor: "#1A1A1A",
              px: 5,
              // height: "600px",
              overflow: "scroll",
              py: 2,
            }}
          >
            <Typography
              sx={{
                fontFamily: "gordita",
                color: "#fff",
                textAlign: "center",
                fontSize: "12px",
              }}
            >
              Highlight what sets your establishment apart with a unique
              description on Reisty. Guests can easily discover your restaurant,
              making a well-crafted description essential for driving bookings
              and repeat business.
            </Typography>

            <Grid container sx={{ mt: 3 }} spacing={2} rowGap={1}>
              <Grid item lg={12} xs={12}>
                <CustomTextField
                  name="Restaurant Name"
                  multiLine={true}
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 2, mb: 3 }} align="right">
              <Button variant="contained" onClick={handleEdit}>
                Save Changes
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Section3;
