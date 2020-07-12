import axios from "./axios";

export default {
  all() {
    return axios.get("/api/roles");
  },
  store(payload) {
    return axios.post("/api/roles", payload);
  },
  show(mask) {
    return axios.get("/api/roles/" + mask);
  },
  update(payload, mask) {
    return axios.post("/api/roles/" + mask, payload);
  },
  delete(mask) {
    return axios.delete("/api/roles/" + mask);
  },
};
