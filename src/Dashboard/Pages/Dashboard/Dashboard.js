import React, { useEffect, useState } from "react";
import TopNav from "../../Layout/TopNav";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Typography,
  Popover,
  createTheme,
  ThemeProvider,
} from "@mui/material";

import CoverOverview from "../../Components/AppWidget/CoverOverview";
import { getDashboardOverview } from "../../../axios/api";
import Loader from "../../Components/Common/Loader";

import { format, parseISO } from "date-fns";
import { Helmet } from "react-helmet";
import exportIcon from "../../../assets/Icons/export.svg";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import GeneralOverview from "../../Components/AppWidget/GeneralOverview";
import SalesSummary from "../../Components/AppWidget/SalesSummary";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#BC172F",
    },
  },
  typography: {
    fontFamily: "gordita",
    button: {
      textTransform: "initial",
    },
  },
});

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Dashboard = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const [data, setData] = useState(null);
  const dateObject = new Date();
  const toDate = dateObject.toISOString().split("T")[0];
  const [value, setValue] = React.useState(toDate);
  const [isLoading, setIsLoading] = useState(false);
  const user = JSON.parse(window.localStorage.getItem("userInfo"));
  const parsedDate = parseISO(value);
  const formattedDate1 = format(parsedDate, "EEEE, MMMM d");
  const date = new Date();
  const formatDate = () => {
    const options = { weekday: "long", month: "long", day: "numeric" };

    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, "0");
  const formattedDate = formatDate();

  const handleGetDashboard = async () => {
    setIsLoading(true);
    await getDashboardOverview(formattedDate)
      .then((res) => {
        console.log(res);
        const { data } = res;
        setIsLoading(false);
        setData(data?.result[0]);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    handleGetDashboard();
  }, []);

  const handleFilter = async () => {
    setIsLoading(true);
    console.log(value);
    handleClose();
    await getDashboardOverview(value)
      .then((res) => {
        console.log(res);
        const { data } = res;
        setIsLoading(false);
        setData(data?.result[0]);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };
  //   useEffect(()=>{
  // handleFilter()
  //   }, [])
  return (
    <>
      <Helmet> </Helmet>
      <TopNav />
      {isLoading && <Loader />}
      <ThemeProvider theme={theme}>
        <Box sx={{ bgcolor: "#000", height: "100vh", overflow: "scroll" }}>
          <Box
            sx={{
              margin: "0 auto",
              width: { lg: "80%", md: "90%", sm: "90%", xs: "90%" },
              pt: 13,
              pb: 10,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  textTransform: "capitalize",
                  fontSize: "13px",
                  color: "#fff",
                }}
              >
                Hello, <span style={{ fontWeight: 700 }}>{user.fullname}</span>{" "}
              </Typography>
              <Button
                endIcon={<img src={exportIcon} />}
                sx={{
                  bgcolor: "#1a1a1a",
                  color: "#fff",
                  fontSize: "13px",
                  fontWeight: 500,
                  py: 1,
                  px: 3,
                }}
              >
                Export as CSV
              </Button>
            </Box>

            <Box sx={{ width: "100%", mt: 3 }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  sx={{ bgcolor: "#333", borderRadius: "24px 0px 0px 0px" }}
                  value={tabValue}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab
                    label="General Overview"
                    {...a11yProps(0)}
                    sx={{ "&.Mui-selected": { bgcolor: "#BC172F1a" }, my: 1 }}
                  />
                  <Tab
                    label="Sales Summary"
                    {...a11yProps(1)}
                    sx={{ "&.Mui-selected": { bgcolor: "#BC172F1a" }, my: 1 }}
                  />
                </Tabs>
              </Box>
              <CustomTabPanel value={tabValue} index={0}>
                <GeneralOverview data={data} handleFilter={handleFilter} />
              </CustomTabPanel>
              <CustomTabPanel value={tabValue} index={1}>
                <SalesSummary />
              </CustomTabPanel>
            </Box>
          </Box>
        </Box>

 
      </ThemeProvider>
    </>
  );
};

export default Dashboard;


