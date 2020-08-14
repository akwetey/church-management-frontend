<template>
  <div>
    <template v-if="busy">
      <div class="text-center py-5">
        <ProgressSpinner />
      </div>
    </template>

    <template v-else>
      <div class="">
        <div class="main-table" style="max-height: 400px">
          <BTable
            :fields="table.fields"
            :items="attendances"
            :filter="table.filter"
            :current-page="table.currentPage"
            :per-page="table.perPage"
            bordered
            sticky-header
            head-variant="light"
            responsive
          >
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

export default {
  name: "Attendance",
  components: { ProgressSpinner, BTable, BPagination },
  data() {
    return {
      busy: true,
      attendances: [],
      table: {
        fields: [
          { label: "Attendance Name", key: "name", sortable: true },
          { label: "Date", key: "date", sortable: true },
          { label: "Status", key: "status", sortable: true },
          { label: "Note", key: "comment" },
        ],
        pageOptions: [10, 20, 50, 100],
        perPage: 50,
        currentPage: 1,
        filter: "",
      },
    };
  },
  computed: {
    tableRows() {
      return this.attendances.length;
    },
  },
  methods: {
    async fetchData() {
      const response = await People.person.attendance(this.$route.params.mask);
      const res = response.data;

      this.attendances = res.data;
      this.busy = false;
    },
  },
  created() {
    this.fetchData();
  },
};
</script>
