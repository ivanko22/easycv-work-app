import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercept requests to add Authorization header
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  console.log('token', token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  console.log("Request Headers:", config.headers); // Log headers for debugging

  return config;
});

export default apiClient;
