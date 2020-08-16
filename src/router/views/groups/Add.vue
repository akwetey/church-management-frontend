<template>
  <div>
    <div class="card min-height-500">
      <div class="card-body">
        <div class="row">
          <div class="col-md-8 offset-md-2">
            <p class="mb-3">NB: Fields marked * are required</p>

            <div class="form-msg" ref="formMsg"></div>

            <form @submit.prevent="addGroup">
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
                    <select name="leader" id="leader" v-model.trim="leader" class="form-control">
                      <option value>Select leader</option>
                      <option
                        v-for="leader in leaders"
                        :value="leader.id"
                        :key="leader.id"
                      >{{ leader.name }}</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="type">Group Type *</label>
                    <select name="type" id="type" v-model.trim="type" class="form-control">
                      <option v-for="type in types" :value="type.id" :key="type.id">{{ type.name }}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="text-center">
                <div class="form-group mt-5">
                  <button class="btn btn-success px-5" ref="submitBtn">Save</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addBtnLoading, removeBtnLoading } from "@services/helpers";
import Member from "@services/api/people";
import Group from "@services/api/groups";
import Swal from "sweetalert2";

export default {
  name: "UserAdd",
  data() {
    return {
      name: "",
      description: "",
      type: 4,
      leader: "",
      leaders: [],
      types: [
        { name: "Children", id: 1 },
        { name: "Men", id: 2 },
        { name: "Small Groups", id: 3 },
        { name: "Youth", id: 4 },
        { name: "Women", id: 5 },
        { name: "Workers", id: 6 },
      ],
    };
  },
  methods: {
    async addGroup(e) {
      const btn = this.$refs.submitBtn;
      const formMsg = this.$refs.formMsg;
      try {
        addBtnLoading(btn);
        const formData = {
          name: this.name,
          description: this.description,
          leader: this.leader,
          type: this.type,
        };
        const response = await Group.store(formData);
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

    //fetch members
    async getMembers() {
      try {
        const response = await Member.members();
        const res = response.data;
        this.leaders = res.data;
      } catch (error) {
        console.log(error);
      }
    },
  },

  async created() {
    await this.getMembers();
  },
};
</script>
