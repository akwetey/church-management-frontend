<template>
  <div>
    <div class="card min-height-500">
      <div class="card-body">
        <p class="mb-3">NB: Fields marked * are required</p>

        <div class="form-msg" ref="formMsg"></div>

        <form @submit.prevent="addPerson">
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
                <label for="middle_name">Middle Name </label>
                <input
                  type="text"
                  name="middle_name"
                  id="middle_name"
                  class="form-control"
                  v-model.trim="middle_name"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="date_of_birth">Date of Birth </label>
                <flat-pickr
                  v-model="date_of_birth"
                  :config="config"
                  placeholder="Select Date"
                  name="date_of_birth"
                  id="date_of_birth"
                  class="form-control bg-white"
                ></flat-pickr>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="email">Email </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  class="form-control"
                  v-model.trim="email"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="gender">
                  Gender
                </label>
                <select
                  name="gender"
                  id="gender"
                  v-model.trim="gender"
                  class="form-control"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="grade">
                  Grade
                </label>
                <select
                  name="grade"
                  id="grade"
                  v-model.trim="grade"
                  class="form-control"
                >
                  <option value="">Select</option>
                  <option value="Primary">Primary</option>
                  <option value="Junior High">Junior High</option>
                  <option value="Senior High">Senior High</option>
                  <option value="College">College</option>
                  <option value="None">None</option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="marital_status">
                  Marital Status
                </label>
                <select
                  name="marital_status"
                  id="marital_status"
                  v-model.trim="marital_status"
                  class="form-control"
                >
                  <option value="">Select</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Engaged">Engaged</option>
                  <option value="Divorced">Divorced</option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="baptism_date ">Baptismal Date </label>
                <flat-pickr
                  v-model="baptism_date"
                  placeholder="Select Date"
                  :config="config"
                  name="baptism_date"
                  id="baptism_date "
                  class="form-control bg-white"
                ></flat-pickr>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="join_date ">Join Date </label>
                <flat-pickr
                  v-model="join_date"
                  :config="config"
                  placeholder="Select Date"
                  name="join_date"
                  id="join_date"
                  class="form-control bg-white"
                ></flat-pickr>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="employer ">Employer </label>
                <input
                  type="text"
                  name="employer "
                  id="employer "
                  class="form-control"
                  v-model.trim="employer"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="occupation ">Occupation </label>
                <input
                  type="text"
                  name="occupation "
                  id="occupation "
                  class="form-control"
                  v-model.trim="occupation"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="primary_telephone">Primary Telephone </label>
                <input
                  type="text"
                  name="primary_telephone"
                  id="primary_telephone"
                  class="form-control"
                  v-model.trim="primary_telephone"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="secondary_telephone">Secondary Telephone </label>
                <input
                  type="text"
                  name="secondary_telephone"
                  id="secondary_telephone"
                  class="form-control"
                  v-model.trim="secondary_telephone"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="postal_address">Postal Address </label>
                <input
                  type="text"
                  name="postal_address"
                  id="postal_address"
                  class="form-control"
                  v-model.trim="postal_address"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="physical_address">Physical Address </label>
                <input
                  type="text"
                  name="physical_address"
                  id="physical_address"
                  class="form-control"
                  v-model.trim="physical_address"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="tithe_number">Tithe Number </label>
                <input
                  type="text"
                  name="tithe_number"
                  id="tithe_number"
                  class="form-control"
                  v-model.trim="tithe_number"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="role">Groups</label>
                <MultiSelect
                  v-model="group"
                  :options="groups"
                  :filter="true"
                  optionValue="id"
                  optionLabel="name"
                  placeholder="Select Group"
                  class="form-control"
                />
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
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import People from "@services/api/people";
import Group from "@services/api/groups";
import Swal from "sweetalert2";
import MultiSelect from "primevue/multiselect";

export default {
  name: "PersonAdd",
  components: {
    flatPickr,
    MultiSelect,
  },
  data() {
    return {
      first_name: "",
      last_name: "",
      middle_name: "",
      date_of_birth: "",
      email: "",
      gender: "",
      grade: "",
      marital_status: "",
      baptism_date: "",
      join_date: "",
      employer: "",
      occupation: "",
      primary_telephone: "",
      secondary_telephone: "",
      postal_address: "",
      physical_address: "",
      tithe_number: "",
      group: [],
      groups: [],
      config: {
        maxDate: new Date(),
      },
    };
  },
  methods: {
    async addPerson(e) {
      const btn = this.$refs.submitBtn;
      const formMsg = this.$refs.formMsg;
      try {
        addBtnLoading(btn);
        const formData = {
          first_name: this.first_name,
          last_name: this.last_name,
          middle_name: this.middle_name,
          date_of_birth: this.date_of_birth,
          email: this.email,
          gender: this.gender,
          grade: this.grade,
          marital_status: this.marital_status,
          baptism_date: this.baptism_date,
          join_date: this.join_date,
          employer: this.employer,
          occupation: this.occupation,
          primary_telephone: this.primary_telephone,
          secondary_telephone: this.secondary_telephone,
          postal_address: this.postal_address,
          physical_address: this.physical_address,
          tithe_number: this.tithe_number,
          groups: this.group,
        };
        const response = await People.store(formData);
        const res = response.data;
        removeBtnLoading(btn);
        Swal.fire("Success", res.message, "success");
        this.$router.push({ name: "people" });
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

    //fetch groups
    async getGroups() {
      try {
        const response = await Group.all();
        const res = response.data;
        this.groups = res.data;
      } catch (error) {
        console.log(error);
      }
    },

    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
      };
      this.groups.push(tag);
      this.group.push(tag);
      console.log(this.group, "group");
      console.log(this.groups, "groups");
    },
  },
  async created() {
    await this.getGroups();
  },
};
</script>
