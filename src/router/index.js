import { createRouter, createWebHistory } from "vue-router";
import store from "@/store/index.js";

let siteName = " - Fatimas";
const routes = [
  {
    path: "/register",
    name: "Register",
    component: () => import(/* webpackChunkName: "Signup" */ "@/components/auth/SignupScreen.vue"),
    meta: {
      title: "Registration" + siteName,
      requiresAuth: false,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "Login" */ "@/components/auth/LoginScreen.vue"),
    meta: {
      title: "Login" + siteName,
      requiresAuth: false,
    },
  },

  {
    path: "/",
    name: "Menu Items",
    component: () => import(/* webpackChunkName: "Menu Items" */ "@/components/menu-items/MenuItems.vue"),
    meta: {
      title: "Menu Items" + siteName,
      requiresAuth: false,
    },
  },
  {
    path: "/item-details/:id",
    name: "Item Details",
    component: () => import(/* webpackChunkName: "Item Details" */ "@/components/menu-items/ItemDetails.vue"),
    meta: {
      title: "Item Details" + siteName,
      requiresAuth: false,
    },
  },
  // Categories
  {
    path: "/categories",
    name: "Categories",
    component: () => import(/* webpackChunkName: "Categories" */ "@/components/categories/ListCategories.vue"),
    meta: {
      title: "Categories" + siteName,
      requiresAuth: true,
    },
  },
  {
    path: "/add-category",
    name: "Add Category",
    component: () => import(/* webpackChunkName: "Add Category" */ "@/components/categories/AddUpdateCategory.vue"),
    meta: {
      title: "Add Category" + siteName,
      requiresAuth: true,
    },
  },
  // Products
  {
    path: "/products",
    name: "Products",
    component: () => import(/* webpackChunkName: "Products" */ "@/components/products/ListProducts.vue"),
    meta: {
      title: "Products" + siteName,
      requiresAuth: true,
    },
  },
  {
    path: "/add-product",
    name: "Add Product",
    component: () => import(/* webpackChunkName: "Add Product" */ "@/components/products/AddUpdateProduct.vue"),
    meta: {
      title: "Add Product" + siteName,
      requiresAuth: true,
    },
  },
  {
    path: "/about",
    name: "About Us",
    component: () => import(/* webpackChunkName: "About" */ "../components/AboutUs.vue"),
    meta: {
      title: "About Us" + siteName,
      requiresAuth: false,
    },
  },

  {
    path: "/:pathMatch(.*)*",
    name: "Page Not Found",
    component: () => import("@/components/common/PageNotFound.vue"),
    meta: {
      title: "Page Not Found" + siteName,
      requiresAuth: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0, behavior: "smooth" };
  },
});

router.beforeEach((to, from, next) => {
  var token = store.getters["auth/isUserLoggedIn"];
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (token) {
      next();
    } else if (token == "") {
      next({ name: "Login" });
      return;
    } else {
      next({ name: "Login" });
    }
  } else {
    next();
  }
  document.title = to.meta.title;
});

// Loading chunk error
router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }
});

export default router;
