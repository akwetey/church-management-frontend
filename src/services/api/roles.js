import axios from "./axios";

export default {
  all() {
    return axios.get("/staff/roles");
  },
  rolepermissions() {
    return axios.get("/staff/roles/permissions");
  },
  store(payload) {
    return axios.post("/staff/roles", payload);
  },
  show(mask) {
    return axios.get("/staff/roles/" + mask);
  },
  update(payload, mask) {
    return axios.put("/staff/roles/" + mask, payload);
  },
  delete(mask) {
    return axios.delete("/staff/roles/" + mask);
  },
};
