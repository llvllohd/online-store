import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "Home" */ "../components/HomeScreen.vue"),
  },
  {
    path: "/about",
    component: () =>
      import(/* webpackChunkName: "About" */ "../components/AboutUs.vue"),
  },
  {
    path: "/categories",
    component: () =>
      import(
        /* webpackChunkName: "Categories" */ "../components/CategoriesScreen.vue"
      ),
  },
  {
    path: "/settings",
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
