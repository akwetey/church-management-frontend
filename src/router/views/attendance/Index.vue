<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="mb-5">
          <router-link
            :to="{ name: 'attendanceadd' }"
            class="btn btn-primary px-5"
            >Add Attendance</router-link
          >
        </div>
        <div>
          <DataTable
            :value="attendance"
            :paginator="true"
            :rows="10"
            :loading="loading"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 25, 50]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          >
            <Column field="name" header="Name" sortable></Column>
            <Column field="description" header="Description" sortable></Column>
            <Column field="in" header="In" sortable></Column>
            <Column field="out" header="Out" sortable></Column>
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
                  @click="getAttendanceTemplate(slotProps.data.mask, $event)"
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
import Attendance from "@services/api/attendance";
import { addBtnLoading, removeBtnLoading } from "@services/helpers";
import Swal from "sweetalert2";

export default {
  name: "Attendance",
  components: { DataTable, Column },
  data() {
    return {
      attendance: [],
      loading: true,
    };
  },
  methods: {
    //fetch attendance
    async getAttendance() {
      try {
        const response = await Attendance.all();
        this.loading = false;
        const res = response.data;
        this.attendance = res.data;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },

    /* get attendance template  */
    async getAttendanceTemplate(mask, e) {
      const btn = e.target;
      addBtnLoading(btn);
      const response = await Attendance.all();
      try {
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
    await this.getAttendance();
  },
};
</script>

<style lang="scss" scoped></style>
