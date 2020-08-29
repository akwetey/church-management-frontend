<template>
  <div>
    <div class="alert alert-info mb-3 mt-4">
      <h5>Notes about how to import attendance from excel file</h5>
      <ul class="pl-3 mt-2">
        <li>Enter a name for the attendance to be taken for</li>
        <li>Select the type of attendance</li>
        <li>
          Please make sure you've created a group if you wanna take attendance
          for a group
        </li>
        <li>
          All fields marked * are required
        </li>
      </ul>
    </div>

    <div>
      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label for="name">Name *</label>
            <input
              type="text"
              name="name"
              id="name"
              class="form-control"
              v-model.trim="name"
            />
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group">
            <label for="date">Date *</label>
            <flat-pickr
              v-model.trim="date"
              placeholder="Select Date"
              name="date"
              id="date"
              class="form-control bg-white"
            ></flat-pickr>
          </div>
        </div>

        <div class="col-md-4">
          <div class="form-group">
            <label for="type">Type *</label>
            <select
              name="type"
              id="type"
              class="custom-select"
              @change="onChangeAttendanceType"
              v-model.trim="type"
            >
              <option value>Select type</option>
              <option disabled>----------------</option>
              <option value="1">General</option>
              <option value="2">Group</option>
            </select>
          </div>
        </div>

        <div class="col-md-4" v-if="type === 2">
          <div class="form-group">
            <label for="group">Group *</label>
            <select
              name="group"
              id="group"
              class="custom-select"
              v-model.trim="group"
            >
              <option value>Select group</option>
              <option disabled>----------------</option>
              <option :value="group.id" v-for="(group, i) in groups" :key="i">{{
                group.name
              }}</option>
            </select>
          </div>
        </div>
      </div>

      <div class>
        <div class="mb-3">
          <button
            class="btn btn-primary"
            type="button"
            :disabled="disableProgessButton"
            ref="downloadTem"
            @click="downloadTemplate($event)"
          >
            Download Template
          </button>
        </div>

        <div>
          <button
            class="btn btn-success"
            :disabled="disableProgessButton"
            @click="next"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Groups from "@services/api/groups";
import Attendance from "@services/api/attendance";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import { addBtnLoading, removeBtnLoading } from "@services/helpers";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      groups: [],
    };
  },
  components: { flatPickr },
  props: {
    formModel: {
      type: Object,
      required: true,
    },
  },
  computed: {
    name: {
      get() {
        return this.formModel.name;
      },
      set(val) {
        this.formModel.name = val;
      },
    },
    type: {
      get() {
        return this.formModel.type;
      },
      set(val) {
        this.formModel.type = val;
      },
    },
    group: {
      get() {
        return this.formModel.group_id;
      },
      set(val) {
        this.formModel.group_id = val;
      },
    },
    date: {
      get() {
        return this.formModel.date;
      },
      set(val) {
        this.formModel.date = val;
      },
    },
    disableProgessButton() {
      if (this.name && this.type === 1 && this.date) return false;
      if (this.name && this.type === 2 && this.group && this.date) return false;
      return true;
    },
  },
  methods: {
    async onChangeAttendanceType(e) {
      try {
        const value = parseInt(e.target.value);

        if (!value) return;
        if (value === 2) {
          if (this.groups.length) {
            this.formModel.type = value;
            return;
          }

          const response = await Groups.all();
          const { data: res } = response.data;
          this.groups = res;
        }

        this.formModel.type = value;
      } catch (error) {
        console.log(error.message);
      }
    },

    next() {
      if (!this.disableProgessButton) this.$emit("set-step");
    },

    /** download template */
    downloadTemplate(mask, e) {
      const btn = this.$refs.downloadTem;

      (async () => {
        try {
          addBtnLoading(btn);

          const getParams = {
            params: {
              type: this.type,
            },
          };
          this.type === 2
            ? (getParams.params.group_id = this.group)
            : delete getParams.params.group_id;
          const response = await Attendance.template(getParams);
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
  },
  async created() {
    const response = await Groups.all();
    //console.log(response);
    const { data: res } = response.data;
    this.groups = res;
  },
};
</script>
