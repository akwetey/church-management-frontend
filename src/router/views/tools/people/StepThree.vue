<template>
  <div>
    <div class="alert alert-info mb-3 mt-4">
      <p class="mb-0">Please submit file.</p>
    </div>
    <div>
      <div class="d-flex justify-content-between">
        <button
          class="btn btn-primary mr-3"
          @click="previous"
          ref="previousBtn"
        >
          Previous
        </button>
        <button class="btn btn-success" @click="submitData" ref="submitBtn">
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StepThree",
  data() {
    return {};
  },

  methods: {
    previous(e) {
      this.$emit("set-back");
    },

    submitData(e) {
      this.$emit("submit-data", this.$refs.submitBtn, this.$refs.previousBtn);
    },
  },
};
</script>
