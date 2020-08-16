<template>
  <div>
    <div class="card">
      <div class="card-body">
        <ValidationObserver ref="form">
          <form @submit.prevent="submitForm">
            <div class="row">
              <div class="col-md-8 offset-md-2">
                <p class="mb-4">NB: Fields marked * are required</p>

                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for>Person *</label>
                      <input
                        type="text"
                        name="person"
                        id="person"
                        class="form-control bg-white"
                        v-model="tithe.person.name"
                        readonly
                      />
                    </div>
                  </div>

                  <div class="col-md-6">
                    <ValidationProvider name="amount" rules="required|decimal" v-slot="{ errors }">
                      <div class="form-group">
                        <label for>Amount *</label>
                        <input
                          type="text"
                          name="amount"
                          id="amount"
                          class="form-control"
                          v-model.number="tithe.amount"
                        />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
                      <label for>Frequency *</label>
                      <Dropdown
                        class="form-control"
                        v-model="tithe.frequency"
                        :options="frequencies"
                        placeholder
                      ></Dropdown>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <keep-alive>
                      <ValidationProvider
                        name="date"
                        rules="required"
                        v-slot="{ errors }"
                        v-if="tithe.frequency.toLowerCase() === 'monthly'"
                      >
                        <div class="form-group">
                          <label for class="d-block">Select Month *</label>
                          <Calendar
                            class="w-100"
                            v-model="tithe.date"
                            view="month"
                            dateFormat="M-yy"
                            :yearNavigator="true"
                            yearRange="2000:2100"
                            placeholder="Select Month"
                          />
                          <span class="text-danger">{{ errors[0] }}</span>
                        </div>
                      </ValidationProvider>
                    </keep-alive>

                    <div class="form-group" v-if="tithe.frequency.toLowerCase() === 'weekly'">
                      <label for class="d-block">Select Date *</label>
                      <flatPickr
                        class="form-control bg-white"
                        v-model="tithe.date"
                        placeholder="Select Date"
                        :config="dateConfig"
                        required
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

                  <div class="col-md-12">
                    <div class="form-group">
                      <label for>Comments *</label>
                      <input
                        type="text"
                        name="comment"
                        id="comment"
                        class="form-control"
                        v-model="tithe.comment"
                        required
                      />
                    </div>

                    <div class="form-group mt-4">
                      <button class="btn btn-success px-5" ref="submitBtn">Submit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </ValidationObserver>
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
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import dayjs from "dayjs";

export default {
  name: "TitheEdit",
  components: {
    Dropdown,
    Calendar,
    flatPickr,
  },
  data() {
    return {
      tithe: {
        person: {},
        date: "",
        amount: 0,
        frequency: "",
        comment: "",
        method: "",
      },
      frequencies: ["Weekly", "Monthly"],
      dateConfig: {
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Y-m-d",
        allowInput: true,
      },
      mask: "",
      methods: [
        { name: "Cash", id: 1 },
        { name: "Cheque", id: 2 },
        { name: "Online", id: 3 },
        { name: "Mobile Money", id: 4 },
      ],
    };
  },
  methods: {
    setData(payload) {
      this.tithe.person = payload.person;
      this.tithe.date = payload.date;
      this.tithe.amount = payload.amount;
      this.tithe.frequency =
        payload.frequency.charAt(0).toUpperCase() + payload.frequency.slice(1);
      this.tithe.comment = payload.comment;
      this.mask = payload.mask;
      this.tithe.method = payload.method;
    },
    submitForm(e) {
      this.$refs.form.validate().then((result) => {
        if (!result) return;

        const btn = this.$refs.submitBtn;
        addBtnLoading(btn);

        const tithe = {
          ...this.tithe,
          person: this.tithe.person.id,
          frequency: this.tithe.frequency.toLowerCase(),
          date: dayjs(this.tithe.date).format("YYYY-MM-DD"),
        };

        Contribution.titheUpdate(tithe, this.mask)
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
      });
    },
  },
  async beforeRouteEnter(to, from, next) {
    const mask = to.params.mask;
    const response = await Contribution.titheShow(mask);
    const res = response.data;

    next((vm) => vm.setData(res.data));
  },
};
</script>
