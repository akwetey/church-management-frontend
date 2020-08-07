import Axios from "./axios";

export default {
  all() {
    return Axios.get("/staff/contribution/pledges");
  },
  store(payload) {
    return Axios.post("/staff/contribution/pledges", payload);
  },
  show(mask) {
    return Axios.get("/staff/contribution/pledges/" + mask);
  },
  update(payload, mask) {
    return Axios.put("/staff/contribution/pledges/" + mask, payload);
  },
  delete(mask) {
    return Axios.delete("/staff/contribution/pledges/" + mask);
  },
};
