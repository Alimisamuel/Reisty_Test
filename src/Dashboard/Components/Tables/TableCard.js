import React from 'react'
import { Box, Typography, IconButton, Avatar } from '@mui/material';
import editIcon from "../../../assets/Icons/edit.svg";
import deleteIcon from "../../../assets/Icons/delete.svg";
import background from "../../../assets/resta.jpg";

const TableCard = ({img, id, name}) => {
  
  return (
    <>
      <Box
        sx={{
          border: "0.5px solid #fff",
          height: "330px",
          display: "flex",
          flexDirection: "column",
          p: 1.7,
        }}
      >
        <Box
          src=""
          variant="square"
          sx={{
            width: "100%",
            height: "220px",
            backgroundImage: `url(${img})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 4,
          }}
        >
          <Box>
            <Typography
              sx={{
                color: "#fff",
                fontSize: "14px",
                mt: 1,
             fontWeight:500,
                cursor: "pointer",
                "&:hover": { color: "#ffffff80" },
              }}
            >
           {name}
            </Typography>
            <Typography
              sx={{
                color: "#fff",
                fontSize: "14px",
                mt: 1,
                textDecoration: "underline",
                cursor: "pointer",
                "&:hover": { color: "#ffffff80" },
              }}
            >
              Edit
            </Typography>
            <Typography
              sx={{
                color: "#fff",
                fontSize: "14px",
                mt: 1,
                textDecoration: "underline",
                cursor: "pointer",
                "&:hover": { color: "#ffffff80" },
              }}
            >
             Preview
            </Typography>
          </Box>
          <Box>
            <IconButton>
              <img src={deleteIcon} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default TableCard