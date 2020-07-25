<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="mb-5">
          <router-link :to="{ name: 'groupadd' }" class="btn btn-primary px-5"
            >Add Group</router-link
          >
        </div>

        <div>
          <DataTable
            :value="groups"
            :paginator="true"
            :rows="10"
            :loading="loading"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 25, 50]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          >
            <Column field="name" header="Name" sortable></Column>
            <Column field="persons" header="Persons" sortable></Column>
            <Column field="leader" header="Leader" sortable></Column>
            <Column field="created_at" header="Date Added" sortable></Column>
            <Column field="actions" header="Actions">
              <template #body="slotProps">
                <router-link
                  tag="button"
                  :to="{
                    name: 'groupedit',
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
                  @click="deleteFollowup(slotProps.data.mask, $event)"
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
import Followups from "@services/api/followups";
import { addBtnLoading, removeBtnLoading } from "@services/helpers";
import Swal from "sweetalert2";

export default {
  name: "Followups",
  components: { DataTable, Column },
  data() {
    return {
      followups: [],
      loading: true,
    };
  },
  methods: {
    //fetch followups
    async getFollowups() {
      try {
        const response = await Followups.all();
        this.loading = false;
        const res = response.data;
        this.followups = res.data;
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
          const response = await Followups.delete(mask);
          removeBtnLoading(btn);
          const res = response.data;
          Swal.fire({
            icon: "success",
            title: res.message,
          });
          this.getFollowups();
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
  async created() {
    await this.getFollowups();
  },
};
</script>

<style lang="scss" scoped></style>
