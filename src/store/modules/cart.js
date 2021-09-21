import { HTTP } from "@/interceptor/interceptor.js";
// eslint-disable-next-line no-unused-vars

export default {
  namespaced: true,
  state: {
    cartDetails: [],
  },
  getters: {
    cartDetails: (state) => state.cartDetails,
    cartCount: (state) =>
      state.cartDetails && state.cartDetails.cart_items && state.cartDetails.cart_items.length > 0
        ? state.cartDetails.cart_items.length
        : 0,
    totalAmount: (state) => (state.cartDetails && state.cartDetails.total_amount ? state.cartDetails.total_amount : 0),
  },
  mutations: {
    setCartDetails(state, data) {
      state.cartDetails = data;
    },
  },
  actions: {
    getCartDetail({ commit }) {
      return new Promise((resolve, reject) => {
        HTTP.get(`${process.env.VUE_APP_API_URL}cart`)
          .then((response) => {
            resolve(response);
            if (response.data.status) {
              commit("setCartDetails", response.data.data);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    addToCart({ commit }, params) {
      return new Promise((resolve, reject) => {
        HTTP.post(`${process.env.VUE_APP_API_URL}cart`, params)
          .then((response) => {
            resolve(response);
            if (response.data.status) {
              commit("setCartDetails", response.data.data);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    removeCartItem({ commit }, menuItemId) {
      return new Promise((resolve, reject) => {
        HTTP.delete(`${process.env.VUE_APP_API_URL}cart/${menuItemId}`)
          .then((response) => {
            resolve(response);
            if (response.data.status) {
              commit("setCartDetails", response.data.data);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
  },
};
