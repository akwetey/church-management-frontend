<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="mb-5"></div>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Contribution from "@services/api/contribution";
import { addBtnLoading, removeBtnLoading } from "@services/helpers";

export default {
  name: "Contributions",
  components: { DataTable, Column },
  data() {
    return {
      table: {
        data: [],
        total: 0,
      },
    };
  },
  computed: {
    currency() {
      return this.$store.getters.currency;
    },
  },
  methods: {
    async setData() {
      const response = await Contribution.all();
      const { data: res } = response.data;
      this.table.data = res.items;
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.setData();
      next();
    });
  },
};
</script>
