import React,{useState} from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const Calender = (props) => {
  const [value, setValue] = useState(dayjs());

  const handleChange = (newValue) => {
    setValue(newValue);
    const formattedDate = newValue.format("YYYY-MM-DD");
    props.onChildValue(formattedDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        sx={{ color:'#fff',"&.MuiDateCalendar-root": { fontFamily: "gordita" } }}
        // disableFuture
        disablePast={props.past}
        disableFuture={props.future}
        value={value}

        onChange={(newValue) => handleChange(newValue)}
      />
    </LocalizationProvider>
  );
};

export default Calender;
