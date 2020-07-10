import axios from "axios";

const token = localStorage.getItem("_chms_token") || null;
const apiURL = "http://api.salvationclinicinternationalministries.org";
const devURL = "http://church-management.io";
const Axios = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? apiURL : devURL,
});

Axios.defaults.headers.common["Authorization"] = "Bearer " + token;

export default Axios;
