import { createStore } from "vuex";
import VuexPersist from "vuex-persist";

// Store Modules
import loader from "@/store/modules/loader.js";
import auth from "@/store/modules/auth.js";
import categories from "@/store/modules/categories.js";
import products from "@/store/modules/products.js";
import menuItems from "@/store/modules/menuItems.js";

const vuexPersist = new VuexPersist({
  key: "Fatimas",
  storage: localStorage,
});

const store = createStore({
  plugins: [vuexPersist.plugin],
  modules: {
    loader,
    auth,
    categories,
    products,
    menuItems,
  },
});

export default store;
