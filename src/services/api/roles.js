import axios from "./axios";

export default {
  all() {
    return axios.get("/api/roles");
  },
  rolepermissions() {
    return axios.get("/api/roles/permissions");
  },
  store(payload) {
    return axios.post("/api/roles", payload);
  },
  show(mask) {
    return axios.get("/api/roles/" + mask);
  },
  update(payload, mask) {
    return axios.put("/api/roles/" + mask, payload);
  },
  delete(mask) {
    return axios.delete("/api/roles/" + mask);
  },
};
