import React from "react";
import {
  Modal,
  Box,
  LinearProgress,
  createTheme,
  ThemeProvider,
} from "@mui/material";

const style = {
  width: "100%",
    border: "none",
  position:'absolute',
  mt:8
//   left: "50%",
//   transform: "translate(-50%, -50%)",
};


const Loader = () => {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (

      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <LinearProgress />
        </Box>
      </Modal>

  );
};

export default Loader;
