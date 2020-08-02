<template>
  <div>
    <div class="card">
      <div class="card-body">
        <router-link
          :to="{ name: 'FollowUpAdd' }"
          tag="button"
          class="btn btn-primary px-4"
        >
          <i class="pi pi-plus pr-2"></i> Add Follow Up
        </router-link>
      </div>

      <div>
        <DataTable
          :value="followups"
          :paginator="true"
          :rows="10"
          :loading="loading"
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
              <span
                class="badge badge-success"
                v-if="slotProps.data.status === 'Done'"
                >Done</span
              >
              <span class="badge badge-warning" v-else>Pending</span>
            </template>
          </Column>
          <Column field="actions" header="Actions">
            <template #body="slotProps">
              <router-link
                tag="button"
                :to="{
                  name: 'FollowUpEdit',
                  params: { mask: slotProps.data.mask },
                }"
                class="btn btn-primary btn-icon mr-2"
                v-tooltip.top="'Edit'"
              >
                <i class="pi pi-pencil"></i>
              </router-link>
              <button
                class="btn btn-danger btn-icon"
                v-tooltip.top="'Delete'"
                @click="deleteFollowup(slotProps.data.mask, $event)"
              >
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
import { addBtnLoading, removeBtnLoading } from "@services/helpers";
import Swal from "sweetalert2";

export default {
  name: "FollowUp",
  components: { DataTable, Column },
  data() {
    return {
      loading: true,
      followups: [],
    };
  },
  methods: {
    async setData() {
      try {
        const response = await FollowUp.all();
        this.loading = false;
        const { data } = response.data;

        this.followups = data;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },
    /* delete followup  */
    async deleteFollowup(mask, e) {
      const btn = e.target;
      try {
        const result = await Swal.fire({
          text: "Do you want to delete this followup?",
          icon: "warning",
          showCancelButton: true,
          cancelButtonText: "No",
          confirmButtonText: "Yes Delete It",
          reverseButtons: true,
        });
        if (result.value) {
          addBtnLoading(btn);
          const response = await FollowUp.delete(mask);
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
  created() {
    this.setData();
  },
  /*   beforeUpdate() {
    this.setData();
  }, */
};
</script>
<style lang="scss">
.p-paginator-current {
  margin-left: auto;
}
</style>
