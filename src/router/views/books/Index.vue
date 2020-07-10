<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="mb-5">
          <router-link :to="{ name: 'BooksAdd' }" class="btn btn-primary px-5"
            >Add Book</router-link
          >
        </div>

        <div>
          <DataTable
            :value="books"
            :paginator="true"
            :rows="10"
            :loading="loading"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 25, 50]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          >
            <Column field="cover" header="Cover">
              <template #body="slotProps">
                <div class="book-image">
                  <img
                    :src="slotProps.data.cover ? slotProps.data.cover : book"
                  />
                </div>
              </template>
            </Column>
            <Column field="title" header="Title" sortable></Column>
            <Column field="description" header="Description" sortable></Column>
            <Column field="created_at" header="Date Added" sortable></Column>
            <Column field="actions" header="Actions">
              <template #body="slotProps">
                <router-link
                  tag="button"
                  :to="{
                    name: 'BooksEdit',
                    params: { mask: slotProps.data.mask },
                  }"
                  class="btn btn-primary btn-icon mr-2"
                  v-tooltip.top="'Edit'"
                >
                  <i class="pi pi-pencil"></i>
                </router-link>
                <button
                  class="btn btn-warning btn-icon mr-2"
                  v-tooltip.top="'Generate downloadable link'"
                  @click="generateLink(slotProps.data.mask, $event)"
                >
                  <i class="pi pi-cloud-download no-pointer-events"></i>
                </button>
                <button
                  class="btn btn-danger btn-icon mr-2"
                  v-tooltip.top="'Delete'"
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
import Book from "@services/api/book";
import { addBtnLoading, removeBtnLoading } from "@services/helpers";
import Swal from "sweetalert2";

export default {
  name: "Books",
  components: { DataTable, Column },
  data() {
    return {
      books: [],
      loading: true,
    };
  },
  computed: {
    book() {
      return require("@assets/img/book.svg");
    },
  },
  methods: {
    getBooks() {
      Book.all().then(({ data: res }) => {
        this.books = res.data;
        this.loading = false;
      });
    },

    generateLink(mask, e) {
      const btn = e.target;
      addBtnLoading(btn);

      Book.generateDownloadableLink(mask)
        .then(({ data: res }) => {
          removeBtnLoading(btn);

          Swal.fire({
            icon: "success",
            title: res.message,
            html: `<div class="container">
              <div>
                <p class="mr-auto mb-4"><span class="font-weight-bold">Code: </span>${res.data.code}</p>
                <p class="mr-auto"><span class="font-weight-bold">Link: </span>${res.data.link}</p>
              </div>
            </div>`,
            allowOutsideClick: false,
          });
        })
        .catch((err) => console.log(err));
    },
  },
  created() {
    this.getBooks();
  },
};
</script>

<style lang="scss" scoped>
.book-image {
  width: 30px;
  height: 30px;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
