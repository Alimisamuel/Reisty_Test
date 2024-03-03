import { CloseOutlined } from "@mui/icons-material";
import {
  Button,
  Modal,
  Box,
  Typography,
  IconButton,
  Grid,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import CustomTextField from "../CustomField/CustomTextField";
import { createEvents } from "../../../axios/api";
import Loader from "../Common/Loader";
import { useSnackbar } from "notistack";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  background: "#1a1a1a",
  // border: '2px solid #000',
  boxShadow: 24,
  p: 0,
};
const CreateExperience = ({action}) => {
    const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [eventName, setEventName] = useState("");
  const [total, setTotal] = useState(0);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(" ");

  const handleClose = () => {
    setOpen(false);
  };

  const handleAlert = (variant, message) => {
   
    enqueueSnackbar(message, { variant });
  };

  const handleFile = (event) =>{
    const file = event.target.files[0];
    setSelectedFile(file);
  }

  const handleCreateEvent = async () => {
    setLoading(true);
    await createEvents(eventName, description, price,total, selectedFile)
      .then((res) => {
        setLoading(false)
        console.log(res);

        const {data} = res;
        if(data?.status){
          handleAlert("success", `${data?.success_message}`);
          setOpen(false)
          action()
        }else{
            handleAlert("error", `${data?.error_message}`);
        }
      })
      .catch((err) => {
        setLoading(false)
        console.log(err);
        handleAlert("error", `${err.message} `);
      });
  };

  return (
    <>
    {
        loading && (<Loader/>)
    }
      <Button variant="contained" onClick={() => setOpen(true)}>
        Create New Experience
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              p: 2,
              px: 4,
              bgcolor: "#333",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #BC172F",
            }}
          >
            <Typography sx={{ color: "#fff", fontWeight: 500 }}>
              Create Experience
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseOutlined sx={{ color: "#fff" }} />
            </IconButton>
          </Box>

          <Box sx={{ p: 2, px: 4, mb: 5 }}>
            <Typography
              sx={{ fontWeight: 500, fontSize: "14px", color: "#fff" }}
            >
              Restaurant Experience
            </Typography>

            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item md={12}>
                <CustomTextField
                  name="Event Name"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                />
              </Grid>
              <Grid item md={6}>
                <CustomTextField
                  name="Event Time"
                  value={total}
                  type="time"
                  onChange={(e) => setTotal(e.target.value)}
                />
              </Grid>
              <Grid item md={6}>
                <CustomTextField
                  type="date"
                  name="Event Date"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Grid>
              <Grid item md={12}>
                <CustomTextField
                  accept="image/*"
                  name="Event Image"
                  type="file"            
               
                  onChange={handleFile}
                />
              </Grid>
              <Grid item md={12}>
                <CustomTextField
                  name="Description"
                  multiLine
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
           

              <Grid item md={12}>
                <Button
                  disabled={!eventName || !price || !total || !description}
                  onClick={handleCreateEvent}
                  variant="contained"
                  sx={{ mt: 4 }}
                  fullWidth
                >
                  Create
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default CreateExperience;
