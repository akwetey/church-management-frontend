<template>
  <div class="row">
    <div class="col-md-6">
      <!-- Avatar -->
      <div class="mb-3">
        <div class="text-center">
          <div class="avatar avatar-xxl">
            <img
              class="avatar-img img-thumbnail rounded-circle"
              :src="person.avatar || defaultAvatar"
              alt
            />
          </div>
        </div>
      </div>

      <!-- Name and d.o.b -->
      <div class="mb-3">
        <div class="card shadow-sm mb-4">
          <div class="card-body">
            <div class="form-group mb-4">
              <label for class="d-block font-weight-bold">Full Name</label>
              <p>{{ person.first_name }} {{ person.middle_name }} {{ person.last_name }}</p>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6 mb-4">
                <label class="d-block font-weight-bold">
                  Birthdate
                  <span
                    class="font-weight-normal"
                    v-if="person.age"
                  >({{ person.age }} years old)</span>
                </label>
                <p>{{ person.date_of_birth || "----" }}</p>
                <p></p>
              </div>
              <div class="form-group col-md-6 mb-4">
                <label class="d-block font-weight-bold">Gender</label>
                <p>{{ person.gender || "----" }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="card shadow-sm mb-4">
          <div class="card-body">
            <div class="form-row">
              <div class="form-group col-md-6 mb-4">
                <label class="d-block font-weight-bold">Grade</label>
                <p>{{ person.grade || "----" }}</p>
              </div>

              <div class="form-group col-md-6 mb-4">
                <label class="d-block font-weight-bold">Occupation</label>
                <p>{{ person.occupation || "----" }}</p>
              </div>

              <div class="form-group col-md-6 mb-4">
                <label class="d-block font-weight-bold">Employer</label>
                <p>{{ person.employer || "----" }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="card shadow-sm mb-4">
          <div class="card-body">
            <div class="form-row">
              <div class="form-group col-md-6 mb-4">
                <label class="d-block font-weight-bold">Membership Status</label>
                <p>{{ person.member_status}}</p>
              </div>

              <div class="form-group col-md-6 mb-4">
                <label class="d-block font-weight-bold">Join Date</label>
                <p>{{ person.join_date || "----" }}</p>
              </div>

              <div class="form-group col-md-6 mb-4">
                <label class="d-block font-weight-bold">Baptised</label>
                <p>{{ person.baptism_date ? "Yes": "No" }}</p>
              </div>

              <div class="form-group col-md-6 mb-4">
                <label class="d-block font-weight-bold">Baptism Date</label>
                <p>{{ person.baptism_date || "----" }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-6">
      <div class="mb-3">
        <div class="card shadow-sm mb-4">
          <div class="card-body">
            <div class="form-row">
              <div class="form-group col-md-6 mb-4">
                <label class="d-block font-weight-bold">Primary Telephone</label>
                <p>{{ person.primary_telephone || "----" }}</p>
                <p></p>
              </div>

              <div class="form-group col-md-6 mb-4">
                <label class="d-block font-weight-bold">Secondary Telephone</label>
                <p>{{ person.secondary_telephone || "----" }}</p>
                <p></p>
              </div>

              <div class="form-group col-md-6 mb-4">
                <label class="d-block font-weight-bold">Email</label>
                <p>{{ person.email || "----" }}</p>
                <p></p>
              </div>

              <div class="form-group col-md-6 mb-4">
                <label class="d-block font-weight-bold">Physical Address</label>
                <p>{{ person.physical_address || "----" }}</p>
                <p></p>
              </div>
            </div>
          </div>
        </div>

        <div class="card shadow-sm mb-4">
          <div class="card-body">
            <div class="form-group">
              <label class="d-block font-weight-bold">Groups</label>

              <ul class="list-inline">
                <li class="list-inline-item" v-for=" (group, i) in person.groups" :key="i">
                  <span class="badge badge-pill badge-light px-3">{{ group.name }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="card shadow-sm mb-4">
          <div class="card-body">
            <div class="form-row">
              <div class="form-group col-md-6 mb-4">
                <label class="d-block font-weight-bold">Marital Status</label>
                <p>{{ person.marital_status || "----" }}</p>
              </div>
            </div>

            <label class="d-block font-weight-bold">Family</label>
            <template v-if="person.family">
              <ul class="list-unstyled">
                <li v-for="(member, i) in person.family" :key="i">
                  <div class="d-flex">
                    <div class="pr-2 avatar avatar-xl">
                      <img class="avatar-img" :src="member.avatar || defaultAvatar" alt />
                    </div>

                    <div class="d-flex flex-column justify-content-center">
                      <div class>
                        <p>
                          <router-link
                            :to="{name: 'PersonDetail', params: { mask: member.mask } }"
                            v-slot="{href}"
                          >
                            <a :href="href">{{ member.name }}</a>
                          </router-link>
                        </p>
                      </div>
                      <div>
                        <small>{{ member.relation }}</small>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </template>
            <template v-else>----</template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["person"],
  computed: {
    defaultAvatar() {
      return this.$store.getters.defaultAvatar;
    },
  },
};
</script>
