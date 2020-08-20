<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="col-md-8 offset-md-2">
          <Steps :current="current" :status="stepStatus">
            <Step title="Download Template"></Step>
            <Step title="Upload Data File"></Step>
            <Step title="Import Attendance"></Step>
          </Steps>

          <StepOne :formModel="form" @set-step="changeStep" v-if="current === 0" />

          <StepTwo
            :file="form.file"
            @set-step="changeStep"
            @set-file="setFile"
            v-if="current === 1"
          />

          <StepThree v-if="current === 2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Steps, Step } from "view-design";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

export default {
  name: "AttendanceAdd",
  components: { Steps, Step, StepOne, StepTwo, StepThree },
  data: () => ({
    stepStatus: "process",
    currentStep: 0,
    form: {
      name: "",
      type: "",
      group_id: "",
      file: null,
    },
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
    changeStepStatus(val) {
      this.stepStatus = val;
    },
    setFile(val) {
      this.form.file = val;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~view-design/dist/styles/iview.css";
</style>
