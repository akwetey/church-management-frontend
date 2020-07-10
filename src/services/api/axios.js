import axios from "axios";

const token = localStorage.getItem("_chms_token") || null;
const Axios = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "http://api.salvationclinicinternationalministries.org"
      : "http://scim.test",
});

Axios.defaults.headers.common["Authorization"] = "Bearer " + token;

export default Axios;
