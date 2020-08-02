import Axios from "./axios";

export default {
  all() {
    return Axios.get("/api/pledges");
  },
  store(payload) {
    return Axios.post("/api/pledges", payload);
  },
  show(mask) {
    return Axios.get("/api/pledges/" + mask);
  },
  update(payload, mask) {
    return Axios.post("/api/pledges/" + mask, payload);
  },
  delete(mask) {
    return Axios.delete("/api/pledges/" + mask);
  },
};
