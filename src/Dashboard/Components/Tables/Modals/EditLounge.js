import React, { useEffect, useState } from "react";
import {
  MenuItem,
  Typography,
  Modal,
  Box,
  IconButton,
  Grid,
  TextField,
  InputLabel,
  Select,
  Divider,
  Button,
  LinearProgress,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { CloseOutlined } from "@mui/icons-material";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import CustomInput from "../../CustomField/CustomInput";
import { editTable } from "../../../../axios/api";
import { useSnackbar } from "notistack";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 520,
  bgcolor: "#1a1a1a",
  // border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 2,
  // p: 4,
};

const EditDetails = ({ data }) => {
 const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState("");
  const [settings, setSettings] = useState("");
  const [rows, setRows] = useState("");
  const [color, setColor] = useState("");
  const [shape, setShape] = useState("");
  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

   const handleAlert = (variant, message) => {
     // variant could be success, error, warning, info, or default
     enqueueSnackbar(message, { variant });
   };

  useEffect(() => {
    setName(data?.Name);
    setSettings(data?.Setting);
    setColor(data?.Color);
    setShape(data?.Shape);
    setRows(data?.Position);
    setMin(data?.MinSize);
    setMax(data?.MaxSize);
  }, [data]);

  const handleEdit = async () => {
    setIsLoading(true);
    console.log(name, rows, settings, shape, color, data?.Id, min, max);
    await editTable(name, rows, settings, shape, color, data?.Id, min, max)
      .then((res) => {
        setIsLoading(false);
const {data} = res;
if(data.status){
  handleAlert("success", "Table updated successfully")
}
else{
handleAlert("error", `${data?.result[0]}`)
}
        console.log(res);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        handleAlert("error", err.message)
      });
  };
  return (
    <>
      <MenuItem onClick={handleOpen}>
        <DriveFileRenameOutlineOutlinedIcon sx={{ color: "#fff" }} />{" "}
        <Typography
          sx={{ color: "#fff", ml: 2, fontSize: "12px", fontWeight: 500 }}
        >
          Edit Table details
        </Typography>
      </MenuItem>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              p: 2,
              bgcolor: "#333",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "2px solid #fff",
            }}
          >
            <Typography sx={{ color: "#fff", fontWeight: 500 }}>
              Confirmation
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseOutlined sx={{ color: "#fff" }} />
            </IconButton>
          </Box>
          {isLoading && <LinearProgress />}
          <Box sx={{ borderBottom: "1px solid #fff", pb: 2, m: 2 }}>
            <Typography sx={{ color: "#fff", fontSize: "13px", mt: 2 }}>
              Are you sure you want to delete the table with the following
              details?
            </Typography>
          </Box>

          <Box sx={{ p: 3 }}>
            <Grid container spacing={2}>
              <Grid item lg={12} md={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ color: "#fff", fontSize: "13px" }}>
                    Table Name
                  </Typography>
                  <TextField
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ width: "60%" }}
                    InputProps={{
                      style: {
                        fontFamily: "Gordita",
                        fontSize: "13px",
                        borderRadius: "10px",
                        border: "1px solid #fff",
                        color: "#fff",
                        offset: " 1px solid #fff",
                      },
                    }}
                  />
                </Box>
              </Grid>
              <Grid item lg={12} md={12}>
                <Box>
                  <InputLabel sx={{ color: "#fff", mt: 1, fontSize: "13px" }}>
                    Table Setting
                  </InputLabel>
                  <Select
                    value={settings}
                    onChange={(e) => setSettings(e.target.value)}
                    fullWidth
                    sx={{
                      mt: 1,
                      border: "1px solid #fff",
                      color: "#fff",
                      borderRadius: "10px",
                      fontSize: "12px",
                    }}
                    displayEmpty
                  >
                    <MenuItem value="Formal" sx={{ fontSize: "12px" }}>
                      Formal
                    </MenuItem>
                    <MenuItem value="Casual" sx={{ fontSize: "12px" }}>
                      Casual
                    </MenuItem>
                    <MenuItem value="Breakfast" sx={{ fontSize: "12px" }}>
                      Breakfast
                    </MenuItem>
                    <MenuItem value="Buffet" sx={{ fontSize: "12px" }}>
                      Buffet
                    </MenuItem>
                    <MenuItem value="Five-Course" sx={{ fontSize: "12px" }}>
                      Five-Course
                    </MenuItem>
                  </Select>
                </Box>
              </Grid>
              <Grid item lg={12} md={12}>
                <Box>
                  <InputLabel sx={{ color: "#fff", mt: 1, fontSize: "13px" }}>
                    No of seats
                  </InputLabel>
                  <Grid container spacing={2}>
                    <Grid item lg={6} md={6}>
                      <InputLabel
                        sx={{ color: "#fff", fontSize: "10px", my: 1 }}
                      >
                        Min
                      </InputLabel>
                      <CustomInput
                        type="number"
                        value={min}
                        name="0"
                        onChange={(e) => setMin(parseInt(e.target.value))}
                      />
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <InputLabel
                        sx={{ color: "#fff", fontSize: "10px", my: 1 }}
                      >
                        Max
                      </InputLabel>
                      <CustomInput
                        type="number"
                        value={max}
                        name="0"
                        onChange={(e) => setMax(parseInt(e.target.value))}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item lg={6} md={6}>
                <Box>
                  <InputLabel sx={{ color: "#fff", fontSize: "13px" }}>
                    Table Position
                  </InputLabel>
                  <Select
                    value={rows}
                    onChange={(e) => setRows(e.target.value)}
                    fullWidth
                    sx={{
                      mt: 1.7,
                      border: "1px solid #fff",
                      color: "#fff",
                      borderRadius: "10px",
                      fontSize: "12px",
                    }}
                    displayEmpty
                  >
                    <MenuItem value="Front row" sx={{ fontSize: "12px" }}>
                      Front row
                    </MenuItem>
                    <MenuItem value="Centre" sx={{ fontSize: "12px" }}>
                      Centre
                    </MenuItem>
                    <MenuItem value="Window side" sx={{ fontSize: "12px" }}>
                      Window side
                    </MenuItem>
                    <MenuItem value="Corner" sx={{ fontSize: "12px" }}>
                      Corner
                    </MenuItem>
                    <MenuItem value="Other" sx={{ fontSize: "12px" }}>
                      Other
                    </MenuItem>
                  </Select>
                </Box>
              </Grid>

              <Grid item lg={6} md={6}>
                <Box>
                  <InputLabel sx={{ color: "#fff", mt: 1, fontSize: "13px" }}>
                    Table Shape
                  </InputLabel>
                  <Select
                    fullWidth
                    value={shape}
                    onChange={(e) => setShape(e.target.value)}
                    sx={{
                      mt: 1,
                      border: "1px solid #fff",
                      color: "#fff",
                      borderRadius: "10px",
                      fontSize: "12px",
                    }}
                    displayEmpty
                  >
                    <MenuItem value="Square" sx={{ fontSize: "12px" }}>
                      Square
                    </MenuItem>
                    <MenuItem value="Rectangle" sx={{ fontSize: "12px" }}>
                      Rectangle
                    </MenuItem>
                    <MenuItem value="Circle" sx={{ fontSize: "12px" }}>
                      Circle
                    </MenuItem>
                    <MenuItem value="Oval" sx={{ fontSize: "12px" }}>
                      Oval
                    </MenuItem>
                    <MenuItem value="Custom" sx={{ fontSize: "12px" }}>
                      Custom
                    </MenuItem>
                  </Select>
                </Box>
              </Grid>
            
            </Grid>
            <Box
              sx={{
                pt: 2,
                mt: 3,
                display: "flex",
                alignItems: "center",
                columnGap: 2,
              }}
            >
              <Button sx={{ bgcolor: "#fff", color: "#333" }} fullWidth>
                Cancel
              </Button>
              <Button
                variant="contained"
                fullWidth
                onClick={handleEdit}
                disabled={isLoading}
              >
                Update
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default EditDetails;
