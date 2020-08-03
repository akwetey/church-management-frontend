import Axios from "./axios";

export default {
  all() {
    return Axios.get("/api/contribution/pledges");
  },
  store(payload) {
    return Axios.post("/api/contribution/pledges", payload);
  },
  show(mask) {
    return Axios.get("/api/contribution/pledges/" + mask);
  },
  update(payload, mask) {
    return Axios.post("/api/contribution/pledges/" + mask, payload);
  },
  delete(mask) {
    return Axios.delete("/api/contribution/pledges/" + mask);
  },
};
