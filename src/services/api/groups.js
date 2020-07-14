import axios from "./axios";

export default {
  all() {
    return axios.get("/api/groups");
  },
  store(payload) {
    return axios.post("/api/groups", payload);
  },
  show(mask) {
    return axios.get("/api/groups/" + mask);
  },
  update(payload, mask) {
    return axios.put("/api/groups/" + mask, payload);
  },
  delete(mask) {
    return axios.delete("/api/groups/" + mask);
  },
};
