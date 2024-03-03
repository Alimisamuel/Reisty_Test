import React, { useState, useEffect } from "react";
import Header from "../../Components/Header";
import { Box, Button, Grid, IconButton, Typography, Modal, createTheme, ThemeProvider, Avatar } from "@mui/material";
import noImage from "../../../assets/no_gallery.svg";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { deleteGalleryPhotos, getGallery } from "../../../axios/api";
import Loader from "../../Components/Common/Loader";
import galleryImg from "../../../assets/Icons/gallery.svg";
import { Helmet } from "react-helmet";
import { MdOutlineModeEditOutline } from "react-icons/md";
import Gallery from '../../Components/RestaurantProfile/QuickSetupForms/Gallery'
import CustomModal from "../../Components/Common/CustomModal";
import EditGallery from "../../Components/Edits/Gallery/EditGallery";
import AddGallery from "../../Components/Edits/Gallery/AddGallery";
import { useSnackbar } from "notistack";
import { AiOutlineDelete } from "react-icons/ai";
import { RiEditBoxLine } from "react-icons/ri";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "#333",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "#333",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 0,
};

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#BC172F",
    },
  },
});

const Gallery2 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(true);
  const [galleryData, setGalleryData] = useState(null);
  const [edit, setEdit] = useState(false)
   const [open, setOpen] = React.useState(false);
   const [open2, setOpen2] = React.useState(false);
       const { enqueueSnackbar } = useSnackbar();

              const handleAlert = (variant, message) => {
                enqueueSnackbar(message, { variant });
              };

   const handleClose = () => setOpen(false);
   const handleClose2 = () => setOpen2(false);

   const [imageUrl, setImageUrl] = useState("")
   const [selectedID, setSelectedID] = useState("")

      const handleOpen = (url, id) => {
        setOpen(true);
        setImageUrl(url)
        setSelectedID(id)
      };
      const handleOpen2 = (url) => {
        setOpen2(true);
        // setImageUrl(url)
      };
  const handleGetGallery = async () => {
    setIsLoading(true);
    await getGallery()
      .then((res) => {
        const { data } = res;
        console.log(data?.result[0]);
        setIsLoading(false);
        setGalleryData(data?.result);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const handleDeletePhoto = async (id) =>{
 
    setIsLoading(true);

    await deleteGalleryPhotos(id)
      .then((res) => {
      
        setIsLoading(false);
               if (res?.data?.status) {
                 handleAlert("success", `${res?.data?.success_message}`);
                 handleGetGallery()
               } else {
                 handleAlert("error", `${res?.data?.error_message}
                 `);
                        
               }



      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    handleGetGallery();
  }, []);
  return (
    <>
      <Helmet> </Helmet>
      {isLoading && <Loader />}
      <Header title="Gallery" />
      {!galleryData || galleryData.length === 0 ? (
        <>
          <Box align="center" sx={{ mt: 7 }}>
            <img src={noImage} alt="empty_gallery" />
          </Box>
          <Box align="center" sx={{ margin: "0 auto", width: "60%", mt: 3 }}>
            <Typography
              sx={{
                color: "#fff",
                fontWeight: 400,
                fontSize: "18px",
                textAlign: "center",
              }}
            >
              Add Photos To Attract Diners
            </Typography>
            <Typography
              sx={{
                color: "#fff",
                fontWeight: 200,
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              Visuals aid guests in choosing where to dine; select photos that
              effectively communicate your restaurant's atmosphere and guest
              experience.
            </Typography>

            <Button
              variant="contained"
              sx={{ mt: 6, background: "#fff", color: "#2B2B2B" }}
            >
              Add Photos
            </Button>
          </Box>
          <Box
            sx={{
              bgcolor: "#ffffff1a",
              borderRadius: "5px",
              p: 3,
              margin: "0 auto",
              width: { lg: "30%" },
              mt: 3,
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
                <TipsAndUpdatesIcon sx={{ mr: 1 }} /> Tips for adding logos
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
                <CheckCircleIcon sx={{ mr: 1, fontSize: "18px" }} />
                Do not use logos or menu
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
                <CheckCircleIcon sx={{ mr: 1, fontSize: "18px" }} /> Use only
                jpeg or png formats
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
                <CheckCircleIcon sx={{ mr: 1, fontSize: "18px" }} /> Do not use
                photos with people
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
        </>
      ) : (
        <>
          <Box sx={{ pt: 4, px: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography sx={{ color: "#fff", fontWeight: 400 }}>
                  Major gallery photos
                </Typography>
                <Typography
                  sx={{ color: "#fff", fontWeight: 200, fontSize: "12px" }}
                >
                  These are the first 3 your guest will see first before they
                  continue to view your gallery photos
                </Typography>
              </Box>
              <Box>{/* <Button>Edit</Button> */}</Box>
            </Box>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item lg={7} md={7} sx={{ height: "400px" }}>
                <Box
                  sx={{
                    border: "0.5px dashed #fff",
                    height: "100%",
                    borderRadius: 1,
                    background: galleryData
                      ? `url('${galleryData[0]?.imageUrl}')`
                      : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></Box>
              </Grid>
              <Grid item lg={5} md={5} sx={{ height: "400px" }}>
                <Grid container spacing={2}>
                  <Grid item lg={12} md={12} sx={{ height: "200px" }}>
                    <Box
                      sx={{
                        border: "0.5px dashed #fff",
                        height: "100%",
                        borderRadius: 1,
                        background: galleryData
                          ? `url('${galleryData[1]?.imageUrl}')`
                          : "none",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></Box>
                  </Grid>
                  <Grid item lg={12} md={12} sx={{ height: "200px" }}>
                    <Box
                      sx={{
                        border: "0.5px dashed #fff",
                        height: "100%",
                        borderRadius: 1,
                        background: galleryData
                          ? `url('${galleryData[2]?.imageUrl}')`
                          : "none",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 3,
                }}
              >
                <Box>
                  <Typography sx={{ color: "#fff", fontWeight: 400 }}>
                    Others
                  </Typography>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    onClick={() => setEdit(!edit)}
                    sx={{ px: 5 }}
                  >
                    Edit
                  </Button>
                </Box>
              </Box>
              <Grid container spacing={1} sx={{ mt: 3 }}>
                <Grid item lg={2} md={3} sx={{ height: "230px" }}>
                  <Box
                    sx={{
                      border: "0.5px dashed #fff",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      borderRadius: 1,
                    }}
                  >
                    <img src={galleryImg} />
                    <Typography
                      sx={{
                        fontWeight: 200,
                        fontSize: "10px",
                        mt: 1,
                        color: "#fff",
                      }}
                    >
                      click to upload your pictures
                    </Typography>
                    <Button
                      onClick={handleOpen2}
                      sx={{
                        bgcolor: "#fff",
                        fontWeight: 300,
                        color: "#333",
                        fontSize: "10px",
                        px: 2,
                      }}
                    >
                      Browse Files
                    </Button>
                  </Box>
                </Grid>
                {galleryData &&
                  galleryData.map((item, index) => (
                    <Grid
                      item
                      lg={2}
                      md={3}
                      sx={{ height: "230px" }}
                      key={index}
                    >
                      <Box
                        sx={{
                          border: "0.5px dashed #fff",
                          height: "100%",
                          borderRadius: 1,
                          background: galleryData
                            ? `url('${item.imageUrl}')`
                            : "none",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        {edit && (
                          <Box align="right" sx={{ p: 1 }}>
                            <IconButton
                              sx={{ bgcolor: "#000" }}
                              onClick={() => handleOpen(item.imageUrl, item.Id)}
                            >
                              <RiEditBoxLine
                                style={{ color: "#fff", fontSize: "14px" }}
                              />
                            </IconButton>
                            <IconButton
                              sx={{ bgcolor: "#000", ml: 1 }}
                              onClick={() => handleDeletePhoto( item.Id)}
                            >
                              <AiOutlineDelete
                                style={{ color: "#BC172F", fontSize: "14px" }}
                              />
                            </IconButton>
                          </Box>
                        )}
                      </Box>
                    </Grid>
                  ))}
              </Grid>
            </Box>
          </Box>
        </>
      )}
      <ThemeProvider theme={theme}>
        <CustomModal
          title="Edit Image"
          width={500}
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <EditGallery
            imageUrl={imageUrl}
            ID={selectedID}
            action={handleGetGallery}
          />
        </CustomModal>
      </ThemeProvider>
      <ThemeProvider theme={theme}>
        <CustomModal
          title="Add More Images"
          width={700}
          open={open2}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <AddGallery action={handleGetGallery} handleClose={handleClose2} />
        </CustomModal>
      </ThemeProvider>
    </>
  );
};

export default Gallery2;
