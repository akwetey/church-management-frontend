import Axios from "./axios";

export default {
  all() {
    return Axios.get("/api/follow-up");
  },
  store(formData) {
    return Axios.post("/api/follow-up", formData);
  },
  show(mask) {
    return Axios.get("/api/follow-up/" + mask);
  },
  update(mask, formDatat) {
    return Axios.put("/api/follow-up/" + mask, formData);
  },
};
