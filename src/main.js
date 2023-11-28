import { createApp } from "vue";
import App from "./App.vue";
import "materialize-css/dist/css/materialize.css";
import Backendless from "backendless";
import { plugin, defaultConfig } from "@formkit/vue";
import config from "@/formkit.config.js";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { createRouter, createWebHistory } from "vue-router";
import RecordTable from "./components/RecordTable.vue";
import store from "./store";

const APP_ID = "6A3982D3-ACB3-D227-FFE4-9839C74BD300";
const API_KEY = "611C81A9-F39C-4A4A-9CF1-D5DE0B346199";

Backendless.initApp(APP_ID, API_KEY);

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: "Clients",
      path: "/",
      component: () => import("./components/ClientTable.vue"),
      meta: { requiresAuth: true, valid_API: true },
    },
    {
      name: "Records",
      path: "/records",
      component: RecordTable,
      meta: { requiresAuth: true, valid_API: true },
    },
    {
      name: "Auth",
      path: "/auth",
      component: () => import("./components/UserAuth.vue"),
      meta: { requiresAuth: false, valid_API: false },
    },
    {
      path: "/:catchAll(.*)",
      redirect: "/",
      meta: { requiresAuth: true, valid_API: true },
    },
  ],
});

let valid_API = false;

function success(result) {
  console.log("Is login valid?: " + result);
  store.commit("updateValid", result);
  console.log("validdd: ", store.getters.getValid);
  return result;
}

function error(err) {
  console.log(err.message);
  console.log(err.statusCode);
}

valid_API = await Backendless.UserService.isValidLogin()
  .then(success)
  .catch(error);

// Глобальный маршрутный хук
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && valid_API == false) {
    // Если пользователь не вошел в систему, перенаправление на страницу авторизации
    next("/auth");
  } else {
    // В противном случае продолжение навигации
    next();
  }
});

const app = createApp(App);
app.use(plugin, defaultConfig(config));
app.use(router);
app.use(Toast);
app.use(store);
app.mount("#app");
