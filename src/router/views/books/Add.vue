<template>
  <div>
    <div class="card min-height-500">
      <div class="card-body">
        <p class="mb-3">NB: Fields marked * are required</p>

        <div class="form-msg" ref="formMsg"></div>

        <form @submit.prevent="addBook">
          <div class="row">
            <div class="col-md-4">
              <div class="form-group">
                <label for="title">Title *</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  class="form-control"
                  required
                  v-model.trim="title"
                />
              </div>
            </div>

            <div class="col-md-4">
              <div class="form-group">
                <label for="description">Description</label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  class="form-control"
                  v-model.trim="description"
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4">
              <div class="form-group">
                <label for="file">File *</label>
                <input
                  type="file"
                  name="file"
                  id="file"
                  class="form-control-file"
                  ref="file"
                  required
                />
              </div>
            </div>

            <div class="col-md-4">
              <div class="form-group">
                <label for="cover">Book Cover</label>
                <input
                  type="file"
                  name="cover"
                  id="cover"
                  class="form-control-file"
                  ref="cover"
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4">
              <div class="form-group mt-3">
                <button class="btn btn-success px-5" ref="submitBtn">
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { addBtnLoading, removeBtnLoading } from "@services/helpers";
import Book from "@services/api/book";
import Swal from "sweetalert2";

export default {
  name: "BooksAdd",
  data() {
    return {
      title: "",
      description: "",
    };
  },
  methods: {
    addBook(e) {
      const form = e.target;
      const btn = this.$refs.submitBtn;
      const formMsg = this.$refs.formMsg;

      addBtnLoading(btn);
      const formData = new FormData();
      const cover = this.$refs.cover;
      const file = this.$refs.file;

      formData.append("title", this.title);
      formData.append("description", this.description);
      formData.append("file", file.files[0]);

      if (cover.files.length) {
        formData.append("cover", cover.files[0]);
      }

      Book.store(formData)
        .then((response) => {
          removeBtnLoading(btn);
          const res = response.data;
          Swal.fire("Success", res.message, "success");

          this.$router.push({ name: "Books" });
        })
        .catch((err) => {
          const { status, data } = err.response;
          let errorBag = "";

          if (status === 400) {
            removeBtnLoading(btn);
            data.errors.forEach(
              (error) => (errorBag += `<span class="d-block">${error}</span>`)
            );
          } else {
            errorBag += data.message;
          }

          formMsg.innerHTML = `<div class="alert alert-danger">${errorBag}</div>`;
        });
    },
  },
};
</script>
