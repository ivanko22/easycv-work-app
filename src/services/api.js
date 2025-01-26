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

  // Do not attach Authorization for unauthenticated routes
  if (!["sign-up", "login"].some((url) => config.url.includes(url)) && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
