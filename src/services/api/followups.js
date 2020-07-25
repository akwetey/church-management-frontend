import axios from "./axios";

export default {
  all() {
    return axios.get("/api/follow-up");
  },
  store(payload) {
    return axios.post("/api/follow-up", payload);
  },
  show(mask) {
    return axios.get("/api/follow-up/" + mask);
  },
  update(payload, mask) {
    return axios.put("/api/follow-up/" + mask, payload);
  },
  delete(mask) {
    return axios.delete("/api/follow-up/" + mask);
  },
};
