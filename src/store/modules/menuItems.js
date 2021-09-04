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
    getCategoriesList({}) {
      return new Promise((resolve, reject) => {
        HTTP.get(`${process.env.VUE_APP_API_URL}categories-list`)
          .then((response) => {
            resolve(response);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    // eslint-disable-next-line no-empty-pattern
    getCategoryById({}, categoryId) {
      return new Promise((resolve, reject) => {
        HTTP.get(`${process.env.VUE_APP_API_URL}categories/${categoryId}`)
          .then((response) => {
            resolve(response);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    addCategory({ commit }, params) {
      return new Promise((resolve, reject) => {
        HTTP.post(`${process.env.VUE_APP_API_URL}categories`, params)
          .then((response) => {
            resolve(response);
            if (response.data.status) {
              commit("setCategories", response.data.data);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    updateCategory({ commit }, params) {
      return new Promise((resolve, reject) => {
        HTTP.put(`${process.env.VUE_APP_API_URL}categories/${params.category_id}`, {
          name: params.name,
          description: params.description,
          is_visible: params.is_visible,
        })
          .then((response) => {
            resolve(response);
            if (response.data.status) {
              commit("setCategories", response.data.data);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    deleteCategory({ commit }, categoryId) {
      return new Promise((resolve, reject) => {
        HTTP.delete(`${process.env.VUE_APP_API_URL}categories/${categoryId}`)
          .then((response) => {
            resolve(response);
            if (response.data.status) {
              commit("setCategories", response.data.data);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
  },
};
