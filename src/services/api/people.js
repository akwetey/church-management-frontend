import axios from "./axios";

export default {
  all() {
    return axios.get("/staff/people");
  },
  members() {
    return axios.get("/staff/people/members");
  },
  store(payload) {
    return axios.post("/staff/people", payload);
  },
  show(mask) {
    return axios.get("/staff/people/" + mask);
  },
  update(payload, mask) {
    return axios.post("/staff/people/" + mask, payload);
  },
  delete(mask) {
    return axios.delete("/staff/people/" + mask);
  },
  person: {
    details(mask) {
      return axios.get("/staff/people/" + mask + "/details");
    },
    attendance(mask) {
      return axios.get("/staff/people/" + mask + "/attendance");
    },
    followUp(mask) {
      return axios.get("/staff/people/" + mask + "/follow-ups");
    },
    contributions(mask) {
      return axios.get("/staff/people/" + mask + "/contributions");
    },
  },
};
