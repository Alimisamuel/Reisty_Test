import React from 'react'
import TopNav from '../../Layout/TopNav'
import { Box, Typography, Button , Modal, Grid, IconButton} from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";

import emptyImg from '../../../assets/emptyRes.svg'
import NewGuest from '../../Components/NewGuest';


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
};

const GuestBookMain = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
      const updateClose = (state) => {
        setOpen(state);
      };
  return (
    <>
      <Box sx={{ p: 2, bgcolor: "#1a1a1a" }}>
        <Box sx={{ border: "0.5px solid #fff", bgcolor: "#000" }}>
          <Box
            sx={{
              p: 1,
              bgcolor: "#333",
              borderBottom: "0.5px solid #fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{ color: "#fff", fontWeight: 500, fontSize: "14px" }}
            >
              Guestbook
            </Typography>
            <Box>
              <Button onClick={handleOpen} variant="contained" sx={{ mr: 2 }}>
                {/* <img src={refresh}/> */}
                Create Guest
              </Button>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            height: "500px",
            bgcolor: "#1a1a1a",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={emptyImg} />
          <Typography
            sx={{ color: "#fff", fontSize: "16px", fontWeight: 400, mt: 3 }}
          >
            You have no guests on your guestbook{" "}
          </Typography>
          <Typography
            sx={{
              color: "#fff",
              fontWeight: 200,
              fontSize: "12px",
              textAlign: "center",
            }}
          >
            There are currently no guests in your guestbook list. To add a new
            list of guests, please click
            <br /> on the "Create Guest" button below.
          </Typography>
          <Button
            onClick={handleOpen}
            sx={{
              background: "#fff",
              color: "#333",
              px: 4,
              mt: 3,
              "&:hover": { bgcolor: "#ffffffb7" },
            }}
          >
            Create Guest
          </Button>
        </Box>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <NewGuest handleCloses={updateClose} />
        </Box>
      </Modal>
    </>
  );
}

export default GuestBookMain