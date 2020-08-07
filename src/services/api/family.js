import axios from "./axios";

export default {
  all() {
    return axios.get("/staff/family");
  },
  store(payload) {
    return axios.post("/staff/family", payload);
  },
  show(mask) {
    return axios.get("/staff/family/" + mask);
  },
  update(payload, mask) {
    return axios.put("/staff/family/" + mask, payload);
  },
  delete(mask) {
    return axios.delete("/staff/family/" + mask);
  },
};
