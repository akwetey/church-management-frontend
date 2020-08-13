import Axios from "./axios";

export default {
  all() {
    return Axios.get("/staff/contributions/pledges");
  },
  store(payload) {
    return Axios.post("/staff/contributions/pledges", payload);
  },
  show(mask) {
    return Axios.get("/staff/contributions/pledges/" + mask);
  },
  update(payload, mask) {
    return Axios.put("/staff/contributions/pledges/" + mask, payload);
  },
  delete(mask) {
    return Axios.delete("/staff/contributions/pledges/" + mask);
  },
};
