import Vue from "vue";
import VueRouter from "vue-router";
// components
import Home from "@/pages/Home";
import Login from "@/pages/Login";
// other
import store from "@/store/store";
// configs
Vue.use(VueRouter);

const routes = [
  {
    name: "Home",
    path: "/",
    component: Home,
  },
  {
    name: "Login",
    path: "/login",
    component: Login,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && !store.state.user) next({ name: "Login" });
  else if (to.name === "Login" && store.state.user) next({ name: "Home" });
  else next();
});

export default router;
