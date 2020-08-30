<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="col-md-8 offset-md-2">
          <Steps :current="current" :status="stepStatus">
            <Step title="Download Template"></Step>
            <Step title="Upload Data File"></Step>
            <Step title="Import People"></Step>
          </Steps>
          <keep-alive>
            <StepOne @set-step="changeStep" v-if="current === 0" />
          </keep-alive>
          <keep-alive>
            <StepTwo
              :file="form.file"
              @set-step="changeStep"
              @set-back="changeStepBack"
              @set-file="setFile"
              v-if="current === 1"
            />
          </keep-alive>

          <StepThree
            v-if="current === 2"
            @set-back="changeStepBack"
            @submit-data="submitData"
          />
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
import Import from "@services/api/imports";
import Swal from "sweetalert2";
import { addBtnLoading, removeBtnLoading } from "@services/helpers";
export default {
  name: "ExpenseImport",
  components: { Steps, Step, StepOne, StepTwo, StepThree },
  data: () => ({
    stepStatus: "process",
    currentStep: 0,
    form: {
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
    async submitData(btn, prevBtn) {
      try {
        addBtnLoading(btn);
        addBtnLoading(prevBtn);
        const formData = new FormData();
        formData.append("file", this.form.file);
        const response = await Import.importpeople(formData);
        const res = response.data;
        removeBtnLoading(btn);
        removeBtnLoading(prevBtn);
        Swal.fire("Success", res.message, "success");
        this.$router.push({ name: "people" });
      } catch (error) {
        console.log(error);
        removeBtnLoading(btn);
        removeBtnLoading(prevBtn);
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
