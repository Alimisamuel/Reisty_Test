import { Box, Typography, Button, Avatar, Grid } from "@mui/material";
import React, { useRef, useState } from "react";
import galleryIcon from "../../../../assets/Icons/gallery.svg";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useSnackbar } from "notistack";
import { galleryUpload } from "../../../../axios/api";
import Modal from "@mui/material/Modal";
import Loader from "../../Common/Loader";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import {Link} from 'react-router-dom'
import successgif from '../../../../assets/7efs.gif'

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "#000a07",
  // border: "1px dashed #BC172F",
  boxShadow: 24,
  // height:'600px',
  p: 4,
};

const Gallery = ({ restaurantId }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const fileInputRef2 = useRef(null);
  const fileInputRef3 = useRef(null);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedFile2, setSelectedFile2] = useState("");
  const [selectedFile3, setSelectedFile3] = useState("");

    const [files, setFiles] = useState([]);

    // const handleFileSelect = (event) => {
    //   const selectedFile = event.target.files[0];
    //   setFiles((prevFiles) => [...prevFiles, selectedFile]);
    // };
  const [uploadFile, setUploadFile] = useState();

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Trigger file input click
  };
  const handleButtonClick2 = () => {
    if (fileInputRef2.current) {
      fileInputRef2.current.click(); // Trigger file input click
    }
  };
  const handleButtonClick3 = () => {
    if (fileInputRef3.current) {
      fileInputRef3.current.click(); // Trigger file input click
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setUploadFile( file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataURL = e.target.result;
        setSelectedFileURL(dataURL);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleFileSelect2 = (event) => {
    const file = event.target.files[0];
    setSelectedFile2(file);
    setUploadFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataURL = e.target.result;
        setSelectedFileURL2(dataURL);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect3 = (event) => {
    const file = event.target.files[0];
    setSelectedFile3(file);
    setUploadFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataURL = e.target.result;
        setSelectedFileURL3(dataURL);
      };
      reader.readAsDataURL(file);
    }
  };

  const [selectedFileURL, setSelectedFileURL] = useState(null);
  const [selectedFileURL2, setSelectedFileURL2] = useState(null);
  const [selectedFileURL3, setSelectedFileURL3] = useState(null);

  const handleAlert = (variant, message) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { variant });
  };
console.log(files)
  const sendRequest = async () => {
    setIsLoading(true);
// console.log(uploadFile)
    await galleryUpload(restaurantId,  selectedFile, selectedFile2, selectedFile3)
      .then((res) => {
        console.log(res);
        if (res?.data?.status) {
          handleAlert("success", `${res?.data?.success_message}`);
          handleOpen()
        } else {
          handleAlert("error", `${res?.data?.error_message}`);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        handleAlert("error", "Error sending request");

        console.log(err);
      });
  };
  return (
    <>
      {isLoading && <Loader />}
      <Box sx={{ bgcolor: "#333333", mt: 2, borderRadius: "5px" }}>
        <Box sx={{ margin: "0 auto", width: "85%", py: 5 }}>
          <Typography variant="caption" sx={{ color: "#fff" }}>
            Add your 3 first major gallery photos
          </Typography>

          <Typography
            sx={{
              color: "#fff",
              fontFamily: "Gordita",
              fontSize: "12px",
              mt: 1,
            }}
          >
            Your guests will see these as the first three pictures before they
            proceed to view your gallery photos.
          </Typography>
     
          <Grid container spacing={2}>
            <Grid item lg={8} md={8}>
              <Box
                sx={{
                  background: selectedFileURL
                    ? `url(${selectedFileURL})`
                    : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  mt: 3,
                  border: "1px dashed #ccc",
                  borderRadius: "5px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  py: 8,
                  height: "300px",
                }}
              >
                {selectedFileURL ? (
                  <Box></Box>
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
                  style={{ display: "none" }}
                  onChange={handleFileSelect}
                />
              </Box>
            </Grid>

            <Grid item lg={4} md={4}>
              <Box
                sx={{
                  background: selectedFileURL2
                    ? `url(${selectedFileURL2})`
                    : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  mt: 3,
                  border: "1px dashed #ccc",
                  borderRadius: "5px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  py: 8,
                  height: "70px",
                }}
              >
                {selectedFileURL2 ? (
                  <></>
                ) : (
                  <>
                    <img
                      src={galleryIcon}
                      alt="gallery_icon"
                      onClick={handleButtonClick2}
                    />
                  </>
                )}

                <Typography
                  sx={{
                    color: "#ccc",
                    mt: 2,

                    fontSize: "10px",
                  }}
                >
                  Drag or drop your photo here
                </Typography>
                <Button
                  onClick={handleButtonClick2}
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
                  ref={fileInputRef2}
                  style={{ display: "none" }}
                  onChange={handleFileSelect2}
                />
              </Box>

              <Box
                sx={{
                  background: selectedFileURL3
                    ? `url(${selectedFileURL3})`
                    : "none",
                  backgroundSize: "cover",
                  mt: 3,
                  border: "1px dashed #ccc",
                  borderRadius: "5px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  py: 8,
                  height: "75px",
                }}
              >
                {selectedFileURL3 ? (
                  <Box></Box>
                ) : (
                  <>
                    <img
                      src={galleryIcon}
                      alt="gallery_icon"
                      onClick={handleButtonClick3}
                    />
                  </>
                )}
                <Typography
                  sx={{
                    color: "#ccc",
                    mt: 2,

                    fontSize: "10px",
                  }}
                >
                  Drag or drop your photo here
                </Typography>
                <Button
                  onClick={handleButtonClick3}
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
                  ref={fileInputRef3}
                  style={{ display: "none" }}
                  onChange={handleFileSelect3}
                />
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <Button fullWidth variant="contained" onClick={sendRequest}>
              Upload Photos
            </Button>
          </Box>
        </Box>
      </Box>

      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box align="center">
            {/* <RestaurantIcon sx={{ color: "#fff", fontSize: "30px" }} /> */}
<img src={successgif} width={400}/>
            <Box sx={{ mt: 3 }}>
              {/* <Typography
                sx={{ fontWeight: 700, color: "#fff", fontSize: "30px" }}
              >
                Congratutions!
              </Typography> */}
              <Typography sx={{ mt: 2, color: "#fff", fontWeight:700, fontSize:'16px' }}>
                Your Restaurant Has Been Successfully<br/> Created.
              </Typography>
              <Typography
                sx={{ color: "#fff", mt: 2, fontSize: "12px", fontWeight: 400 }}
              >
                {" "}
                Would you like to proceed with the setup?
              </Typography>
            </Box>
          </Box>
          <Box sx={{ mt: 4, width:'100%' }}>
            <Link to="/dashboard/restaurantprofile">
              <Button variant="outlined" sx={{mb:3}} fullWidth>
                Skip
              </Button>
            </Link>
            <Link to="/dashboard/table-rooms">
              <Button variant="contained" fullWidth>
                Floor Plan
              </Button>
            </Link>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Gallery;
