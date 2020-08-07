import Axios from "./axios";

export default {
  all() {
    return Axios.get("/api/contributions");
  },
  covenant(payload) {
    return Axios.post("/api/contributions/covenant-partner", payload);
  },
  covedelete(mask) {
    return Axios.delete("/api/contributions/covenant-partner/" + mask);
  },
  coveshow(mask) {
    return Axios.get("/api/contributions/covenant-partner/" + mask);
  },
  coveupdate(payload, mask) {
    return Axios.put("/api/contributions/covenant-partner/" + mask, payload);
  },
};
