<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="mb-5">
          <router-link :to="{ name: 'addperson' }" class="btn btn-primary px-5"
            >Add Person</router-link
          >
        </div>

        <div>
          <DataTable
            :value="people"
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
                  @click="deletePerson(slotProps.data.mask, $event)"
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
import People from "@services/api/people";
import { addBtnLoading, removeBtnLoading } from "@services/helpers";
import Swal from "sweetalert2";

export default {
  name: "People",
  components: { DataTable, Column },
  data() {
    return {
      people: [],
      loading: true,
    };
  },
  methods: {
    //fetch people
    async getPeople() {
      try {
        const response = await People.all();
        this.loading = false;
        const res = response.data;
        this.people = res.data;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },

    /* delete person  */
    async deletePerson(mask, e) {
      const btn = e.target;
      try {
        const result = await Swal.fire({
          text: "Do you want to delete this person?",
          icon: "warning",
          showCancelButton: true,
          cancelButtonText: "No",
          confirmButtonText: "Yes Delete It",
          reverseButtons: true,
        });
        if (result.value) {
          addBtnLoading(btn);
          const response = await People.delete(mask);
          removeBtnLoading(btn);
          const res = response.data;
          Swal.fire({
            icon: "success",
            title: res.message,
          });
          this.getPeople();
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
    await this.getPeople();
  },
};
</script>

<style lang="scss" scoped></style>
