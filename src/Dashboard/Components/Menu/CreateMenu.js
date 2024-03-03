import React, { useState, useRef } from "react";
import {
  Button,
  Modal,
  Box,
  Grid,
  IconButton,
  Typography,
  TextField,
  Select,
  MenuItem,

  InputAdornment,
  Avatar,
  LinearProgress
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { alpha, styled } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import galleryImg from "../../../assets/Icons/gallery.svg";
import { createMenuList } from "../../../axios/api";
import { useSnackbar } from "notistack";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 750,
  borderRadius: "5px",
  boxShadow: 24,
  bgcolor: "#1a1a1a",
  overflow: "scroll",
  maxHeight: "70vh",

  pb: 3,
};

const CssTextField = styled(TextField)({
  height: "30px",
  color: "#fff",
  "& label.Mui-focused": {
    color: "#fff",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#333",
    color: "#fff",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#333",
      color: "#fff",
    },
    "&:hover fieldset": {
      borderColor: "#333",
      color: "#fff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#333",
      color: "#fff",
    },
  },
});
const CssSelect = styled(Select)({
  height: "30px",
  color: "#fff",
  "& label.Mui-focused": {
    color: "#fff",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#333",
    color: "#fff",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#333",
      color: "#fff",
    },
    "&:hover fieldset": {
      borderColor: "#333",
      color: "#fff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#333",
      color: "#fff",
      outline: "none",
    },
  },
});

const CreateMenu = ({variant}) => {
    const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isLoading, setIsLoading] = useState(false)
  const [activeStep, setActiveStep] = useState(0);
  const [Menu, setMenu] = useState("")
  const [Des, setDes] = useState("")
  const [value, setValue] = useState({
    MenuItem: "",
    Description: "",
    Price: "",
  });

  const [MealPeriod, setMealPeriod] = useState("choose");
  const [Category, setCategory] = useState("choose");
   const fileInputRef = useRef(null);
   const [selectedFile, setSelectedFile] = useState(" ");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValue({
      ...value,
      [name]: value,
    });
  };

     const handleAlert = (variant, message) => {
       // variant could be success, error, warning, info, or default
       enqueueSnackbar(message, { variant });
     };


  const handleCreateMenu = async () => {
    setIsLoading(true)
console.log(Menu, Des, MealPeriod, value.Price, Category, selectedFile);
    await createMenuList(
      Menu,
     Des,
      MealPeriod,
      value.Price,
      Category,
      selectedFile
    )
      .then((res) => {
        setIsLoading(false)
        console.log(res);
        const {data} = res;
        if(data?.status){
handleAlert("success", `${data?.success_message}`);
setOpen(false)
        }
        else{
          handleAlert("error", `${data?.error_message}`);
        }
      })
      .catch((err) => {
           setIsLoading(false);
               handleAlert("error", `${err.message} Error creating Menu , Try again`);
        console.log(err);
      });
  };
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

  

  return (
    <>
      {variant ? (
        <Button
          onClick={handleOpen}
          variant="contained"
          sx={{
         
          
         
            px: 3,
            "&:hover": { bgcolor: "#ffffffb7", color: "#2b2b2b" },
          }}
        >
          Create Menu
        </Button>
      ) : (
        <Button
          onClick={handleOpen}
          sx={{
            bgcolor: "#fff",
            color: "#2B2B2B",
            mt: 3,
            px: 3,
            "&:hover": { bgcolor: "#ffffffb7", color: "#2b2b2b" },
          }}
        >
          Create Menu
        </Button>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
              <Grid item lg={4}>
                {activeStep > 0 && (
                  <IconButton onClick={() => setActiveStep(0)}>
                    <ChevronLeftIcon sx={{ color: "#fff" }} />
                  </IconButton>
                )}
              </Grid>
              <Grid item lg={4}>
                <Typography
                  sx={{
                    fontFamily: "gordita",
                    color: "#fff",
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                >
                  New Menu Item
                </Typography>
              </Grid>
              <Grid item align="right" lg={4}>
                <IconButton onClick={handleClose}>
                  <CloseIcon sx={{ color: "#fff" }} />
                </IconButton>
              </Grid>
            </Grid>
          </Box>

          {activeStep === 0 ? (
            <>
              <Box sx={{ p: 3 }}>
                <Box sx={{ bgcolor: "#333", p: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderBottom: "1px solid #fff",
                      p: 2,
                    }}
                  >
                    <Typography
                      sx={{ fontWeight: 400, color: "#fff", fontSize: "14px" }}
                    >
                      Menu Item
                    </Typography>
                    <Box sx={{ width: "60%" }}>
                      <CssTextField
                        fullWidth
                        name="MenuItem"
                        value={Menu}
                        onChange={(e) => setMenu(e.target.value)}
                        InputProps={{
                          style: {
                            fontFamily: "Gordita",
                            fontSize: "13px",
                            borderRadius: "10px",
                            color: "#fff",
                          },
                        }}
                        size="small"
                        placeholder="|Enter menu item"
                        id="custom-css-outlined-input"
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderBottom: "1px solid #fff",
                      p: 2,
                    }}
                  >
                    <Typography
                      sx={{ fontWeight: 400, color: "#fff", fontSize: "14px" }}
                    >
                      Description
                    </Typography>
                    <Box sx={{ width: "60%" }}>
                      <CssTextField
                        fullWidth
                        name="Description"
                        value={Des}
                        onChange={(e) => setDes(e.target.value)}
                        InputProps={{
                          style: {
                            fontFamily: "Gordita",
                            fontSize: "13px",
                            borderRadius: "10px",
                            color: "#fff",
                          },
                        }}
                        size="small"
                        placeholder="Enter dish description"
                        id="custom-css-outlined-input"
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderBottom: "1px solid #fff",
                      p: 2,
                    }}
                  >
                    <Typography
                      sx={{ fontWeight: 400, color: "#fff", fontSize: "14px" }}
                    >
                      Meal Period
                    </Typography>

                    <Box sx={{ width: "60%" }}>
                      <CssTextField
                        select
                        value={MealPeriod}
                        onChange={(e) => setMealPeriod(e.target.value)}
                        defaultValue="choose"
                        fullWidth
                        InputProps={{
                          style: {
                            fontFamily: "Gordita",
                            fontSize: "13px",
                            borderRadius: "10px",
                            color: "#fff",
                            outline: "none",
                          },
                        }}
                        sx={{ border: "none" }}
                        size="small"
                        placeholder="Enter dish description"
                        id="custom-css-outlined-input"
                      >
                        <MenuItem
                          value="choose"
                          sx={{ fontSize: "12px" }}
                          disabled
                        >
                          Choose
                        </MenuItem>
                        <MenuItem value="Breakfast" sx={{ fontSize: "12px" }}>
                          Breakfast
                        </MenuItem>
                        <MenuItem value="Brunch" sx={{ fontSize: "12px" }}>
                          Brunch
                        </MenuItem>
                        <MenuItem value="Lunch" sx={{ fontSize: "12px" }}>
                          Lunch
                        </MenuItem>
                        <MenuItem value="Dinner" sx={{ fontSize: "12px" }}>
                          Dinner
                        </MenuItem>
                      </CssTextField>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderBottom: "1px solid #fff",
                      p: 2,
                    }}
                  >
                    <Typography
                      sx={{ fontWeight: 400, color: "#fff", fontSize: "14px" }}
                    >
                      Price
                    </Typography>

                    <Box sx={{ width: "60%" }}>
                      <CssTextField
                        fullWidth
                        type="number"
                        name="Price"
                        value={value.Price}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">₦</InputAdornment>
                          ),
                          style: {
                            fontFamily: "Gordita",
                            fontSize: "13px",
                            borderRadius: "10px",
                            color: "#fff",
                          },
                        }}
                        size="small"
                        id="custom-css-outlined-input"
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",

                      p: 2,
                    }}
                  >
                    <Typography
                      sx={{ fontWeight: 400, color: "#fff", fontSize: "14px" }}
                    >
                      Category
                    </Typography>

                    <Box sx={{ width: "60%" }}>
                      <CssTextField
                        fullWidth
                        select
                        value={Category}
                        onChange={(e) => setCategory(e.target.value)}
                        InputProps={{
                          style: {
                            fontFamily: "Gordita",
                            fontSize: "13px",
                            borderRadius: "10px",
                            color: "#fff",
                          },
                        }}
                        defaultValue="choose"
                        size="small"
                        id="custom-css-outlined-input"
                      >
                        <MenuItem
                          sx={{ fontSize: "12px" }}
                          value="choose"
                          disabled
                        >
                          Choose
                        </MenuItem>
                        <MenuItem
                          value="Starters/Appetizers"
                          sx={{ fontSize: "12px" }}
                        >
                          Starters/Appetizers{" "}
                        </MenuItem>
                        <MenuItem
                          sx={{ fontSize: "12px" }}
                          value="Main Courses"
                        >
                          Main Courses
                        </MenuItem>
                        <MenuItem
                          sx={{ fontSize: "12px" }}
                          value="Sides and Extras"
                        >
                          Sides and Extras
                        </MenuItem>
                        <MenuItem
                          sx={{ fontSize: "12px" }}
                          value="Dessert and Sweets"
                        >
                          Dessert and Sweets
                        </MenuItem>
                        <MenuItem sx={{ fontSize: "12px" }} value="Beverages">
                          Beverages
                        </MenuItem>
                        <MenuItem sx={{ fontSize: "12px" }} value="Others">
                          Others
                        </MenuItem>
                      </CssTextField>
                    </Box>
                  </Box>
                </Box>
                <Box align="right" sx={{ mt: 3 }}>
                  <Button
                    disabled={Category === "choose"}
                    variant="contained"
                    onClick={() => setActiveStep(1)}
                  >
                    Continue
                  </Button>
                </Box>
              </Box>
            </>
          ) : (
            <>
              <Box align="center" sx={{ p: 3, bgcolor: "#BC172F" }}>
                <Typography sx={{ color: "#fff" }}>
                  Upload image of menu item
                </Typography>
              </Box>
              {isLoading && <LinearProgress />}
              <Box
                sx={{
                  m: 3,
                  border: "1px dashed #fff",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "300px",
                  rowGap: 2,
                  bgcolor: "#333",
                }}
              >
                {selectedFileURL ? (
                  <Box>
                    <Avatar
                      variant="square"
                      src={selectedFileURL}
                      sx={{ width: "100px", height: "100px" }}
                      alt="Selected File"
                      onClick={handleButtonClick}
                    />
                  </Box>
                ) : (
                  <img
                    src={galleryImg}
                    alt="gallery_icon"
                    onClick={handleButtonClick}
                  />
                )}
                <Typography
                  sx={{ fontWeight: 200, fontSize: "12px", color: "#fff" }}
                >
                  Drag or drop your image here
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
              <Box align="right" sx={{ m: 3 }}>
                <Button
                  variant="contained"
                  disabled={isLoading}
                  onClick={handleCreateMenu}
                >
                  Upload
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default CreateMenu;
