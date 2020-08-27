<template>
  <div>
    <div class="alert alert-info mb-3 mt-4">
      <h5>Notes about how to import expenses from excel file</h5>
      <ul class="pl-3 mt-2">
        <li>Make sure to download file before you proceed.</li>
        <li>
          Required Fields in the excel template are, Type, Amount, Method And
          TItle
        </li>
        <li>
          Values for payment methods are as follows;
          <ul class="pl-4">
            <li>1 is for Cash</li>
            <li>2 is for Cheque</li>
            <li>3 is for Online</li>
            <li>4 is for Mobile Money</li>
          </ul>
        </li>
        <li>
          Values for contribution type are as follows;
          <ul class="pl-4">
            <li>1 is for Tithe</li>
            <li>2 is for Busing</li>
            <li>3 is for Covenant Partner</li>
            <li>4 is for Group</li>
            <li>5 is for Welfare</li>
            <li>6 is for Pledge</li>
            <li>7 is for General</li>
          </ul>
        </li>
      </ul>
    </div>

    <div>
      <div class>
        <div class="mb-3">
          <button
            class="btn btn-primary"
            type="button"
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
import Import from "@services/api/imports";
import { addBtnLoading, removeBtnLoading } from "@services/helpers";

export default {
  data() {
    return {
      disableProgessButton: true,
    };
  },

  methods: {
    next() {
      if (!this.disableProgessButton) this.$emit("set-step");
    },

    /** download template */
    downloadTemplate(mask, e) {
      const btn = this.$refs.downloadTem;

      (async () => {
        try {
          addBtnLoading(btn);

          const response = await Import.contributiontemplate();
          removeBtnLoading(btn);
          this.disableProgessButton = false;
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
};
</script>
