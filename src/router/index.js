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
    path: "/forgot-password",
    name: "Forgot Password",
    component: () => import(/* webpackChunkName: "Forgot Password" */ "@/components/auth/ForgotPassword.vue"),
    meta: {
      title: "Forgot Password" + siteName,
      requiresAuth: false,
    },
  },
  {
    path: "/change-password",
    name: "Change Password",
    component: () => import(/* webpackChunkName: "Change Password" */ "@/components/auth/ChangePassword.vue"),
    meta: {
      title: "Change Password" + siteName,
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
    path: "/item-detail",
    name: "Item Detail",
    component: () => import(/* webpackChunkName: "Item Details" */ "@/components/menu-items/ItemDetails.vue"),
    meta: {
      title: "Item Detail" + siteName,
      requiresAuth: false,
    },
  },

  {
    path: "/cart",
    name: "Cart",
    component: () => import(/* webpackChunkName: "Cart" */ "@/components/cart/CartScreen.vue"),
    meta: {
      title: "Cart" + siteName,
      requiresAuth: false,
    },
    beforeEnter: (to, from, next) => {
      let cartCount = store.getters["cart/cartCount"];
      if (cartCount > 0) {
        next();
      } else {
        next({ name: "Menu Items" });
      }
    },
  },

  {
    path: "/checkout",
    name: "Checkout",
    component: () => import(/* webpackChunkName: "Checkout" */ "@/components/checkout/CheckoutScreen.vue"),
    meta: {
      title: "Checkout" + siteName,
      requiresAuth: false,
    },
    beforeEnter: (to, from, next) => {
      let cartCount = store.getters["cart/cartCount"];
      if (cartCount > 0) {
        next();
      } else {
        next({ name: "Menu Items" });
      }
    },
  },

  {
    path: "/confirmation",
    name: "Confirmation",
    component: () => import(/* webpackChunkName: "Confirmation" */ "@/components/orders/ConfirmationScreen.vue"),
    meta: {
      title: "Confirmation" + siteName,
      requiresAuth: false,
    },
  },

  {
    path: "/orders",
    name: "My Orders",
    component: () => import(/* webpackChunkName: "My Orders" */ "@/components/orders/MyOrders.vue"),
    meta: {
      title: "My Orders" + siteName,
      requiresAuth: true,
    },
  },

  {
    path: "/order-detail",
    name: "Order Detail",
    component: () => import(/* webpackChunkName: "Order Detail" */ "@/components/orders/OrderDetail.vue"),
    meta: {
      title: "Order Detail" + siteName,
      requiresAuth: false,
    },
  },

  {
    path: "/track-order",
    name: "Track Order",
    component: () => import(/* webpackChunkName: "Track Order" */ "@/components/orders/TrackOrder.vue"),
    meta: {
      title: "Track Order" + siteName,
      requiresAuth: false,
    },
  },

  // All Orders
  {
    path: "/track-orders",
    name: "Track Orders",
    component: () => import(/* webpackChunkName: "Track Orders" */ "@/components/orders/AllOrders.vue"),
    meta: {
      title: "Track Orders" + siteName,
      requiresAdminAuth: true,
    },
  },
  // Categories
  {
    path: "/categories",
    name: "Categories",
    component: () => import(/* webpackChunkName: "Categories" */ "@/components/categories/ListCategories.vue"),
    meta: {
      title: "Categories" + siteName,
      requiresAdminAuth: true,
    },
  },
  {
    path: "/add-category",
    name: "Add Category",
    component: () => import(/* webpackChunkName: "Add Category" */ "@/components/categories/AddUpdateCategory.vue"),
    meta: {
      title: "Add Category" + siteName,
      requiresAdminAuth: true,
    },
  },
  // Products
  {
    path: "/products",
    name: "Products",
    component: () => import(/* webpackChunkName: "Products" */ "@/components/products/ListProducts.vue"),
    meta: {
      title: "Products" + siteName,
      requiresAdminAuth: true,
    },
  },
  {
    path: "/add-product",
    name: "Add Product",
    component: () => import(/* webpackChunkName: "Add Product" */ "@/components/products/AddUpdateProduct.vue"),
    meta: {
      title: "Add Product" + siteName,
      requiresAdminAuth: true,
    },
  },
  {
    path: "/manage-address",
    name: "Manage Address",
    component: () => import(/* webpackChunkName: "Manage Address" */ "@/components/auth/ManageAddress.vue"),
    meta: {
      title: "Manage Address" + siteName,
      requiresAuth: true,
    },
  },
  {
    path: "/add-address",
    name: "Add Address",
    component: () => import(/* webpackChunkName: "Add Address" */ "@/components/auth/AddUpdateAddress.vue"),
    meta: {
      title: "Add Address" + siteName,
      requiresAuth: true,
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
  let token = store.getters["auth/isUserLoggedIn"];
  let userType = store.getters["auth/userType"];
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (token) {
      next();
    } else {
      next({ name: "Menu Items" });
    }
  } else if (to.matched.some((record) => record.meta.requiresAdminAuth)) {
    if (token && userType == "admin") {
      next();
    } else {
      next({ name: "Menu Items" });
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
