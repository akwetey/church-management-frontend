import Axios from "./axios";

export default {
  login(payload) {
    return Axios.post("/api/auth/login", payload);
  },
  logout() {
    return Axios.post("/api/auth/logout");
  },
  user() {
    return Axios.get("/api/auth/user");
  },
};
