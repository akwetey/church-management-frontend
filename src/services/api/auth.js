import Axios from "./axios";

export default {
  login(payload) {
    return Axios.post("/staff/auth/login", payload);
  },
  logout() {
    return Axios.post("/staff/auth/logout");
  },
  user() {
    return Axios.get("/staff/auth/user");
  },
};
