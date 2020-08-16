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
                >Add More Records</button>
              </div>
            </div>
            <div class="form-msg" ref="formMsg"></div>

            <form @submit.prevent="addBusing">
              <div class="row mt-3">
                <div class="col-md-6 mb-4" v-for="(contribution, i) in contributions" :key="i">
                  <div class="row border mr-2 py-4 px-3">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="amount">Amount *</label>
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
                        <div class="d-flex">
                          <label for="date">Select Month *</label>
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
                        <Calendar
                          class="w-100"
                          :id="`date-${i}`"
                          v-model="contribution.date"
                          view="month"
                          dateFormat="M-yy"
                          :yearNavigator="true"
                          yearRange="2000:2100"
                          placeholder="Select Month"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="person">Person *</label>
                        <Dropdown
                          v-model="contribution.person"
                          :options="members"
                          :filter="true"
                          optionLabel="name"
                          optionValue="id"
                          placeholder="Select Person"
                          class="form-control"
                        />
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
                          >{{ method.name }}</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-6">
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
                  <button class="btn btn-success px-5" ref="submitBtn">Save</button>
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
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import contributionMixin from "@/mixins/contributionMixin";
import dayjs from "dayjs";

export default {
  name: "Welfare",
  components: {
    Dropdown,
    Calendar,
  },
  mixins: [contributionMixin],

  methods: {
    async addBusing(e) {
      const btn = this.$refs.submitBtn;
      const formMsg = this.$refs.formMsg;
      try {
        const errors = [];
        this.contributions.forEach((contribution) => {
          if (!contribution.person) errors.push("error");
          if (!contribution.date) errors.push("error");
          if (!contribution.method) errors.push("error");
        });

        if (errors.length) {
          Swal.fire("", "All fields marked * are required", "info");
          return;
        }
        addBtnLoading(btn);
        const contributions = this.contributions.map((contribute) => {
          const date = dayjs(contribute.date).format("YYYY-MM-DD");

          return {
            ...contribute,
            date,
          };
        });

        const response = await Contribution.welfareAdd({ contributions });
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
  },
};
</script>
