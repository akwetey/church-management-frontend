<template>
  <div>
    <div class="row mb-4">
      <div class="col-md-3">
        <div class="card py-2">
          <div class="card-body">
            <div class="text-center">
              <h3 class="display-3">{{total.people}}</h3>
              <h5>People</h5>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card py-2">
          <div class="card-body">
            <div class="text-center">
              <h3 class="display-3">{{total.families}}</h3>
              <h5>Family</h5>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card py-2">
          <div class="card-body">
            <div class="text-center">
              <h3 class="display-3">{{total.users}}</h3>
              <h5>Users</h5>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card py-2">
          <div class="card-body">
            <div class="text-center">
              <h3 class="display-3">{{total.groups}}</h3>
              <h5>Groups</h5>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-9">
        <div class="card">
          <div class="card-body">
            <h5>Recently added people</h5>
          </div>
        </div>
      </div>

      <div class="col-md-3">
        <div class="card">
          <div class="card-body"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dashboard from "@services/api/dashboard";

export default {
  name: "Dashboard",
  data() {
    return {
      total: {},
      people: [],
      gender: {},
    };
  },
  methods: {
    setData(payload) {
      this.total = payload.total;
      this.people = payload.people;
      this.gender = payload.gender;
    },
  },
  async beforeRouteEnter(to, from, next) {
    const response = await Dashboard.init();
    const res = response.data;

    next((vm) => vm.setData(res.data));
  },
};
</script>
