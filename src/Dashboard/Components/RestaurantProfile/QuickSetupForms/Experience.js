import { Box, Typography, InputLabel, TextField, Grid, Button, InputAdornment , ThemeProvider, createTheme} from '@mui/material'
import React, { useState } from 'react'
import { createExperience } from '../../../../axios/api'
import Loader from '../../Common/Loader'
import { useSnackbar } from "notistack";



const Experience = ({updateState, restaurantId}) => {
      const { enqueueSnackbar } = useSnackbar();

  const [deposit, setDeposit] = useState(0)

  const [isLoading, setIsLoading] = useState(false)
  const [cancellationPolicy, setCancellationPolicy] = useState("");
  const [description, setDescription] = useState("")


      const handleAlert = (variant, message) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(message, { variant });
      };
  const handleSubmit = async () =>{
    setIsLoading(true)
    await createExperience(restaurantId,  cancellationPolicy, deposit, description)
    .then((res)=>{
      setIsLoading(false)
      console.log(res)
        if (res?.data?.status) {
          handleAlert("success", `${res?.data?.success_message}`);
          updateState(3);
        } else {
          handleAlert("error", `${res?.data?.result.map((item) => item)}`);
        }
    }).catch((err)=>{
            setIsLoading(false);
      console.log(err)
        handleAlert("error", "Error sending request");
    })
  }
  return (
    <>
      {isLoading && <Loader />}
      <Box sx={{ bgcolor: "#1a1a1a", mt: 2, borderRadius: "5px" }}>
        <ThemeProvider
          theme={createTheme({
            palette: {
              mode: "dark",
              primary: {
                main: "#BC172F",
              },
            },
            typography: {
              fontFamily: "Gordita",
              fontSize: "14px",
              color: "#fff",
              fontWeight: 500,
            },
          })}
        >
          <Box sx={{ margin: "0 auto", width: "85%", py: 5 }}>
            <Typography
              variant="caption"
              sx={{ color: "#fff", fontWeight: 500 }}
            >
              Restaurant Experience
            </Typography>
            <Box sx={{ mt: 3 }}>
              <InputLabel
                sx={{
                  color: "#fff",
                  fontSize: "13px",
                  fontFamily: "Gordita",
                  mb: 1,
                  fontWeight: 500,
                }}
              >
                Deposit Per Person
              </InputLabel>

              <TextField
                type="number"
                size="large"
                sx={{ width: "60%" }}
                value={deposit}
                onChange={(e) => setDeposit(parseInt(e.target.value))}
                InputProps={{
                  style: {
                    fontFamily: "Gordita",
                    fontSize: "13px",
                    borderRadius: "10px",
                    offset: " 1px solid #ccc",
                    color: "#ccc",
                    fontWeight: 500,
                    border: "1px solid #ccc",

                    // Replace with your desired font family
                  },
                  startAdornment: (
                    <InputAdornment position="start">₦</InputAdornment>
                  ),
                }}
              />

              <Box sx={{ mt: 4 }}>
                <Typography sx={{ fontWeight: 500, color: "#fff" }}>
                  Restauranteer Experience
                </Typography>
                <Typography sx={{ mt: 5, color: "#fff" }}>
                  Peculiar message to Diner{" "}
                  <span
                    style={{
                      fontStyle: "italic",
                      fontSize: "12px",
                      fontWeight: 300,
                      color: "#fff",
                    }}
                  >
                    (This message is shown to the diner after booking a
                    reservation with you)
                  </span>
                </Typography>
                <TextField
                  type="number"
                  size="large"
                  fullWidth
                  multiline
                  rows={5}
                  placeholder="Description"
                  margin="dense"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  InputProps={{
                    style: {
                      fontFamily: "Gordita",
                      fontSize: "13px",
                      borderRadius: "10px",
                      offset: " 1px solid #ccc",
                      color: "#ccc",
                      fontWeight: 500,
                      border: "1px solid #ccc",

                      // Replace with your desired font family
                    },
                  }}
                />
                <Typography sx={{ mt: 3, color: "#fff" }}>
                  Cancellation Policy
                </Typography>
                <TextField
                  type="number"
                  size="large"
                  fullWidth
                  multiline
                  rows={5}
                  placeholder="Please add your cancellation policy"
                  margin="dense"
                  value={cancellationPolicy}
                  onChange={(e) => setCancellationPolicy(e.target.value)}
                  InputProps={{
                    style: {
                      fontFamily: "Gordita",
                      fontSize: "13px",
                      borderRadius: "10px",
                      offset: " 1px solid #ccc",
                      color: "#ccc",
                      fontWeight: 500,
                      border: "1px solid #ccc",

                      // Replace with your desired font family
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>
        </ThemeProvider>
      </Box>
      <Button
        variant="contained"
        onClick={handleSubmit}
        fullWidth
        sx={{ mt: 2 }}
      >
        Proceed
      </Button>
    </>
  );
}

export default Experience