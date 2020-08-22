import axios from "./axios";

export default {
  attendance(params) {
    return axios.get("/staff/reports/attendance", params);
  },
};
