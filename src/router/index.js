import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "Home" */ "../components/HomeScreen.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "About" */ "../components/AboutUs.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(
        /* webpackChunkName: "Login" */ "../components/LoginScreen.vue"
      ),
  },
  {
    path: "/settings",
    name: "Settings",
    component: () =>
      import(
        /* webpackChunkName: "Settings" */ "../components/SettingsScreen.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
