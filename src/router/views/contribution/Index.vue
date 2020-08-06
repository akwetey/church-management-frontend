<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="mb-5">
          <div class="dropdown">
            <button
              id="myDropdown"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              class="btn btn-primary"
            >
              Select Contribution
              <i class="link-arrow pi pi-angle-down"></i>
            </button>
            <div class="dropdown-menu" aria-labelledby="myDropdown">
              <a class="dropdown-item" href="#">Tithe</a>
              <router-link :to="{ name: 'covenantadd' }" class="dropdown-item"
                >Covenant Partner</router-link
              >
              <a class="dropdown-item" href="#">Group</a>
              <a class="dropdown-item" href="#">Welfare</a>
              <a class="dropdown-item" href="#">Pledge</a>
              <a class="dropdown-item" href="#">General</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Contribution from "@services/api/contribution";
import { addBtnLoading, removeBtnLoading } from "@services/helpers";
import BSN from "bootstrap.native";

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
  mounted() {
    new BSN.Dropdown("#myDropdown");
  },
};
</script>
