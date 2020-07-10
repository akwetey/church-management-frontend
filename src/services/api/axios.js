import axios from "axios";

const token = localStorage.getItem("_chms_token") || null;
const Axios = axios.create();

Axios.defaults.headers.common["Authorization"] = "Bearer " + token;

export default Axios;
