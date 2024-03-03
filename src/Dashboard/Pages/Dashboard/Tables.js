import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  InputLabel,
  TextField,
  IconButton,
} from "@mui/material";
import emptyIcon from "../../../assets/emptyRes.svg";
import userAdd from "../../../assets/Icons/user-add.svg";
import { Link } from "react-router-dom";
import TableCard from "../../Components/Tables/TableCard";
import { getFloorPlan } from "../../../axios/api";
import Loader from "../../Components/Common/Loader";

const Tables = () => {
  const [show, setShow] = useState(true);
  const [planData, setPlanData] = useState(null)
const [loading, setLoading] = useState(false)

  const handleGetFloorPlan = async () =>{
    setLoading(true)
    await getFloorPlan().then((res)=>{
      console.log(res)
      setLoading(false)
      const {data} = res;
      if(data.status){
        setPlanData(data?.result)
      }
      else{
setPlanData(null)
      }

    }).catch((err)=>{
      console.log(err)
            setLoading(false);
    })
  }
  useEffect(()=>{
handleGetFloorPlan()
  }, [])

  return (
    <>
      {loading && <Loader />}
      {(!planData || planData.length) === 0 ? (
        <Box
          sx={{
            // border: "1px solid red",
            // height: "80vh",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Box align="center" sx={{ width: "70%", mt: 10 }}>
            <img src={emptyIcon} onClick={() => setShow(true)} />
            <Typography
              sx={{ color: "#fff", fontSize: "16px", fontWeight: 400 }}
            >
              No rooms or tables
            </Typography>
            <Typography
              sx={{ color: "#fff", fontSize: "14px", fontWeight: 300, mt: 2 }}
            >
              Your haven’t setup the tables for your restaurant. Click on create
              table button below to create a Table
            </Typography>
            <Link to="/floor-plan">
              <Button
                sx={{
                  bgcolor: "#fff",
                  color: "#2B2B2B",
                  mt: 3,
                  px: 3,
                  "&:hover": { bgcolor: "#ffffffb7", color: "#2b2b2b" },
                }}
              >
                Create Room
              </Button>
            </Link>
          </Box>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: 3,
              py: 2,
              borderBottom: "0.5px solid #fff",
            }}
          >
            <Typography sx={{ color: "#fff", fontWeight: 500 }}>
              Floor Plan
            </Typography>
            <Link to="/floor-plan">
              <Button variant="contained">Create Floor Plan</Button>
            </Link>
          </Box>
          <Box sx={{ p: 3 }}>
            <Grid container spacing={2}>
              {planData &&
                planData.map((item, index) => (
                  <Grid item lg={3} md={3} key={index}>
                    <Link to={`/dashboard/room/${item?.Id}`}>
                      <Box
                        sx={{
                          cursor: "pointer",
                          transition: "0.2s all linear",
                          "&:hover": { bgcolor: "#ffffff1a" },
                        }}
                      >
                        <TableCard
                          img={item?.Logo}
                          name={item?.Name}
                          id={item?.Id}
                        />
                      </Box>
                    </Link>
                  </Grid>
                ))}
            </Grid>
          </Box>
        </>
      )}
    </>
  );
};

export default Tables;
