import axios from "axios";

const token = localStorage.getItem("_chms_token") || null;
const apiURL = "http://api.salvationclinicinternationalministries.org";
//const devURL = "http://139.162.226.38";
const devURL = "http://scim.test";
const Axios = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? apiURL : devURL,
});

Axios.defaults.headers.common["Authorization"] = "Bearer " + token;

export default Axios;
