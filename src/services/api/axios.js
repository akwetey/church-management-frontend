import axios from "axios";

const token = localStorage.getItem("_chms_token") || null;
const Axios = axios.create();

Axios.defaults.headers.common["Authorization"] = "Bearer " + token;

if (process.env.NODE_ENV === "production") {
  Axios.defaults.baseURL = process.env.API_URL;
}

export default Axios;
