<template>
  <div>
    <div class="card">
      <div class="card-body">
        <router-link :to="{name: 'FollowUpAdd'}" tag="button" class="btn btn-primary px-4">
          <i class="pi pi-plus pr-2"></i> Add Follow Up
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import FollowUp from "@services/api/followup";

export default {
  name: "FollowUp",
  data() {
    return {
      followups: [],
    };
  },
  methods: {
    async setData() {
      const response = await FollowUp.all();
      const { data } = await response.data;

      console.log(data);
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.setData();
      next();
    });
  },
};
</script>
