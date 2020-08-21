<template>
  <div>
    <div class="card min-height-500">
      <div class="card-body">
        <div class="row">
          <div class="col-md-8 offset-md-2">
            <p class="mb-3">NB: Fields marked * are required</p>

            <div class="form-msg" ref="formMsg"></div>

            <form @submit.prevent="updateExpense">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="name">Name *</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      class="form-control"
                      required
                      v-model.trim="name"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="amount">Amount *</label>
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      min="0"
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
                    <label for="method">Type *</label>
                    <select
                      name="type"
                      id="type"
                      class="custom-select"
                      v-model.number="type"
                    >
                      <option
                        :value="m.id"
                        v-for="(m, i) in methods"
                        :key="i"
                        >{{ m.name }}</option
                      >
                    </select>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <label for="comment">Comment *</label>
                    <textarea
                      name="comment"
                      id="comment"
                      cols="30"
                      rows="3"
                      class="form-control"
                      v-model="comment"
                      required
                    ></textarea>
                  </div>
                </div>
              </div>
              <div class="text-center">
                <div class="form-group mt-5">
                  <button class="btn btn-success px-5" ref="submitBtn">
                    Update
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
  name: "ExpenseEdit",
  components: {
    flatPickr,
  },
  data() {
    return {
      amount: "",
      comment: "",
      date: "",
      name: "",
      type: "",
      group: "",
      mask: "",
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
    async updateExpense(e) {
      const btn = this.$refs.submitBtn;
      const formMsg = this.$refs.formMsg;
      try {
        addBtnLoading(btn);
        const formData = {
          amount: this.amount,
          name: this.name,
          date: this.date,
          type: this.type,
          comment: this.comment,
        };
        const response = await Expenses.update(formData, this.mask);
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
    //set data
    setData(expense) {
      console.log(data);
      const { data } = expense;
      this.amount = data.amount;
      this.name = data.name;
      this.date = data.date;
      this.comment = data.comment;
      this.mask = data.mask;
      this.type = data.type;
    },
  },

  async beforeRouteEnter(to, from, next) {
    try {
      const mask = to.params.mask;
      if (!mask) {
        next({ name: "Home" });
      }

      const response = await Expenses.show(mask);
      next((vm) => vm.setData(response.data));
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
