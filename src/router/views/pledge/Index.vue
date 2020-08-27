<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="mb-5">
          <router-link :to="{ name: 'pledgeadd' }" class="btn btn-primary px-5">Add Pledge</router-link>
        </div>

        <div>
          <DataTable
            :value="pledges"
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
                  <InputText v-model="filters['global']" placeholder="Search For" />
                </span>
              </div>
            </template>
            <template #empty>
              <div class="text-center">No data found.</div>
            </template>
            <Column field="id" header="ID" sortable></Column>
            <Column field="title" header="Title" sortable></Column>
            <Column field="amount" header="Amount" sortable></Column>
            <Column field="purpose" header="Purpose" sortable></Column>
            <Column field="actions" header="Actions">
              <template #body="slotProps">
                <router-link
                  tag="button"
                  :to="{
                    name: 'pledgeedit',
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
                  @click="deletePledge(slotProps.data.mask, $event)"
                >
                  <i class="pi pi-trash no-pointer-events"></i>
                </button>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Pledge from "@services/api/pledge";
import { addBtnLoading, removeBtnLoading } from "@services/helpers";
import Swal from "sweetalert2";
import InputText from "primevue/inputtext";

export default {
  name: "Pledge",
  components: { DataTable, Column, InputText },
  data() {
    return {
      filters: {},
      pledges: [],
      loading: true,
    };
  },
  methods: {
    //fetch pledges
    async getPledges() {
      try {
        const response = await Pledge.all();
        this.loading = false;
        const res = response.data;
        this.pledges = res.data;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },

    /* delete pledge  */
    async deletePledge(mask, e) {
      const btn = e.target;
      try {
        const result = await Swal.fire({
          text: "Do you want to delete this pledge?",
          icon: "warning",
          showCancelButton: true,
          cancelButtonText: "No",
          confirmButtonText: "Yes Delete It",
          reverseButtons: true,
        });
        if (result.value) {
          addBtnLoading(btn);
          const response = await Pledge.delete(mask);
          removeBtnLoading(btn);
          const res = response.data;
          Swal.fire({
            icon: "success",
            title: res.message,
          });
          this.getPledges();
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
    await this.getPledges();
  },
};
</script>

<style lang="scss" scoped></style>
