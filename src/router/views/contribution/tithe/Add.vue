<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-md-10 offset-1">
            <div class="d-flex mb-4">
              <p class="mb-3">NB: Fields marked * are required</p>

              <div class="ml-auto">
                <button class="btn btn-primary" type="button" @click="addRecord">Add More Records</button>
              </div>
            </div>

            <form @submit.prevent="submitForm">
              <div class="row">
                <div class="col-md-6" v-for="(tithe, i) in tithes" :key="i">
                  <div class="border pb-3 pt-4 px-5 shadow-sm mb-3" style="min-height:330px;">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>Person *</label>
                          <Dropdown
                            class="form-control"
                            v-model="tithe.person"
                            :options="people"
                            optionLabel="name"
                            optionValue="id"
                            :filter="true"
                            placeholder="Select person"
                            :id="`dropdown-${i}`"
                          ></Dropdown>
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="form-group">
                          <div class="d-flex">
                            <label for>Amount *</label>

                            <button
                              v-if="i !== 0"
                              style="margin-top: -8px;"
                              class="btn btn-danger btn-icon-28 ml-auto"
                              type="button"
                              @click="removeRecord(i)"
                              v-tooltip.top="'Remove'"
                            >
                              <i class="pi pi-trash"></i>
                            </button>
                          </div>

                          <input
                            type="text"
                            :name="`amount-${i}`"
                            :id="`amount-${i}`"
                            class="form-control"
                            v-model.number="tithe.amount"
                            :key="i"
                          />
                        </div>
                      </div>

                      <div class="col-md-6">
                        <div class="form-group">
                          <label for>Frequency *</label>
                          <Dropdown
                            class="form-control"
                            v-model="tithe.frequency"
                            :options="frequencies"
                            placeholder
                            :id="`frequency-${i}`"
                          ></Dropdown>
                        </div>
                      </div>

                      <div class="col-md-6">
                        <template v-if="tithe.frequency.toLowerCase() === 'monthly'">
                          <div class="form-group">
                            <label for class="d-block">Select Month *</label>
                            <Calendar
                              class="w-100"
                              :id="`date-${i}`"
                              v-model="tithe.date"
                              view="month"
                              dateFormat="M-yy"
                              :yearNavigator="true"
                              yearRange="2000:2100"
                              placeholder="Select Month"
                            />
                          </div>
                        </template>

                        <template v-else>
                          <div class="form-group">
                            <label for class="d-block">Select Date *</label>
                            <flatPickr
                              class="form-control bg-white"
                              v-model="tithe.date"
                              placeholder="Select Date"
                              :config="dateConfig"
                            />
                          </div>
                        </template>
                      </div>

                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="method">Method of payment *</label>
                          <select
                            name="method"
                            id="method"
                            class="custom-select"
                            v-model.number="tithe.method"
                          >
                            <option
                              :value="method.id"
                              v-for="(method, i) in methods"
                              :key="i"
                            >{{ method.name }}</option>
                          </select>
                        </div>
                      </div>

                      <div class="col-12">
                        <div class="form-group">
                          <label for>Comments</label>
                          <input
                            type="text"
                            :name="`comment-${i}`"
                            :id="`comment-${i}`"
                            class="form-control"
                            v-model="tithe.comment"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-12 pt-4">
                  <button
                    class="btn btn-success px-5"
                    ref="submitBtn"
                    :disabled="!tithes.length"
                  >Submit</button>
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
import People from "@services/api/people";
import Contribution from "@services/api/contribution";
import Swal from "sweetalert2";
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import dayjs from "dayjs";

export default {
  name: "TitheAdd",
  components: {
    Dropdown,
    Calendar,
    flatPickr,
  },
  data() {
    return {
      people: [],
      frequencies: ["Weekly", "Monthly"],
      tithes: [
        {
          amount: 0,
          date: null,
          frequency: "Monthly",
          person: "",
          comment: "",
          method: "",
        },
      ],
      dateConfig: {
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Y-m-d",
        allowInput: true,
      },
      methods: [
        { name: "Cash", id: 1 },
        { name: "Cheque", id: 2 },
        { name: "Online", id: 3 },
        { name: "Mobile Money", id: 4 },
      ],
    };
  },
  computed: {
    defaultAvatar() {
      return this.$store.getters.defaultAvatar;
    },
  },
  methods: {
    getMembers() {
      People.members()
        .then((response) => {
          const { data } = response.data;
          this.people = data;
        })
        .catch((err) => console.log(err));
    },

    addRecord() {
      this.tithes.push({
        amount: 0,
        date: null,
        frequency: "Monthly",
        person: null,
        comment: "",
        method: 1,
      });
    },

    removeRecord(index) {
      this.tithes = this.tithes.filter((r, i) => i !== index);
    },

    submitForm(e) {
      const btn = this.$refs.submitBtn;
      const errors = [];

      this.tithes.forEach((tithe) => {
        if (!tithe.person) errors.push("error");
        if (!tithe.date) errors.push("error");
      });

      if (errors.length) {
        Swal.fire("", "All fields marked * are required", "info");
        return;
      }

      addBtnLoading(btn);

      const tithes = this.tithes.map((tithe) => {
        const date = dayjs(tithe.date).format("YYYY-MM-DD");

        return {
          ...tithe,
          frequency: tithe.frequency.toLowerCase(),
          date,
        };
      });

      Contribution.titheAdd({ tithes })
        .then((response) => {
          const res = response.data;
          Swal.fire("Success", res.message, "success");
          this.$router.push({ name: "Contributions" });
        })
        .catch((err) => {
          const { status, data } = err.response;
          let errorBag = "";
          if (status === 422) {
            const errorData = Object.values(data.errors);
            errorData.map((error) => {
              errorBag += `<span class="d-block">${error}</span>`;
            });
          } else {
            errorBag += data.message;
          }
          Swal.fire("", errorBag, "warning");
        })
        .finally(() => {
          removeBtnLoading(btn);
        });
    },
  },

  created() {
    this.getMembers();
  },
};
</script>
