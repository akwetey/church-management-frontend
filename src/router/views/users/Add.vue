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
            <div class="col-md-6">
              <div class="form-group">
                <label for="password">Password </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  class="form-control"
                  v-model.trim="password"
                  ref="password"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="password_confirmation">Confirm Password </label>
                <input
                  type="password"
                  name="password_confirmation"
                  id="password_confirmation"
                  class="form-control"
                  v-model.trim="password_confirmation"
                  ref="password_confirmation"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="auto_password">
                  <input
                    type="checkbox"
                    name="auto_password"
                    id="auto_password"
                    v-model.trim="auto_password"
                    @change="generatePassword"
                    ref="auto_password"
                  />
                  Generate Password
                </label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="notify_user">
                  <input
                    type="checkbox"
                    name="notify_user"
                    id="notify_user"
                    v-model.trim="notify_user"
                    ref="notify_user"
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
import User from "@services/api/user";
import Role from "@services/api/roles";
import Swal from "sweetalert2";

export default {
  name: "UserAdd",
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
    };
  },
  methods: {
    async addUser(e) {
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
        const response = await User.store(formData);
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

    //fetch roles
    async getRoles() {
      try {
        const response = await Role.all();
        const res = response.data;
        this.roles = res.data;
      } catch (error) {
        console.log(error);
      }
    },

    generatePassword(e) {
      const isChecked = this.auto_password;
      //console.log(isChecked);
      if (isChecked) {
        this.$refs.password.disabled = true;
        this.$refs.password_confirmation.disabled = true;
        this.$refs.notify_user.disabled = true;
        this.$refs.notify_user.checked = true;
        this.notify_user = true;
        this.$refs.password.style.backgroundColor = "#e9ecef";
        this.$refs.password_confirmation.style.backgroundColor = "#e9ecef";
        this.password = "Password";
        this.password_confirmation = "Password";
      } else {
        this.$refs.notify_user.checked = false;
        this.notify_user = "";
        this.$refs.notify_user.disabled = false;
        this.$refs.password.disabled = false;
        this.$refs.password_confirmation.disabled = false;
        this.$refs.password.style.backgroundColor = "";
        this.$refs.password_confirmation.style.backgroundColor = "";
        this.password = "";
        this.password_confirmation = "";
      }
    },
  },

  async created() {
    await this.getRoles();
  },
};
</script>
