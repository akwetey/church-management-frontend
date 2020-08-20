<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="col-md-8 offset-md-2">
          <Steps :current="0" :status="stepStatus">
            <Step title="Download Template"></Step>
            <Step title="Upload Data File"></Step>
            <Step title="Import Attendance"></Step>
          </Steps>

          <template>
            <div class="alert alert-info mb-3 mt-4">
              <h5>Notes about how to import attendance from excel file</h5>
              <ul class="pl-3 mt-2">
                <li></li>
                <li></li>
                <li></li>
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
                      v-model.trim="form.name"
                    />
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
                    >
                      <option value>Select type</option>
                      <option disabled>----------------</option>
                      <option value="1">General</option>
                      <option value="2">Group</option>
                    </select>
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="form-group">
                    <label for="group">Group *</label>
                    <select name="group" id="group" class="custom-select" v-model="form.group_id">
                      <option value>Select group</option>
                      <option disabled>----------------</option>
                      <option value="group.id" v-for="(group, i) in groups" :key="i"></option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Steps, Step } from "view-design";
import Groups from "@services/api/groups";
import "view-design/dist/styles/iview.css";

export default {
  name: "AttendanceAdd",
  components: { Steps, Step },
  data: () => ({
    stepStatus: "process",
    groups: [],
    form: {
      name: "",
      type: "",
      group_id: "",
    },
  }),
  methods: {
    async onChangeAttendanceType(e) {
      const value = e.target.value;
      console.log(typeof value);

      if (this.groups.length) return;
    },
  },
};
</script>
