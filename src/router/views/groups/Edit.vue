<template>
  <div>
    <div class="card min-height-500">
      <div class="card-body">
        <p class="mb-3">NB: Fields marked * are required</p>

        <div class="form-msg" ref="formMsg"></div>

        <form @submit.prevent="updateGroup">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="name">Name *</label>
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
                <textarea
                  name="description"
                  id="description"
                  class="form-control"
                  v-model.trim="description"
                ></textarea>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="leader">Leader</label>
                <select
                  name="leader"
                  id="leader"
                  v-model.trim="leader"
                  class="form-control"
                >
                  <option value="">Select</option>
                  <!-- <option
                    v-for="role in roles"
                    :value="role.id"
                    :key="role.id"
                    >{{ role.name }}</option
                  > -->
                </select>
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
//import User from "@services/api/user";
import Group from "@services/api/groups";
import Swal from "sweetalert2";

export default {
  name: "groupEdit",
  data() {
    return {
      name: "",
      description: "",
      leader: "",
      leaders: [],
      mask: "",
    };
  },
  methods: {
    async updateGroup(e) {
      const btn = this.$refs.submitBtn;
      const formMsg = this.$refs.formMsg;
      try {
        addBtnLoading(btn);
        const formData = {
          name: this.name,
          description: this.description,
          leader: this.leader,
        };
        const response = await Group.update(formData, this.mask);
        const res = response.data;
        removeBtnLoading(btn);
        Swal.fire("Success", res.message, "success");
        this.$router.push({ name: "groups" });
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
      // console.log(data);
      // const { data } = user[1].data;
      // this.leaders = user[0].data.data;
      this.name = data.name;
      this.description = data.description;
      this.leader = data.leader;
      this.mask = data.mask;
    },
  },

  async beforeRouteEnter(to, from, next) {
    try {
      const mask = to.params.mask;
      if (!mask) {
        next({ name: "Home" });
      }
      // const response = await Promise.all([Role.all(), User.show(mask)]);
      const response = await Group.show(mask);
      const res = response.data;
      next((vm) => vm.setData(res.data));
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
