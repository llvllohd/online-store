import { HTTP } from "@/interceptor/interceptor.js";
// eslint-disable-next-line no-unused-vars

export default {
  namespaced: true,
  state: {
    menuItems: [],
  },
  getters: {
    menuItems: (state) => state.menuItems,
  },
  mutations: {
    setMenuItems(state, data) {
      state.menuItems = data;
    },
  },
  actions: {
    getMenuItems({ commit }) {
      return new Promise((resolve, reject) => {
        HTTP.get(`${process.env.VUE_APP_API_URL}menu-items`)
          .then((response) => {
            resolve(response);
            if (response.data.status) {
              commit("setMenuItems", response.data.data);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    // eslint-disable-next-line no-empty-pattern
    getMenuItemById({}, itemId) {
      return new Promise((resolve, reject) => {
        HTTP.get(`${process.env.VUE_APP_API_URL}menu-items/${itemId}`)
          .then((response) => {
            resolve(response);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
  },
};
