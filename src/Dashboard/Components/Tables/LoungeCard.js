import { Box, IconButton, Typography, Popover, MenuItem, Modal, Checkbox } from '@mui/material'
import React, {useState} from 'react'
import SellIcon from "@mui/icons-material/Sell";
import TourOutlinedIcon from "@mui/icons-material/TourOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import ForwardOutlinedIcon from "@mui/icons-material/ForwardOutlined";
import Person4OutlinedIcon from "@mui/icons-material/Person4Outlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ClearIcon from "@mui/icons-material/Clear";

import EditDetails from './Modals/EditLounge';
import { deleteSingleTable } from '../../../axios/api';
import { useSnackbar } from "notistack";
import Loader from '../Common/Loader';
import img1 from '../../../assets/Icons/table/1.svg'
import img2 from '../../../assets/Icons/table/2.svg'
import img3 from '../../../assets/Icons/table/3.svg'
import img4 from '../../../assets/Icons/table/4.svg'
import img5 from '../../../assets/Icons/table/5.svg'



const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const LoungeCard = ({ data, select, updateDelete, deleteArray }) => {
    const { enqueueSnackbar } = useSnackbar();

  const [anchorEl, setAnchorEl] = React.useState(null);

   const [checkedIds, setCheckedIds] = useState([]);
   const [isLoading, setIsLoading] = useState(false)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAlert = (variant, message) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { variant });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleChecked = (Id) =>{
     if (deleteArray.includes(Id)) {
       // Uncheck: Remove the ID from the array
       updateDelete(deleteArray.filter((_id) => _id !== Id));
     } else {
       // Check: Add the ID to the array
        updateDelete([...deleteArray, Id]);
     }
  }

  const handleDeleteById = async (id)=>{
    setIsLoading(true)
    await deleteSingleTable(id).then((res)=>{
      console.log(res)
      setIsLoading(false)
       if (res?.data?.status) {
         handleAlert("success", `${res?.data?.success_message}`);
   
       } else {
         handleAlert("error", `${res?.data?.error_message}`);
       }

    }).catch((err)=>{
      setIsLoading(false)
      console.log(err)
       handleAlert("error", `${err.message}`);
    })
  }
  return (
    <>
      {isLoading && <Loader />}
      <Box
        sx={{ px: 2, py: 0.5, border: " 2px solid #474752", borderRadius: 1 }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", columnGap: 2, mb: 1 }}
          >
            <img src={img1} width={16} />
            <Typography
              sx={{ color: "#fff", fontWeight: 500, fontSize: "13px" }}
            >
              {data?.Name}
            </Typography>
          </Box>
          {select && (
            <Checkbox
              sx={{ color: "#fff" }}
              checked={deleteArray.includes(data?.Id)}
              onChange={() => handleChecked(data?.Id)}
            />
          )}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", columnGap: 2 }}>
          <img src={img2} width={16} />
          <Typography
            sx={{ color: "#fff", fontWeight: 500, fontSize: "12px", mb: 1 }}
          >
            {data?.Setting ? data?.Setting : "Table Setting"}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", columnGap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", columnGap: 2 }}>
            <img src={img3} width={16} />
            <Typography
              sx={{ color: "#fff", fontWeight: 500, fontSize: "12px" }}
            >
              {data?.Shape ? data.Shape : "Table Type"}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", columnGap: 1 }}>
            <img src={img4} width={16} />
            <Typography
              sx={{ color: "#fff", fontWeight: 500, fontSize: "12px" }}
            >
              {/* No of guests */}
              {data?.MinSize
                ? `${data?.MinSize} - ${data?.MaxSize} guests`
                : "No of guests"}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", columnGap: 2 }}>
            <img src={img5} width={16} />
            <Typography
              sx={{ color: "#fff", fontWeight: 500, fontSize: "12px" }}
            >
              {data?.Position}
            </Typography>
          </Box>
          <IconButton onClick={handleClick}>
            <MoreHorizOutlinedIcon sx={{ color: "#fff" }} />
          </IconButton>
        </Box>
      </Box>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={{ bgcolor: "#1E1E25" }}>
          {/* <ViewDetails/> */}
          <EditDetails data={data} />
          <MenuItem
            sx={{ fontWeight: 500, fontSize: "12px", color: "#fff" }}
            onClick={() => handleDeleteById(data?.Id)}
          >
            {" "}
            <ClearIcon color="primary" sx={{ mr: 2 }} />
            Delete
          </MenuItem>
        </Box>
      </Popover>
    </>
  );
};

export default LoungeCard