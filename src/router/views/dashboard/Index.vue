<template>
  <div>
    <!-- Statts -->
    <div class="row mb-4">
      <div class="col-md-3">
        <div class="card py-2">
          <div class="card-body">
            <div class="text-center">
              <h3 class="display-3">{{total.people}}</h3>
              <h5>People</h5>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card py-2">
          <div class="card-body">
            <div class="text-center">
              <h3 class="display-3">{{total.families}}</h3>
              <h5>Families</h5>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card py-2">
          <div class="card-body">
            <div class="text-center">
              <h3 class="display-3">{{total.users}}</h3>
              <h5>Users</h5>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card py-2">
          <div class="card-body">
            <div class="text-center">
              <h3 class="display-3">{{total.groups}}</h3>
              <h5>Groups</h5>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--  -->
    <div class="row">
      <div class="col-md-9">
        <div class="card" style="min-height: 400px;">
          <div class="card-body">
            <h5 class="text-center">Recently added people</h5>

            <div class="table-responsive mt-5">
              <table class="table table-hover mb-0">
                <thead>
                  <tr>
                    <th>Person</th>
                    <th>Telephone</th>
                    <th>Family Relation</th>
                    <th>Status</th>
                    <th>Date Creatd</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="person in people" :key="person.mask">
                    <td>
                      <div class="d-flex align-items-center">
                        <div class="mr-3">
                          <img
                            :src="person.avatar ? person.avatar : defaultAvatar"
                            class="rounded-circle wd-35"
                            alt="user"
                          />
                        </div>

                        <div class="d-flex justify-content-between align-items-center">
                          <p class="text-muted">{{ person.name }}</p>
                        </div>
                      </div>
                    </td>
                    <td>{{ person.primary_telephone }}</td>
                    <td>{{ person.family_relation }}</td>
                    <td>{{ person.member_status }}</td>
                    <td>{{ person.created_at }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card" style="height: 400px;">
          <div class="card-body">
            <h5 class="text-center mb-4">Gender Ratio</h5>
            <ApexChart width="100%" type="donut" :options="chart.options" :series="chart.series"></ApexChart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dashboard from "@services/api/dashboard";
import VueApexCharts from "vue-apexcharts";

export default {
  name: "Dashboard",
  components: {
    ApexChart: VueApexCharts,
  },
  data() {
    return {
      total: {},
      people: [],
      chart: {
        options: {
          legend: {
            position: "bottom",
          },
          plotOptions: {
            pie: {
              donut: {
                size: "65%",
                labels: {
                  show: true,
                  name: {
                    color: "#333",
                  },
                  value: {
                    formatter: function (val) {
                      return val;
                    },
                  },
                  total: {
                    show: true,
                    formatter: function (w) {
                      return w.globals.seriesTotals.reduce((a, b) => {
                        return a + b;
                      }, 0);
                    },
                  },
                },
              },
            },
          },
          labels: ["Male", "Female"],
        },
        series: [],
      },
    };
  },
  computed: {
    defaultAvatar() {
      return this.$store.getters.defaultAvatar;
    },
  },
  methods: {
    setData(payload) {
      this.total = payload.total;
      this.people = payload.people;
      this.chart.series.push(payload.gender.male);
      this.chart.series.push(payload.gender.female);
    },
  },
  async beforeRouteEnter(to, from, next) {
    const response = await Dashboard.init();
    const res = response.data;

    next((vm) => vm.setData(res.data));
  },
};
</script>
