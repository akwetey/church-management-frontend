import axios from "./axios";

export default {
  expensetemplate() {
    return axios.get("/staff/expenses/template");
  },
  importexpense(payload) {
    return axios.post("/staff/expenses/import", payload);
  },
};
