import Vue from "vue";
import Router from "vue-router";

import Login from "@/components/Login/Login.vue";
import Register from "@/components/Register/Register.vue";
import ItemIndex from "@/components/Item/Index.vue";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/item",
      name: "ItemIndex",
      component: ItemIndex
    },
    {
      path: "*",
      redirect: "/item"
    }
  ]
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  if (authRequired && !loggedIn) {
    return next("/login");
  }

  next();
});

export default router;
