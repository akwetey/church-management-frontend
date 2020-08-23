<template>
  <div>
    <div class="row">
      <div class="col-md-10 offset-md-1">
        <div class="alert alert-info mb-3"></div>

        <form @submit.prevent="renderReport">
          <div class="card mb-3">
            <div class="card-body px-5">
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
                      <option
                        :value="c.value"
                        :key="i"
                        v-for="(c, i) in categories"
                        >{{ c.name }}</option
                      >
                    </select>
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="form-group">
                    <label for="type">Type of report *</label>
                    <select
                      name="type"
                      id="type"
                      class="custom-select"
                      v-model.number="form.type"
                    >
                      <option
                        :value="t.value"
                        :key="i"
                        v-for="(t, i) in reportTypes"
                        >{{ t.name }}</option
                      >
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
                      @change="form.date = ''"
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
                      id="dayPicker"
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
                      dateFormat="yy-mm-dd"
                      yearRange="1970:2030"
                      placeholder="Select week"
                      showWeek
                      selectOtherMonths
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
                      <option
                        :value="year"
                        v-for="(year, i) in years"
                        :key="i"
                        >{{ year }}</option
                      >
                    </select>
                  </div>
                </div>

                <template v-if="form.duration === 5">
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="from">Start Date *</label>
                      <DatePicker
                        id="fromPicker"
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
                        id="toPicker"
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

              <div class="text-center pb-4 mb-3">
                <button class="btn btn-success" ref="renderReportBtn">
                  Render Report
                </button>
              </div>

              <hr />

              <div class="report-container pt-3" ref="reportContainer"></div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Report from "@services/api/reports";
import DatePicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.min.css";

import Calendar from "primevue/calendar";
import { addBtnLoading, removeBtnLoading } from "@services/helpers";

import { Grid } from "gridjs";
import { json2excel } from "js2excel";
import ApexCharts from "apexcharts";

import "gridjs/dist/theme/mermaid.css";

const dayjs = require("dayjs");

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default {
  name: "ReportExpense",
  components: { DatePicker, Calendar },
  data() {
    return {
      years: [],
      reportTypes: [
        { value: 1, name: "Chart" },
        { value: 2, name: "Accumulation" },
      ],
      categories: [
        { value: "all", name: "All" },
        { value: 1, name: "Utility" },
        { value: 2, name: "Donation" },
        { value: 3, name: "Welfare" },
        { value: 4, name: "Equipment & Technology" },
        { value: 5, name: "Allowance" },
        { value: 6, name: "Building & Construction" },
        { value: 7, name: "Publicity" },
        { value: 8, name: "Evangelism" },
      ],
      form: {
        category: "all",
        date: "",
        duration: 1,
        type: 2,
        from: null,
        to: null,
      },
      dateConfig: {
        date: {
          allowInput: true,
        },
      },
      resultJsonData: [],
    };
  },
  computed: {
    currency() {
      return this.$store.getters.currency;
    },
  },
  methods: {
    renderReport(e) {
      const btn = this.$refs.renderReportBtn;
      let formData = {
        category:
          this.form.category !== "all"
            ? [this.form.category]
            : this.form.category,
        duration: this.form.duration,
        type: this.form.type,
        date:
          this.form.duration === 3 || this.form.duration === 2
            ? dayjs(this.form.date).format("YYYY-MM-DD")
            : this.form.date,
      };

      if (this.form.duration === 5) {
        formData.from = this.form.from;
        formData.to = this.form.to;
      }

      addBtnLoading(btn);

      Report.expenses({ params: formData })
        .then((response) => {
          const res = response.data;
          if (Object.entries(res.data).length === 0 || res.data.length === 0) {
            document.querySelector(
              ".report-container"
            ).innerHTML = `<div class="mt-4 text-center">
              <h3 class="display-4">NO DATA FOUND</h3>
            </div>`;
            return;
          }

          //this.reportTitleGenerator();
          this.reportGenerator(res.data, formData.type);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          removeBtnLoading(btn);
        });
    },

    reportTitleGenerator() {
      let title;
      let params = this.form;

      const catIndex = this.categories.findIndex(
        (record) => record.value === params.category
      );
      const { name: categoryName } = this.categories[catIndex];
      if (params.type === 2) {
        if (params.duration === 1) {
          title = `Total amount of expenses for ${
            params.category === "all"
              ? "all expense categories"
              : categoryName + " expense category"
          } for`;
        }
      } else {
      }
    },

    reportGenerator(results, reportType) {
      // Accumulation
      if (reportType === 2) {
        this.renderAccumulationReport(results);
      } else {
        this.renderChartReport(results);
      }
    },

    renderAccumulationReport(results) {
      const reportContainer = this.$refs.reportContainer;
      reportContainer.innerHTML = "";

      const resultJsonData = [];
      const { results: items } = results;
      const totalElement = document.createElement("h5");
      const exportBtn = document.createElement("button");
      const tableContainer = document.createElement("div");
      const totalExportContainer = document.createElement("div");
      tableContainer.setAttribute("id", "table-wrapper");
      totalExportContainer.className = "d-flex justify-content-between";
      totalElement.className = "mb-4";
      exportBtn.className = "btn btn-primary export-btn";
      exportBtn.textContent = "Export";

      const tableData = items.map((element) => {
        const jsonData = {
          Name: element.name,
          Amount: `${this.currency + "" + element.amount}`,
          Date: element.date,
          Type: element.type,
        };

        resultJsonData.push(jsonData);
        return [
          element.name,
          `${this.currency + "" + element.amount}`,
          element.date,
          element.type,
        ];
      });

      let tableConfig = {
        columns: ["Name", "Amount", "Date", "Type"],
        data: tableData,
        fixedHeader: true,
        search: {
          enabled: true,
        },
      };

      if (items.length > 10) {
        tableConfig.height = "600px";
      }

      totalElement.innerHTML = `Total: <small>${
        this.currency
      }</small>${numberWithCommas(results.total)}`;
      totalExportContainer.appendChild(totalElement);
      totalExportContainer.appendChild(exportBtn);
      reportContainer.appendChild(totalExportContainer);
      reportContainer.appendChild(tableContainer);

      new Grid(tableConfig).render(document.getElementById("table-wrapper"));

      exportBtn.onclick = () => {
        try {
          json2excel({
            data: resultJsonData,
            name: "Expense-report",
          });
        } catch (err) {
          console.log(err);
        }
      };
    },

    renderChartReport(results) {
      const { chart_type: chartType, results: items } = results;
      const reportContainer = this.$refs.reportContainer;
      reportContainer.innerHTML = "";

      if (chartType) {
        if (chartType === "multiple bar charts") {
          const chartContainer = document.createElement("div");
          chartContainer.setAttribute("id", "chartContainer");
          chartContainer.className = "mt-4";

          for (const key of Object.keys(items)) {
            const yearElement = document.createElement("h5");
            const yearContainer = document.createElement("div");
            const yearChartContainer = document.createElement("div");
            yearChartContainer.setAttribute("id", `report-${key}`);
            yearContainer.className = "mt-4";
            yearElement.className = "text-center";
            yearElement.textContent = `Expense report for ${key}`;

            const data = items[key];
            const options = {
              series: [{ name: `Expense (${this.currency})`, data: [] }],
              chart: {
                type: "bar",
                height: 350,
              },
              plotOptions: {},
              dataLabels: {
                enabled: true,
              },
              xaxis: {
                categories: [],
              },
              yaxis: {
                title: {
                  text: `Expense Amount (${this.currency})`,
                },
              },
            };

            // Set chart values
            data.forEach((element) => {
              options.series[0].data.push(element.total);
              options.xaxis.categories.push(element.name);
            });

            yearContainer.appendChild(yearElement);
            yearContainer.appendChild(yearChartContainer);
            chartContainer.appendChild(yearContainer);

            reportContainer.appendChild(chartContainer);

            const chart = new ApexCharts(yearChartContainer, options);
            chart.render();
          }
        } else {
          const chartContainer = document.createElement("div");
          chartContainer.setAttribute("id", "chartContainer");
          chartContainer.className = "mt-4";

          const options = {
            series: [{ name: `Expense (${this.currency})`, data: [] }],
            chart: {
              type: "bar",
              height: 350,
            },
            plotOptions: {
              // bar: {
              //   horizontal: true,
              // },
            },
            dataLabels: {
              enabled: true,
            },
            xaxis: {
              categories: [],
            },
            yaxis: {
              title: {
                text: `Expense Amount (${this.currency})`,
              },
            },
          };

          // Set chart values
          items.forEach((element) => {
            options.series[0].data.push(element.total);
            options.xaxis.categories.push(element.name);
          });

          reportContainer.appendChild(chartContainer);

          const chart = new ApexCharts(chartContainer, options);
          chart.render();
        }
      } else {
        this.renderAccumulationReport(results.results);
      }
    },
  },
  created() {
    const currentYear = new Date().getFullYear();
    const startYear = 1970;

    for (let i = currentYear; i >= startYear; i--) this.years.push(i);
  },
};
</script>
