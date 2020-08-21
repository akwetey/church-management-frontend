import axios from "./axios";

export default {
  all() {
    return axios.get("/staff/expenses");
  },
  store(payload) {
    return axios.post("/staff/expenses", payload);
  },
  show(mask) {
    return axios.get("/staff/expenses/" + mask);
  },
  update(payload, mask) {
    return axios.put("/staff/expenses/" + mask, payload);
  },
  delete(mask) {
    return axios.delete("/staff/expenses/" + mask);
  },
};
