import axios from "axios";

const userToken = JSON.parse(window.localStorage.getItem("userInfo"));
const apiKey = process.env.REACT_APP_API_KEY;

const baseUrl = process.env.REACT_APP_BASE_URL;

const axiosFetch = axios.create({
  baseURL: baseUrl,
  headers: {
'Content-Type': 'application/x-www-form-urlencoded',
    Accept: "application/json", // Change to application/json
    ApiKey: apiKey,
    Authorization: `Bearer ${userToken?.access_token}`,
  },
});

// Interceptor to set Content-Type for FormData
axiosFetch.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  }
  return config;
});

export default axiosFetch;
