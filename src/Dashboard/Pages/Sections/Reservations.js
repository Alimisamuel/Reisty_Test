import React from 'react'
import TopNav from '../../Layout/TopNav'
import { Box, Grid, Typography, createTheme, ThemeProvider } from '@mui/material'
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Guest from '../../Components/Reservations/Guest';
import Waitlist from '../../Components/Reservations/Waitlist';
import { Outlet } from 'react-router-dom';
import WalkinHeader from '../../Components/Common/WalkinHeader';

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
      fontFamily: "gordita",
      textTransform: "initial",
    },
  },
});

const Reservations = () => {
     const [value, setValue] = React.useState(0);

     const handleChange = (event, newValue) => {
       setValue(newValue);
     };

  return (
    <>
      <ThemeProvider theme={theme}>
        <TopNav />
        <Grid
          container
          sx={{
            height: "100vh",
            bgcolor: "#1A1A1A",
            overflow: "scroll",
            mt: 1,
          }}
        >
          <Grid item md={2.6}>
            <Box sx={{ borderRight: "1px solid #fff", pt: 8.5 }}>
              <Box
                sx={{
                  p: 1.3,
                  bgcolor: "#000",
                  borderBottom: "0.5px solid #fff",
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab
                      label="Guests"
                      sx={{ color: "#fff" }}
                      {...a11yProps(0)}
                    />
                    <Tab
                      label="Waitlist"
                      sx={{ color: "#fff" }}
                      {...a11yProps(1)}
                    />
                  </Tabs>
                </Box>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <Guest />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <Waitlist />
              </CustomTabPanel>
            </Box>
          </Grid>
          <Grid item md={9.4} sx={{ pt: 8 }}>
            <WalkinHeader />
            <Outlet />
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}

export default Reservations


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
        <Box sx={{ p: 0 }}>
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