<template>
  <div>
    <div class="card min-height-500">
      <div class="card-body">
        <p class="mb-3">NB: Fields marked * are required</p>

        <div class="form-msg" ref="formMsg"></div>

        <form @submit.prevent="updateGroup">
          <div class="row mt-3">
            <div
              class="col-md-6 mb-4"
              v-for="(contribution, i) in contributions"
              :key="i"
            >
              <div class="row border mr-2 py-4 px-3">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="amount">Amount *</label>
                    <input
                      type="number"
                      :name="`amount-${i}`"
                      min="0"
                      :id="`amount-${i}`"
                      class="form-control"
                      required
                      v-model.trim="contribution.amount"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <div class="d-flex">
                      <label for="date">Date *</label>
                      <button
                        style="margin-top: -8px;"
                        class="btn btn-danger btn-icon-28 ml-auto"
                        type="button"
                        @click="RemoveRecord"
                        v-if="contributions.length > 1 && i !== 0"
                        v-tooltip.top="'Remove'"
                      >
                        <i class="pi pi-trash"></i>
                      </button>
                    </div>
                    <flat-pickr
                      v-model="contribution.date"
                      placeholder="Select Date"
                      :name="`date-${i}`"
                      :id="`date-${i}`"
                      class="form-control bg-white"
                    ></flat-pickr>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="person">Person *</label>
                    <Dropdown
                      v-model="contribution.person"
                      :options="members"
                      :filter="true"
                      optionLabel="name"
                      optionValue="id"
                      placeholder="Select Person"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="person">Group *</label>
                    <Dropdown
                      v-model="contribution.group"
                      :options="groups"
                      :filter="true"
                      optionLabel="name"
                      optionValue="id"
                      placeholder="Select Group"
                      class="form-control"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="comment">Comment</label>
                    <input
                      type="text"
                      :name="`comment-${i}`"
                      :id="`comment-${i}`"
                      class="form-control"
                      v-model="contribution.comment"
                    />
                  </div>
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
import Contribution from "@services/api/contribution";
import Group from "@services/api/groups";
import Swal from "sweetalert2";
import Dropdown from "primevue/dropdown";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
  name: "GroupEdit",
  components: {
    Dropdown,
    flatPickr,
  },
  data() {
    return {
      amount: "",
      comment: "",
      date: "",
      member: "",
      group: "",
      members: [],
      groups: [],
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
          amount: this.amount,
          comment: this.comment,
          date: this.date,
          person: this.member,
          group: this.group,
        };
        const response = await Contribution.groupUpdate(formData, this.mask);
        const res = response.data;
        removeBtnLoading(btn);
        Swal.fire("Success", res.message, "success");
        this.$router.push({ name: "Contributions" });
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
    setData(convenant) {
      const { data } = convenant[2].data;
      this.members = convenant[0].data.data;
      this.groups = convenant[1].data.data;
      this.amount = data.amount;
      this.member = data.person.id;
      this.date = data.date;
      this.comment = data.comment;
      this.mask = data.mask;
    },
  },

  async beforeRouteEnter(to, from, next) {
    try {
      const mask = to.params.mask;
      if (!mask) {
        next({ name: "Home" });
      }

      const response = await Promise.all([
        Member.members(),
        Group.all(),
        Contribution.groupShow(mask),
      ]);
      next((vm) => vm.setData(response));
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
