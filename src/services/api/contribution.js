import Axios from "./axios";

export default {
  all() {
    return Axios.get("/api/contributions");
  },
};
