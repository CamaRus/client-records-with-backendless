import { createApp } from "vue";
import App from "./App.vue";
import "materialize-css/dist/css/materialize.css";
import Backendless from "backendless";
// import VeeValidate from "vee-validate";
// import VueFormulate from "@braid/vue-formulate";
import { plugin, defaultConfig } from "@formkit/vue";
import config from "@/formkit.config.js";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const APP_ID = "6A3982D3-ACB3-D227-FFE4-9839C74BD300";
const API_KEY = "611C81A9-F39C-4A4A-9CF1-D5DE0B346199";

Backendless.initApp(APP_ID, API_KEY);

const app = createApp(App);
// app.use(store);
// app.use(VeeValidate);
app.use(plugin, defaultConfig(config));

app.use(Toast);
app.mount("#app");
