import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://thrindleservices.herokuapp.com/api/thrindle/sellers/",
});

export default axiosInstance;
