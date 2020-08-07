import axios from "./axios";

export default {
  all() {
    return axios.get("/staff/groups");
  },
  store(payload) {
    return axios.post("/staff/groups", payload);
  },
  show(mask) {
    return axios.get("/staff/groups/" + mask);
  },
  update(payload, mask) {
    return axios.put("/staff/groups/" + mask, payload);
  },
  delete(mask) {
    return axios.delete("/staff/groups/" + mask);
  },
};
