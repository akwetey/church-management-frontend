<template>
  <div>
    <template v-if="busy">
      <div class="text-center py-5">
        <ProgressSpinner />
      </div>
    </template>

    <template v-else>
      <div class>
        <div class="row w-75 mb-3">
          <div class="col-md-4">
            <DatePickr
              v-model="filter.start_date"
              class="form-control bg-white"
              placeholder="Start Date"
            />
          </div>

          <div class="col-md-4">
            <DatePickr
              v-model="filter.end_date"
              class="form-control bg-white"
              placeholder="End Date"
            />
          </div>

          <div class="col-md-4">
            <button class="btn btn-primary" @click="fetchData">Filter</button>
          </div>
        </div>

        <div class="main-table" style="max-height: 400px">
          <BTable
            :fields="table.fields"
            :items="followUps"
            :filter="table.search"
            :current-page="table.currentPage"
            :per-page="table.perPage"
            bordered
            sticky-header
            head-variant="light"
            responsive
            show-empty
          >
            <template v-slot:cell(completed)="data">
              <span class="badge badge-success" v-if="data.item.completed === 'Done'">Done</span>
              <span class="badge badge-warning" v-else>Pending</span>
            </template>
          </BTable>
        </div>

        <div class="table-pagination mt-4">
          <div class="d-flex">
            <b-pagination
              v-model="table.currentPage"
              :total-rows="tableRows"
              :per-page="table.perPage"
              class="ml-auto"
            ></b-pagination>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import ProgressSpinner from "primevue/progressspinner";
import People from "@services/api/people";
import { BTable, BPagination } from "bootstrap-vue";
import "bootstrap-vue/dist/bootstrap-vue.css";
import DatePickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
  name: "FollowUp",
  components: { ProgressSpinner, BTable, BPagination, DatePickr },
  data() {
    return {
      busy: true,
      followUps: [],
      table: {
        fields: [
          { label: "Assigned To", key: "assigned_to", sortable: true },
          { label: "Follow-up Date", key: "date", sortable: true },
          { label: "Follow-up Type", key: "type", sortable: true },
          { label: "Status", key: "completed", sortable: true },
          { label: "Completion Date", key: "completion_date", sortable: true },
          { label: "Notes", key: "comment" },
        ],
        pageOptions: [10, 20, 50, 100],
        perPage: 50,
        currentPage: 1,
        search: "",
      },
      filter: {
        start_date: "",
        end_date: "",
      },
    };
  },
  computed: {
    tableRows() {
      return this.followUps.length;
    },
  },
  methods: {
    async fetchData() {
      const response = await People.person.followUp(this.$route.params.mask, {
        params: {
          start_date: this.filter.start_date,
          end_date: this.filter.end_date,
        },
      });
      const res = response.data;

      this.followUps = res.data;
      this.busy = false;
    },
  },
  created() {
    this.fetchData();
  },
};
</script>
