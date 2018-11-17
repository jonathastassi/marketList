// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

// Add token to axios header
import axios from "axios";
let user = JSON.parse(localStorage.getItem("user"));
window.axios = axios;
if (user && user.token) {
  window.axios.defaults.headers.common["Authorization"] = user.token;
}
Vue.prototype.axios = window.axios;

Vue.use(Vuetify);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
