<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-md-8 offset-md-2">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="people" class="d-block">
                    People
                    <span class="text-danger">*</span>
                  </label>
                  <MultiSelect
                    v-model="form.people"
                    :options="people"
                    optionLabel="name"
                    optionValue="id"
                    filter
                    class="form-control"
                    required
                  />
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label for="assigned_to" class="d-block">
                    Assigned To
                    <span class="text-danger">*</span>
                  </label>
                  <Dropdown
                    v-model="form.assigned_to"
                    :options="users"
                    optionLabel="name"
                    optionValue="id"
                    class="form-control"
                    filter
                    required
                  />
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label for="date" class="d-block">
                    Follow-Up Date
                    <span class="text-danger">*</span>
                  </label>
                  <DatePicker
                    id="date"
                    v-model="form.date"
                    class="form-control bg-white"
                    placeholder="Select date"
                    :config="dateConfig"
                    required
                  />
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label for class="d-block">
                    Visit Type
                    <span class="text-danger">*</span>
                  </label>
                  <Dropdown
                    v-model="form.type"
                    :options="visitTypes"
                    optionLabel="name"
                    optionValue="id"
                    class="form-control"
                    required
                  />
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="done"
                      v-model="form.completed"
                    />
                    <label class="custom-control-label" for="done">Done</label>
                  </div>

                  <div class v-if="form.completed">
                    <div class="form-group">
                      <label for>
                        Completion Date
                        <span class="text-danger">*</span>
                      </label>
                      <DatePicker
                        id="completion_date"
                        v-model="form.completion_date"
                        class="form-control bg-white"
                        placeholder="Select date"
                        :config="dateConfig"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-12">
                <div class="form-group">
                  <label for="comment">Comment</label>
                  <textarea
                    name="comment"
                    id="comment"
                    cols="30"
                    rows="5"
                    class="form-control"
                    v-model="form.comment"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MultiSelect from "primevue/multiselect";
import Dropdown from "primevue/dropdown";
import FollowUp from "@services/api/followup";
import People from "@services/api/people";
import Users from "@services/api/user";
import DatePicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.min.css";

export default {
  name: "AddFollowUp",
  components: {
    MultiSelect,
    Dropdown,
    DatePicker,
  },
  data() {
    return {
      people: [],
      users: [],
      form: {
        people: [],
        assigned_to: null,
        date: null,
        completion_date: null,
        type: 1,
        completed: false,
        comment: "",
      },
      visitTypes: [
        {
          id: 1,
          name: "Visit",
        },
        {
          id: 2,
          name: "Phone",
        },
        {
          id: 3,
          name: "Message",
        },
      ],
      dateConfig: {
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "Y-m-d",
      },
    };
  },
  methods: {
    async setData() {
      const peopleResponse = await People.members();
      const usersReponse = await Users.all();
      const peopleRes = await peopleResponse.data;
      const usersRes = await usersReponse.data;

      this.people = peopleRes.data.map((person) => ({
        id: person.id,
        name: person.name,
      }));

      this.users = usersRes.data.map((user) => ({
        id: user.id,
        name: user.name,
      }));
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.setData();
      next();
    });
  },
};
</script>
