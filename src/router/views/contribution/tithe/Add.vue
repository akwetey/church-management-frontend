<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="d-flex mb-4">
          <p class="mb-3">NB: Fields marked * are required</p>

          <div class="ml-auto">
            <button class="btn btn-primary" type="button" @click="addMoreRecords">Add More Records</button>
          </div>
        </div>

        <form @submit.prevent="submitForm">
          <div class="row">
            <div class="col-md-6" v-for="(tithe, i) in tithes" :key="i">
              <div class="border py-3 px-3">
                <div class="row">
                  <div class="col-md-6">
                    <label>Person *</label>
                    <Dropdown
                      class="form-control"
                      v-model="tithe.person"
                      :options="people"
                      optionLabel="name"
                      optionValue="id"
                      :filter="true"
                      placeholder
                    ></Dropdown>
                  </div>
                  <div class="col-md-6"></div>
                  <div class="col-md-6"></div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { addBtnLoading, removeBtnLoading } from "@services/helpers";
import People from "@services/api/people";
import Swal from "sweetalert2";
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";

export default {
  name: "TitheAdd",
  components: {
    Dropdown,
    Calendar,
  },
  data() {
    return {
      people: [],
      tithes: [
        {
          amount: "",
          date: "",
          frequency: "",
          person: "",
          comment: "",
        },
      ],
    };
  },
  computed: {
    defaultAvatar() {
      return this.$store.getters.defaultAvatar;
    },
  },
  methods: {
    getMembers() {
      People.members()
        .then((response) => {
          const { data } = response.data;
          this.people = data;
        })
        .catch((err) => console.log(err));
    },

    addMoreRecords() {},

    submitForm() {},
  },

  created() {
    this.getMembers();
  },
};
</script>
