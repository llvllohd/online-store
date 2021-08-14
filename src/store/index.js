import { createStore } from "vuex";
import VuexPersist from "vuex-persist";

// Store Modules
import auth from "@/store/modules/auth.js";
import categories from "@/store/modules/categories.js";

const vuexPersist = new VuexPersist({
  key: "Fatimas",
  storage: localStorage,
});

const store = createStore({
  plugins: [vuexPersist.plugin],
  modules: {
    auth,
    categories,
  },
});

export default store;
