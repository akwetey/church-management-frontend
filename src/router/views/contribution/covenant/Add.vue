<template>
  <div>
    <div class="card min-height-500">
      <div class="card-body">
        <p class="mb-3">NB: Fields marked * are required</p>

        <div class="form-msg" ref="formMsg"></div>

        <form @submit.prevent="addCovenant">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="amount">Amount *</label>
                <input
                  type="number"
                  name="amount"
                  min="0"
                  id="amount"
                  class="form-control"
                  required
                  v-model.trim="amount"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="date">Date *</label>
                <flat-pickr
                  v-model="date"
                  placeholder="Select Date"
                  name="date"
                  id="date"
                  required
                  class="form-control bg-white"
                ></flat-pickr>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="person">Person *</label>
                <MultiSelect
                  v-model="member"
                  :options="members"
                  :filter="true"
                  optionValue="id"
                  optionLabel="name"
                  placeholder="Select Person"
                  class="form-control"
                  required
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="comment">Comment</label>
                <textarea
                  name="comment"
                  id="comment"
                  cols="30"
                  rows="5"
                  class="form-control"
                  v-model="comment"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="text-center">
            <div class="form-group mt-5">
              <button class="btn btn-success px-5" ref="submitBtn">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { addBtnLoading, removeBtnLoading } from "@services/helpers";
import Member from "@services/api/people";
import Contribution from "@services/api/contribution";
import Swal from "sweetalert2";
import MultiSelect from "primevue/multiselect";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
  name: "Covenant",
  components: {
    MultiSelect,
    flatPickr,
  },
  data() {
    return {
      amount: "",
      comment: "",
      date: "",
      member: [],
      members: [],
    };
  },
  methods: {
    async addCovenant(e) {
      const btn = this.$refs.submitBtn;
      const formMsg = this.$refs.formMsg;
      const covenantData = [];
      this.member.forEach((id) => {
        const obj = {};
        (obj.person = id),
          (obj.date = this.date),
          (obj.comment = this.comment),
          (obj.amount = this.amount);
        covenantData.push(obj);
      });
      try {
        addBtnLoading(btn);
        const formData = {
          contributions: covenantData,
        };
        const response = await Contribution.covenant(formData);
        const res = response.data;
        removeBtnLoading(btn);
        Swal.fire("Success", res.message, "success");
        this.$router.push({ name: "Contributions" });
      } catch (err) {
        const res = err.response.data;
        let errorBag = "";
        if (res.code === 422) {
          removeBtnLoading(btn);
          const errorData = Object.values(res.errors);
          errorData.map((error) => {
            errorBag += `<span class="d-block">${error}</span>`;
          });
        } else {
          errorBag += res.message;
        }
        formMsg.innerHTML = `<div class="alert alert-danger">${errorBag}</div>`;
      }
    },

    //fetch members
    async getMembers() {
      try {
        const response = await Member.members();
        const res = response.data;
        this.members = res.data;
      } catch (error) {
        console.log(error);
      }
    },
  },

  async created() {
    await this.getMembers();
  },
};
</script>
