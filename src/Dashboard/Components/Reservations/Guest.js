import { Box, IconButton, Typography } from '@mui/material'
import React , {useState, useEffect} from 'react'
import bookImg from '../../../assets/Icons/book.svg'
import app from '../../../assets/Icons/app.svg'
import docIcon from '../../../assets/Icons/document-text.svg';
import caution from '../../../assets/Icons/caution.svg'
import star from '../../../assets/Icons/star.svg';
import pad from '../../../assets/Icons/book.svg'
import bookmark from '../../../assets/Icons/archive-book.svg'
import thunder from '../../../assets/Icons/thunder.svg'
import { getReservations } from '../../../axios/api';

const Guest = () => {
  const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
      const [finished, setFinished] = useState(null);
      const [seated, setSeated] = useState(null);
      const [upcoming, setUpcoming] = useState(null);
      const [cancelled, setIsCancelled] = useState(null);


   const inputDate = new Date();
        const year = inputDate.getFullYear();
        const month = String(inputDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
        const day = String(inputDate.getDate()).padStart(2, "0");

        const formattedDateString = `${year}-${month}-${day}`;

        const [formattedDate, setFormattedDate] = useState(formattedDateString);

    const handleGetReservations = async () => {
      setIsLoading(true);
      await getReservations(formattedDate)
        .then((res) => {
          console.log(res);
          setIsLoading(false);
          const { data } = res;
          setData(data?.result);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    };

    const filterFinished = data?.filter(
      (item) => item.BookingStatus == "Finished"
    );
    const filterExpected = data?.filter(
      (item) => item.BookingStatus == "Expected"
    );
    const filterSitted = data?.filter((item) => item.BookingStatus == "Sitted");
    const filterCancelled = data?.filter(
      (item) => item.BookingStatus === "Cancelled"
    );

    useEffect(() => {
      if (data) {
        setIsCancelled(filterCancelled || []);
        setUpcoming(filterExpected || []);
        setFinished(filterFinished || []);
        setSeated(filterSitted || []);
      }
    }, [data]);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          bgcolor: " #333",
          borderBottom: "0.5px solid #fff",
        }}
      >
        <Box sx={{ display: "flex", columnGap: 2 }}>
          <img src={bookImg} />
          <Typography sx={{ color: "#fff", fontWeight: 400, fontSize: "13px" }}>
            Upcoming
          </Typography>
        </Box>
        <Typography sx={{ color: "#fff", fontWeight: 400, fontSize: "13px" }}>
          3(8)
        </Typography>
          </Box>
          <Box sx={{p:2, mt:2, height:'72vh', overflow:'scroll'}}>

          <CardComponents/>
          <CardComponents/>
          <CardComponents/>
          <CardComponents/>
          </Box>
          <Box sx={{}}>
              
          </Box>
          <Box sx={{ p: 1, bgcolor: '#333', borderTop: '0.5px solid #fff', display: 'flex', justifyContent: 'flex-end', marginTop: 'auto', display: 'flex' }}>
              <IconButton>
              <img src={app}/>
              </IconButton>
          </Box>
    </>
  );
}

export default Guest;

const  CardComponents = () => {
return (
  <>
    <Box sx={{mb:2}}>
      <Typography sx={{ fontSize: "12px", color: "#fff" , mb:1}}>4.00pm</Typography>
      <Box sx={{ border: "1px solid #E6BF47", borderRadius: "5px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
            color: "#fff",
            p: 1,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", rowGap: 1 }}>
            <Typography
              sx={{ color: "#fff", fontWeight: 500, fontSize: "14px" }}
            >
              Michael, Nelson
            </Typography>
            <Typography
              sx={{ color: "#fff", fontWeight: 400, fontSize: "12px" }}
            >
              Orchid Bistro Premium
            </Typography>
            <Typography
              sx={{ color: "#fff", fontWeight: 300, fontSize: "12px" }}
            >
              2 guest
            </Typography>
          </Box>
          <Box
            sx={{
              bgcolor: "#333",
              borderRadius: "3px",
              p: 2,
              height: "35px",
              display: "grid",
              placeItems: "center",
            }}
          >
            <Typography
              sx={{ color: "#fff", fontWeight: 500, fontSize: "13px" }}
            >
              T S13
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            bgcolor: "#333",
            p: 1,
            borderRadius: "0px 0px 10px 10px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <IconButton>
            <img src={docIcon} width={20} />
          </IconButton>
          <IconButton>
            <img src={caution} width={20} />
          </IconButton>
          <IconButton>
            <img src={star} width={20} />
          </IconButton>
          <IconButton>
            <img src={pad} width={20} />
          </IconButton>
          <IconButton>
            <img src={bookmark} width={20} />
          </IconButton>
          <IconButton>
            <img src={thunder} width={20} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  </>
);
}