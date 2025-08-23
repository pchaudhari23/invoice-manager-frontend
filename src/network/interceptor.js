import axios from "axios";

const BASE_URL = "http://localhost:8000/api/v1";

// Request handler
const requestHandler = (request) => {
  const token = localStorage.getItem("authToken"); // Get token from storage
  if (token) {
    request.headers.Authorization = `Bearer ${token}`; // Attach token
  }
  return request;
};

// Success response handler
const successHandler = (response) => {
  return response;
};

// Error handler
const errorHandler = (error) => {
  let errorMessage = "Something went wrong: ";
  return Promise.reject({ ...error, message: errorMessage });
};

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "*",
  },
});

// Add request interceptor
axiosInstance.interceptors.request.use(requestHandler, (error) =>
  Promise.reject(error)
);

// Add response interceptor
axiosInstance.interceptors.response.use(successHandler, errorHandler);

export default axiosInstance;
