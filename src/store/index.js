import { createStore } from "vuex";
import VuexPersist from "vuex-persist";

// Store Modules
import auth from "@/store/modules/auth.js";
import categories from "@/store/modules/categories.js";
import products from "@/store/modules/products.js";

const vuexPersist = new VuexPersist({
  key: "Fatimas",
  storage: localStorage,
});

const store = createStore({
  plugins: [vuexPersist.plugin],
  modules: {
    auth,
    categories,
    products,
  },
});

export default store;
