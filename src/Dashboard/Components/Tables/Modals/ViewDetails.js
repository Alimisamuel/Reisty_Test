import React from "react";
import { MenuItem, Typography, Modal, Box, IconButton, Grid, TextField, InputLabel, Select, Divider, Button,  } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { CloseOutlined } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "#1a1a1a",
  // border: "2px solid #000",
  boxShadow: 24,
  borderRadius:2,
  // p: 4,
};

const ViewDetails = () => {

   const [open, setOpen] = React.useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);
  return (
    <>
      <MenuItem onClick={handleOpen}>
        <InfoOutlinedIcon sx={{ color: "#fff" }} />{" "}
        <Typography
          sx={{ color: "#fff", ml: 2, fontSize: "12px", fontWeight: 500 }}
        >
          View Table Details
        </Typography>
      </MenuItem>

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
              bgcolor: "#333",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "2px solid #fff",
            }}
          >
            <Typography sx={{ color: "#fff", fontWeight: 500 }}>
              Table details
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseOutlined sx={{ color: "#fff" }} />
            </IconButton>
          </Box>

          <Box sx={{ p: 3 }}>
            <Grid container spacing={2}>
              <Grid item lg={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ color: "#fff" }}>Table Name</Typography>
                  <TextField
                    value="Table 1"
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
              <Grid item lg={12}>
                <Box>
                  <InputLabel sx={{ color: "#fff", mt: 1 }}>
                    Table Setting
                  </InputLabel>
                  <Select
                    fullWidth
                    sx={{
                      mt: 1,
                      border: "1px solid #fff",
                      color: "#fff",
                      borderRadius: "10px",
                    }}
                    displayEmpty
                  >
                    <MenuItem value="">Ground floor</MenuItem>
                  </Select>
                </Box>
              </Grid>
              <Grid item lg={6}>
                <Box>
                  <InputLabel sx={{ color: "#fff", mt: 1 }}>
                    No of seats
                  </InputLabel>
                  <Select
                    fullWidth
                    sx={{
                      mt: 1,
                      border: "1px solid #fff",
                      color: "#fff",
                      borderRadius: "10px",
                    }}
                    displayEmpty
                  >
                    <MenuItem value="">Ground floor</MenuItem>
                  </Select>
                </Box>
              </Grid>
              <Grid item lg={6}>
                <Box>
                  <InputLabel sx={{ color: "#fff", mt: 1 }}>
                    Table Position
                  </InputLabel>
                  <Select
                    fullWidth
                    sx={{
                      mt: 1,
                      border: "1px solid #fff",
                      color: "#fff",
                      borderRadius: "10px",
                    }}
                    displayEmpty
                  >
                    <MenuItem value="">Ground floor</MenuItem>
                  </Select>
                </Box>
              </Grid>
            

              <Grid item lg={6}>
                <Box>
                  <InputLabel sx={{ color: "#fff", mt: 1 }}>
                    Table Shape
                  </InputLabel>
                  <Select
                    fullWidth
                    sx={{
                      mt: 1,
                      border: "1px solid #fff",
                      color: "#fff",
                      borderRadius: "10px",
                    }}
                    displayEmpty
                    >
                    <MenuItem value="">Ground floor</MenuItem>
                  </Select>
                </Box>
              </Grid>
              <Grid item lg={6}>
                <Box>
                  <InputLabel sx={{ color: "#fff", mt: 1 }}>
                    Table Color
                  </InputLabel>
                  <Select
                    fullWidth
                    sx={{
                      mt: 1,
                      border: "1px solid #fff",
                      color: "#fff",
                      borderRadius: "10px",
                    }}
                    displayEmpty
                    >
                    <MenuItem value="">Ground floor</MenuItem>
                  </Select>
                </Box>
              </Grid>
              
            
            </Grid>
            <Box sx={{borderTop:'1px solid #fff', pt:2, mt:3}}>
<Button variant="contained" fullWidth>Delete</Button>

            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ViewDetails;
