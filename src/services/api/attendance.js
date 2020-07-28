import axios from "./axios";

export default {
  all() {
    return axios.get("/api/attendance");
  },
  store(payload) {
    return axios.post("/api/attendance", payload);
  },
  show(mask) {
    return axios.get("/api/attendance/" + mask);
  },
  update(payload, mask) {
    return axios.put("/api/attendance/" + mask, payload);
  },
  delete(mask) {
    return axios.delete("/api/attendance/" + mask);
  },
};