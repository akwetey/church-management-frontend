<template>
  <div>
    <div class="row">
      <div class="col-md-10 offset-md-1">
        <div class="alert alert-info mb-3"></div>

        <form @submit.prevent="renderReport">
          <div class="card mb-3">
            <div class="card-body">
              <div class="row mb-3">
                <div class="col-md-4">
                  <div class="form-group">
                    <label for="category">Expense Type *</label>
                    <select
                      name="category"
                      id="category"
                      class="custom-select"
                      v-model.number="form.category"
                    >
                      <option value="all">All</option>
                      <option value="1">Utility</option>
                      <option value="2">Donation</option>
                      <option value="3">Welfare</option>
                      <option value="4">Equipment & Technology</option>
                      <option value="5">Allowance</option>
                      <option value="6">Building & Construction</option>
                      <option value="7">Publicity</option>
                      <option value="8">Evangelism</option>
                    </select>
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="form-group">
                    <label for="type">Type of report *</label>
                    <select name="type" id="type" class="custom-select" v-model.number="form.type">
                      <option value="1">Chart</option>
                      <option value="2">Accumulation</option>
                    </select>
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="form-group">
                    <label for="duration">Duration *</label>
                    <select
                      name="duration"
                      id="duration"
                      class="custom-select"
                      v-model.number="form.duration"
                    >
                      <option value="1">Day</option>
                      <option value="2">Week</option>
                      <option value="3">Month</option>
                      <option value="4">Year</option>
                      <option value="5">Specific period</option>
                    </select>
                  </div>
                </div>

                <div class="col-md-4" v-if="form.duration === 1">
                  <div class="form-group">
                    <label for="day">Date *</label>
                    <DatePicker
                      class="form-control bg-white"
                      v-model="form.date"
                      placeholder="Select date"
                      :config="dateConfig.date"
                      required
                    />
                  </div>
                </div>

                <div class="col-md-4" v-if="form.duration === 2">
                  <div class="form-group">
                    <label for="day">Week *</label>
                    <Calendar
                      class="w-100"
                      id="weekSelector"
                      v-model="form.date"
                      :yearNavigator="true"
                      yearRange="1970:2030"
                      placeholder="Select week"
                      showWeek
                      required
                    />
                  </div>
                </div>

                <div class="col-md-4" v-if="form.duration === 3">
                  <div class="form-group">
                    <label for="day">Month *</label>
                    <Calendar
                      class="w-100"
                      id="weekSelector"
                      v-model="form.date"
                      view="month"
                      dateFormat="M-yy"
                      :yearNavigator="true"
                      yearRange="2000:2030"
                      placeholder="Select week"
                      required
                    />
                  </div>
                </div>

                <div class="col-md-4" v-if="form.duration === 4">
                  <div class="form-group">
                    <label for="year">Select Year *</label>
                    <select
                      name="year"
                      id="year"
                      class="custom-select"
                      v-model="form.date"
                      required
                    >
                      <option value>Choose year</option>
                      <option :value="year" v-for="(year, i) in years" :key="i">{{ year }}</option>
                    </select>
                  </div>
                </div>

                <template v-if="form.duration === 5">
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="from">Start Date *</label>
                      <DatePicker
                        class="form-control bg-white"
                        v-model="form.from"
                        placeholder="Select date"
                        :config="dateConfig.date"
                        required
                      />
                    </div>
                  </div>

                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="to">End Date *</label>
                      <DatePicker
                        class="form-control bg-white"
                        v-model="form.to"
                        placeholder="Select date"
                        :config="dateConfig.date"
                        required
                      />
                    </div>
                  </div>
                </template>
              </div>

              <div class="text-center mb-3">
                <button class="btn btn-success">Render Report</button>
              </div>

              <hr />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.min.css";
import weekSelectPlugin from "flatpickr/dist/plugins/weekSelect/weekSelect.js";

import Calendar from "primevue/calendar";

export default {
  name: "ReportExpense",
  components: { DatePicker, Calendar },
  data() {
    return {
      years: [],
      form: {
        category: "all",
        date: null,
        duration: 1,
        type: 2,
        from: null,
        to: null,
      },
      dateConfig: {
        week: {
          plugins: [new weekSelectPlugin({})],
        },
        date: {
          allowInput: true,
        },
      },
    };
  },
  methods: {
    renderReport() {},
  },
  created() {
    const currentYear = new Date().getFullYear();
    const startYear = 1970;

    for (let i = currentYear; i >= startYear; i--) this.years.push(i);
  },
};
</script>
