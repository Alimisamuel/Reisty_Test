// Import necessary modules and utilities
import axios from "axios";
// import { LocalStorage } from "../utils";

const apiKey = process.env.REACT_APP_API_KEY;

const baseUrl = process.env.REACT_APP_BASE_URL;
// console.log(apiEndpoint);
const selectedRestaurant = localStorage.getItem("restaurantID");
console.log(selectedRestaurant);
// Create an Axios instance for API requests
const apiClient = axios.create({
  baseURL: baseUrl,
  timeout: 120000,
});

// Add an interceptor to set authorization header with user token before requests
apiClient.interceptors.request.use(
  function (config) {
    // Retrieve user token from local storage
    const userToken = JSON.parse(window.localStorage.getItem("userInfo"));
    // console.log(token);
    // Set authorization header with bearer token
    config.headers.Authorization = `Bearer ${userToken?.access_token}`;
    config.headers.apiKey = apiKey;
    // config.headers["Access-Control-Allow-Origin"] = "*";

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

apiClient.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  }
  return config;
});

// API functions for different actions

const createBasicInfo = (
  restaurantName,
  adminFullName,
  emailAddress,
  restaurantWebsite,
  phoneNumber,
  country,
  lga,
  state,
  address,
  averageCost,
  logo,
  description,
  latitude,
  longitude
) => {
  const formData = new FormData();
  formData.append("RestaurantName", restaurantName);
  formData.append("AdminFullName", adminFullName);
  formData.append("EmailAddress", emailAddress);
  formData.append("RestaurantWebsite", restaurantWebsite);
  formData.append("PhoneNumber", phoneNumber);
  formData.append("Country", country);
  formData.append("LGA", lga);
  formData.append("State", state);
  formData.append("Address", address);
  formData.append("AverageCost", averageCost);
  formData.append("Logo", logo); // Assuming logo is a File or Blob object
  formData.append("Description", description);
  formData.append("Latitude", latitude);
  formData.append("Longitude", longitude);
  console.log(logo, "=> Logo");
  return apiClient.post("/restaurantmanagement/upload_basic_info", formData);
};

const galleryUpload = (restaurantId, img1, img2, img3) => {
  const formData = new FormData();

  formData.append("Photos", img1);
  formData.append("Photos", img2);
  formData.append("Photos", img3);
  return apiClient.post(
    `/restaurantmanagement/upload_gallery_photos/${restaurantId}`,
    formData
  );
};
const appendGalleryUpload = (images) => {
  const formData = new FormData();

  images.map((image) => {
    formData.append("Photos", image);
  });

  return apiClient.post(
    `/restaurantmanagement/append_new_gallery_photos/${selectedRestaurant}`,
    formData
  );
};

const editGalleryUpload = (
  imageID,

  img1
) => {
  const formData = new FormData();

  formData.append("Photo", img1);

  return apiClient.put(
    `/restaurantmanagement/edit_gallery_photo/${imageID}`,
    formData
  );
};

const createOfferings = (
  restaurantId,
  menuLink,
  restaurantType,
  executiveChef,
  dietaryOptions,
  beverages,
  smokingOptions,
  sanitizationAndMaintainances,
  physicalDistancings,
  protectiveEquipments,
  screenings,
  amenities,
  seatingOptions,
  diningOptions,
  otherCuisines
) => {
  const postData = {
    menuLink,
    restaurantType,
    executiveChef,
    dietaryOptions,
    beverages,
    smokingOptions,
    sanitizationAndMaintainances,
    physicalDistancings,
    protectiveEquipments,
    screenings,
    amenities,
    seatingOptions,
    diningOptions,
    otherCuisines,
  };
  // console.log(postData, ">>Post Data");
  return apiClient.post(
    `/restaurantmanagement/upload_offerings/${restaurantId}`,
    postData
  );
};

const createExperience = (
  restaurantId,
  cancellationPolicy,
  depositPerPerson,
  description
) => {
  const payLoad = {
    cancellationPolicy,
    depositPerPerson,
    description,
  };
  return apiClient.post(
    `/restaurantmanagement/upload_experience/${restaurantId}`,
    payLoad
  );
};
const getRestuarentProfile = () => {
  return apiClient.get(`/restaurantmanagement/owner/all_restaurants`);
};

const getBasicInfo = () => {
  return apiClient.get(
    `/restaurantmanagement/get_restaurant/${selectedRestaurant}`
  );
};

const getOfferings = () => {
  return apiClient.get(
    `/restaurantmanagement/get_offerings/${selectedRestaurant}`
  );
};
const getGallery = () => {
  return apiClient.get(
    `/restaurantmanagement/get_all_photos/${selectedRestaurant}`
  );
};
const getMenuList = () => {
  return apiClient.get(
    `restaurantmanagement/get_restaurant_menu/${selectedRestaurant}`
  );
};

const createMenuList = (
  MenuItem,
  Description,
  MealPeriod,
  Price,
  Category,
  Img
) => {
  const formData = new FormData();
  formData.append("MenuItem", MenuItem);
  formData.append("Description", Description);
  formData.append("MealPeriod", MealPeriod);
  formData.append("Price", Price);
  formData.append("Category", Category);
  formData.append("Img", Img); // Assuming logo is a File or Blob object

  return apiClient.post(
    `/restaurantmanagement/upload_menu/${selectedRestaurant}`,
    formData
  );
};

const createFloorPlans = (name, location, totalTables, restaurantId) => {
  const payload = {
    name,
    location,
    totalTables,
    restaurantId,
  };
  return apiClient.post(
    `/restaurantmanagement/floor_plan_with_tables/add`,
    payload
  );
};

const getFloorPlan = () => {
  return apiClient.get(
    `restaurantmanagement/floor_plan/all/${selectedRestaurant}`
  );
};

const getSingleFloorPlan = (id) => {
  return apiClient.get(`restaurantmanagement/floor_plan/get/${id}`);
};

const editTable = (
  name,
  position,
  setting,
  shape,
  color,
  id,
  minSize,
  maxSize
) => {
  const payload = {
    name,
    position,
    setting,
    shape,
    color,
    id,
    minSize,
    maxSize,
  };
  return apiClient.put(`/restaurantmanagement/table/edit`, payload);
};

const createGuestBook = (
  firstName,
  lastName,
  phoneNumber,
  emailAddress,
  country,
  birthday,
  graduationAnniversary,
  weddingAnniversary
) => {
  const payload = {
    firstName,
    lastName,
    phoneNumber,
    emailAddress,
    country,
    birthday,
    graduationAnniversary,
    weddingAnniversary,
  };
  return apiClient.post(
    `restaurantmanagement/add_guestbook/${selectedRestaurant}`,
    payload
  );
};

const getGuestBook = () => {
  return apiClient.get(
    `restaurantmanagement/get_all_guests/${selectedRestaurant}`
  );
};

const getReservations = (date) => {
  console.log(date, "our date");
  return apiClient.get(
    `reservation/owner/get_reservations?bookingDate=${date}`
  );
};
const createReservationHour = (dayOfWeeks, mealType, from, to) => {
  const payload = {
    restaurantId: selectedRestaurant,
    dayOfWeeks,
    mealType,
    from,
    to,
  };
  return apiClient.post(`restaurantmanagement/add_reservation_hour`, payload);
};

const getReservationHours = () => {
  return apiClient.get(
    `restaurantmanagement/get_all_reservation_hour/${selectedRestaurant}`
  );
};
const getDashboardOverview = (date) => {
  return apiClient.get(
    `reservation/owner/get_day_reservation_stats?date=${date}`
  );
};
const deleteReservationHours = (id) => {
  return apiClient.delete(`restaurantmanagement/delete_reservation_hour/${id}`);
};

const editBasicInfo = (
  restaurantName,
  adminFullName,
  emailAddress,
  restaurantWebsite,
  phoneNumber,
  address,
  latitude,
  longitude,
  averageCost
) => {
  const payload = {
    restaurantName,
    adminFullName,
    emailAddress,
    restaurantWebsite,
    phoneNumber,
    address,
    latitude,
    longitude,
    averageCost,
  };
  return apiClient.put(
    `restaurantmanagement/edit/basic_info/${selectedRestaurant}`,
    payload
  );
};

const editBasicInfoDescription = (description) => {
  const payload = {
    description,
  };
  return apiClient.put(
    `restaurantmanagement/edit/description/${selectedRestaurant}`,
    payload
  );
};
const editBasicInfoLogo = (logo) => {
  const formData = new FormData();
  formData.append("Logo", logo);

  return apiClient.put(
    `restaurantmanagement/edit/logo/${selectedRestaurant}`,
    formData
  );
};

const editOfferings = (
  id,
  menulink,
  executiveChef,
  dietaryOptions,
  beverages
) => {
  const payload = {
    menulink,
    executiveChef,
    dietaryOptions,
    beverages,
  };
  return apiClient.put(`restaurantmanagement/edit/offerings/${id}`, payload);
};

const deleteTables = (id) => {
  return apiClient.delete(`restaurantmanagement/table/delete_many`, { id });
};
const deleteSingleTable = (id) => {
  return apiClient.delete(`restaurantmanagement/table/delete/${id}`);
};

const editSmoking = () => {
  return apiClient.put(``);
};

const changeBookingStatus = (id, status) => {
  const payload = {
    bookingId: id,
    status: status,
  };
  return apiClient.put(`reservation/owner/change_booking_status`, payload);
};

const searchGuestBook = (searchParams) => {
  return apiClient.get(
    `restaurantmanagement/search_guests?text=${searchParams}&restaurantId=${selectedRestaurant}`
  );
};

const deleteGalleryPhotos = (id) => {
  return apiClient.delete(`restaurantmanagement/delete_gallery_photo/${id}`);
};

const createWalkin = (restaurantId, date, time, guestId, partySize) => {
  const payload = {
    restaurantId,
    date,
    time,
    guestId,
    partySize,
  };
  return apiClient.post(`reservation/restaurant/book_as_walkin`, payload);
};

const editDining = (
  offeringsId,
  restaurantType,
  amenities,
  smokingOptions,
  otherCuisines
) => {
  const payload = {
    offeringsId,
    restaurantType,
    amenities,
    smokingOptions,
    otherCuisines,
  };

  return apiClient.put(
    `restaurantmanagement/edit/dining_experience/restaurant/${selectedRestaurant}/offering/${offeringsId}`,
    payload
  );
};
const editSafetyPrecautions = (
  offeringsId,
  sanitizationAndMaintainances,
  physicalDistancings,
  protectiveEquipments,
  screenings
) => {
  const payload = {
    offeringsId,
    sanitizationAndMaintainances,
    physicalDistancings,
    protectiveEquipments,
    screenings,
  };

  return apiClient.put(
    `restaurantmanagement/edit/safety_preacautions/${offeringsId}`,
    payload
  );
};

// Events

const createEvents = (EventName, Description, EventDate, EventTime, EventImage) => {
  const payload = {
    RestaurantId: selectedRestaurant,
    EventName,
    Description,
    EventDate,
    EventTime,
    EventImage
    
  };
  const formData = new FormData();
  formData.append("RestaurantId",selectedRestaurant);
  formData.append("EventName", EventName);
  formData.append("Description", Description);
  formData.append("EventDate", EventDate);
  formData.append("EventTime", EventTime);
  formData.append("EventImage", EventImage);

  console.log(payload)

  return apiClient.post(`restaurantevent/create`, formData);
};

const getEvent = () =>{
  return apiClient.get(`restaurantevent/all/${selectedRestaurant}`)
}

const deleteEvent = (EventId) =>{
return apiClient.delete(`restaurantevent/delete/${EventId}`)
}
const  deleteTicket = (TicketId) =>{
return apiClient.delete(`restaurantevent/ticket/delete/${TicketId}`)
}

const createTicket = (eventId,ticketName, totalTicket, description, ticketPrice) =>{
const payload = {
  eventId,ticketName, totalTicket, description, ticketPrice
}
return apiClient.post('restaurantevent/ticket/create', payload)
}

const getAllTickets = (id) => {
  return apiClient.get(`restaurantevent/${id}`)
} 

const deleteRestaurant = (id) =>{
  return apiClient.delete(`restaurantmanagement/restaurant/${id}`)
}
const editTicket = (ticketName, totalTicket,description,ticketPrice,ticketId) =>{

  const payload = {
    ticketName, totalTicket,description,ticketPrice,ticketId
  }
  return apiClient.put('/restaurantevent/ticket/edit', {payload})
}

const findUserByEmail = (email)=>{
  
  return apiClient.get(`userprofile/get_user_details_by_email`, {email})
}

// Export all the API functions
export {
  getDashboardOverview,
  createBasicInfo,
  createOfferings,
  createExperience,
  getRestuarentProfile,
  galleryUpload,
  getBasicInfo,
  getOfferings,
  getGallery,
  getMenuList,
  createMenuList,
  createFloorPlans,
  getFloorPlan,
  getSingleFloorPlan,
  editTable,
  createGuestBook,
  getGuestBook,
  getReservations,
  createReservationHour,
  getReservationHours,
  deleteReservationHours,
  editBasicInfo,
  editBasicInfoDescription,
  editBasicInfoLogo,
  editOfferings,
  deleteTables,
  deleteSingleTable,
  changeBookingStatus,
  editGalleryUpload,
  appendGalleryUpload,
  searchGuestBook,
  deleteGalleryPhotos,
  createWalkin,
  editDining,
  editSafetyPrecautions,
  createEvents,
  getEvent,
  deleteEvent,
  createTicket,
  getAllTickets,
  deleteTicket,
  deleteRestaurant,
  editTicket,
  findUserByEmail,
};
