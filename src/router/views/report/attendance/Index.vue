<template>
  <div>
    <div class>
      <div class>
        <div class="row">
          <div class="col-md-10 offset-md-1">
            <div class="alert alert-info mb-3"></div>

            <form @submit.prevent>
              <div class="card py-3 px-3 mb-3">
                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="status">Attendance Status *</label>
                      <select
                        name="status"
                        id="status"
                        class="custom-select"
                        v-model.number="form.status"
                      >
                        <option value="2">All</option>
                        <option value="1">Attendees</option>
                        <option value="0">Absentees</option>
                      </select>
                    </div>
                  </div>

                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="for">For *</label>
                      <select name="for" id="for" class="custom-select" v-model.number="form.for">
                        <option value="1">General</option>
                        <option value="2">Group</option>
                      </select>
                    </div>
                  </div>

                  <keep-alive>
                    <div class="col-md-4" v-if="form.for === 2">
                      <div class="form-group">
                        <label for="group">Group *</label>
                        <select
                          name="group"
                          id="group"
                          class="custom-select"
                          v-model.number="form.group_id"
                        >
                          <option value="1">General</option>
                          <option value="2">Group</option>
                        </select>
                      </div>
                    </div>
                  </keep-alive>
                </div>
              </div>

              <div class="card py-3 px-3">
                <div class="row">
                  <div class="col-md-3">
                    <label for="duration">Duration *</label>
                    <select
                      name="duration"
                      id="duration"
                      class="custom-select"
                      v-model.number="form.duration"
                    >
                      <option value="1">Day</option>
                      <option value="2">Month</option>
                      <option value="3">Year</option>
                      <option value="4">Specific period</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AttendanceReport",
  data() {
    return {
      form: {
        status: 2,
        for: 1,
        group_id: null,
        duration: 1,
      },
    };
  },
};
</script>
