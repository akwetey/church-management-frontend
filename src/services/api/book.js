import Axios from "./axios";

export default {
  all() {
    return Axios.get("/api/books");
  },
  store(payload) {
    return Axios.post("/api/books", payload);
  },
  show(mask) {
    return Axios.get("/api/books/" + mask);
  },
  update(payload, mask) {
    return Axios.post("/api/books/" + mask, payload);
  },
  delete(mask) {
    return Axios.delete("/api/books/" + mask);
  },
  generateDownloadableLink(mask) {
    return Axios.get("/api/books/" + mask + "/generate-link");
  },
  public: {
    all() {
      return Axios.get("/api/public/books");
    },
  },
};
