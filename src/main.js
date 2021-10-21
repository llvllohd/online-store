import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { FontAwesomeIcon, FontAwesomeLayers } from "./icons/icons.js";
import "./assets/css/tailwind.css";
import "animate.css";
import "@/global-validator/validator.js";

const app = createApp(App);
app.use(store);
app.use(router);
app.component("fa", FontAwesomeIcon);
app.component("fa-layer", FontAwesomeLayers);
app.mount("#app");
