import axios from "./axios";

export default {
  all() {
    return axios.get("/staff/attendance");
  },
  store(payload) {
    return axios.post("/staff/attendance", payload);
  },
  show(mask) {
    return axios.get("/staff/attendance/" + mask);
  },
  update(payload, mask) {
    return axios.post("/staff/attendance/" + mask, payload);
  },
  delete(mask) {
    return axios.delete("/staff/attendance/" + mask);
  },
  download(mask) {
    return axios.get(`/staff/attendance/${mask}/download`);
  },
  template() {
    return axios.get("/staff/attendance/template");
  },
};
