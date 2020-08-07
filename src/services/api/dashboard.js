import Axios from "./axios";

export default {
  init() {
    return Axios.get("/staff/dashboard");
  },
};
