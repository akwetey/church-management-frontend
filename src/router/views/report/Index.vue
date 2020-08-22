<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-md-3">
            <router-link :to="{name: 'ReportAttendance'}" style="color: inherit">
              <div class="border py-5">
                <div class="d-flex justify-content-center align-items-center">
                  <div class="text-center">
                    <i class="pi pi-calendar-plus pb-2" style="fontSize: 3rem"></i>
                    <p class="display-5">Attendance</p>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
          <div class="col-md-3">
            <router-link :to="{name: 'ReportExpense'}" style="color: inherit">
              <div class="border py-5">
                <div class="d-flex justify-content-center align-items-center">
                  <div class="text-center">
                    <i class="pi pi-chart-line pb-2" style="fontSize: 3rem"></i>
                    <p class="display-5">Expense</p>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReoprtIndex",
};
</script>
