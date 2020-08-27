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
              Import Data
              <i class="link-arrow pi pi-angle-down"></i>
            </button>
            <div class="dropdown-menu" aria-labelledby="myDropdown">
              <router-link :to="{ name: 'people' }" class="dropdown-item"
                >People</router-link
              >
              <router-link :to="{ name: 'expenses' }" class="dropdown-item"
                >Expenses</router-link
              >
            </div>
          </div>
        </div>
        <div>
          <DataTable
            :value="attendance"
            :paginator="true"
            :rows="10"
            :loading="loading"
            :filters="filters"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 25, 50]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
            :scrollable="true"
            scrollHeight="55vh"
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
              <div class="text-center">No data found.</div>
            </template>
            <Column field="name" header="Name" sortable></Column>
            <Column field="description" header="Description" sortable></Column>
            <Column field="in" header="In" sortable></Column>
            <Column field="out" header="Out" sortable></Column>
            <Column field="actions" header="Actions">
              <template #body="slotProps">
                <button
                  id="myModalUpdate"
                  class="btn btn-primary btn-icon mr-2"
                  type="button"
                  data-toggle="modal"
                  data-target="#myModal"
                  @click="getOneAttendance(slotProps.data.mask, $event)"
                  v-tooltip.top="'Edit'"
                >
                  <i class="pi pi-pencil"></i>
                </button>
                <button
                  class="btn btn-info btn-icon mr-2"
                  v-tooltip.top="'Download This Attendance Data'"
                  @click="downloadAttendance(slotProps.data.mask, $event)"
                >
                  <i class="pi pi-cloud-download"></i>
                </button>
                <button
                  class="btn btn-danger btn-icon mr-2"
                  v-tooltip.top="'Delete'"
                  @click="deleteAttendance(slotProps.data.mask, $event)"
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
import Attendance from "@services/api/attendance";
import BSN from "bootstrap.native";
export default {
  name: "Import",
  components: { DataTable, Column },
  data() {
    return {
      attendance: [],
      loading: true,
    };
  },
  mounted() {
    new BSN.Dropdown("#myDropdown");
  },
};
</script>

<style lang="scss" scoped></style>
