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
        <div>
          <DataTable
            :value="table.data"
            :paginator="true"
            :rows="10"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 25, 50]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          >
            <template #empty>
              <div class="text-center">
                No data found.
              </div>
            </template>
            <Column field="type" header="Type" sortable></Column>
            <Column field="person.name" header="Persons" sortable></Column>
            <Column field="created_at" header="Date Added" sortable></Column>
            <Column field="actions" header="Actions">
              <template #body="slotProps">
                <router-link
                  tag="button"
                  :to="{
                    name: 'familyedit',
                    params: { mask: slotProps.data.mask },
                  }"
                  class="btn btn-primary btn-icon mr-2"
                  v-tooltip.top="'Edit'"
                >
                  <i class="pi pi-pencil"></i>
                </router-link>
                <button
                  class="btn btn-danger btn-icon mr-2"
                  v-tooltip.top="'Delete'"
                  @click="deleteContribution(slotProps.data.mask, $event)"
                >
                  <i class="pi pi-trash no-pointer-events"></i>
                </button> </template
            ></Column>
          </DataTable>
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
      return this.$store.getters.settings.currency;
    },
  },
  methods: {
    async setData() {
      const response = await Contribution.all();
      const { data: res } = response.data;
      this.table.data = res.items;
    },

    /* delete contribution  */
    async deleteContribution(mask, e) {
      const btn = e.target;
      try {
        const result = await Swal.fire({
          text: "Do you want to delete this contribution?",
          icon: "warning",
          showCancelButton: true,
          cancelButtonText: "No",
          confirmButtonText: "Yes Delete It",
          reverseButtons: true,
        });
        if (result.value) {
          addBtnLoading(btn);
          const response = await Contribution.covedelete(mask);
          removeBtnLoading(btn);
          const res = response.data;
          Swal.fire({
            icon: "success",
            title: res.message,
          });
          this.setData();
        }
      } catch (error) {
        removeBtnLoading(btn);
        const res = error.response.data;
        Swal.fire({
          icon: "error",
          title: res.message,
        });
      }
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
