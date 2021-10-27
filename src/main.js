import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import HeaderComponent from "@/common/HeaderComponent.vue";
import RightHandSide from "@/common/RightHandSide";
import TitleScreen from "@/common/TitleScreen.vue";
import { FontAwesomeIcon, FontAwesomeLayers } from "./icons/icons.js";
import "./assets/css/tailwind.css";
import "animate.css";
import "@/global-validator/validator.js";
import { upperFirst, camelCase } from "lodash";

const app = createApp(App);
const requireComponent = require.context("./components", false, /Base[A-Z]\w+\.(vue|js)$/);
requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName);
  const componentName = upperFirst(camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, "$1")));
  app.component(componentName, componentConfig.default || componentConfig);
});
app.use(store);
app.use(router);
app.component("HeaderComponent", HeaderComponent);
app.component("RightHandSide", RightHandSide);
app.component("TitleScreen", TitleScreen);
app.component("fa", FontAwesomeIcon);
app.component("fa-layer", FontAwesomeLayers);
app.mount("#app");
