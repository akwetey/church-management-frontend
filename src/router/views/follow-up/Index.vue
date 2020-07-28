<template>
  <div>
    <div class="card">
      <div class="card-body">
        <router-link :to="{name: 'FollowUpAdd'}" tag="button" class="btn btn-primary px-4">
          <i class="pi pi-plus pr-2"></i> Add Follow Up
        </router-link>
      </div>

      <div>
        <DataTable
          :value="followups"
          :paginator="true"
          :rows="10"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :rowsPerPageOptions="[10, 25, 50, 100]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        >
          <Column field="person" header="Name" sortable></Column>
          <Column field="assigned_to" header="Assigned To" sortable></Column>
          <Column field="date" header="Date" sortable></Column>
          <Column field="comment" header="Comment" sortable></Column>
          <Column field="type" header="Type" sortable></Column>
          <Column field="status" header="Status" sortable>
            <template #body="slotProps">
              <span class="badge badge-success" v-if="slotProps.data.status === 'Done'">Done</span>
              <span class="badge badge-warning" v-else>Pending</span>
            </template>
          </Column>
          <Column field="actions" header="Actions">
            <template #body="slotProps">
              <router-link
                tag="button"
                :to="{name: 'FollowUpEdit', params: {mask: slotProps.data.mask}}"
                class="btn btn-primary btn-icon mr-2"
                v-tooltip.top="'Edit'"
              >
                <i class="pi pi-pencil"></i>
              </router-link>
              <button class="btn btn-danger btn-icon" v-tooltip.top="'Delete'">
                <i class="pi pi-trash"></i>
              </button>
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import FollowUp from "@services/api/followup";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Group from "@services/api/groups";

export default {
  name: "FollowUp",
  components: { DataTable, Column },
  data() {
    return {
      followups: [],
    };
  },
  methods: {
    async setData() {
      const response = await FollowUp.all();
      const { data } = await response.data;

      this.followups = data;
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.setData();
      next();
    });
  },
  beforeUpdate() {
    this.setData();
  },
};
</script>
<style lang="scss">
.p-paginator-current {
  margin-left: auto;
}
</style>
