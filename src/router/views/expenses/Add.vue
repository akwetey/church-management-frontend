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

            <form @submit.prevent="addExpenses">
              <div class="row mt-3">
                <div
                  class="col-md-6 mb-4"
                  v-for="(expense, i) in expenses"
                  :key="i"
                >
                  <div class="row border mr-2 py-4 px-3">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="name">Name *</label>
                        <input
                          type="text"
                          :name="`name-${i}`"
                          :id="`name-${i}`"
                          class="form-control"
                          required
                          v-model.trim="expense.name"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <div class="d-flex">
                          <label for="date">Amount *</label>
                          <button
                            style="margin-top: -8px;"
                            class="btn btn-danger btn-icon-28 ml-auto"
                            type="button"
                            @click="RemoveRecord"
                            v-if="expenses.length > 1 && i !== 0"
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
                          v-model.trim="expense.amount"
                        />
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="date">Date *</label>
                        <flat-pickr
                          v-model="expense.date"
                          placeholder="Select Date"
                          :name="`date-${i}`"
                          :id="`date-${i}`"
                          class="form-control bg-white"
                        ></flat-pickr>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="method">Type *</label>
                        <select
                          name="method"
                          id="method"
                          class="custom-select"
                          v-model.number="expense.type"
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
                          v-model="expense.comment"
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
import Expenses from "@services/api/expenses";
import Swal from "sweetalert2";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
  name: "Expenses",
  components: {
    flatPickr,
  },
  data() {
    return {
      expenses: [
        {
          amount: 0,
          comment: "",
          type: "",
          name: "",
          date: "",
        },
      ],
      methods: [
        { name: "Utility ", id: 1 },
        { name: "Donation ", id: 2 },
        { name: "Welfare ", id: 3 },
        { name: "Equipment And Technology ", id: 4 },
        { name: "Allowance  ", id: 5 },
        { name: "Building And Construction", id: 6 },
        { name: "Publicity", id: 7 },
        { name: "Evangelism", id: 8 },
      ],
    };
  },

  methods: {
    async addExpenses(e) {
      const btn = this.$refs.submitBtn;
      const formMsg = this.$refs.formMsg;
      try {
        const errors = [];
        this.expenses.forEach((expense) => {
          if (!expense.name) errors.push("error");
          if (!expense.type) errors.push("error");
          if (!expense.amount) errors.push("error");
          if (!expense.date) errors.push("error");
        });

        if (errors.length) {
          Swal.fire("", "All fields marked * are required", "info");
          return;
        }
        addBtnLoading(btn);
        const formData = {
          expenses: this.expenses,
        };
        const response = await Expenses.store(formData);
        const res = response.data;
        removeBtnLoading(btn);
        Swal.fire("Success", res.message, "success");
        this.$router.push({ name: "expenses" });
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
      this.expenses.push({
        amount: 0,
        comment: "",
        type: "",
        name: "",
        date: "",
      });
    },
    RemoveRecord() {
      this.expenses.pop();
    },
  },
};
</script>
