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
import galleryIcon from "../../../../assets/Icons/gallery.svg";
import { editGalleryUpload } from '../../../../axios/api';
import Loader from '../../Common/Loader';
import { useSnackbar } from "notistack";


const EditGallery = ({imageUrl, ID, action}) => {

  const {enqueueSnackbar} = useSnackbar()
  const fileInputRef = useRef(null);
    const [selectedFileURL, setSelectedFileURL] = useState(null);
      const [selectedFile, setSelectedFile] = useState("");
      const [isLoading, setIsLoading] = useState(false)

           const handleAlert = (variant, message) => {
             // variant could be success, error, warning, info, or default
             enqueueSnackbar(message, { variant });
           };
      const handleButtonClick = () => {
        fileInputRef.current.click(); // Trigger file input click
      };

        const handleFileSelect = (event) => {
          const file = event.target.files[0];
          setSelectedFile(file);
          // setUploadFile(file);

          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const dataURL = e.target.result;
              setSelectedFileURL(dataURL);
            };
            reader.readAsDataURL(file);
          }
        };
  const handleEditImage = async () =>{
setIsLoading(true)
    await editGalleryUpload(ID,selectedFile ).then((res)=>{
      setIsLoading(false)
      console.log(res)
              const { data } = res;
              if (data?.status) {
                handleAlert("success", `${data?.success_message}`);
       action()
              } else {
                handleAlert("error", `${data?.error_message}`);
              }
    }).catch((err)=>{
            setIsLoading(false);
      console.log(err)
            handleAlert("error", `${err}`);
    })
  }
  return (
    <>
    {
      isLoading && (<Loader/>)
    }
      <Box sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item lg={6} md={6}>
            <Box
              sx={{
                border: "0.5px dashed #fff",
                height: "200px",
                borderRadius: 1,
                background: `url('${imageUrl}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></Box>
          </Grid>
          <Grid item lg={6} md={6}>
            <Box
              sx={{
                background: selectedFileURL
                  ? `url(${selectedFileURL})`
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                // mt: 3,
                border: "1px dashed #ccc",
                borderRadius: "5px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                py: 8,
                height: "200px",
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
           Click to upload your photo here
              </Typography>
              <Button
                onClick={handleButtonClick}
                variant="contained"
                sx={{
                  mt: 2,
                  background: "#ccc",
                  color: "#2b2b2b",
                  textTransform:'initial',
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
        </Grid>
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3 , textTransform:'initial'}}
          onClick={handleEditImage}
        >
          Change
        </Button>
      </Box>
    </>
  );
}

export default EditGallery