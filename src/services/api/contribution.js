import Axios from "./axios";

export default {
  all() {
    return Axios.get("/staff/contributions");
  },
  covenant(payload) {
    return Axios.post("/staff/contributions/covenant-partner", payload);
  },
  covedelete(mask) {
    return Axios.delete("/staff/contributions/covenant-partner/" + mask);
  },
  coveshow(mask) {
    return Axios.get("/staff/contributions/covenant-partner/" + mask);
  },
  coveupdate(payload, mask) {
    return Axios.put("/staff/contributions/covenant-partner/" + mask, payload);
  },
  busing(payload) {
    return Axios.post("/staff/contributions/busing", payload);
  },
};
