import { HTTP } from "@/interceptor/interceptor.js";
// eslint-disable-next-line no-unused-vars

export default {
  namespaced: true,
  state: {
    orderDetail: [],
    myOrders: [],
  },
  getters: {
    orderDetail: (state) => state.orderDetail,
    myOrders: (state) => state.myOrders,
  },
  mutations: {
    setOrderDetail(state, data) {
      state.orderDetail = data;
    },
    setMyOrders(state, data) {
      state.myOrders = data;
    },
  },
  actions: {
    getOrderDetail({ commit }, orderId) {
      return new Promise((resolve, reject) => {
        HTTP.get(`${process.env.VUE_APP_API_URL}orders/${orderId}`)
          .then((response) => {
            resolve(response);
            if (response.data.status) {
              commit("setOrderDetail", response.data.data);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    getMyOrders({ commit }) {
      return new Promise((resolve, reject) => {
        HTTP.get(`${process.env.VUE_APP_API_URL}orders`)
          .then((response) => {
            resolve(response);
            if (response.data.status) {
              commit("setMyOrders", response.data.data);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
  },
};
