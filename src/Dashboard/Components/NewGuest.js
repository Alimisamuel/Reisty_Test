import React, {useState} from 'react'
import { Box, Grid, Typography , TextField, IconButton, Button, ThemeProvider, createTheme} from '@mui/material'
import { alpha, styled } from "@mui/material/styles";
import avat from '../../assets/Icons/avat.svg'
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import img1 from '../../assets/Icons/guest/1.svg'
import img2 from '../../assets/Icons/guest/2.svg'
import img3 from '../../assets/Icons/guest/3.svg'
import img4 from '../../assets/Icons/guest/4.svg'
import img5 from '../../assets/Icons/guest/5.svg'
import img6 from '../../assets/Icons/guest/6.svg'
import { createGuestBook } from '../../axios/api';
import Loader from './Common/Loader';
import { useSnackbar } from "notistack";
import { useNavigate } from 'react-router-dom';


 const CssTextField = styled(TextField)({
   height: "30px",
   color: "#fff",
   fontWeight: 500,
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
       fontWeight: 500,
     },
     "&:hover fieldset": {
       borderColor: "#333",
       color: "#fff",
       fontWeight: 500,
     },
     "&.Mui-focused fieldset": {
       borderColor: "#333",
       color: "#fff",
       fontWeight: 500,
     },
   },
 });

const NewGuest = ({handleCloses, callBack}) => {
  const navigate = useNavigate()
    const [step, setStep] = useState(0);
    const updateCloses = () => {
      handleCloses(false);
    };
  const { enqueueSnackbar } = useSnackbar();
    const handleAlert = (variant, message) => {
      // variant could be success, error, warning, info, or default
      enqueueSnackbar(message, { variant });
    };

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [country, setCountry] = useState("Nigeria")
    const [dob, setDob] = useState("")
const [weddingAnniversary, setWeddingAnniversary] = useState("")
const [graduationAnniversary, setgraduationAnniversary] = useState("")
const [isLoading, setIsLoading] = useState(false)

    const handleCreateGuest = async () =>{
      setIsLoading(true)
      console.log(firstName, lastName, phone, email, country, dob, graduationAnniversary, weddingAnniversary)
      await createGuestBook(
        firstName,
        lastName,
        phone,
        email,
        country,
        dob,
        graduationAnniversary,
        weddingAnniversary
      ).then((res)=>{
        setIsLoading(false)
        const {data } = res;
        if(data?.status){
handleAlert("success", `${data?.success_message}`);
// navigate("/dashboard/guest-book");
callBack()
handleCloses()
        }
        else{
          handleAlert("error", `${data?.error_message}`);
        }
        console.log(res)
      }).catch((err)=>{
          setIsLoading(false);
        console.log(err)
         handleAlert("error", `${err}`);
      })
    }
  return (
    <>
      <>
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
            <Grid item lg={4}>
              {step > 0 && (
                <>
                  <IconButton onClick={() => setStep((prev) => prev - 1)}>
                    <ArrowBackIcon sx={{ color: "#fff" }} />
                  </IconButton>
                </>
              )}
            </Grid>
            <Grid item lg={4}>
              <Typography
                sx={{
                  fontFamily: "gordita",
                  color: "#fff",
                  textAlign: "center",
                  fontSize: "16px",
                  fontWeight: 500,
                }}
              >
                New Guest
              </Typography>
            </Grid>
            <Grid item align="right" lg={4}>
              <IconButton onClick={updateCloses}>
                <CloseIcon sx={{ color: "#fff" }} />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
        {step === 0 && (
          <Box
            sx={{
              bgcolor: "#1A1A1A",
              px: 5,
              // height: "600px",
              overflow: "scroll",
              py: 2,
            }}
          >
            <Box align="center" sx={{ mt: 6 }}>
              <img src={avat} />
            </Box>
            <Box sx={{ mt: 3, bgcolor: "#333" }}>
              <Box sx={{ borderBottom: "0.5px solid #fff", py: 2, px: 3 }}>
                <Grid container>
                  <Grid item lg={6}>
                    <Typography
                      sx={{ color: "#fff", fontSize: "13px", fontWeight: 400 }}
                    >
                      First Name *
                    </Typography>
                  </Grid>
                  <Grid item lg={6}>
                    <Box sx={{}}>
                      <CssTextField
                        fullWidth
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        InputProps={{
                          style: {
                            fontFamily: "Gordita",
                            fontSize: "13px",
                            borderRadius: "10px",
                            color: "#fff",
                            fontWeight: 500,
                          },
                        }}
                        size="small"
                        placeholder="Enter first name"
                        id="custom-css-outlined-input"
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ borderBottom: "0.5px solid #fff", py: 2, px: 3 }}>
                <Grid container>
                  <Grid item lg={6}>
                    <Typography
                      sx={{ color: "#fff", fontSize: "13px", fontWeight: 400 }}
                    >
                      Last Name *
                    </Typography>
                  </Grid>
                  <Grid item lg={6}>
                    <Box sx={{}}>
                      <CssTextField
                        fullWidth
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        InputProps={{
                          style: {
                            fontFamily: "Gordita",
                            fontSize: "13px",
                            borderRadius: "10px",
                            color: "#fff",
                            fontWeight: 500,
                          },
                        }}
                        size="small"
                        placeholder="Last Name"
                        id="custom-css-outlined-input"
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ borderBottom: "0.5px solid #fff", py: 2, px: 3 }}>
                <Grid container>
                  <Grid item lg={6}>
                    <Typography
                      sx={{ color: "#fff", fontSize: "13px", fontWeight: 400 }}
                    >
                      Phone Number *
                    </Typography>
                  </Grid>
                  <Grid item lg={6}>
                    <Box sx={{}}>
                      <CssTextField
                        type="number"
                        fullWidth
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        InputProps={{
                          style: {
                            fontFamily: "Gordita",
                            fontSize: "13px",
                            borderRadius: "10px",
                            color: "#fff",
                            fontWeight: 500,
                          },
                        }}
                        size="small"
                        placeholder="Phone Number"
                        id="custom-css-outlined-input"
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ borderBottom: "0.5px solid #fff", py: 2, px: 3 }}>
                <Grid container>
                  <Grid item lg={6}>
                    <Typography
                      sx={{ color: "#fff", fontSize: "13px", fontWeight: 400 }}
                    >
                      Email Address *
                    </Typography>
                  </Grid>
                  <Grid item lg={6}>
                    <Box sx={{}}>
                      <CssTextField
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        InputProps={{
                          style: {
                            fontFamily: "Gordita",
                            fontSize: "13px",
                            borderRadius: "10px",
                            color: "#fff",
                            fontWeight: 500,
                          },
                        }}
                        size="small"
                        placeholder="Email address"
                        id="custom-css-outlined-input"
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ borderBottom: "0.5px solid #fff", py: 2, px: 3 }}>
                <Grid container>
                  <Grid item lg={6}>
                    <Typography
                      sx={{ color: "#fff", fontSize: "13px", fontWeight: 400 }}
                    >
                      Birthday
                    </Typography>
                  </Grid>
                  <Grid item lg={6}>
                    <Box sx={{}}>
                  <ThemeProvider theme={createTheme({
                    palette:{
                      mode:'light'
                    }
                  })}>
                      <CssTextField
                        type="date"
                        value={dob}
                        required
                        onChange={(e) => setDob(e.target.value)}
                        InputProps={{
                          style: {
                            fontFamily: "Gordita",
                            fontSize: "13px",
                            borderRadius: "10px",
                            color: "#fff",
                            fontWeight: 500,
                          },
                        }}
                        size="small"
                        placeholder="e.g Jan 1"
                        id="custom-css-outlined-input"
                      />
               </ThemeProvider>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
             
            </Box>
            <Box sx={{ mt: 2, mb: 3  }} align="right">
              <Button
                disabled={!firstName || !lastName || !email || !phone}
                variant="contained"
                onClick={handleCreateGuest}
                sx={{'&:disabled':{
               bgcolor:'#d4d4d4', color:'#333', opacity:0.8
                }, px:6}}
              >
                Proceed
              </Button>
            </Box>
          </Box>
        )}
        {step === 4 && (
          <Box
            sx={{
              bgcolor: "#1A1A1A",
              px: 5,
              // height: "600px",
              overflow: "scroll",
              py: 2,
            }}
          >
            <Box sx={{ mt: 3, bgcolor: "#333" }}>
              <Box sx={{ borderBottom: "0.5px solid #fff", py: 2, px: 3 }}>
                <Grid container>
                  <Grid item lg={6}>
                    <Typography
                      sx={{ color: "#fff", fontSize: "13px", fontWeight: 400 }}
                    >
                      Home Address
                    </Typography>
                  </Grid>
                  <Grid item lg={6}>
                    <Box sx={{}}>
                      <CssTextField
                        InputProps={{
                          style: {
                            fontFamily: "Gordita",
                            fontSize: "13px",
                            borderRadius: "10px",
                            color: "#fff",
                            fontWeight: 500,
                          },
                        }}
                        size="small"
                        placeholder="Home Address"
                        id="custom-css-outlined-input"
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ borderBottom: "0.5px solid #fff", py: 2, px: 3 }}>
                <Grid container>
                  <Grid item lg={6}>
                    <Typography
                      sx={{ color: "#fff", fontSize: "13px", fontWeight: 400 }}
                    >
                      office Address
                    </Typography>
                  </Grid>
                  <Grid item lg={6}>
                    <Box sx={{}}>
                      <CssTextField
                        InputProps={{
                          style: {
                            fontFamily: "Gordita",
                            fontSize: "13px",
                            borderRadius: "10px",
                            color: "#fff",
                            fontWeight: 500,
                          },
                        }}
                        size="small"
                        placeholder="Office Address"
                        id="custom-css-outlined-input"
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Box sx={{ mt: 2, mb: 3 }} align="right">
              <Button
                variant="contained"
                sx={{ bgcolor: "#fff", color: "#333" }}
                onClick={() => setStep((prev) => prev + 2)}
              >
                Skip
              </Button>
              <Button
                variant="contained"
                sx={{ ml: 3 }}
                onClick={() => setStep((prev) => prev + 1)}
              >
                Proceed
              </Button>
            </Box>
          </Box>
        )}
        {step === 1 && (
          <Box
            sx={{
              bgcolor: "#1A1A1A",
              px: 5,
              // height: "600px",
              overflow: "scroll",
              py: 2,
            }}
          >
            <Box sx={{ mt: 3, bgcolor: "#333" }}>
              <Box sx={{ borderBottom: "0.5px solid #fff", py: 2, px: 3 }}>
                <Grid container></Grid>
              </Box>
            </Box>
            <Box sx={{ mt: 2, mb: 3 }} align="right">
              <Button
                variant="contained"
                sx={{ ml: 3 }}
                disabled={isLoading || !dob}
                // onClick={() => setStep((prev) => prev + 1)}
                onClick={handleCreateGuest}
              >
                Proceed
              </Button>
            </Box>
          </Box>
        )}
        {step === 2 && (
          <Box
            sx={{
              bgcolor: "#1A1A1A",
              px: 5,
              // height: "600px",
              overflow: "scroll",
              py: 2,
            }}
          >
            <Box sx={{ mt: 5 }}>
              <Grid container spacing={2}>
                <Grid item lg={6}>
                  <Box
                    sx={{
                      border: "1px dashed #fff",
                      p: 1.5,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        columnGap: 2,
                      }}
                    >
                      <img src={img1} />
                      <Typography
                        sx={{
                          color: "#fff",
                          fontWeight: 400,
                          fontSize: "12px",
                        }}
                      >
                        Visit Notes
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        cursor: "pointer",
                        color: "#fff",
                        fontWeight: 400,
                        fontSize: "12px",
                        textDecoration: "underline",
                      }}
                    >
                      Add
                    </Typography>
                  </Box>
                </Grid>
                <Grid item lg={6}>
                  <Box
                    sx={{
                      border: "1px dashed #fff",
                      p: 1.5,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        columnGap: 2,
                      }}
                    >
                      <img src={img4} />
                      <Typography
                        sx={{
                          color: "#fff",
                          fontWeight: 400,
                          fontSize: "12px",
                        }}
                      >
                        special Relationship
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        cursor: "pointer",
                        color: "#fff",
                        fontWeight: 400,
                        fontSize: "12px",
                        textDecoration: "underline",
                      }}
                    >
                      Add
                    </Typography>
                  </Box>
                </Grid>
                <Grid item lg={6}>
                  <Box
                    sx={{
                      border: "1px dashed #fff",
                      p: 1.5,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        columnGap: 2,
                      }}
                    >
                      <img src={img2} />
                      <Typography
                        sx={{
                          color: "#fff",
                          fontWeight: 400,
                          fontSize: "12px",
                        }}
                      >
                        Guest diary restrictions
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        cursor: "pointer",
                        color: "#fff",
                        fontWeight: 400,
                        fontSize: "12px",
                        textDecoration: "underline",
                      }}
                    >
                      Add
                    </Typography>
                  </Box>
                </Grid>
                <Grid item lg={6}>
                  <Box
                    sx={{
                      border: "1px dashed #fff",
                      p: 1.5,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        columnGap: 2,
                      }}
                    >
                      <img src={img5} />
                      <Typography
                        sx={{
                          color: "#fff",
                          fontWeight: 400,
                          fontSize: "12px",
                        }}
                      >
                        Siting preference
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        cursor: "pointer",
                        color: "#fff",
                        fontWeight: 400,
                        fontSize: "12px",
                        textDecoration: "underline",
                      }}
                    >
                      Add
                    </Typography>
                  </Box>
                </Grid>
                <Grid item lg={6}>
                  <Box
                    sx={{
                      border: "1px dashed #fff",
                      p: 1.5,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        columnGap: 2,
                      }}
                    >
                      <img src={img3} />
                      <Typography
                        sx={{
                          color: "#fff",
                          fontWeight: 400,
                          fontSize: "12px",
                        }}
                      >
                        Food & drink preference
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        cursor: "pointer",
                        color: "#fff",
                        fontWeight: 400,
                        fontSize: "12px",
                        textDecoration: "underline",
                      }}
                    >
                      Add
                    </Typography>
                  </Box>
                </Grid>
                <Grid item lg={6}>
                  <Box
                    sx={{
                      border: "1px dashed #fff",
                      p: 1.5,
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        columnGap: 2,
                      }}
                    >
                      <img src={img6} />
                      <Typography
                        sx={{
                          color: "#fff",
                          fontWeight: 400,
                          fontSize: "12px",
                        }}
                      >
                        Alert the chef
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        cursor: "pointer",
                        color: "#fff",
                        fontWeight: 400,
                        fontSize: "12px",
                        textDecoration: "underline",
                      }}
                    >
                      Add
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ mt: 2, mb: 3 }} align="right">
              <Button
                variant="contained"
                sx={{ ml: 3 }}
                onClick={() => setStep((prev) => prev + 1)}
              >
                Done
              </Button>
            </Box>
          </Box>
        )}
      </>
    </>
  );
}

export default NewGuest