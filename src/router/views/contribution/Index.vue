<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="mb-5">
          <div class="dropdown">
            <button
              id="myDropdown"
              type="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              class="btn btn-primary"
            >
              Add Contribution
              <i class="link-arrow pi pi-angle-down"></i>
            </button>
            <div class="dropdown-menu" aria-labelledby="myDropdown">
              <router-link :to="{ name: 'busingadd' }" class="dropdown-item"
                >Busing</router-link
              >
              <router-link :to="{ name: 'covenantadd' }" class="dropdown-item"
                >Covenant Partner</router-link
              >
              <router-link :to="{ name: 'TitheAdd' }" class="dropdown-item"
                >Tithe</router-link
              >
              <router-link :to="{ name: 'addgroup' }" class="dropdown-item"
                >Group</router-link
              >
              <router-link :to="{ name: 'addwelfare' }" class="dropdown-item"
                >Welfare</router-link
              >
              <a class="dropdown-item" href="#">Pledge</a>
              <a class="dropdown-item" href="#">General</a>
            </div>
          </div>
        </div>
        <div>
          <DataTable
            :value="table.data"
            :paginator="true"
            :rows="10"
            :loading="loading"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 25, 50]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          >
            <template #empty>
              <div class="text-center">No data found.</div>
            </template>
            <Column field="person.name" header="Person" sortable></Column>
            <Column field="type" header="Type" sortable></Column>

            <Column field="amount" header="Amount" sortable>
              <template #body="slotProps">
                <small>{{ currency }}</small>
                {{ slotProps.data.amount }}
              </template>
            </Column>
            <Column field="created_at" header="Date Recorded" sortable></Column>
            <Column field="actions" header="Actions">
              <template #body="slotProps">
                <router-link
                  tag="button"
                  :to="{
                    name: 'covenantedit',
                    params: { mask: slotProps.data.mask },
                  }"
                  class="btn btn-primary btn-icon mr-2"
                  v-tooltip.top="'Edit'"
                  v-if="
                    slotProps.data.type.toLowerCase() === 'covenant partner'
                  "
                >
                  <i class="pi pi-pencil"></i>
                </router-link>
                <router-link
                  tag="button"
                  :to="{
                    name: 'busingedit',
                    params: { mask: slotProps.data.mask },
                  }"
                  class="btn btn-primary btn-icon mr-2"
                  v-tooltip.top="'Edit'"
                  v-if="slotProps.data.type.toLowerCase() === 'busing'"
                >
                  <i class="pi pi-pencil"></i>
                </router-link>
                <router-link
                  tag="button"
                  :to="{
                    name: 'TitheEdit',
                    params: { mask: slotProps.data.mask },
                  }"
                  class="btn btn-primary btn-icon mr-2"
                  v-tooltip.top="'Edit'"
                  v-if="slotProps.data.type.toLowerCase() === 'tithe'"
                >
                  <i class="pi pi-pencil"></i>
                </router-link>
                <router-link
                  tag="button"
                  :to="{
                    name: 'groupEdit',
                    params: { mask: slotProps.data.mask },
                  }"
                  class="btn btn-primary btn-icon mr-2"
                  v-tooltip.top="'Edit'"
                  v-if="slotProps.data.type.toLowerCase() === 'group'"
                >
                  <i class="pi pi-pencil"></i>
                </router-link>
                <router-link
                  tag="button"
                  :to="{
                    name: 'welfareedit',
                    params: { mask: slotProps.data.mask },
                  }"
                  class="btn btn-primary btn-icon mr-2"
                  v-tooltip.top="'Edit'"
                  v-if="slotProps.data.type.toLowerCase() === 'welfare'"
                >
                  <i class="pi pi-pencil"></i>
                </router-link>
                <button
                  class="btn btn-danger btn-icon mr-2"
                  v-tooltip.top="'Delete'"
                  @click="
                    deleteContribution(
                      slotProps.data.mask,
                      $event,
                      slotProps.data.type
                    )
                  "
                >
                  <i class="pi pi-trash no-pointer-events"></i>
                </button>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Contribution from "@services/api/contribution";
import { addBtnLoading, removeBtnLoading } from "@services/helpers";
import BSN from "bootstrap.native";
import Swal from "sweetalert2";

export default {
  name: "Contributions",
  components: { DataTable, Column },
  data() {
    return {
      table: {
        data: [],
        total: 0,
      },
      loading: true,
    };
  },
  computed: {
    currency() {
      return this.$store.getters.currency;
    },
  },
  methods: {
    async setData() {
      const response = await Contribution.all();
      const { data: res } = response.data;
      this.table.data = res.items;
      this.loading = false;
    },

    /* delete contribution  */
    async deleteContribution(mask, e, type) {
      const btn = e.target;
      try {
        const result = await Swal.fire({
          text: "Do you want to delete this contribution?",
          icon: "warning",
          showCancelButton: true,
          cancelButtonText: "No",
          confirmButtonText: "Yes Delete It",
          reverseButtons: true,
        });
        if (result.value) {
          addBtnLoading(btn);
          let response;
          switch (type.toLowerCase()) {
            case "covenant partner":
              response = await Contribution.covedelete(mask);
              break;
            case "busing":
              response = await Contribution.busingdelete(mask);
              break;
            case "group":
              response = await Contribution.groupdelete(mask);
              break;
            case "welfare":
              response = await Contribution.welfaredelete(mask);
              break;
          }

          removeBtnLoading(btn);
          const res = response.data;
          Swal.fire({
            icon: "success",
            title: res.message,
          });
          this.setData();
        }
      } catch (error) {
        removeBtnLoading(btn);
        const res = error.response.data;
        Swal.fire({
          icon: "error",
          title: res.message,
        });
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.setData();
      next();
    });
  },
  mounted() {
    new BSN.Dropdown("#myDropdown");
  },
};
</script>
