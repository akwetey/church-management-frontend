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
            :value="books"
            :paginator="true"
            :rows="10"
            :loading="loading"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 25, 50]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          >
            <Column field="name" header="Name" sortable></Column>
            <Column field="email" header="Email" sortable></Column>
            <Column field="role" header="Role" sortable></Column>
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

export default {
  name: "Users",
  components: { DataTable, Column },
  data() {
    return {
      users: [],
      loading: true,
    };
  },
  methods: {
    getUsers() {
      User.all()
        .then(({ data: res }) => {
          this.users = res.data;
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },

    /* delete user  */
    deleteUser(mask, e) {
      const btn = e.target;

      Swal.fire({
        text: "Do you want to delete this user?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonText: "Yes Delete It",
        reverseButtons: true,
      }).then((result) => {
        if (result.value) {
          addBtnLoading(btn);
          User.delete(mask)
            .then((response) => {
              removeBtnLoading(btn);
              //  console.log(response);
              const res = response.data;
              Swal.fire({
                icon: "success",
                title: res.message,
              });
              this.getUsers();
            })
            .catch((err) => console.log(err));
        }
      });
    },
  },
  created() {
    this.getUsers();
  },
};
</script>

<style lang="scss" scoped></style>
