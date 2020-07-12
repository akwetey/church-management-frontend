<template>
  <div>
    <div class="card min-height-500">
      <div class="card-body">
        <p class="mb-3">NB: Fields marked * are required</p>

        <div class="form-msg" ref="formMsg"></div>

        <form @submit.prevent="updateUser">
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
                <label for="email">Email *</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  class="form-control"
                  v-model.trim="email"
                  required
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="telephone_number">Mobile Phone </label>
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
                <label for="role">Role *</label>
                <select
                  name="role"
                  id="role"
                  v-model.trim="role"
                  class="form-control"
                  required
                >
                  <option value="">Select</option>
                  <option
                    v-for="role in roles"
                    :value="role.id"
                    :key="role.id"
                    >{{ role.name }}</option
                  >
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="status">
                  Status *
                </label>
                <select
                  name="status"
                  id="status"
                  v-model.trim="status"
                  class="form-control"
                  required
                >
                  <option value="">Select</option>
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>
            </div>
          </div>
          <div class="text-center">
            <div class="form-group mt-5">
              <button class="btn btn-success px-5" ref="submitBtn">
                Update
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
import User from "@services/api/user";
import Role from "@services/api/roles";
import Swal from "sweetalert2";

export default {
  name: "UserEdit",
  data() {
    return {
      first_name: "",
      last_name: "",
      telephone_number: "",
      email: "",
      password: "",
      password_confirmation: "",
      auto_password: "",
      notify_user: "",
      status: "",
      role: "",
      roles: [],
      mask: "",
    };
  },
  methods: {
    async updateUser(e) {
      const btn = this.$refs.submitBtn;
      const formMsg = this.$refs.formMsg;
      try {
        addBtnLoading(btn);
        const formData = {
          first_name: this.first_name,
          last_name: this.last_name,
          telephone: this.telephone_number,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
          role: this.role,
          auto_password: this.auto_password,
          notify_user: this.notify_user,
          status: this.status,
        };
        const response = await User.update(formData, this.mask);
        const res = response.data;
        removeBtnLoading(btn);
        Swal.fire("Success", res.message, "success");
        this.$router.push({ name: "user" });
      } catch (err) {
        const res = err.response.data;
        let errorBag = "";
        if (res.code === 422) {
          removeBtnLoading(btn);
          const errorData = Object.values(res.errors);
          errorData.map((error) => {
            errorBag += `<span class="d-block">${error}</span>`;
          });
        } else {
          errorBag += res.message;
        }
        formMsg.innerHTML = `<div class="alert alert-danger">${errorBag}</div>`;
      }
    },

    setData(user) {
      const { data } = user[1].data;
      this.roles = user[0].data.data;
      this.first_name = data.first_name;
      this.last_name = data.last_name;
      this.telephone_number = data.telephone;
      this.email = data.email;
      this.status = data.status ? 1 : 0;
      this.role = data.role;
      this.mask = data.mask;
    },
  },

  async beforeRouteEnter(to, from, next) {
    try {
      const mask = to.params.mask;
      if (!mask) {
        next({ name: "Home" });
      }
      const response = await Promise.all([Role.all(), User.show(mask)]);
      next((vm) => vm.setData(response));
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
