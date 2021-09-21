import { createStore } from "vuex";
import VuexPersist from "vuex-persist";

// Store Modules
import loader from "@/store/modules/loader.js";
import auth from "@/store/modules/auth.js";
import address from "@/store/modules/address.js";
import categories from "@/store/modules/categories.js";
import products from "@/store/modules/products.js";
import menuItems from "@/store/modules/menuItems.js";
import cart from "@/store/modules/cart.js";
import checkout from "@/store/modules/checkout.js";

const vuexPersist = new VuexPersist({
  key: "Fatimas",
  storage: localStorage,
});

const store = createStore({
  plugins: [vuexPersist.plugin],
  modules: {
    loader,
    auth,
    address,
    categories,
    products,
    menuItems,
    cart,
    checkout,
  },
});

export default store;
