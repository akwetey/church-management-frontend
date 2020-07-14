<template>
  <div>
    <div class="card min-height-500">
      <div class="card-body">
        <p class="mb-3">NB: Fields marked * are required</p>

        <div class="form-msg" ref="formMsg"></div>

        <form @submit.prevent="addRole">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="name">Role Name *</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  class="form-control"
                  required
                  v-model.trim="name"
                />
              </div>
            </div>
            <div class="col-md-6">
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
            <div class="col-md-12 text-center mb-5">
              <h5>Role Permissions</h5>
            </div>
            <div
              v-for="permission in permissions"
              class="col-md-6"
              :key="permission.id"
            >
              <h6 class="border-bottom">{{ permission.module }}</h6>
            </div>
          </div>

          <!-- {{ permission }} -->
          <!-- <div :key="permission.id" class="border-bottom">
                    <h6>{{ permission.module }}</h6>
                  </div> -->

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
  name: "AddRole",
  data() {
    return {
      name: "",
      description: "",
      permissions: [],
      mask: "",
    };
  },
  methods: {
    async addRole(e) {
      const btn = this.$refs.submitBtn;
      const formMsg = this.$refs.formMsg;
      try {
        addBtnLoading(btn);
        const formData = {
          name: this.name,
          description: this.description,
          permissions: this.permissions,
        };
        const response = await Role.store(formData);
        const res = response.data;
        removeBtnLoading(btn);
        Swal.fire("Success", res.message, "success");
        this.$router.push({ name: "role" });
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

    setData(data) {
      this.permissions = data.data;
    },
  },

  async beforeRouteEnter(to, from, next) {
    try {
      //   const mask = to.params.mask;
      //   if (!mask) {
      //     next({ name: "Home" });
      //   }
      const response = await Role.rolepermissions();
      next((vm) => vm.setData(response.data));
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
