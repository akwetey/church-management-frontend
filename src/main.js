import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Tooltip from "primevue/tooltip";
import Axios from "@services/api/axios";

// VeeValidate
import "./validation";

// Stylesheets
import "@assets/css/style.css";
import "primeicons/primeicons.css";
import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/saga-blue/theme.css";
import "@assets/scss/main.scss";

Vue.directive("tooltip", Tooltip);
Vue.directive("can", {
  bind: function(el, binding, vnode) {
    const permissions = store.state.user.permissions || [];
    const { value } = binding;

    if (!permissions.includes(value)) {
      //el.style.display = "none";
      vnode.context.$nextTick(() => {
        vnode.elm.remove();
      });
    }
  },
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    const userInfo = localStorage.getItem("user");
    if (userInfo) {
      const userData = JSON.parse(userInfo);
      this.$store.commit("setUserData", userData);
    }
    Axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("_chms_token");
        //console.log(token);
        if (token) {
          config.headers.common["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  },
  render: (h) => h(App),
}).$mount("#app");
