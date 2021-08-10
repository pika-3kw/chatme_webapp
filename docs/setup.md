# Setup project

## Khởi tạo project

```
$ vue create <ten_project>
```

## Cài đặt thư viện cần thiết

```
$ vue add vuetify
$ yarn add vuex vue-router axios vue-axios
```

## Cấu hình các thư viện

1. Vuetify

Khi chạy `vue add vuetify` là vue đã tự động config.

2. Axios

```
main.js

import axios from "axios";
import VueAxios from "vue-axios";
...
Vue.use(VueAxios, axios);
```

3. Vuex

```
store/store.js

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
});

export default store;
```

```
main.js

import store from "./store/store";

Vue.config.devtools = true;
new Vue({
  ...
  store,
  ...
}).$mount("#app");
```

4. Vue Router

```
routes/router.js

import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/pages/Home";
import Login from "@/pages/Login";

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
```

```
main.js

import router from "./routes/router";

new Vue({
  ...
  router,
  ...
}).$mount("#app");
```

## Khởi tạo các page components

1. App

```
app.vue

<template>
  <v-app>
    <router-link to="/">Home</router-link>
    <router-link to="/login">Login</router-link>
    <router-view></router-view>
  </v-app>
</template>

<script>
```

2. Home

```
pages/Home.vue

<template>
  <div>
    Home
  </div>
</template>
```

3. Login

```
pages/Login.vue

<template>
  <div>
    Login
  </div>
</template>
```
