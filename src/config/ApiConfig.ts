import axios from "axios";

const Axios = axios.create();

Axios.defaults.baseURL = "https://hbms-gz44.onrender.com/api/v1/";

Axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default Axios;
