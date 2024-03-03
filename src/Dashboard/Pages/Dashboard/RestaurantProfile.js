import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import emptyRes from "../../../assets/emptyRes.svg";
import background from "../../../assets/resta.jpg";
import background2 from "../../../assets/ressta.jpg";
import editIcon from "../../../assets/Icons/edit.svg";
import deleteIcon from "../../../assets/Icons/delete.svg";
import { Link } from "react-router-dom";
import { deleteRestaurant, getRestuarentProfile } from "../../../axios/api";
import { useDispatch, useSelector } from "react-redux";
import { getRestuarents } from "../../../store/restaurantSlice";
import { CgExtensionAdd } from "react-icons/cg";
import { RiDeleteBin7Fill } from "react-icons/ri";
import Modal from '@mui/material/Modal';
import { useSnackbar } from "notistack";
import Loader from "../../Components/Common/Loader";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#000',

  boxShadow: 24,

};

const RestaurantProfile = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState("")
  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };

  const [created, setCreated] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = (newValue) => {
    setId(newValue)
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch()
  const restaurantList = useSelector((state)=>state.restaurants.data.result)

  useEffect(()=>{
dispatch(getRestuarents())
  },[])

  const handleDeleteRestaurant = async () =>{
    setIsLoading(true)
    await deleteRestaurant(id).then((res)=>{
      const {data} = res;
      console.log(data)
      setIsLoading(false)
      if(data?.status){
setOpen(false);
        dispatch(getRestuarents())
        handleAlert("success", `Deleted successfully`);
      }else{
        handleAlert("error", `Not Deleted `);
      }
    }).catch((err)=>{
      setIsLoading(false)
      console.log(err);
      handleAlert("error", `${err.message} `);
    })
  }


  return (
    <Box>
      {
        isLoading && <Loader/>
      }
      <Header title="Restaurant Profile" />
      {!restaurantList ? (
        <Box
          sx={{
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              px: 2,
            }}
          >
            <Box>
              <img src={emptyRes} alt="emptyRes" />
            </Box>
            <Box align="center">
              <Typography
                variant="caption"
                sx={{ color: "#fff", fontFamily: "gordita", fontSize: "16px" }}
              >
                No restaurant profile found
              </Typography>
              <Typography
                sx={{
                  color: "#cccccc",
                  fontFamily: "gordita",
                  fontSize: "12px",
                }}
              >
                You have no restaurant profile . Click on “add new” to add a new
                restaurant profile
              </Typography>
            </Box>
            <Link to="/quick-setup">
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  background: "#fff",
                  color: "#1a1a1a",
                  "&:hover": { background: "#dadada", color: "black" },
                }}
              >
                Quick Setup
              </Button>
            </Link>
          </Box>
        </Box>
      ) : (
        <>
          <Box sx={{ px: 2, py: 3, height: "80vh", overflow: "scroll" }}>
            <Grid container spacing={2}>
              <Grid item lg={2} md={3} xs={12}>
                <Box>
                  <Link to="/quick-setup">
                    <Box
                      sx={{
                        border: "0.5px dashed #fff",
                        height: "250px",
                        display: "grid",
                        placeItems: "center",
                        p: 1.7,
                        cursor: "pointer",
                      }}
                    >
                      <Box align="center">
                        <CgExtensionAdd
                          style={{ color: "#FFF", fontSize: "40px" }}
                        />
                        <Typography sx={{color:'#fff', fontWeight:500, fontSize:'12px'}}>Create Restaurant</Typography>
                      </Box>
                    </Box>
                  </Link>
                </Box>
              </Grid>
              {restaurantList.map((item) => (
                <Grid item lg={2} md={3} xs={12}>
                  <Box
                    sx={{
                      border: "0.5px solid #fff",
                      height: "250px",
                      display: "flex",
                      flexDirection: "column",
                      p: 1,
                    }}
                  >
                    <Box
                      src=""
                      variant="square"
                      sx={{
                        width: "100%",
                        height: "220px",
                        backgroundImage: `url(${item.Logo})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "contain",
                      }}
                    >
                      <IconButton
                      onClick={()=>handleOpen(item?.Id)}
                        sx={{
                          borderRadius: "0px",
                          bgcolor: "#333",
                          m: 1,
                          "&:hover": { bgcolor: "#2b2b2bb7" },
                        }}
                      >
                   <RiDeleteBin7Fill style={{color:'#fff', fontSize:'14px'}} />
                      </IconButton>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mt: 2,
                      }}
                    >
                      <Box>
                        <Typography
                          sx={{
                            color: "#fff",
                            fontSize: "14px",
                            fontWeight: 500,
                          }}
                        >
                          {item.Name}
                        </Typography>
                        {/* <Typography
                          sx={{
                            color: "#fff",
                            fontSize: "14px",
                            mt: 1,
                            textDecoration: "underline",
                            cursor: "pointer",
                            "&:hover": { color: "#ffffff80" },
                          }}
                        >
                          View info
                        </Typography> */}
                      </Box>
                      <Box>
                        {/* <IconButton>
                          <img src={deleteIcon} />
                        </IconButton> */}
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </>
      )}

<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <Box sx={{bgcolor:'#1a1a1a', px:2, py:1,  borderBottom:'1px solid #BC172F'}}>
<Typography sx={{color:'#fff', fontWeight:'bolder',}}>Are you sure you want to delete  ?</Typography>
         </Box>
         <Box sx={{p:3, display:'flex', justifyContent:'space-between', columnGap:3}}>
          <Button variant="contained" onClick={handleDeleteRestaurant} fullWidth>Yes</Button>
          <Button variant="outlined" fullWidth onClick={handleClose}>No</Button>
         </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default RestaurantProfile;

// export const RestaurantCard = () =>{
//   return (
//     <>
//       <Box
//         sx={{
//           border: "0.5px solid #fff",
//           height: "330px",
//           display: "flex",
//           flexDirection: "column",
//           p: 1.7,
//         }}
//       >
//         <Box
//           src=""
//           variant="square"
//           sx={{
//             width: "100%",
//             height: "220px",
//             backgroundImage: `url(${background})`,
//             backgroundRepeat: "no-repeat",
//             backgroundSize: "cover",
//           }}
//         >
//           <IconButton

//             sx={{
//               borderRadius: "0px",
//               bgcolor: "#2b2b2b",
//               m: 1,
//               "&:hover": { bgcolor: "#2b2b2bb7" },
//             }}
//           >
//             <img src={editIcon} />
//           </IconButton>
//         </Box>
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             mt: 4,
//           }}
//         >
//           <Box>
//             <Typography sx={{ color: "#fff", fontSize: "16px" }}>
//               Main Lounge
//             </Typography>
//             <Typography
//               sx={{
//                 color: "#fff",
//                 fontSize: "14px",
//                 mt: 1,
//                 textDecoration: "underline",
//                 cursor: "pointer",
//                 "&:hover": { color: "#ffffff80" },
//               }}
//             >
//               View info
//             </Typography>
//           </Box>
//           <Box>
//             <IconButton>
//               <img src={deleteIcon} />
//             </IconButton>
//           </Box>
//         </Box>
//       </Box>
   
//     </>
//   );
// }
