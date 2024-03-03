const data_1 = [
  {
    view: 10,
    view2: 59,
    name: "Monday",
  },
  {
    view: 50,
    view2: 30,
    name: "Tuesday",
  },
  {
    view: 50,
    view2: 80,
    name: "Wednessday",
  },
  {
    view: 10,
    view2: 20,
    name: "Thursday",
  },
  {
    view: 100,
    view2: 54,
    name: "Friday",
  },
  {
    view: 19,
    view2: 27,
    name: "Saturday",
  },
  {
    view: 21,
    view2: 59,
    name: "Sunday",
  },

];

const data_2 = [
  {
    view: 100,
    name: "Jan",
  },
  {
    view: 200,
    name: "Fab",
  },
  {
    view: 150,
    name: "March",
  },
  {
    view: 1280,
    name: "April",
  },
  {
    view: 900,
    name: "May",
  },
  {
    view: 1190,
    name: "June",
  },
  {
    view: 1190,
    name: "July",
  },
  {
    view: 490,
    name: "Aug",
  },
  {
    view: 200,
    name: "Sept",
  },
  {
    view: 2300,
    name: "Oct",
  },
  {
    view: 2500,
    name: "Nov",
  },
  {
    view: 2380,
    name: "Dec",
  },
];

const dataSet = {
  Today: data_1,
  Yesterday: data_2,
  Last_7_days: data_1,
  Last_14_days: data_2,
  Last_30_days: data_1,
  Last_90_days: data_2,
};

export default dataSet;
