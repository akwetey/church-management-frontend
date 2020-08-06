<template>
  <div>
    <div class="card min-height-500">
      <div class="card-body">
        <p class="mb-3">NB: Fields marked * are required</p>

        <div class="form-msg" ref="formMsg"></div>

        <form @submit.prevent="addFamily">
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
                <label for="leader">Add Member</label>
                <MultiSelect
                  v-model="member"
                  :options="members"
                  :filter="true"
                  optionValue="id"
                  optionLabel="name"
                  placeholder="Select Group"
                  class="form-control"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="relation">Relation</label>
                <select
                  name="relation"
                  id="relation"
                  class="form-control"
                  v-model.trim="relation"
                >
                  <option value=""> Select</option>
                  <option value="Head">Head</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Children">Children</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Grand Parent">Grand Parent</option>
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
import Member from "@services/api/people";
import Family from "@services/api/family";
import Swal from "sweetalert2";
import MultiSelect from "primevue/multiselect";

export default {
  name: "FamilyAdd",
  components: {
    MultiSelect,
  },
  data() {
    return {
      name: "",
      relation: "",
      member: [],
      members: [],
    };
  },
  methods: {
    async addFamily(e) {
      const btn = this.$refs.submitBtn;
      const formMsg = this.$refs.formMsg;
      const relationData = [];
      this.member.forEach((el) => {
        const obj = {};
        (obj.id = el), (obj.relation = this.relation);
        relationData.push(obj);
      });
      // console.log(relationData);
      try {
        addBtnLoading(btn);
        const formData = {
          name: this.name,
          people: relationData,
        };
        const response = await Family.store(formData);
        const res = response.data;
        removeBtnLoading(btn);
        Swal.fire("Success", res.message, "success");
        this.$router.push({ name: "family" });
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
        this.members = res.data;
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
