<template>
  <div>
    <div class>
      <div class>
        <div class="row">
          <div class="col-md-10 offset-md-1">
            <div class="alert alert-info mb-3"></div>

            <form @submit.prevent="submitReport">
              <div class="card py-3 px-3 mb-3">
                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="status">Attendance Status *</label>
                      <select
                        name="status"
                        id="status"
                        class="custom-select"
                        v-model.number="form.status"
                      >
                        <option value="2">All</option>
                        <option value="1">Attendees</option>
                        <option value="0">Absentees</option>
                      </select>
                    </div>
                  </div>

                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="for">For *</label>
                      <select
                        name="for"
                        id="for"
                        class="custom-select"
                        v-model.number="form.for"
                        @change="onChangeAttendanceType"
                      >
                        <option value="1">General</option>
                        <option value="2">Group</option>
                      </select>
                    </div>
                  </div>

                  <keep-alive>
                    <div class="col-md-4" v-if="form.for === 2">
                      <div class="form-group">
                        <label for="group" class="d-block">Group *</label>
                        <Dropdown
                          v-model="form.group_id"
                          :options="groups"
                          optionLabel="name"
                          optionValue="id"
                          placeholder="Select Group"
                          class="form-control"
                          :filter="true"
                        />
                        <!-- <select
                          name="group"
                          id="group"
                          class="custom-select"
                          v-model.number="form.group_id"
                        >
                          <option value>Select group</option>
                          <option disabled>----------------</option>
                          <option
                            :value="group.id"
                            v-for="(group, i) in groups"
                            :key="i"
                            >{{ group.name }}</option
                          >
                        </select> -->
                      </div>
                    </div>
                  </keep-alive>
                </div>
              </div>

              <div class="card py-3 px-3">
                <div class="row">
                  <div class="col-md-4">
                    <label for="duration">Duration *</label>
                    <select
                      name="duration"
                      id="duration"
                      class="custom-select"
                      v-model.number="form.duration"
                    >
                      <option value>Select duration</option>
                      <option disabled>----------------</option>
                      <option value="1">Day</option>
                      <option value="3">Month</option>
                      <option value="4">Year</option>
                      <option value="5">Specific period</option>
                    </select>
                  </div>
                  <div class="col-md-4" v-if="form.duration === 1">
                    <div class="form-group">
                      <label for="date">Date *</label>
                      <flat-pickr
                        v-model.trim="form.date"
                        placeholder="Select Date"
                        name="date"
                        id="date"
                        class="form-control bg-white"
                        :config="config"
                        required
                      ></flat-pickr>
                    </div>
                  </div>
                  <div class="col-md-4" v-if="form.duration === 3">
                    <div class="form-group">
                      <label for class="d-block">Select Month *</label>
                      <Calendar
                        class="w-100"
                        v-model="form.date"
                        view="month"
                        dateFormat="M-yy"
                        :yearNavigator="true"
                        yearRange="2000:2100"
                        placeholder="Select Month"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-md-4" v-if="form.duration === 4">
                    <div class="form-group">
                      <label for="date">Select Year *</label>
                      <select
                        name="date"
                        id="year"
                        class="custom-select"
                        v-model="form.date"
                        required
                      >
                        <option value>Choose year</option>
                        <option
                          :value="year"
                          v-for="(year, i) in years"
                          :key="i"
                          >{{ year }}</option
                        >
                      </select>
                    </div>
                  </div>
                  <div class="col-md-4" v-if="form.duration === 5">
                    <div class="form-group">
                      <label for="to">To *</label>
                      <flat-pickr
                        v-model.trim="form.to"
                        placeholder="Select Date"
                        name="to"
                        id="to"
                        class="form-control bg-white"
                        :config="config"
                        required
                      ></flat-pickr>
                    </div>
                  </div>
                  <div class="col-md-4" v-if="form.duration === 5">
                    <div class="form-group">
                      <label for="from">From *</label>
                      <flat-pickr
                        v-model.trim="form.from"
                        placeholder="Select Date"
                        name="from"
                        id="from"
                        class="form-control bg-white"
                        :config="config"
                        required
                      ></flat-pickr>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <label for="gender">Gender *</label>
                    <select
                      name="gender"
                      id="gender"
                      class="custom-select"
                      v-model.number="form.gender"
                    >
                      <option value="1">Male</option>
                      <option value="2">Female</option>
                      <option value="3">All</option>
                    </select>
                  </div>
                  <div class="col-md-4">
                    <label for="type">Type of Report *</label>
                    <select
                      name="type"
                      id="type"
                      class="custom-select"
                      v-model.number="form.type"
                    >
                      <option value="1">Chart</option>
                      <option value="2">Table</option>
                      <option value="3">Count</option>
                    </select>
                  </div>
                </div>
                <div class="text-center form-group">
                  <div class="form-group mt-5">
                    <button class="btn btn-success px-5" ref="submitBtn">
                      Submit
                    </button>
                  </div>
                </div>
                <hr class="py-4" />
                <div
                  class="d-flex justify-content-center"
                  v-if="chartType === 'Donut'"
                >
                  <ApexChart
                    type="donut"
                    :height="450"
                    :width="450"
                    :options="chartData.attendance.chartOptions"
                    :series="chartData.attendance.series"
                  ></ApexChart>
                </div>
                <div v-if="chartType === 'Table'">
                  <DataTable
                    :value="attendances"
                    :scrollable="true"
                    scrollHeight="300px"
                    ref="dt"
                  >
                    <template #header>
                      <div style="text-align: left">
                        <button class="btn btn-info" @click="exportCSV($event)">
                          Export
                        </button>
                      </div>
                    </template>
                    <Column field="name" header="Name"></Column>
                    <Column
                      field="primary_telephone"
                      header="Telephone"
                    ></Column>
                    <Column field="email" header="Email"></Column>
                    <Column field="gender" header="Gender"></Column>
                    <Column field="attendance_date" header="Date"></Column>
                  </DataTable>
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
import Groups from "@services/api/groups";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import Calendar from "primevue/calendar";
import { addBtnLoading, removeBtnLoading } from "@services/helpers";
import Report from "@services/api/reports";
import dayjs from "dayjs";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Dropdown from "primevue/dropdown";
import ApexChart from "vue-apexcharts";
export default {
  name: "AttendanceReport",
  components: { flatPickr, Calendar, Column, DataTable, Dropdown, ApexChart },
  data() {
    return {
      form: {
        status: 2,
        for: 1,
        group_id: "",
        gender: 3,
        date: "",
        type: 3,
        to: null,
        from: null,
        duration: 1,
      },
      groups: [],
      years: [],
      chartData: {
        attendance: {
          series: [],
          chartOptions: {},
        },
      },
      attendances: [],
      chartType: "",
      config: {
        allowInput: true,
      },
    };
  },
  methods: {
    async submitReport() {
      const btn = this.$refs.submitBtn;
      try {
        addBtnLoading(btn);
        const groupID = `${this.form.group_id}`;
        const getParams = {
          params: {
            date:
              this.form.duration === 4
                ? this.form.date
                : dayjs(this.form.date).format("YYYY-MM-DD"),
            from: this.form.from,
            to: this.form.to,
            group_id: groupID.split(""),
            for: this.form.for,
            status: this.form.status,
            duration: this.form.duration,
            gender: this.form.gender,
            type: this.form.type,
          },
        };

        const response = await Report.attendance(getParams);
        removeBtnLoading(btn);
        if (this.form.type == 1) {
          if (this.form.duration == 5) {
            this.chartType = "Bar chart";
          } else {
            this.chartType = "Donut";
          }
        }

        if (this.form.type == 2) {
          this.chartType = "Table";
        }

        if (this.form.type == 3) {
          this.chartType = "Count";
        }
        this.attendances = response.data.data;
        const series = [];
        const labels = [];
        const data = Object.entries(response.data.data);
        data.forEach(([key, value]) => {
          series.push(value);
          labels.push(key.toUpperCase());
        });
        this.chartData.attendance = {
          series: series,
          chartOptions: {
            labels: labels,
            legend: {
              position: "right",
            },
          },
        };
      } catch (error) {
        removeBtnLoading(btn);
      }
    },
    async onChangeAttendanceType(e) {
      try {
        const value = parseInt(e.target.value);

        if (!value) return;
        if (value === 2) {
          const response = await Groups.all();
          const { data: res } = response.data;
          this.groups = res;
        }

        this.form.group_id = value;
      } catch (error) {
        console.log(error.message);
      }
    },

    exportCSV() {
      this.$refs.dt.exportCSV();
    },
  },
  created() {
    const year = new Date().getFullYear();
    const startYear = 1970;
    for (let i = year; i >= startYear; i--) {
      this.years.push(i);
    }
  },
};
</script>
