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
export default {
  name: "FollowUp",
};
</script>
