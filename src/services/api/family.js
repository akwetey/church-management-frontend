import axios from "./axios";

export default {
  all() {
    return axios.get("/api/family");
  },
  store(payload) {
    return axios.post("/api/family", payload);
  },
  show(mask) {
    return axios.get("/api/family/" + mask);
  },
  update(payload, mask) {
    return axios.put("/api/family/" + mask, payload);
  },
  delete(mask) {
    return axios.delete("/api/family/" + mask);
  },
};
