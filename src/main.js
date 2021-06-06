import { createApp } from "vue";
import {
  FontAwesomeIcon,
  FontAwesomeLayers,
} from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHome,
  faInfo,
  faSignInAlt,
  faCog,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp, faInstagram } from "@fortawesome/free-brands-svg-icons";
import App from "./App.vue";
import "./assets/css/tailwind.css";
import "animate.css";
import router from "./router";

library.add(
  faHome,
  faInfo,
  faSignInAlt,
  faCog,
  faCircle,
  faWhatsapp,
  faInstagram
);

const app = createApp(App);
app.component("fa", FontAwesomeIcon);
app.component("fa-layer", FontAwesomeLayers);
app.use(router);
app.mount("#app");
