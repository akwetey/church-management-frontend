<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="mb-5">
          <router-link :to="{ name: 'addperson' }" class="btn btn-primary px-5"
            >Add Person</router-link
          >
        </div>

        <div>
          <DataTable
            :value="people"
            :paginator="true"
            :rows="10"
            :loading="loading"
            :filters="filters"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 25, 50]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          >
            <template #header>
              <div class="table-header d-flex justify-content-end">
                <span class="p-input-icon-left">
                  <i class="pi pi-search" />
                  <InputText
                    v-model="filters['global']"
                    placeholder="Search For"
                  />
                </span>
              </div>
            </template>
            <template #empty>
              <div class="text-center">
                No data found.
              </div>
            </template>
            <Column field="name" header="Name" sortable>
              <template #body="slotProps">
                <div class="d-flex align-items-center">
                  <div>
                    <img
                      :src="
                        slotProps.data.avatar ? slotProps.data.avatar : avatar
                      "
                      class="img-fluid rounded avatar-image "
                    />
                  </div>
                  <div class="ml-3">
                    <span> {{ slotProps.data.name }}</span>
                  </div>
                </div>
              </template>
            </Column>
            <Column field="email" header="Email" sortable></Column>
            <Column
              field="primary_telephone"
              header="Mobile Phone"
              sortable
            ></Column>
            <Column field="created_at" header="Date Added" sortable> </Column>
            <Column field="actions" header="Actions">
              <template #body="slotProps">
                <router-link
                  tag="button"
                  :to="{
                    name: 'personedit',
                    params: { mask: slotProps.data.mask },
                  }"
                  class="btn btn-primary btn-icon mr-2"
                  v-tooltip.top="'Edit'"
                >
                  <i class="pi pi-pencil"></i>
                </router-link>
                <button
                  class="btn btn-danger btn-icon mr-2"
                  v-tooltip.top="'Delete'"
                  @click="deletePerson(slotProps.data.mask, $event)"
                >
                  <i class="pi pi-trash no-pointer-events"></i>
                </button> </template
            ></Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import People from "@services/api/people";
import { addBtnLoading, removeBtnLoading } from "@services/helpers";
import Swal from "sweetalert2";
import InputText from "primevue/inputtext";

export default {
  name: "People",
  components: { DataTable, Column, InputText },
  data() {
    return {
      filters: {},
      people: [],
      loading: true,
    };
  },
  computed: {
    avatar() {
      return require("@assets/img/avatar.svg");
    },
  },
  methods: {
    //fetch people
    async getPeople() {
      try {
        const response = await People.all();
        this.loading = false;
        const res = response.data;
        this.people = res.data;
      } catch (error) {
        console.log(error);
        this.loading = false;
      }
    },

    /* delete person  */
    async deletePerson(mask, e) {
      const btn = e.target;
      try {
        const result = await Swal.fire({
          text: "Do you want to delete this person?",
          icon: "warning",
          showCancelButton: true,
          cancelButtonText: "No",
          confirmButtonText: "Yes Delete It",
          reverseButtons: true,
        });
        if (result.value) {
          addBtnLoading(btn);
          const response = await People.delete(mask);
          removeBtnLoading(btn);
          const res = response.data;
          Swal.fire({
            icon: "success",
            title: res.message,
          });
          this.getPeople();
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
  async created() {
    await this.getPeople();
  },
};
</script>
<style lang="scss" scoped>
.avatar-image {
  width: 50px;
  height: 50px;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
