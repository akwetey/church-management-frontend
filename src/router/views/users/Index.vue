<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="mb-5">
          <router-link :to="{ name: 'adduser' }" class="btn btn-primary px-5"
            >Add User</router-link
          >
        </div>

        <div>
          <DataTable
            :value="users"
            :paginator="true"
            :rows="10"
            :loading="loading"
            :filters="filters"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 25, 50]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          >
            <template #header>
              <div class="table-header d-flex justify-content-end">
                <span class="p-input-icon-left">
                  <i class="pi pi-search" />
                  <InputText
                    v-model="filters['global']"
                    placeholder="Search For"
                  />
                </span>
              </div>
            </template>
            <template #empty>
              <div class="text-center">
                No data found.
              </div>
            </template>
            <Column field="name" header="Name" sortable></Column>
            <Column field="email" header="Email" sortable></Column>
            <Column field="role" header="Role" sortable></Column>
            <Column field="status" header="Status" sortable>
              <template #body="slotProps">
                <span
                  class="badge badge-success"
                  v-if="slotProps.data.status == 'active'"
                  >{{
                    slotProps.data.status[0].toUpperCase() +
                      slotProps.data.status.slice(1)
                  }}</span
                >
                <span class="badge badge-danger" v-else>{{
                  slotProps.data.status[0].toUpperCase() +
                    slotProps.data.status.slice(1)
                }}</span>
              </template>
            </Column>
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
                  @click="deleteUser(slotProps.data.mask, $event)"
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
import User from "@services/api/user";
import { addBtnLoading, removeBtnLoading } from "@services/helpers";
import Swal from "sweetalert2";
import InputText from "primevue/inputtext";

export default {
  name: "Users",
  components: { DataTable, Column, InputText },
  data() {
    return {
      filters: {},
      users: [],
      loading: true,
    };
  },
  methods: {
    //fetch users
    async getUsers() {
      try {
        const response = await User.all();
        this.loading = false;
        const res = response.data;
        this.users = res.data;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },

    /* delete user  */
    async deleteUser(mask, e) {
      const btn = e.target;
      try {
        const result = await Swal.fire({
          text: "Do you want to delete this user?",
          icon: "warning",
          showCancelButton: true,
          cancelButtonText: "No",
          confirmButtonText: "Yes Delete It",
          reverseButtons: true,
        });
        if (result.value) {
          addBtnLoading(btn);
          const response = await User.delete(mask);
          removeBtnLoading(btn);
          const res = response.data;
          Swal.fire({
            icon: "success",
            title: res.message,
          });
          this.getUsers();
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
    await this.getUsers();
  },
};
</script>

<style lang="scss" scoped></style>
