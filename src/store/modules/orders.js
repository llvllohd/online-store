import { HTTP } from "@/interceptor/interceptor.js";
// eslint-disable-next-line no-unused-vars

export default {
  namespaced: true,
  state: {
    orderDetail: [],
    myOrders: [],
    orderStatuses: [],
    allOrders: [],
  },
  getters: {
    orderDetail: (state) => state.orderDetail,
    myOrders: (state) => state.myOrders,
    orderStatuses: (state) => state.orderStatuses,
    allOrders: (state) => state.allOrders,
  },
  mutations: {
    setOrderDetail(state, data) {
      state.orderDetail = data;
    },
    setMyOrders(state, data) {
      state.myOrders = data;
    },
    setOrderStatuses(state, data) {
      state.orderStatuses = data;
    },
    setAllOrders(state, data) {
      state.allOrders = data;
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

    getOrderStatuses({ commit }, orderId) {
      return new Promise((resolve, reject) => {
        HTTP.get(`${process.env.VUE_APP_API_URL}track-order/${orderId}`)
          .then((response) => {
            resolve(response);
            if (response.data.status) {
              commit("setOrderStatuses", response.data.data);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    // All Orders
    getAllOrders({ commit }) {
      return new Promise((resolve, reject) => {
        HTTP.get(`${process.env.VUE_APP_API_URL}track-orders`)
          .then((response) => {
            resolve(response);
            if (response.data.status) {
              commit("setAllOrders", response.data.data);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    updateOrderStatus({ commit }, orderId) {
      return new Promise((resolve, reject) => {
        HTTP.put(`${process.env.VUE_APP_API_URL}track-orders/${orderId}`)
          .then((response) => {
            resolve(response);
            if (response.data.status) {
              commit("setAllOrders", response.data.data);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    rejectOrder({ commit }, orderId) {
      return new Promise((resolve, reject) => {
        HTTP.put(`${process.env.VUE_APP_API_URL}reject-order/${orderId}`)
          .then((response) => {
            resolve(response);
            if (response.data.status) {
              commit("setAllOrders", response.data.data);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    updatePaymentStatus({ commit }, params) {
      return new Promise((resolve, reject) => {
        HTTP.put(`${process.env.VUE_APP_API_URL}update-payment`, params)
          .then((response) => {
            resolve(response);
            if (response.data.status) {
              commit("setAllOrders", response.data.data);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
  },
};
