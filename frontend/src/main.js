// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
// import socketio from "socket.io-client";
// import VueSocketIO from "vue-socket.io";

// Add token to axios header
import axios from "axios";
window.axios = axios;
let user = JSON.parse(localStorage.getItem("user"));
if (user && user.token) {
  window.axios.defaults.headers.common["Authorization"] = user.token;
}

// Vue.use(
//   new VueSocketIO({
//     // debug: true,
//     connection: "http://localhost:8005?token=" + user.token
//   })
// );

// if (user && user.token) {
//   window.axios.io = socketio("http://localhost:8000", {
//     query: { token: user.token }
//   });
//   Vue.use(VueSocketIO, window.axios.io);
// }

window.axios.interceptors.response.use(
  response => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      // response.headers.Authorization = user.token;
      // response.headers.authorization = user.token;
      // window.axios.defaults.headers.common["Authorization"] = user.token;
      // window.axios.defaults.headers.common["authorization"] = user.token;
    }
    return response;
  },
  error => {
    let errorResponse = error.response;
    if (errorResponse.status === 401) {
      // localStorage.removeItem("user");
      // router.push({ name: "Login" });
    }
    return Promise.reject(error);
  }
);

Vue.prototype.axios = window.axios;

Vue.use(Vuetify);

Vue.config.productionTip = false;

// Mixin global ( methods )
Vue.mixin({
  methods: {
    numberFormatReal: function(number = 0) {
      const formatter = new Intl.NumberFormat("pt-BR", {
        // currency: 'BRL',
        minimumFractionDigits: 2
      });
      return formatter.format(number);
    },

    replaceAll: function(word, search, replace) {
      RegExp.quote = function(str) {
        return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
      };

      var re = new RegExp(RegExp.quote(search), "g");
      return word.replace(re, replace);
    }
  }
});

// Filters global
const number_format_real = function(number = 0) {
  const formatter = new Intl.NumberFormat("pt-BR", {
    // currency: 'BRL',
    minimumFractionDigits: 2
  });
  return formatter.format(number);
};

Vue.filter("number_format_real", number_format_real);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});

// window.axios.io = socketio("http://localhost:8000");
// Vue.use(VueSocketIO, window.axios.io);

// window.axios.io.on("connect", function(result) {
//   console.log(result);
//   console.log("conectado");
// });
