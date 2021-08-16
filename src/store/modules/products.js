import { HTTP } from "@/interceptor/interceptor.js";
// eslint-disable-next-line no-unused-vars

export default {
  namespaced: true,
  state: {
    products: [],
  },
  getters: {
    products: (state) => state.products,
  },
  mutations: {
    setProducts(state, data) {
      state.products = data;
    },
  },
  actions: {
    getProducts({ commit }) {
      return new Promise((resolve, reject) => {
        HTTP.get(`${process.env.VUE_APP_API_URL}api/products`)
          .then((response) => {
            resolve(response);
            if (response.data.status) {
              commit("setProducts", response.data.data);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    // eslint-disable-next-line no-empty-pattern
    getProductById({}, productId) {
      return new Promise((resolve, reject) => {
        HTTP.get(`${process.env.VUE_APP_API_URL}api/products/${productId}`)
          .then((response) => {
            resolve(response);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    addProduct({ commit }, params) {
      return new Promise((resolve, reject) => {
        HTTP.post(`${process.env.VUE_APP_API_URL}api/products`, params)
          .then((response) => {
            resolve(response);
            if (response.data.status) {
              commit("setProducts", response.data.data);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    updateProduct({ commit }, params) {
      return new Promise((resolve, reject) => {
        HTTP.put(`${process.env.VUE_APP_API_URL}api/products/${params.product_id}`, {
          name: params.name,
          description: params.description,
          is_visible: params.is_visible,
        })
          .then((response) => {
            resolve(response);
            if (response.data.status) {
              commit("setProducts", response.data.data);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    deleteProduct({ commit }, productId) {
      return new Promise((resolve, reject) => {
        HTTP.delete(`${process.env.VUE_APP_API_URL}api/categories/${productId}`)
          .then((response) => {
            resolve(response);
            if (response.data.status) {
              commit("setProducts", response.data.data);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
  },
};
