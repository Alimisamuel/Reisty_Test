import React, { useEffect, useState } from "react";
import { Box, Typography, Button, IconButton, Grid } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import editIcon from "../../../assets/Icons/edit.svg";
import { ArrowBackSharp } from "@mui/icons-material";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import LoungeCard from "./LoungeCard";
import { deleteTables, getSingleFloorPlan } from "../../../axios/api";
import Loader from "../Common/Loader";
import CustomInput from "../CustomField/CustomInput";
import PostAddIcon from "@mui/icons-material/PostAdd";
import GradingIcon from "@mui/icons-material/Grading";
import deleteIcon from '../../../assets/Icons/delete.svg';

const Room = () => {
  const { id } = useParams();

  const [data, setData] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [ searchParams , setSearchParams] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [isSelect, setIsSelect]= useState(false);
  const [deleteIds, setDeleteId] = useState([])
  const [name, setName] = useState("")

  useEffect(()=>{
setFilteredData(data)
  },[data])

    const updateDelete = (newDataArray) => {
      setDeleteId(newDataArray);
    };
    // console.log(deleteIds)

 
  const handleGetSingleFloor = async () => {
    setIsLoading(true);
    await getSingleFloorPlan(id).then((res) => {
      console.log(res);
      setIsLoading(false)
      const { data } = res;
      if (data.status) {
        setData(data?.result[0].Tables);
        setName(data?.result[0]?.Name)
      }
      
    }).catch((err)=>{
      console.log(err)
      setIsLoading(false)
    });
  };
  useEffect(() => {
    handleGetSingleFloor();
  }, [id]);
  useEffect(()=>{
setFilteredData(data)
  },[data])

  const handleSearch = (event) =>{
  const searchParams = event.target.value.toLowerCase();
  const filtered = data.filter((item) =>
    item.Name.toLowerCase().includes(searchParams)

  );
  setFilteredData(filtered)
  setSearchParams(searchParams)
  }


  const handleDeleteTables = async () =>{
    await deleteTables(deleteIds).then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
  }
  //  const sortedTables = data && [...data].sort((a, b) =>
  //    a.Name.localeCompare(b.Name)
  //  );
  return (
    <>
      {isLoading && <Loader />}
      <Box
        sx={{
          borderBottom: "0.5px solid #fff",
          // mt: -1.3,
          bgcolor: "#1a1a1a",
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", columnGap: 3, alignItems: "center" }}>
          <Typography sx={{ color: "#fff", fontWeight: 500 }}>
            Rooms > {name}
          </Typography>
        </Box>
        <Box sx={{ width: "30%" }}>
          <CustomInput
            type="text"
            name="search tables..."
            value={searchParams}
            onChange={handleSearch}
          />
        </Box>
      </Box>
      <Box sx={{ p: 2 }}>
        <Box sx={{ border: "0.5px solid #fff" }}>
          <Box
            sx={{
              borderBottom: "0.5px solid #fff",
              p: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              bgcolor: "#333",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", columnGap: 2 }}>
              <Link to="/dashboard/table-rooms">
                <IconButton>
                  <ArrowBackSharp sx={{ color: "#fff" }} />
                </IconButton>
              </Link>
              <Typography sx={{ color: "#fff" }}>{name}</Typography>
            </Box>
            <Box>
              {isSelect ? (
                <Button
                  onClick={handleDeleteTables}
                  variant="contained"
                  sx={{
                    color: "#fff",
                    fontWeight: 400,
                    px: 6,
                    mr: 3,
                    fontSize: "13px",
                  }}
                >
                  <img src={deleteIcon} style={{ marginRight: "10px" }} />
                  Delete
                </Button>
              ) : (
                <Button
                  variant="contained"
                  sx={{
                    // border: "0.5px solid #fff",
                    color: "#fff",
                    fontWeight: 400,
                    px: 6,
                    mr: 3,
                    fontSize: "13px",
                  }}
                >
                  <PostAddIcon sx={{ mr: 1 }} />
                  Add More
                </Button>
              )}

              <IconButton onClick={() => setIsSelect(!isSelect)}>
                <GradingIcon sx={{ color: isSelect ? "#BC172F" : "#fff" }} />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
              {data &&
                filteredData?.map((item, index) => (
                  <Grid item lg={3} md={4} key={index}>
                    <LoungeCard
                      data={item}
                      select={isSelect}
                      updateDelete={updateDelete}
                      deleteArray={deleteIds}
                    />
                  </Grid>
                ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Room;
