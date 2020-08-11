<template>
  <div>
    <div class="card min-height-500">
      <div class="card-body">
        <div class="d-flex">
          <p class="mb-3">NB: Fields marked * are required</p>

          <div class="ml-auto">
            <button
              class="btn btn-primary"
              type="button"
              @click="addMoreRecords"
            >
              Add More Records
            </button>
          </div>
        </div>

        <div class="form-msg" ref="formMsg"></div>

        <form @submit.prevent="updateFamily">
          <div class="row mt-4">
            <div class="col-md-6">
              <div class="form-group">
                <label for="amount">Name *</label>
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
            <div
              class="row border ml-2 py-4 px-3 col-md-6 mt-4"
              v-for="(family, i) in families"
              :key="i"
            >
              <div class="col-md-6">
                <div class="form-group">
                  <label for="leader">Add Member</label>
                  <Dropdown
                    v-model="family.id"
                    :options="members"
                    :filter="true"
                    optionValue="id"
                    optionLabel="name"
                    placeholder="Select Member"
                    class="form-control"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <!--  -->
                  <div class="d-flex">
                    <label for="relation">Relation</label>
                    <button
                      style="margin-top: -8px;"
                      class="btn btn-danger btn-icon-28 ml-auto"
                      type="button"
                      @click="RemoveRecord"
                      v-if="families.length > 1 && i !== 0"
                      v-tooltip.top="'Remove'"
                    >
                      <i class="pi pi-trash"></i>
                    </button>
                  </div>
                  <select
                    name="relation"
                    id="relation"
                    class="form-control"
                    v-model.trim="family.relation"
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
import Member from "@services/api/people";
import Family from "@services/api/family";
import Swal from "sweetalert2";
import Dropdown from "primevue/dropdown";

export default {
  name: "FamilyEdit",
  components: {
    Dropdown,
  },
  data() {
    return {
      name: "",
      families: [
        {
          id: "",
          relation: "",
        },
      ],
      members: [],
      mask: "",
    };
  },
  methods: {
    async updateFamily(e) {
      const btn = this.$refs.submitBtn;
      const formMsg = this.$refs.formMsg;

      try {
        addBtnLoading(btn);
        const formData = {
          name: this.name,
          people: this.families,
        };
        const response = await Family.update(formData, this.mask);
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

    //set data
    setData(family) {
      const { data } = family[1].data;
      this.members = family[0].data.data;
      this.name = data.name;
      this.families = data.people;
      this.mask = data.mask;
    },
    addMoreRecords() {
      this.families.push({
        id: "",
        relation: "",
      });
    },
    RemoveRecord() {
      this.families.pop();
    },
  },

  async beforeRouteEnter(to, from, next) {
    try {
      const mask = to.params.mask;
      if (!mask) {
        next({ name: "Home" });
      }
      const response = await Promise.all([Member.members(), Family.show(mask)]);
      next((vm) => vm.setData(response));
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
