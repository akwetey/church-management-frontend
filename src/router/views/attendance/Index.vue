<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="mb-5">
          <!-- <button
            id="myModalTrigger"
            class="btn btn-primary ml-3"
            type="button"
            data-toggle="modal"
            data-target="#myModal"
            @click="showModal"
          >
            New Attendance
          </button>-->
          <router-link
            v-can="'create-attendance'"
            :to="{ name: 'AttendanceAdd' }"
            class="btn btn-primary ml-3"
            >Import Attendance</router-link
          >
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
            <!-- <Column field="description" header="Description" sortable></Column> -->
            <Column field="in" header="In" sortable></Column>
            <Column field="out" header="Out" sortable></Column>
            <Column field="actions" header="Actions">
              <template #body="slotProps">
                <router-link
                  tag="button"
                  :to="{
                    name: 'attendanceEdit',
                    params: { mask: slotProps.data.mask },
                  }"
                  class="btn btn-primary btn-icon mr-2"
                  v-tooltip.top="'Edit'"
                >
                  <i class="pi pi-pencil"></i>
                </router-link>

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
        <div
          id="myModal"
          class="modal fade"
          role="dialog"
          aria-labelledby="myModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="myModalLabel" ref="myModalLabel">
                  New Attendance
                </h5>
                <div class="form-msg" ref="formMsg"></div>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  @click="hideModal"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="d-flex justify-content-between mb-3">
                  <p>NB: Fields marked * are required</p>
                  <button
                    class="btn btn-primary btn-sm"
                    ref="downloadTem"
                    @click="downloadTemplate($event)"
                  >
                    Download Template
                  </button>
                </div>
                <small class="d-flex justify-content-end text-danger">
                  Before you save make sure you download and fill the template.
                </small>
                <form @submit.prevent="addAttendance" ref="attendanceForm">
                  <div class="row mt-4">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="file">File *</label>
                        <input
                          type="file"
                          name="file"
                          id="file"
                          class="form-control-file"
                          ref="file"
                          required
                          accept=".xlsx, .xls, .csv"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="name">Name *</label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          class="form-control"
                          required
                          v-model.trim="name"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="description">Description</label>
                        <input
                          type="text"
                          name="description"
                          id="description"
                          class="form-control"
                          v-model.trim="description"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="date">Date *</label>
                        <flat-pickr
                          v-model="date"
                          :config="config"
                          placeholder="Select Date"
                          name="date"
                          id="date"
                          required
                          class="form-control bg-white"
                        ></flat-pickr>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                      @click="hideModal"
                    >
                      Close
                    </button>
                    <button class="btn btn-success" ref="submitBtn">
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
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
import BSN from "bootstrap.native";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import InputText from "primevue/inputtext";
export default {
  name: "Attendance",
  components: { DataTable, Column, flatPickr, InputText },
  data() {
    return {
      filters: {},
      attendance: [],
      loading: true,
      name: "",
      description: "",
      date: "",
      mask: "",
      config: {
        minDate: new Date(),
      },
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
    downloadTemplate(mask, e) {
      const btn = this.$refs.downloadTem;
      //console.log(this.mask);
      if (this.mask) {
        //  console.log(this.mask, "if");
        return (async () => {
          try {
            addBtnLoading(btn);
            const response = await Attendance.show(this.mask);
            removeBtnLoading(btn);
            const res = response.data;
            const { url, filename } = res.data.file;
            const anchor = document.createElement("a");
            anchor.setAttribute("download", filename);
            anchor.setAttribute("href", url);
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);
          } catch (error) {
            const res = error.response.data;
            Swal.fire({
              icon: "error",
              title: res.message,
            });
            removeBtnLoading(btn);
          }
        })();
      }
      return (async () => {
        try {
          addBtnLoading(btn);
          const response = await Attendance.template();
          removeBtnLoading(btn);
          const res = response.data;
          const { url, filename } = res.data;
          const anchor = document.createElement("a");
          anchor.setAttribute("download", filename);
          anchor.setAttribute("href", url);
          document.body.appendChild(anchor);
          anchor.click();
          document.body.removeChild(anchor);
        } catch (error) {
          const res = error.response.data;
          Swal.fire({
            icon: "error",
            title: res.message,
          });
          removeBtnLoading(btn);
        }
      })();
    },

    showModal() {
      const myModal = new BSN.Modal("#myModal", { backdrop: "static" });
      myModal.show();
    },

    hideModal() {
      const myModal = new BSN.Modal("#myModal");
      myModal.hide();
      this.name = "";
      this.description = "";
      this.date = "";
      // this.mask = "";
      this.$refs.file.value = "";
      this.$refs.myModalLabel.innerHTML = "New Attendance";
      this.$refs.formMsg.innerHTML = "";
    },

    /* add attendance */
    async addAttendance(e) {
      const form = e.target;
      const btn = this.$refs.submitBtn;
      const formMsg = this.$refs.formMsg;

      try {
        addBtnLoading(btn);
        const formData = new FormData();
        const file = this.$refs.file;
        formData.append("name", this.name);
        formData.append("date", this.date);
        formData.append("description", this.description);
        formData.append("file", file.files[0]);
        let response;
        if (this.mask) {
          response = await Attendance.update(formData, this.mask);
        }
        response = await Attendance.store(formData);
        const res = response.data;
        Swal.fire("Success", res.message, "success");
        removeBtnLoading(btn);
        this.hideModal();
        this.getAttendance();
      } catch (err) {
        removeBtnLoading(btn);
        const res = err.response.data;
        let errorBag = "";
        if (res.code === 422) {
          const errorData = Object.values(res.errors);
          errorData.map((error) => {
            errorBag += `<span class="d-block">${error}</span>`;
          });
        } else {
          errorBag += res.message;
        }
        formMsg.innerHTML = `<div class="alert alert-danger">${errorBag}</div>`;
      }
    },

    /* delete attendance  */
    async deleteAttendance(mask, e) {
      const btn = e.target;
      try {
        const result = await Swal.fire({
          text: "Do you want to delete this attendance?",
          icon: "warning",
          showCancelButton: true,
          cancelButtonText: "No",
          confirmButtonText: "Yes Delete It",
          reverseButtons: true,
        });
        if (result.value) {
          addBtnLoading(btn);
          const response = await Attendance.delete(mask);
          removeBtnLoading(btn);
          const res = response.data;
          Swal.fire({
            icon: "success",
            title: res.message,
          });
          this.getAttendance();
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

    /* download attendance */
    downloadAttendance(mask, e) {
      const btn = e.target;
      return (async () => {
        try {
          addBtnLoading(btn);
          const response = await Attendance.download(mask);
          removeBtnLoading(btn);
          const res = response.data;
          const { url, filename } = res.data;
          const anchor = document.createElement("a");
          anchor.setAttribute("download", filename);
          anchor.setAttribute("href", url);
          document.body.appendChild(anchor);
          anchor.click();
          document.body.removeChild(anchor);
        } catch (error) {
          const res = error.response.data;
          Swal.fire({
            icon: "error",
            title: res.message,
          });
          removeBtnLoading(btn);
        }
      })();
    },

    /* get an attendance */
    async getOneAttendance(mask, e) {
      const btn = e.target;
      try {
        addBtnLoading(btn);
        const response = await Attendance.show(mask);
        removeBtnLoading(btn);
        const res = response.data.data;
        this.name = res.attendance.name;
        this.date = res.attendance.date;
        this.description = res.attendance.description;
        this.mask = res.attendance.mask;
        this.$refs.myModalLabel.innerHTML = "Modify Attendance";
        this.showModal();
      } catch (error) {
        const res = error.response.data;
        Swal.fire({
          icon: "error",
          title: res.message,
        });
        removeBtnLoading(btn);
      }
    },
  },
  async created() {
    await this.getAttendance();
  },
};
</script>

<style lang="scss" scoped></style>
