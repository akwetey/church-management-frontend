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
                        v-model="form.year"
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
                      <label for="from">Start Date *</label>
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
                  <div class="col-md-4" v-if="form.duration === 5">
                    <div class="form-group">
                      <label for="to">End Date *</label>
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
                      <option value="2">Count</option>
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

                <template v-if="chartType === 'multiple bar charts'">
                  <div v-for="(report, i) in reports" :key="i">
                    <div class="d-flex">
                      <h5 class="pr-3">Attendance Report</h5>
                      <InputSwitch v-model="report.toggle" />
                    </div>
                    <div v-show="!report.toggle">
                      <ApexChart
                        type="bar"
                        :id="`year-${i}`"
                        :height="450"
                        :width="850"
                        :options="report.chartOptions"
                        :series="report.series"
                      ></ApexChart>
                    </div>
                    <div v-show="report.toggle">
                      <ApexChart
                        type="line"
                        :id="`year-${i}`"
                        :height="450"
                        :width="850"
                        :options="report.chartOptions"
                        :series="report.series"
                      ></ApexChart>
                    </div>
                  </div>
                </template>

                <div v-if="chartType === 'bar chart'">
                  <div class="d-flex">
                    <h5 class="pr-3">Attendance Report</h5>
                    <InputSwitch v-model="toggleReport" />
                  </div>
                  <div v-show="!toggleReport">
                    <ApexChart
                      type="bar"
                      :height="450"
                      :width="850"
                      :options="chartData.attendanceSpecific.chartOptions"
                      :series="chartData.attendanceSpecific.series"
                    ></ApexChart>
                  </div>
                  <div v-show="toggleReport">
                    <ApexChart
                      type="line"
                      :height="450"
                      :width="850"
                      :options="chartData.attendanceSpecific.chartOptions"
                      :series="chartData.attendanceSpecific.series"
                    ></ApexChart>
                  </div>
                </div>
                <div v-if="chartType === 'Table'">
                  <DataTable
                    :value="attendances"
                    :scrollable="true"
                    scrollHeight="300px"
                    ref="dt"
                  >
                    <template #header>
                      <div class="d-flex justify-content-between">
                        <div class="d-flex">
                          <h5 class="mr-3">
                            Attendance Total: {{ attendees }}
                          </h5>
                          <h5>Absentees Total: {{ absentees }}</h5>
                        </div>
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
                <div ref="formMsg"></div>
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
import InputSwitch from "primevue/inputswitch";
export default {
  name: "AttendanceReport",
  components: {
    flatPickr,
    Calendar,
    Column,
    DataTable,
    Dropdown,
    ApexChart,
    InputSwitch,
  },
  data() {
    return {
      form: {
        status: 2,
        for: 1,
        group_id: "",
        gender: 3,
        date: "",
        year: "",
        type: 1,
        to: null,
        from: null,
        duration: 1,
      },
      reports: [],
      groups: [],
      years: [],
      attendees: "",
      absentees: "",
      toggleReport: false,
      chartData: {
        attendance: {
          series: [],
          chartOptions: {},
        },
        attendanceSpecific: {
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
        const params = {
          date:
            this.form.duration === 4
              ? this.form.year
              : dayjs(this.form.date).format("YYYY-MM-DD"),
          group_id: groupID.split(""),
          for: this.form.for,
          status: this.form.status,
          duration: this.form.duration,
          gender: this.form.gender,
          type: this.form.type,
        };

        if (this.form.duration === 5) {
          params.from = this.form.from;
          params.to = this.form.to;
          delete params.date;
        }

        const response = await Report.attendance({ params });
        removeBtnLoading(btn);
        const res = response.data;
        if (Object.entries(res.data).length === 0 || res.data.length === 0) {
          this.$refs.formMsg.innerHTML = `<h5 class="text-center">No Data Found</h5>`;
          this.chartType = "";
          return;
        }

        switch (res.data.chart_type) {
          case "bar chart":
            this.renderBar(res.data);
            this.chartType = res.data.chart_type;
            this.$refs.formMsg.innerHTML = ``;
            break;
          case "multiple bar charts":
            this.renderMultipleBar(res.data);
            this.chartType = res.data.chart_type;
            this.$refs.formMsg.innerHTML = ``;
            break;
          case "":
            this.chartType = "Table";
            this.attendances = res.data.results.results;
            this.attendees = res.data.results.count.attendees;
            this.absentees = res.data.results.count.absentees;
            this.$refs.formMsg.innerHTML = ``;
            break;
          default:
            this.chartType = "Table";
            this.attendances = res.data.results;
            this.attendees = res.data.count.attendees;
            this.absentees = res.data.count.absentees;
            this.$refs.formMsg.innerHTML = ``;
        }
      } catch (error) {
        removeBtnLoading(btn);
        console.log(error);
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

    renderMultipleBar(response) {
      const { results } = response;
      console.log(results, "results");

      for (let index of Object.keys(results)) {
        const resultData = results[index];

        const series = [
          { name: `Attendees ${index}`, data: [] },
          { name: `Absentees ${index}`, data: [] },
        ];
        const categories = [];

        resultData.forEach((val, index) => {
          categories.push(val.name.toUpperCase());
          series[0].data.push(val.attendees);
          series[1].data.push(val.absentees);
        });

        this.reports.push({
          series: series,
          chartOptions: {
            plotOptions: {
              bar: {
                horizontal: false,
              },
            },
            dataLabels: {
              enabled: false,
            },
            xaxis: {
              categories: categories,
            },
            stroke: {
              curve: "smooth",
            },
            title: {
              text: `Attendance ${index}`,
              align: "center",
            },
          },
          toggle: false,
        });
      }
    },

    renderBar(response) {
      const series = [
        { name: "Attendees ", data: [] },
        { name: "Absentees ", data: [] },
      ];
      const categories = [];
      response.results.forEach((val, index) => {
        categories.push(val.name.toUpperCase());
        series[0].data.push(val.attendees);
        series[1].data.push(val.absentees);
      });

      this.chartData.attendanceSpecific = {
        series: series,
        chartOptions: {
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            categories: categories,
          },
          stroke: {
            curve: "smooth",
          },
        },
      };
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

<style scoped>
div .p-inputswitch {
  width: 3rem;
  height: 1.5rem;
}
</style>
