import {
  Button,
  Box,
  Typography,
  Grid,
  IconButton,
  Avatar

} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";

import {

 editBasicInfoLogo,
} from "../../../../../axios/api";
import Loader from "../../../Common/Loader";
import galleryIcon from '../../../../../assets/Icons/gallery.svg'
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

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
const Section2 = ({ data, action }) => {
    const fileInputRef = useRef(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(" ");

    console.log(selectedFile);
    const handleButtonClick = () => {
      fileInputRef.current.click(); // Trigger file input click
    };
    const [selectedFileURL, setSelectedFileURL] = useState(null);
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

  // useEffect(() => {
  //   setDescription(data?.Description);
  // }, [data]);

  const handleEdit = async () => {
    setIsLoading(true);
    await editBasicInfoLogo(selectedFile)
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
                  Edit Logo
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
            <Box sx={{ bgcolor: "#333333", mt: 2, borderRadius: "5px" }}>
              <Box sx={{ margin: "0 auto", width: "85%", py: 5 }}>
                <Typography variant="caption" sx={{ color: "#fff" }}>
                  Add a brightly illuminated image of your restaurant's logo.
                </Typography>

                <Typography
                  sx={{
                    color: "#fff",
                    fontFamily: "Gordita",
                    fontSize: "12px",
                    mt: 1,
                  }}
                >
                  By including a well-lit logo image, you can instantly enhance
                  your restaurant's branding and make it more easily
                  recognizable to customers
                </Typography>
                <Box
                  sx={{
                    mt: 3,
                    border: "1px dashed #ccc",
                    borderRadius: "5px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    py: 8,
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

                  <Typography
                    sx={{
                      color: "#ccc",
                      mt: 2,
                      fontFamily: "gordita",
                      fontSize: "10px",
                    }}
                  >
                    Drag or drop your photo here
                  </Typography>
                  <Button
                    onClick={handleButtonClick}
                    variant="contained"
                    sx={{
                      mt: 2,
                      background: "#ccc",
                      color: "#2b2b2b",
                      "&:hover": { background: "#fff" },
                    }}
                  >
                    Browse Files
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileSelect}
                  />
                </Box>
                <Box
                  sx={{
                    mt: 3,
                    bgcolor: "#ffffff1a",
                    borderRadius: "5px",
                    p: 3,
                    width: { lg: "50%" },
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <TipsAndUpdatesIcon sx={{ mr: 1 }} /> Tips for adding
                      logos
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#fff",
                        display: "flex",
                        fontFamily: "gordita",
                        alignItems: "center",
                      }}
                    >
                      <CheckCircleIcon sx={{ mr: 1, fontSize: "18px" }} /> Do
                      not use photos with people
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#fff",
                        display: "flex",
                        fontFamily: "gordita",
                        alignItems: "center",
                      }}
                    >
                      <CheckCircleIcon sx={{ mr: 1, fontSize: "18px" }} /> Use
                      only jpeg or png formats
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#fff",
                        display: "flex",
                        fontFamily: "gordita",
                        alignItems: "center",
                      }}
                    >
                      <CheckCircleIcon sx={{ mr: 1, fontSize: "18px" }} />
                      The bigger image size should be “1280 * 720” pixels
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#fff",
                        display: "flex",
                        fontFamily: "gordita",
                        alignItems: "center",
                      }}
                    >
                      <CheckCircleIcon sx={{ mr: 1, fontSize: "18px" }} />
                      Ensure the picture sizes are 10mb max
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
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

export default Section2;
