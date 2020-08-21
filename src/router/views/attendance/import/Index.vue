<template>
  <div>
    <div class="card">
      <BlockUI :blocked="loading" :fullScreen="true">
        <div class="card-body">
          <div class="col-md-8 offset-md-2">
            <Steps :current="current" :status="stepStatus">
              <Step title="Download Template"></Step>
              <Step title="Upload Data File"></Step>
              <Step title="Import Attendance"></Step>
            </Steps>

            <StepOne
              :formModel="form"
              @set-step="changeStep"
              v-if="current === 0"
            />

            <StepTwo
              :file="form.file"
              @set-step="changeStep"
              @set-back="changeStepBack"
              @set-file="setFile"
              v-if="current === 1"
            />

            <StepThree
              v-if="current === 2"
              @set-back="changeStepBack"
              @submit-data="submitData"
            />
          </div>
        </div>
      </BlockUI>
    </div>
  </div>
</template>

<script>
import { Steps, Step } from "view-design";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import Attendance from "@services/api/attendance";
import BlockUI from "primevue/blockui";
import Swal from "sweetalert2";
export default {
  name: "AttendanceAdd",
  components: { Steps, Step, StepOne, StepTwo, StepThree, BlockUI },
  data: () => ({
    stepStatus: "process",
    currentStep: 0,
    form: {
      name: "",
      date: "",
      type: "",
      group_id: "",
      file: null,
    },
    loading: false,
  }),
  computed: {
    current() {
      return this.currentStep;
    },
  },
  methods: {
    changeStep() {
      this.currentStep += 1;
    },
    changeStepBack() {
      this.currentStep -= 1;
    },
    changeStepStatus(val) {
      this.stepStatus = val;
    },
    setFile(val) {
      this.form.file = val;
    },
    async submitData() {
      try {
        this.loading = true;
        const formData = new FormData();
        formData.append("name", this.form.name);
        formData.append("type", this.form.type);
        formData.append("date", this.form.date);
        formData.append("file", this.form.file);
        const response = await Attendance.store(formData);
        const res = response.data;
        Swal.fire("Success", res.message, "success");
        this.loading = false;
        this.$router.push({ name: "attendance" });
      } catch (error) {
        this.loading = false;
        const res = error.response.data;
        let errorBag = "";
        if (res.code === 422) {
          const errorData = Object.values(res.errors);
          errorData.map((error) => {
            errorBag += `<span class="d-block">${error}</span>`;
          });
        } else {
          errorBag += res.message;
        }
        Swal.fire("Error", errorBag, "error");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~view-design/dist/styles/iview.css";
</style>
