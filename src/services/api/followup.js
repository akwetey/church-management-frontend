import Axios from "./axios";

export default {
  all() {
    return Axios.get("/staff/follow-up");
  },
  store(formData) {
    return Axios.post("/staff/follow-up", formData);
  },
  show(mask) {
    return Axios.get("/staff/follow-up/" + mask);
  },
  update(formData, mask) {
    return Axios.put("/staff/follow-up/" + mask, formData);
  },
  delete(mask) {
    return Axios.delete("/staff/follow-up/" + mask);
  },
};
