<template>
  <div>
    <div class="card min-height-500">
      <div class="card-body">
        <p class="mb-3">NB: Fields marked * are required</p>

        <div class="form-msg" ref="formMsg"></div>

        <form @submit.prevent="addUser">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="first_name">First Name *</label>
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  class="form-control"
                  required
                  v-model.trim="first_name"
                />
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for="last_name">Last Name *</label>
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  class="form-control"
                  v-model.trim="last_name"
                  required
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="last_name">Mobile Phone </label>
                <input
                  type="text"
                  name="telephone_number"
                  id="telephone_number"
                  class="form-control"
                  v-model.trim="telephone_number"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="last_name">Role *</label>
                <select name="role" id="role" class="form-control">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="password">Password </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  class="form-control"
                  v-model.trim="password"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="password_confirm">Confirm Password </label>
                <input
                  type="password"
                  name="password_confirm"
                  id="password_confirm"
                  class="form-control"
                  v-model.trim="password_confirm"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="generate_password">
                  <input
                    type="checkbox"
                    name="generate_password"
                    id="generate_password"
                    v-model.trim="generate_password"
                    value="yes"
                  />
                  Generate Password
                </label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="send_notification">
                  <input
                    type="checkbox"
                    name="send_notification"
                    id="send_notification"
                    v-model.trim="send_notification"
                    value="yes"
                  />
                  Send User Notification
                </label>
              </div>
            </div>
          </div>

          <div class="text-center">
            <div class="form-group mt-5">
              <button class="btn btn-success px-5" ref="submitBtn">
                Save
              </button>
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
      first_name: "",
      last_name: "",
      telephone_number: "",
      password: "",
      password_confirm: "",
      generate_password: "",
      send_notification: "",
      role: "",
    };
  },
  methods: {
    addUser(e) {
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
