import React, {useState, useRef} from 'react'
import {
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
  Modal,
  createTheme,
  ThemeProvider,
  Avatar,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { CloseOutlined } from '@mui/icons-material';
import { appendGalleryUpload } from '../../../../axios/api';
import Loader from '../../Common/Loader';
import { useSnackbar } from "notistack";
import galleryIcon from "../../../../assets/Icons/gallery.svg";


const AddGallery = ({action, handleClose}) => {
    const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false)
    const fileInputRef = useRef(null);
      const handleButtonClick = () => {
        fileInputRef.current.click(); // Trigger file input click
      };

        const [selectedImages, setSelectedImages] = useState([]);
        const [imageUrls, setImageUrls] = useState([]);

        const handleImageChange = (e) => {
          const files = e.target.files;

          // Update selectedImages state with the selected image files
          setSelectedImages((prevImages) => [...prevImages, ...files]);

          // Read and store URLs of the selected images
          const urls = [];
          for (const file of files) {
            const url = URL.createObjectURL(file);
            urls.push(url);
          }
          setImageUrls((prevUrls) => [...prevUrls, ...urls]);
        };

          const handleRemoveImage = (index) => {
            // Remove the selected image and URL from the states
            const updatedSelectedImages = [...selectedImages];
            updatedSelectedImages.splice(index, 1);
            setSelectedImages(updatedSelectedImages);

            const updatedImageUrls = [...imageUrls];
            updatedImageUrls.splice(index, 1);
            setImageUrls(updatedImageUrls);
          };

            const handleAlert = (variant, message) => {
          
              enqueueSnackbar(message, { variant });
            };
          const handleAddGallery = async () =>{
            setIsLoading(true)
            await appendGalleryUpload(selectedImages).then((res)=>{
                 if (res?.data?.status) {
                   handleAlert("success", `${res?.data?.success_message}`);
                   handleClose()
                action()
                 } else {
                   handleAlert("error", `${res?.data?.error_message}`);
                 }
              setIsLoading(false)
              console.log(res)
            }).catch((err)=>{
                      setIsLoading(false);
              console.log(err)
            })
          }
  return (
    <>
      {isLoading && <Loader />}
      <Box align="center" sx={{ margin: "0 auto", width: "60%", mt: 3 }}>
        <Box>

        <img src={galleryIcon} alt="gallery_icon" onClick={handleButtonClick} />
        </Box>
        <Button
          onClick={handleButtonClick}
          variant="contained"
          sx={{
            mt: 2,
            textTransform: "initial",
            px: 4,
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
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
      </Box>
      {selectedImages.length === 0 ? (
        <>
          <Box
            sx={{
              bgcolor: "#ffffff1a",
              borderRadius: "5px",
              p: 3,
              margin: "0 auto",
              width: { lg: "80%", md: "80%" },
              my: 3,
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
          <Grid container spacing={2} sx={{ p: 3, mt: 3 }}>
            {imageUrls.map((url, index) => (
              <Grid item lg={3} md={3}>
                <Box
                  key={index}
                  sx={{
                    width: "100%",
                    height: "100px",
                    background: `url('${url}')`,
                    backgroundSize: "cover",
                  }}
                >
                  <Box align="right" sx={{ p: 0.5 }}>
                    <IconButton
                      onClick={() => handleRemoveImage(index)}
                      sx={{
                        bgcolor: "#000",
                        width: "30px",
                        height: "30px",
                        "&:hover": { bgcolor: "#333" },
                      }}
                    >
                      <CloseOutlined sx={{ fontSize: "14px" }} />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </>
      )}
      <Box sx={{ p: 3 }}>
        <Button
          onClick={handleAddGallery}
          disabled={selectedImages.length === 0}
          sx={{ textTransform: "initial" }}
          variant="contained"
          fullWidth
        >
          Upload Photos
        </Button>
      </Box>
    </>
  );
}

export default AddGallery