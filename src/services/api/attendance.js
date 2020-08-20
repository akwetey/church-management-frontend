import Axios from "./axios";

export default {
  all() {
    return Axios.get("/staff/attendance");
  },
  store(payload) {
    return Axios.post("/staff/attendance", payload);
  },
  show(mask) {
    return Axios.get("/staff/attendance/" + mask);
  },
  update(payload, mask) {
    return Axios.post("/staff/attendance/" + mask, payload);
  },
  delete(mask) {
    return Axios.delete("/staff/attendance/" + mask);
  },
  download(mask) {
    return Axios.get(`/staff/attendance/${mask}/download`);
  },
  template(params) {
    return Axios.get("/staff/attendance/template", params);
  },
};
