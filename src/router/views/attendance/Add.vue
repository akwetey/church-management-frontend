<template>
  <div>
    <Steps :model="items" :readonly="true" style="margin-bottom: 1rem" />
    <keep-alive>
      <router-view
        :formData="formObject"
        @prevPage="prevPage($event)"
        @nextPage="nextPage($event)"
      />
    </keep-alive>
    <div class="stepsdemo-content">
      <div class="card min-height-500">
        <template slot="title">
          Personal Information
        </template>
        <template slot="subtitle">
          Enter your information
        </template>
        <template slot="content">
          <p class="p-text-secondary">Enter your information</p>
          <div class="p-fluid"></div>
        </template>
        <template slot="footer">
          <div class="p-grid p-nogutter p-justify-between">
            <i></i>
            <Button
              label="Next"
              @click="nextPage(!$v.$invalid)"
              icon="pi pi-angle-right"
              iconPos="right"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Steps from "primevue/steps";
export default {
  name: "AddAttendance",
  components: {
    Steps,
  },
  data() {
    return {
      items: [
        {
          label: "Download Template",
          to: "/steps",
        },
        {
          label: "Upload Template",
          to: "/steps/upload",
        },
        {
          label: "Import Attendance",
          to: "/steps/import",
        },
      ],
      formObject: {},
    };
  },
  methods: {
    nextPage(event) {
      for (let field in event.formData) {
        this.formObject[field] = event.formData[field];
      }

      this.$router.push(this.items[event.pageIndex + 1].to);
    },
  },
};
</script>
