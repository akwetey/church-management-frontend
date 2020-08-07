import axios from "./axios";

export default {
  all() {
    return axios.get("/staff/people");
  },
  members() {
    return axios.get("/staff/people/members");
  },
  store(payload) {
    return axios.post("/staff/people", payload);
  },
  show(mask) {
    return axios.get("/staff/people/" + mask);
  },
  update(payload, mask) {
    return axios.post("/staff/people/" + mask, payload);
  },
  delete(mask) {
    return axios.delete("/staff/people/" + mask);
  },
};
