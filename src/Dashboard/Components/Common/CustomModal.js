import React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { Box, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { IoMdClose } from "react-icons/io";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  backdrop: {
    transition:'0.1s all linear',
    backdropFilter: "blur(1px)",
    backgroundColor: "#000000b7",
  },
}));



const CustomModal = ({ open, onClose, children, title, width }) => {

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: width,
    bgcolor: "#1a1a1a",
    // border: "2px solid #000",
    boxShadow: 24,
 
    borderRadius: 1,
  };
  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={onClose}
      className={classes.modal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        // timeout: 500,
        className: classes.backdrop,
      }}
    >
      <Box sx={style} style={{maxHeight:'70vh', overflowY:'scroll'}}>
        <Box
          sx={{
            borderRadius:'5px 5px 0px 0px',
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor:'#333',
            borderBottom:'1px solid #BC172F',
            p:2
          }}
        >
          <Typography sx={{ fontSize: "16px", fontWeight: 500, color: "#fff" }}>
            {title}
          </Typography>
          <IconButton onClick={onClose}>
            <IoMdClose />
          </IconButton>
        </Box>
        

        {children}
      </Box>
    </Modal>
  );
};

export default CustomModal;
