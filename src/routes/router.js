import Vue from "vue";
import VueRouter from "vue-router";
// components
import Home from "@/pages/Home";
import Login from "@/pages/Login";
// configs
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
