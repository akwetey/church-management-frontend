import axios from "./axios";

export default {
  all() {
    return axios.get("/api/user");
  },
  store(payload) {
    return axios.post("/api/user", payload);
  },
  show(mask) {
    return axios.get("/api/user/" + mask);
  },
  update(payload, mask) {
    return axios.post("/api/user/" + mask, payload);
  },
  delete(mask) {
    return axios.delete("/api/user/" + mask);
  },
};
