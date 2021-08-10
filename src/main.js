import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import VueSocketIO from "vue-socket.io";
import SocketIO from "socket.io-client";
// plugins
import vuetify from "./plugins/vuetify";
// components
import App from "./App.vue";

// other
import store from "./store/store";
import router from "./routes/router";
import { BACKEND_SERVER } from "./configs/constants";
// configs
Vue.config.productionTip = false;
Vue.config.devtools = true;
Vue.use(VueAxios, axios);

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: SocketIO(BACKEND_SERVER, {
      autoConnect: false,
    }),
  })
);

new Vue({
  vuetify,
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
