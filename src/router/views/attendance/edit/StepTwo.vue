<template>
  <div>
    <div class="alert alert-info mb-3 mt-4">
      <p class="mb-0">Please upload the data file.</p>
    </div>

    <div>
      <BFormFile v-model="uploadFile" plain class="mb-3" />

      <div class="d-flex justify-content-between">
        <button class="btn btn-primary mr-3" @click="previous">Previous</button>
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
</template>

<script>
import { BFormFile } from "bootstrap-vue";

export default {
  name: "StepTwo",
  components: { BFormFile },
  props: ["file"],
  data() {
    return {
      uploadFile: null,
    };
  },
  computed: {
    disableProgessButton() {
      if (this.file) return false;
      return true;
    },
  },
  watch: {
    uploadFile(n) {
      this.$emit("set-file", n);
    },
  },
  methods: {
    next(e) {
      this.$emit("set-step");
    },
    previous(e) {
      this.$emit("set-back");
    },
  },
};
</script>
