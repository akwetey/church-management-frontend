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
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
