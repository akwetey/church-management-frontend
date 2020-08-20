<template>
  <div>
    <div class="card min-height-500">
      <div class="card-body">
        <div class="row">
          <div class="col-md-10 offset-md-1">
            <div class="d-flex">
              <p class="mb-3">NB: Fields marked * are required</p>

              <div class="ml-auto">
                <button
                  class="btn btn-primary"
                  type="button"
                  @click="addMoreRecords"
                >
                  Add More Records
                </button>
              </div>
            </div>
            <div class="form-msg" ref="formMsg"></div>

            <form @submit.prevent="addGeneral">
              <div class="row mt-3">
                <div
                  class="col-md-6 mb-4"
                  v-for="(contribution, i) in contributions"
                  :key="i"
                >
                  <div class="row border mr-2 py-4 px-3">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="title">Title *</label>
                        <input
                          type="text"
                          :name="`title-${i}`"
                          :id="`title-${i}`"
                          class="form-control"
                          required
                          v-model.trim="contribution.name"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <div class="d-flex">
                          <label for="amount">Amount *</label>
                          <button
                            style="margin-top: -8px;"
                            class="btn btn-danger btn-icon-28 ml-auto"
                            type="button"
                            @click="RemoveRecord"
                            v-if="contributions.length > 1 && i !== 0"
                            v-tooltip.top="'Remove'"
                          >
                            <i class="pi pi-trash"></i>
                          </button>
                        </div>
                        <input
                          type="number"
                          :name="`amount-${i}`"
                          min="0"
                          :id="`amount-${i}`"
                          class="form-control"
                          required
                          v-model.trim="contribution.amount"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="date">Date *</label>
                        <flat-pickr
                          v-model="contribution.date"
                          placeholder="Select Date"
                          :name="`date-${i}`"
                          :id="`date-${i}`"
                          class="form-control bg-white"
                        ></flat-pickr>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="method">Method of payment *</label>
                        <select
                          name="method"
                          id="method"
                          class="custom-select"
                          v-model.number="contribution.method"
                        >
                          <option
                            :value="method.id"
                            v-for="(method, i) in methods"
                            :key="i"
                            >{{ method.name }}</option
                          >
                        </select>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group">
                        <label for="comment">Comment</label>
                        <input
                          type="text"
                          :name="`comment-${i}`"
                          :id="`comment-${i}`"
                          class="form-control"
                          v-model="contribution.comment"
                        />
                      </div>
                    </div>
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
    </div>
  </div>
</template>

<script>
import { addBtnLoading, removeBtnLoading } from "@services/helpers";
import Contribution from "@services/api/contribution";
import Swal from "sweetalert2";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
  name: "General",
  components: {
    flatPickr,
  },
  data() {
    return {
      contributions: [
        {
          amount: 0,
          comment: "",
          name: "",
          date: "",
          method: 1,
        },
      ],
      methods: [
        { name: "Cash", id: 1 },
        { name: "Cheque", id: 2 },
        { name: "Online", id: 3 },
        { name: "Mobile Money", id: 4 },
      ],
    };
  },

  methods: {
    async addGeneral(e) {
      const btn = this.$refs.submitBtn;
      const formMsg = this.$refs.formMsg;
      try {
        const errors = [];
        this.contributions.forEach((contribution) => {
          if (!contribution.date) errors.push("error");
          if (!contribution.name) errors.push("error");
          if (!contribution.method) errors.push("error");
        });

        if (errors.length) {
          Swal.fire("", "All fields marked * are required", "info");
          return;
        }
        addBtnLoading(btn);
        const formData = {
          contributions: this.contributions,
        };
        const response = await Contribution.generalAdd(formData);
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

    addMoreRecords() {
      this.contributions.push({
        amount: 0,
        comment: "",
        name: "",
        date: "",
        method: 1,
      });
    },
    RemoveRecord() {
      this.contributions.pop();
    },
  },
};
</script>
