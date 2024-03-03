import React,{useRef, useState} from 'react'
import Navbar from '../Header/Navbar'
import { Box,Button, Grid, MenuItem, Typography, Modal, TextField, Avatar } from '@mui/material'
import img1 from '../../../assets/support/1.svg'
import img2 from '../../../assets/support/2.svg'
import img3 from '../../../assets/support/3.svg'
import img4 from '../../../assets/support/4.svg'
import img5 from '../../../assets/support/5.svg'
import img6 from '../../../assets/support/6.svg'
import img7 from '../../../assets/support/7.svg'
import img8 from '../../../assets/support/8.svg'
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import galleryIcon from '../../../assets/support/gallery-export.svg'
import Footer from '../Footer/Footer'


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
borderRadius:3,
  boxShadow: 24,
  pb:4
  
};

const CustomerSupport = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

      const fileInputRef = useRef(null);
      const [selectedFile, setSelectedFile] = useState(null);

      const handleButtonClick = () => {
        fileInputRef.current.click(); // Trigger file input click
      };

      const handleFileSelect = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const dataURL = e.target.result;
            setSelectedFileURL(dataURL);
          };
          reader.readAsDataURL(file);
        }
      };

      const [selectedFileURL, setSelectedFileURL] = useState(null);
  return (
    <>
      <Navbar />
      <Box
        className="support"
        sx={{
          height: "260px",
          // border: "1px solid red",
          bgcolor: "#322a2b",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Typography sx={{ color: "#fff", fontSize: "30px", fontWeight: 500 }}>
          Support
        </Typography>
      </Box>
      <Box sx={{ background: "rgba(250, 250, 250, 0.98)", py: 5 }}>
        <Box sx={{ margin: "0 auto", width: "70%" }}>
          <Typography
            sx={{ textAlign: "center", fontWeight: 500, fontSize: "20px" }}
          >
            How can we help you?
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Box>
                <MenuItem
                  onClick={handleOpen}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid #DADADA",
                    p: 2,
                    borderRadius: 4,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      columnGap: 3,
                      alignItems: "center",
                    }}
                  >
                    <img src={img1} />
                    <Typography
                      sx={{
                        fontWeight: 500,
                        color: "#2B2B2B",
                        fontSize: "16px",
                      }}
                    >
                      Setting up restaurant profile
                    </Typography>
                  </Box>

                  <ChevronRightIcon color="primary" />
                </MenuItem>
              </Box>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Box>
                <MenuItem
                  onClick={handleOpen}
                  sx={{
                    
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid #DADADA",
                    p: 2,
                    borderRadius: 4,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      columnGap: 3,
                      alignItems: "center",
                    }}
                  >
                    <img src={img2} />
                    <Typography
                      sx={{
                        fontWeight: 500,
                        color: "#2B2B2B",
                        fontSize: "16px",
                      }}
                    >
                      Claiming your business
                    </Typography>
                  </Box>

                  <ChevronRightIcon color="primary" />
                </MenuItem>
              </Box>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Box>
                <MenuItem
                  onClick={handleOpen}
                  sx={{
                    
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid #DADADA",
                    p: 2,
                    borderRadius: 4,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      columnGap: 3,
                      alignItems: "center",
                    }}
                  >
                    <img src={img3} />
                    <Typography
                      sx={{
                        fontWeight: 500,
                        color: "#2B2B2B",
                        fontSize: "16px",
                      }}
                    >
                      Account settings
                    </Typography>
                  </Box>

                  <ChevronRightIcon color="primary" />
                </MenuItem>
              </Box>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Box>
                <MenuItem
                  onClick={handleOpen}
                  sx={{
                    
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid #DADADA",
                    p: 2,
                    borderRadius: 4,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      columnGap: 3,
                      alignItems: "center",
                    }}
                  >
                    <img src={img4} />
                    <Typography
                      sx={{
                        fontWeight: 500,
                        color: "#2B2B2B",
                        fontSize: "16px",
                      }}
                    >
                      Menu, Photos & Reviews management
                    </Typography>
                  </Box>

                  <ChevronRightIcon color="primary" />
                </MenuItem>
              </Box>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Box>
                <MenuItem
                  onClick={handleOpen}
                  sx={{
                    
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid #DADADA",
                    p: 2,
                    borderRadius: 4,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      columnGap: 3,
                      alignItems: "center",
                    }}
                  >
                    <img src={img5} />
                    <Typography
                      sx={{
                        fontWeight: 500,
                        color: "#2B2B2B",
                        fontSize: "16px",
                      }}
                    >
                      Reservation & Table management
                    </Typography>
                  </Box>

                  <ChevronRightIcon color="primary" />
                </MenuItem>
              </Box>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Box>
                <MenuItem
                  onClick={handleOpen}
                  sx={{
                    
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid #DADADA",
                    p: 2,
                    borderRadius: 4,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      columnGap: 3,
                      alignItems: "center",
                    }}
                  >
                    <img src={img6} />
                    <Typography
                      sx={{
                        fontWeight: 500,
                        color: "#2B2B2B",
                        fontSize: "16px",
                      }}
                    >
                      Billing & Payment
                    </Typography>
                  </Box>

                  <ChevronRightIcon color="primary" />
                </MenuItem>
              </Box>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Box>
                <MenuItem
                  onClick={handleOpen}
                  sx={{
                    
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid #DADADA",
                    p: 2,
                    borderRadius: 4,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      columnGap: 3,
                      alignItems: "center",
                    }}
                  >
                    <img src={img7} />
                    <Typography
                      sx={{
                        fontWeight: 500,
                        color: "#2B2B2B",
                        fontSize: "16px",
                      }}
                    >
                      Guestbook management
                    </Typography>
                  </Box>

                  <ChevronRightIcon color="primary" />
                </MenuItem>
              </Box>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Box>
                <MenuItem
                  onClick={handleOpen}
                  sx={{
                    
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    border: "1px solid #DADADA",
                    p: 2,
                    borderRadius: 4,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      columnGap: 3,
                      alignItems: "center",
                    }}
                  >
                    <img src={img8} />
                    <Typography
                      sx={{
                        fontWeight: 500,
                        color: "#2B2B2B",
                        fontSize: "16px",
                      }}
                    >
                      Terms of Service
                    </Typography>
                  </Box>

                  <ChevronRightIcon color="primary" />
                </MenuItem>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Footer />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              p: 3,
              bgcolor: "#F5F5F5",
              borderBottom: "1px solid #DADADA",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              columnGap: 3,
              borderRadius: "10px 10px 0px 0px",
            }}
          >
            <img src={img1} />
            <Typography sx={{ fontWeight: 500 }}>
              Setting up restaurant profile
            </Typography>
          </Box>
          <Box sx={{ margin: "0 auto", mt: 5, width: "80%" }}>
            <Typography sx={{ fontWeight: 500, fontSize: "13px" }}>
              Please describe your issue
            </Typography>
            <TextField
              placeholder="Describe your issue"
              fullWidth
              multiline
              rows={4}
            />
            <Typography sx={{ fontWeight: 500, fontSize: "13px", mt: 3 }}>
              Want to add an image? Upload
            </Typography>
            <Box
              sx={{
                mt: 1,
                border: "1px dashed #BC172F",
                borderRadius: "5px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                py: 8,
                height: "100px",
              }}
            >
              {selectedFileURL ? (
                <Box>
                  <Avatar
                    variant="square"
                    src={selectedFileURL}
                    alt="Selected File"
                    onClick={handleButtonClick}
                  />
                </Box>
              ) : (
                <img
                  src={galleryIcon}
                  alt="gallery_icon"
                  onClick={handleButtonClick}
                />
              )}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{
                    color: "#2b2b2b2",
                    mt: 2,

                    fontSize: "10px",
                  }}
                >
                  Drag or drop file or
                </Typography>
                <Button
                  onClick={handleButtonClick}
                  sx={{
                    mt: 2,

                    "&:hover": { background: "#fff" },
                  }}
                >
                  Browse
                </Button>
              </Box>

              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileSelect}
              />
            </Box>
            <Box align="right" sx={{ mt: 2 }}>
              <Button variant="contained"> Submit</Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default CustomerSupport