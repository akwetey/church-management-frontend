<template>
  <div>
    <div class="card min-height-500">
      <div class="card-body">
        <p class="mb-3">NB: Fields marked * are required</p>

        <div class="form-msg" ref="formMsg"></div>

        <form @submit.prevent="updateRole">
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
                  name="description"
                  id="description"
                  class="form-control"
                  v-model.trim="description"
                />
              </div>
            </div>
            <div class="col-md-12 mt-3 mb-3">
              <h6>Role Permissions</h6>
            </div>
            <div v-for="permission in permissions" class="col-md-6 mb-3" :key="permission.id">
              <h6 class="text-muted mt-3">{{ permission.module }}</h6>
              <hr />
              <div
                v-for="permission in permission.permissions"
                :key="permission.id"
                class="mb-0 form-check-inline custom-control custom-checkbox"
                style="display:inline-flex;"
              >
                <input
                  type="checkbox"
                  class="custom-control-input"
                  :value="permission.id"
                  :id="permission.id"
                  v-model="checkedPermissions"
                />
                <label
                  class="custom-control-label text-muted"
                  style="font-size:15px; font-weight: 600;"
                  :for="permission.id"
                >{{ permission.name }}</label>
              </div>
            </div>
          </div>

          <!-- <span>Checked names: {{ checkedPermissions }}</span> -->

          <div class="text-center">
            <div class="form-group mt-5">
              <button class="btn btn-success px-5" ref="submitBtn">Update</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { addBtnLoading, removeBtnLoading } from "@services/helpers";
import Role from "@services/api/roles";
import Swal from "sweetalert2";

export default {
  name: "EditRole",
  data() {
    return {
      name: "",
      description: "",
      permissions: [],
      checkedPermissions: [],
      mask: ""
    };
  },
  methods: {
    async updateRole(e) {
      const btn = this.$refs.submitBtn;
      const formMsg = this.$refs.formMsg;
      try {
        const checked = document.querySelectorAll(
          "input[type=checkbox]:checked"
        ).length;

        if (!checked) {
          Swal.fire("", "You must check at least one checkbox.", "error");
          return false;
        }
        addBtnLoading(btn);
        const formData = {
          name: this.name,
          description: this.description,
          permissions: this.checkedPermissions
        };
        const response = await Role.update(formData, this.mask);
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
          errorData.map(error => {
            errorBag += `<span class="d-block">${error}</span>`;
          });
        } else {
          errorBag += res.message;
        }
        formMsg.innerHTML = `<div class="alert alert-danger">${errorBag}</div>`;
      }
    },

    setData(role) {
      // console.log(role);
      const { data } = role[1].data;
      this.permissions = role[0].data.data;
      this.name = data.name;
      this.description = data.description;
      this.checkedPermissions = data.permissions;
      this.mask = data.mask;
    }
  },

  async beforeRouteEnter(to, from, next) {
    try {
      const mask = to.params.mask;
      if (!mask) {
        next({ name: "Home" });
      }

      const response = await Promise.all([
        Role.rolepermissions(),
        Role.show(mask)
      ]);
      next(vm => vm.setData(response));
    } catch (error) {
      console.log(error);
    }
  }
};
</script>
