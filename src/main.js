import { createApp } from "vue";
import { FontAwesomeIcon, FontAwesomeLayers } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHome,
  faInfo,
  faSignInAlt,
  faCog,
  faCircle,
  faCircleNotch,
  faEdit,
  faTrash,
  faTimes,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp, faInstagram } from "@fortawesome/free-brands-svg-icons";
import App from "./App.vue";
import "./assets/css/tailwind.css";
import "animate.css";
import store from "./store";
import router from "./router";
import "@/global-validator/validator.js";

library.add(
  faHome,
  faInfo,
  faSignInAlt,
  faCog,
  faCircle,
  faCircleNotch,
  faEdit,
  faTrash,
  faTimes,
  faUpload,
  faWhatsapp,
  faInstagram
);

const app = createApp(App);
app.component("fa", FontAwesomeIcon);
app.component("fa-layer", FontAwesomeLayers);
app.use(store);
app.use(router);
app.mount("#app");
