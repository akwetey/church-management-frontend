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
  busingshow(mask) {
    return Axios.get("/staff/contributions/busing/" + mask);
  },
  busingupdate(payload, mask) {
    return Axios.put("/staff/contributions/busing/" + mask, payload);
  },
  busingdelete(mask) {
    return Axios.delete("/staff/contributions/busing/" + mask);
  },
  titheAdd(payload) {
    return Axios.post("/staff/contributions/tithes", payload);
  },
  titheShow(mask) {
    return Axios.get("/staff/contributions/tithes/" + mask);
  },
  titheUpdate(payload, mask) {
    return Axios.put("/staff/contributions/tithes/" + mask, payload);
  },
  groupAdd(payload) {
    return Axios.post("/staff/contributions/groups", payload);
  },
  groupShow(mask) {
    return Axios.post("/staff/contributions/groups", mask);
  },
};
