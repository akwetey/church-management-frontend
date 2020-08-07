import Axios from "./axios";

export default {
  all() {
    return Axios.get("/staff/books");
  },
  store(payload) {
    return Axios.post("/staff/books", payload);
  },
  show(mask) {
    return Axios.get("/staff/books/" + mask);
  },
  update(payload, mask) {
    return Axios.post("/staff/books/" + mask, payload);
  },
  delete(mask) {
    return Axios.delete("/staff/books/" + mask);
  },
  generateDownloadableLink(mask) {
    return Axios.get("/staff/books/" + mask + "/generate-link");
  },
  public: {
    all() {
      return Axios.get("/staff/public/books");
    },
  },
};
