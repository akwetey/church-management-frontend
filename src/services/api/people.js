import axios from "./axios";

export default {
  all() {
    return axios.get("/api/people");
  },
  members() {
    return axios.get("/api/people/members");
  },
  store(payload) {
    return axios.post("/api/people", payload);
  },
  show(mask) {
    return axios.get("/api/people/" + mask);
  },
  update(payload, mask) {
    return axios.post("/api/people/" + mask, payload);
  },
  delete(mask) {
    return axios.delete("/api/people/" + mask);
  },
};
