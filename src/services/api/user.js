import axios from "./axios";

export default {
  all() {
    return axios.get("/api/users");
  },
  store(payload) {
    return axios.post("/api/users", payload);
  },
  show(mask) {
    return axios.get("/api/users/" + mask);
  },
  update(payload, mask) {
    return axios.put("/api/users/" + mask, payload);
  },
  delete(mask) {
    return axios.delete("/api/users/" + mask);
  },
};
