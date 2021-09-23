import { HTTP } from "@/interceptor/interceptor.js";
// eslint-disable-next-line no-unused-vars

export default {
  namespaced: true,
  state: {
    orderDetail: [],
  },
  getters: {
    orderDetail: (state) => state.orderDetail,
  },
  mutations: {
    setOrderDetail(state, data) {
      state.orderDetail = data;
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
  },
};
