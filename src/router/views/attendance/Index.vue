<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="mb-5">
          <button class="btn btn-primary" @click="downloadTemplate($event)">
            Download Template
          </button>
          <button
            id="myModalTrigger"
            class="btn btn-primary ml-3"
            type="button"
            data-toggle="modal"
            data-target="#myModal"
            @click="showModal"
          >
            Import Template
          </button>
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
                <h5 class="modal-title" id="myModalLabel">Import Template</h5>
                <div class="form-msg" ref="formMsg"></div>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div class="modal-body">
                <p class="mb-3 d-block">NB: Fields marked * are required</p>
                <form @submit.prevent="addAttendance">
                  <div class="row">
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
export default {
  name: "Attendance",
  components: { DataTable, Column, flatPickr },
  data() {
    return {
      attendance: [],
      loading: true,
      name: "",
      description: "",
      date: "",
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
    async downloadTemplate(e) {
      const btn = e.target;
      addBtnLoading(btn);
      (async () => {
        try {
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
          console.log(error);
          if (error) {
            console.log(error.response.data);
          }
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
    },
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

        const response = await Attendance.store(formData);
        const res = response.data;
        Swal.fire("Success", res.message, "success");
        this.hideModal();
        this.getAttendance();
      } catch (err) {
        const res = err.response.data;
        let errorBag = "";
        if (res.code === 422) {
          removeBtnLoading(btn);
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
  },
  async created() {
    await this.getAttendance();
  },
};
</script>

<style lang="scss" scoped></style>
