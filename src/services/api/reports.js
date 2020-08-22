import axios from "./axios";

export default {
  attendance(params) {
    return axios.get("/staff/reports/attendance", params);
  },
  expenses(params) {
    return axios.get("/staff/reports/expenses", params);
  },
};
