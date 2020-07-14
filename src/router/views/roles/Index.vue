<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="mb-5">
          <router-link :to="{ name: 'roleadd' }" class="btn btn-primary px-5"
            >Add Role</router-link
          >
        </div>

        <div>
          <DataTable
            :value="roles"
            :paginator="true"
            :rows="10"
            :loading="loading"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 25, 50]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          >
            <Column field="name" header="Name" sortable></Column>
            <Column field="users" header="Users" sortable></Column>
            <Column field="created_at" header="Date Added" sortable></Column>
            <Column field="actions" header="Actions">
              <template #body="slotProps">
                <router-link
                  tag="button"
                  :to="{
                    name: 'useredit',
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
                  @click="deleteRole(slotProps.data.mask, $event)"
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
import Role from "@services/api/roles";
import { addBtnLoading, removeBtnLoading } from "@services/helpers";
import Swal from "sweetalert2";

export default {
  name: "Roles",
  components: { DataTable, Column },
  data() {
    return {
      roles: [],
      loading: true,
    };
  },
  methods: {
    //fetch users
    async getRoles() {
      try {
        const response = await Role.all();
        this.loading = false;
        const res = response.data;
        this.roles = res.data;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },

    /* delete role  */
    async deleteRole(mask, e) {
      const btn = e.target;
      try {
        const result = await Swal.fire({
          text: "Do you want to delete this role?",
          icon: "warning",
          showCancelButton: true,
          cancelButtonText: "No",
          confirmButtonText: "Yes Delete It",
          reverseButtons: true,
        });
        if (result.value) {
          addBtnLoading(btn);
          const response = await Role.delete(mask);
          removeBtnLoading(btn);
          const res = response.data;
          Swal.fire({
            icon: "success",
            title: res.message,
          });
          this.getRoles();
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
    await this.getRoles();
  },
};
</script>

<style lang="scss" scoped></style>
