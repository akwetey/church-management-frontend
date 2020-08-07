import axios from "./axios";

export default {
  all() {
    return axios.get("/staff/users");
  },
  store(payload) {
    return axios.post("/staff/users", payload);
  },
  show(mask) {
    return axios.get("/staff/users/" + mask);
  },
  update(payload, mask) {
    return axios.put("/staff/users/" + mask, payload);
  },
  delete(mask) {
    return axios.delete("/staff/users/" + mask);
  },
};
