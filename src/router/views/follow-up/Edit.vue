<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-md-8 offset-md-2">
            <div class="formMsg" ref="formMsg"></div>

            <ValidationObserver ref="validationObserver">
              <form @submit.prevent="updateFollowUp">
                <div class="row">
                  <div class="col-md-6">
                    <ValidationProvider
                      name="People field"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <div class="form-group">
                        <label for="people" class="d-block">
                          People
                          <span class="text-danger">*</span>
                        </label>
                        <Dropdown
                          v-model="form.people"
                          :options="people"
                          optionLabel="name"
                          optionValue="id"
                          class="form-control"
                          disabled
                        />
                        <span class="text-danger d-block">{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </div>

                  <div class="col-md-6">
                    <ValidationProvider
                      name="Assigned to"
                      rules="required"
                      v-slot="{ errors }"
                    >
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
                        />
                        <span class="text-danger d-block">{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </div>

                  <div class="col-md-6">
                    <ValidationProvider
                      name="Follow-up date"
                      rules="required"
                      v-slot="{ errors }"
                    >
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
                        />
                        <span class="text-danger d-block">{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
                      <label for class="d-block">
                        Follow-up Type
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
                        <label class="custom-control-label" for="done"
                          >Done</label
                        >
                      </div>

                      <div class v-if="form.completed">
                        <keep-alive>
                          <ValidationProvider
                            name="Completion date"
                            rules="required"
                            v-slot="{ errors }"
                          >
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
                              />
                              <span class="text-danger d-block">{{
                                errors[0]
                              }}</span>
                            </div>
                          </ValidationProvider>
                        </keep-alive>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-12">
                    <ValidationProvider
                      name="Comments"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <div class="form-group">
                        <label for="comment">
                          Comment
                          <span class="text-danger">*</span>
                        </label>
                        <textarea
                          name="comment"
                          id="comment"
                          cols="30"
                          rows="5"
                          class="form-control"
                          v-model="form.comment"
                        ></textarea>
                        <span class="text-danger d-block">{{ errors[0] }}</span>
                      </div>
                    </ValidationProvider>
                  </div>

                  <div class="col-md-12">
                    <div class="text-center">
                      <button
                        class="btn btn-success px-5"
                        type="submit"
                        ref="submitBtn"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { addBtnLoading, removeBtnloading } from "@services/helpers";
import Dropdown from "primevue/dropdown";
import FollowUp from "@services/api/followup";
import People from "@services/api/people";
import Users from "@services/api/user";
import DatePicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.min.css";

export default {
  name: "EditFollowUp",
  components: {
    Dropdown,
    DatePicker,
  },
  data() {
    return {
      people: [],
      users: [],
      form: {
        people: null,
        assigned_to: null,
        date: null,
        completion_date: null,
        type: null,
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
        allowInput: true,
      },
      mask: "",
    };
  },
  methods: {
    setData(response) {
      const { data: followUp } = response[0].data;
      const { data: peopleRes } = response[1].data;
      const { data: usersRes } = response[2].data;

      // console.table(followUp);

      this.mask = followUp.mask;
      this.form.people = followUp.person_id;
      this.form.assigned_to = followUp.user_id;
      this.form.date = followUp.date;
      this.form.comment = followUp.comment;
      this.form.type = followUp.type;
      this.form.completed = followUp.completed ? true : false;
      this.form.completion_date = followUp.completion_date
        ? followUp.completion_date
        : null;
      //this.form.type = followUp.type;
      // this.form.people = followUp.id;
      // this.form.people = followUp.id;
      // this.form.people = followUp.id;

      this.people = peopleRes.map((person) => ({
        id: person.id,
        name: person.name,
      }));

      this.users = usersRes.map((user) => ({
        id: user.id,
        name: user.name,
      }));
    },

    updateFollowUp(e) {
      this.$refs.validationObserver.validate().then((result) => {
        if (result) {
          const btn = this.$refs.submitBtn;
          const formMsg = this.$refs.formMsg;

          formMsg.innerHTML = "";
          addBtnLoading(btn);

          FollowUp.update(this.form, this.mask)
            .then(({ data: res }) => {
              Swal.fire("Success", res.message, "success");
              this.$router.push({ name: "FollowUp" });
            })
            .catch((err) => {
              removeBtnLoading(btn);
              const { status, data } = err.response;
              let errorBag = "";

              if (status === 422) {
                Object.values(data.errors).map((error) => {
                  errorBag += `<span class="d-block">${error}</span>`;
                });
              } else {
                errorBag += `<span class="d-block">${data.message}</span>`;
              }

              formMsg.innerHTML = `<div class="alert alert-danger">${errorBag}</div>`;
            });
        }
      });
    },
  },
  async beforeRouteEnter(to, from, next) {
    try {
      const mask = to.params.mask;
      if (!mask) {
        next({ name: "Home" });
      }
      const response = await Promise.all([
        FollowUp.show(mask),
        People.members(),
        Users.all(),
      ]);
      next((vm) => vm.setData(response));
    } catch (error) {
      console.log(error);
    }
    // next((vm) => {
    //   vm.setData();
    //   next();
    // });
  },
};
</script>
