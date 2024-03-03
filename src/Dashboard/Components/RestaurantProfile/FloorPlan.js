import { Box, Button, Divider, Grid, IconButton, InputLabel, LinearProgress, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link, useNavigate } from 'react-router-dom';
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { createFloorPlans } from '../../../axios/api';
import { useSnackbar } from "notistack";
import CustomModal from '../Common/CustomModal';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,

};

const FloorPlan = () => {
   const { enqueueSnackbar } = useSnackbar();
   const navigate = useNavigate()
    const [open, setOpen] = React.useState(false);

    const handleClose = () => setOpen(false);
    const [name, setName]= useState("")
    const [location, setLocation] = useState("Ground floor");
    const [totalTables, setTotalTables] = useState("")
    const [loading, setLoading] = useState(false)

    const restaurantId = localStorage.getItem("restaurantID");

    const handleSelect = (e, value) =>{
      setLocation(e.target.value)
    }

        const handleAlert = (variant, message) => {
          // variant could be success, error, warning, info, or default
          enqueueSnackbar(message, { variant });
        };

    const handleCreateFloorPlan = async  () =>{
    setLoading(true)
await createFloorPlans(name, location, totalTables, restaurantId).then((res)=>{
  console.log(res)
  setLoading(false)
  const {data} = res;
  if(data.status){
    setOpen(false)
    setName("")
    setTotalTables("")
    navigate("/dashboard/table-rooms");
handleAlert("success", `Floor plan created successfully`)
  }
  else{
handleAlert("error", `${data?.error_message}`);
  }
}).catch((err)=>{
  console.log(err)
    setLoading(false);
  handleAlert("error", `${err.message}`);
})
    }
        const handleOpen = () => {
          setOpen(true);
          // handleCreateFloorPlan();
        };
  return (
    <>
      <Box
        sx={{
          borderBottom: "0.5px solid #fff",

          bgcolor: "#1a1a1a",
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", columnGap: 3, alignItems: "center" }}>
          <Link to="/dashboard/table-rooms">
            <Button
              sx={{ border: "0.5px solid #fff", color: "#fff", px: 2 }}
              startIcon={<ArrowBackIosIcon />}
            >
              Back
            </Button>
          </Link>
          <Typography sx={{ color: "#fff", fontWeight: 500, fontSize: "13px" }}>
            Create a Floor Plan
          </Typography>
        </Box>
        <Box>
          {/* <Button
            sx={{
              px: 5,
              bgcolor: "#fff",
              color: "#333",
              "&:hover": { bgcolor: "#ffffffb7" },
            }}
          >
            Save as draft
          </Button> */}
          <Button
            disabled={!name || !totalTables}
            onClick={handleOpen}
            variant="contained"
            sx={{ ml: 3 }}
          >
            Create Floor Plan
          </Button>
        </Box>
      </Box>

      <Box sx={{ p: 2 }}>
        <Box sx={{}}>
          <Typography sx={{ color: "#fff", fontWeight: 400 }}>
            Add a Floor Plan
          </Typography>
          <Box sx={{ mt: 4, pb: 4, borderBottom: "1px solid #fff" }}>
            <InputLabel
              sx={{ color: "#fff", fontWeight: 300, fontSize: "12px" }}
            >
              Name of Floor Plan
            </InputLabel>
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="vip lounge"
              margin="dense"
              sx={{ width: "40%" }}
              InputProps={{
                style: {
                  fontFamily: "Gordita",
                  fontSize: "13px",
                  borderRadius: "10px",
                  border: "1px solid #fff",
                  color: "#fff",
                  offset: " 1px solid #fff",
                },
              }}
            />

            <InputLabel
              sx={{ color: "#fff", mt: 3, fontWeight: 300, fontSize: "12px" }}
            >
              Location of Floor
            </InputLabel>
            <Select
              value={location}
              onChange={handleSelect}
              sx={{
                width: "40%",
                mt: 1,
                fontSize: "12px",
                border: "1px solid #fff",
                color: "#fff",
                borderRadius: "10px",
              }}
              displayEmpty
            >
              <MenuItem value="First floor" sx={{ fontSize: "12px" }}>
                First floor
              </MenuItem>
              <MenuItem value="Second floor" sx={{ fontSize: "12px" }}>
                Second floor
              </MenuItem>
              <MenuItem value="Ground floor" sx={{ fontSize: "12px" }}>
                Ground floor
              </MenuItem>
            </Select>
          </Box>
          <Box sx={{ mt: 4 }}>
            <Typography sx={{ color: "#fff", fontWeight: 400 }}>
              Add Tables
            </Typography>
            <InputLabel
              sx={{ color: "#fff", mt: 3, fontWeight: 300, fontSize: "12px" }}
            >
              How many tables are in the lounge
            </InputLabel>
            <TextField
              value={totalTables}
              onChange={(e) => setTotalTables(e.target.value)}
              type="number"
              margin="dense"
              sx={{ width: "40%" }}
              InputProps={{
                style: {
                  fontFamily: "Gordita",
                  fontSize: "13px",
                  borderRadius: "10px",
                  border: "1px solid #fff",
                  color: "#fff",
                  offset: " 1px solid #fff",
                },
              }}
            />
          </Box>
          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              disabled={!name || !totalTables}
              onClick={handleOpen}
            >
              Create Floor Plan
            </Button>
          </Box>
        </Box>
      </Box>

      <CustomModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        title="Confirmation"
      >
        <Box>
          {loading && <LinearProgress />}
          <Box sx={{ p: 3, bgcolor: "#1a1a1a", py: 5 }}>
            <Typography
              sx={{ fontSize: "13px", color: "#fff", fontWeight: 400 }}
            >
              Are you sure you want to create a floor plan with the following
              properties?
            </Typography>
            <Typography
              sx={{ mt: 3, color: "#fff", fontWeight: 900, fontSize: "17px" }}
            >
              Floor Plan
            </Typography>
            <Grid container sx={{ mt: 3 }} spacing={2}>
              <Grid item lg={12} md={12}>
                <InputLabel sx={{ color: "#fff", fontSize: "12px" }}>
                  Name of Floor Plan
                </InputLabel>
                <TextField
                  value={name}
                  placeholder="vip lounge"
                  margin="dense"
                  fullWidth
                  aria-readonly
                  InputProps={{
                    style: {
                      fontFamily: "Gordita",
                      fontSize: "13px",
                      borderRadius: "10px",
                      border: "1px solid #fff",
                      color: "#fff",
                      offset: " 1px solid #fff",
                    },
                  }}
                />
              </Grid>
              <Grid item lg={6} md={6}>
                <Box sx={{ borderBottom: "1px solid #fff", pb: 3 }}>
                  <InputLabel sx={{ color: "#fff", mt: 0, fontSize: "12px" }}>
                    Location of Floor
                  </InputLabel>
                  <TextField
                    value={location}
                    // disabled
                    placeholder="vip lounge"
                    margin="dense"
                    fullWidth
                    readonly
                    InputProps={{
                      style: {
                        fontFamily: "Gordita",
                        fontSize: "13px",
                        borderRadius: "10px",
                        border: "1px solid #fff",
                        color: "#fff",
                        offset: " 1px solid #fff",
                      },
                    }}
                  />
                </Box>
              </Grid>
              <Grid
                item
                lg={6}
                md={6}
                sx={{ borderBottom: "1px solid #fff", pb: 3 }}
              >
                <InputLabel sx={{ color: "#fff", mt: 0, fontSize: "12px" }}>
                  No of tables
                </InputLabel>
                <TextField
                  value={totalTables}
                  // disabled
                  placeholder="vip lounge"
                  margin="dense"
                  fullWidth
                  aria-readonly
                  InputProps={{
                    style: {
                      fontFamily: "Gordita",
                      fontSize: "13px",
                      borderRadius: "10px",
                      border: "1px solid #fff",
                      color: "#fff",
                      offset: " 1px solid #fff",
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Box sx={{ mt: 2, display: "flex", columnGap: 3 }}>
              <Button fullWidth variant="contained" onClick={handleClose}>
                Cancel
              </Button>

              <Button
                disabled={loading}
                onClick={handleCreateFloorPlan}
                fullWidth
                variant="contained"
                sx={{
                  px: 5,
                  bgcolor: "#fff",
                  color: "#333",
                  "&:hover": { bgcolor: "#ffffffb7" },
                }}
              >
                Create
              </Button>
            </Box>
          </Box>
        </Box>
      </CustomModal>
    </>
  );
}

export default FloorPlan