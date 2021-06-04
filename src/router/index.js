import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Menu Items",
    component: () =>
      import(
        /* webpackChunkName: "Menu Items" */ "../components/MenuItems.vue"
      ),
  },
  {
    path: "/item-details/:id",
    name: "Item Details",
    component: () =>
      import(
        /* webpackChunkName: "Item Details" */ "../components/ItemDetails.vue"
      ),
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "About" */ "../components/AboutUs.vue"),
  },
  {
    path: "/settings",
    name: "Settings",
    component: () =>
      import(
        /* webpackChunkName: "Settings" */ "../components/SettingsScreen.vue"
      ),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "Login" */ "../components/LoginScreen.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 };
  },
});

export default router;
