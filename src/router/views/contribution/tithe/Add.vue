<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="d-flex mb-4">
          <p class="mb-3">NB: Fields marked * are required</p>

          <div class="ml-auto">
            <button class="btn btn-primary" type="button" @click="addMoreRecords">Add More Records</button>
          </div>
        </div>

        <form @submit.prevent="submitForm">
          <div class="row">
            <div class="col-md-6" v-for="(tithe, i) in tithes" :key="i">
              <div class="border py-3 px-3">
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
                      <label for>Amount *</label>
                      <input
                        type="text"
                        :name="`amount-${i}`"
                        :id="`amount-${i}`"
                        class="form-control"
                        v-model.number="tithe.amount"
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
                    <div class="form-group" v-if="tithe.frequency.toLowerCase() === 'monthly'">
                      <label for class="d-block">Select Month *</label>
                      <Calendar
                        class="w-100"
                        :id="`date-${i}`"
                        v-model="tithe.date"
                        view="month"
                        dateFormat="mm-yy"
                        :yearNavigator="true"
                        yearRange="2000:2100"
                        placeholder="Select Month"
                      />
                    </div>
                    <div class="form-group" v-else>
                      <label for class="d-block">Select Date *</label>
                      <flatPickr
                        class="form-control bg-white"
                        v-model="tithe.date"
                        placeholder="Select Date"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { addBtnLoading, removeBtnLoading } from "@services/helpers";
import People from "@services/api/people";
import Swal from "sweetalert2";
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

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
        },
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

    addMoreRecords() {},

    submitForm() {},
  },

  created() {
    this.getMembers();
  },
};
</script>
