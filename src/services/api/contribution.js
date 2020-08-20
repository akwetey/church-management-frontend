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
  tithedelete(mask) {
    return Axios.delete("/staff/contributions/tithes/" + mask);
  },
  groupAdd(payload) {
    return Axios.post("/staff/contributions/groups", payload);
  },
  groupShow(mask) {
    return Axios.get("/staff/contributions/groups/" + mask);
  },
  groupUpdate(payload, mask) {
    return Axios.put("/staff/contributions/groups/" + mask, payload);
  },
  groupdelete(mask) {
    return Axios.delete("/staff/contributions/groups/" + mask);
  },
  welfareAdd(payload) {
    return Axios.post("/staff/contributions/welfare", payload);
  },
  welfareShow(mask) {
    return Axios.get("/staff/contributions/welfare/" + mask);
  },
  welfareUpdate(payload, mask) {
    return Axios.put("/staff/contributions/welfare/" + mask, payload);
  },
  welfaredelete(mask) {
    return Axios.delete("/staff/contributions/welfare/" + mask);
  },
  pledgeAdd(payload) {
    return Axios.post("/staff/contributions/pledge", payload);
  },
  pledgeShow(mask) {
    return Axios.get("/staff/contributions/pledge/" + mask);
  },
  pledgeUpdate(payload, mask) {
    return Axios.put("/staff/contributions/pledge/" + mask, payload);
  },
  pledgedelete(mask) {
    return Axios.delete("/staff/contributions/pledge/" + mask);
  },

  generalAdd(payload) {
    return Axios.post("/staff/contributions/general", payload);
  },
  generaldelete(mask) {
    return Axios.delete("/staff/contributions/general/" + mask);
  },
  generalShow(mask) {
    return Axios.get("/staff/contributions/general/" + mask);
  },
  generalUpdate(payload, mask) {
    return Axios.put("/staff/contributions/general/" + mask, payload);
  },
};
