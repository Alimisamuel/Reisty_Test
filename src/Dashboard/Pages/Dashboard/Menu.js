import React, { useEffect, useState } from "react";
import emptyIcon from "../../../assets/emptyRes.svg";
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getMenuList } from "../../../axios/api";
import CreateMenu from "../../Components/Menu/CreateMenu";
import MenuTable from "../../Components/Menu/MenuTable";
import { MdOutlineRefresh } from "react-icons/md";
import Loader from "../../Components/Common/Loader";

const Menu = () => {
  const [show, setShow] = useState(true);
  const [tab, setTab] = useState("Breakfast");
  const [filteredData, setFilteredData] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [loading, setIsLoading] = useState(false);

  const handleGetMenu = async () => {
    setIsLoading(true);
    await getMenuList()
      .then((res) => {
        setIsLoading(false);
        const { data } = res;
        setTableData(data?.result);
        console.log(res, "Menulist");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    handleGetMenu();
  }, []);
  return (
    <>
      {loading && <Loader />}
      {!tableData || tableData?.length === 0 ? (
        <>
          <Box
            sx={{
              // border: "1px solid red",
              height: "80vh",
              display: "grid",
              placeItems: "center",
            }}
          >
            <Box align="center" sx={{ width: "70%" }}>
              <img src={emptyIcon} />
              <Typography
                sx={{ color: "#fff", fontSize: "16px", fontWeight: 400 }}
              >
                No menu list found
              </Typography>
              <Typography
                sx={{ color: "#fff", fontSize: "14px", fontWeight: 300, mt: 2 }}
              >
                You have no menu list. Click on “add new” to add a new menu
              </Typography>
              <CreateMenu />
            </Box>
          </Box>
        </>
      ) : (
        <>
          <Box
            sx={{
              bgcolor: "#1A1A1A",
              p: 2,
              px: 3,
              borderBottom: "0.5px solid #fff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ color: "#FFF" }}>Menu</Typography>
            <CreateMenu  variant={true}/>
          </Box>
          <Box
            sx={{
              mt: 3,
              px: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", columnGap: 3, alignItems: "center" }}>
              <Button
                sx={{
                  border: "1px solid #fff",
                  borderRadius: 2,
                  color: "#fff",
                  bgcolor: "#333",
                  fontSize: "12px",
                  px: 3,
                }}
              >
                <MdOutlineRefresh style={{marginRight:'5px', fontSize:'16px'}} />
                Refresh
              </Button>
              {/* <Button
                sx={{
                  border: "1px solid #fff",
                  borderRadius: 2,
                  color: "#fff",
                  bgcolor: "#333",
                  fontSize: "12px",
                  px: 3,
                }}
              >
                Edit
              </Button> */}
            </Box>
            <Box sx={{ display: "flex", columnGap: 3, alignItems: "center" }}>
              <TextField />
              <IconButton
                variant="contained"
                sx={{
                  width: "45px",
                  p: 0,
                  height: "45px",
                  borderRadius: 1,
                  bgcolor: "#BC172F",
                }}
              >
                <SearchIcon sx={{ color: "#fff" }} />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ mt: 3, p: 3 }}>
            <Box
              sx={{
                px: 2,
                bgcolor: "#BC172F",
                borderRadius: "10px  10px 0px 0px",
              }}
            >
              <List sx={{ display: "flex", width: "40%" }}>
                <ListItemButton
                  onClick={() => setTab("Breakfast")}
                  selected={tab === "Breakfast"}
                  sx={{
                    textAlign: "center",
                    color: "#fff",
                    "&.Mui-selected": { borderBottom: "4px solid #fff" },
                  }}
                >
                  Breakfast
                </ListItemButton>
                <ListItemButton
                  onClick={() => setTab("Brunch")}
                  selected={tab === "Brunch"}
                  sx={{
                    textAlign: "center",
                    color: "#fff",
                    "&.Mui-selected": { borderBottom: "4px solid #fff" },
                  }}
                >
                  Brunch
                </ListItemButton>
                <ListItemButton
                  onClick={() => setTab(" Lunch")}
                  selected={tab === " Lunch"}
                  sx={{
                    textAlign: "center",
                    color: "#fff",
                    "&.Mui-selected": { borderBottom: "4px solid #fff" },
                  }}
                >
                  Lunch
                </ListItemButton>
                <ListItemButton
                  onClick={() => setTab("Dinner")}
                  selected={tab === "Dinner"}
                  sx={{
                    textAlign: "center",
                    color: "#fff",
                    "&.Mui-selected": { borderBottom: "4px solid #fff" },
                  }}
                >
                  Dinner
                </ListItemButton>
              </List>
            </Box>
            <MenuTable data={tableData} />
          </Box>
        </>
      )}
    </>
  );
};

export default Menu;
