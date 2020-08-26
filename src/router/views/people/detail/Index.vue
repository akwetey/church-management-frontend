<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-md-10 offset-md-1">
            <TabView @tab-change="tabChanged" class="customer-profile-tab position-relative">
              <TabPanel data-section="details" :active.sync="tab.active[0]">
                <template slot="header">
                  <i class="pi pi-user pr-2"></i>
                  <span>Details</span>
                </template>

                <Personal :person="person" />
              </TabPanel>

              <TabPanel data-section="attendance" :active.sync="tab.active[1]">
                <template slot="header">
                  <i class="pi pi-calendar pr-2"></i>
                  <span>Attendance</span>
                </template>

                <Attendance v-if="tab.section.includes('attendance')" />
              </TabPanel>

              <TabPanel data-section="contributions" :active.sync="tab.active[2]">
                <template slot="header">
                  <i class="pi pi-money-bill pr-2"></i>
                  <span>Contributions</span>
                </template>

                <Contribution v-if="tab.section.includes('contributions')" />
              </TabPanel>

              <TabPanel data-section="follow-up" :active.sync="tab.active[3]">
                <template slot="header">
                  <i class="pi pi-mobile pr-2"></i>
                  <span>Follow Up</span>
                </template>

                <FollowUp v-if="tab.section.includes('follow-up')" />
              </TabPanel>
            </TabView>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import People from "@services/api/people";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Personal from "./Personal";
import Attendance from "./Attendance";
import FollowUp from "./FollowUp";
import Contribution from "./Contribution";

export default {
  name: "Detail",
  components: {
    TabView,
    TabPanel,
    Personal,
    Attendance,
    FollowUp,
    Contribution,
  },
  data() {
    return {
      person: {},
      tab: {
        active: [true, false, false, false],
        section: "",
      },
      path: "",
    };
  },
  methods: {
    setData(payload) {
      this.person = payload.data;
    },

    tabChanged({ originalEvent, tab }) {
      const section = tab.$el.dataset.section;
      this.tab.section = section;
      this.addParamsToLocation({ section }, this.path);
    },

    setTabSection() {
      const section = this.$route.query.section || "";
      this.path = this.$route.path;

      switch (section.toLowerCase()) {
        case "attendance":
          this.tab.active = [false, true, false, false];
          this.tab.section = "attendance";
          break;

        case "contributions":
          this.tab.active = [false, false, true, false];
          this.tab.section = "contributions";
          break;

        case "follow-up":
          this.tab.active = [false, false, false, true];
          this.tab.section = "follow-up";
          break;

        default:
          this.tab.active = [true, false, false, false];
          this.tab.section = "details";
          break;
      }
    },
    addParamsToLocation(params, path) {
      history.pushState(
        {},
        null,
        path +
          "?" +
          Object.keys(params)
            .map((key) => {
              return (
                encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
              );
            })
            .join("&")
      );
    },
  },
  created() {
    this.setTabSection();
  },

  // async beforeRouteUpdate(to, from, next) {
  //   const mask = this.$route.params.mask;
  //   const response = await People.person.details(mask);
  //   const res = response.data;

  //   this.setData(res);
  //   next();
  // },

  async beforeRouteEnter(to, from, next) {
    const mask = to.params.mask;
    const response = await People.person.details(mask);
    const res = response.data;

    next((vm) => vm.setData(res));
  },
};
</script>
