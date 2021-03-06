import axios from "axios";

const apiURL = "http://api.salvationclinicinternationalministries.org";
const devURL = "http://139.162.226.38";
//const devURL = "http://scim.test";
const Axios = axios.create({
  baseURL: process.env.NODE_ENV === "production" ? apiURL : devURL,
  timeout: 10000,
  params: {},
});

// Response interceptor
// Axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status === 401) {
//       this.$store.dispatch("logout");
//     }
//     return Promise.reject(error);
//   }
// );

export default Axios;
