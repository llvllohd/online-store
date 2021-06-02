import { createApp } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHome, faInfo , faSignInAlt, faCog} from "@fortawesome/free-solid-svg-icons";
import { } from "@fortawesome/free-brands-svg-icons";
import App from "./App.vue";
import "./assets/css/tailwind.css";
import "animate.css";
import router from "./router";

library.add(faHome, faInfo , faSignInAlt , faCog);

const app = createApp(App);
app.component("fa", FontAwesomeIcon);
app.use(router);
app.mount("#app");
