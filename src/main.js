import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

// plugins
import vuetify from "./plugins/vuetify";
// components
import App from "./App.vue";

// other
import store from "./store/store";
import router from "./routes/router";
// configs
Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.use(VueAxios, axios);

new Vue({
  vuetify,
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
