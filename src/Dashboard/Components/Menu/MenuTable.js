import { Box, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'
import delIcon from '../../../assets/Icons/delete.svg'

const MenuTable = ({data}) => {
  return (
    <>
      <Table
    
        sx={{ border: "0.5px solid #fff", borderRadius: "0px  0px 10px 10px" , }}
      >
        <TableHead sx={{ bgcolor: "#1a1a1a", height: "50px" , border: "0.5px solid #fff",  }}>
          <TableRow>
            <TableCell
              sx={{ borderRight: "0.2px solid #fff", textAlign: "center",fontFamily:'gordita', color:'#fff', fontSize:'14px', fontWeight:500 }}
            >
              Menu Item
            </TableCell>
            <TableCell
                 sx={{ borderRight: "0.2px solid #fff", textAlign: "center",fontFamily:'gordita', color:'#fff', fontSize:'14px', fontWeight:500 }}
            >
              Description
            </TableCell>
            <TableCell
                 sx={{ borderRight: "0.2px solid #fff", textAlign: "center",fontFamily:'gordita', color:'#fff', fontSize:'14px', fontWeight:500 }}
            >
              Price
            </TableCell>
            <TableCell
                 sx={{ borderRight: "0.2px solid #fff", textAlign: "center",fontFamily:'gordita', color:'#fff', fontSize:'14px', fontWeight:500 }}
            >
              Category
            </TableCell>
            <TableCell
                 sx={{ borderRight: "0.2px solid #fff", textAlign: "center",fontFamily:'gordita', color:'#fff', fontSize:'14px', fontWeight:500 }}
            >
              Image
            </TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((item, index) => (
              <TableRow key={index}>
                <TableCell
                  sx={{
                    borderRight: "0.2px solid #fff",
                    textAlign: "center",
                    fontSize: "12px",
                    color:'#fff', fontFamily:'gordita', 
                  }}
                >
                  {item[0]?.MenuItem}
                </TableCell>
                <TableCell
                  sx={{
                    width: "30%",
                    borderRight: "0.2px solid #fff",
                    textAlign: "center",
                    fontSize: "12px",     color:'#fff', fontFamily:'gordita', 
                  }}
                >
                  {item[0]?.Description}
                </TableCell>
                <TableCell
                  sx={{
                    borderRight: "0.2px solid #fff",
                    textAlign: "center",
                    fontSize: "12px",     color:'#fff', fontFamily:'gordita', 
                  }}
                >
                  {" "}
                  ₦{item[0]?.Price?.toLocaleString()}
                </TableCell>
                <TableCell
                  sx={{
                    borderRight: "0.2px solid #fff",
                    textAlign: "center",
                    fontSize: "12px",
                         color:'#fff', fontFamily:'gordita', 
                  }}
                >
                  {item[0]?.Category}
                </TableCell>
                <TableCell
                     sx={{ borderRight: "0.2px solid #fff", }}
                >
                  <Box sx={{display:'grid', placeItems:'center'}}>
                  <Box sx={{width:'156px', height:'70px',background:`url('${item[0].Image}')`, backgroundSize:'cover', backgroundPosition:'center'}}>
        
                  </Box></Box>
                </TableCell>
                <TableCell align="center">
                  <IconButton>
                    <img src={delIcon} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}

export default MenuTable