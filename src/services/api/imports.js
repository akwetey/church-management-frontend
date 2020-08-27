import axios from "./axios";

export default {
  expensetemplate() {
    return axios.get("/staff/expenses/template");
  },
  importexpense(payload) {
    return axios.post("/staff/expenses/import", payload);
  },
  contributiontemplate() {
    return axios.get("/staff/contributions/template");
  },
  importcontribution(payload) {
    return axios.post("/staff/contributions/import", payload);
  },
};
