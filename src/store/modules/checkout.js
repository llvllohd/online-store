import { HTTP } from "@/interceptor/interceptor.js";
// eslint-disable-next-line no-unused-vars

export default {
  namespaced: true,
  state: {
    checkoutDetail: [],
  },
  getters: {
    checkoutDetail: (state) => state.checkoutDetail,
  },
  mutations: {
    setCheckoutDetail(state, data) {
      state.checkoutDetail = data;
    },
  },
  actions: {
    getCheckoutDetail({ commit }) {
      return new Promise((resolve, reject) => {
        HTTP.get(`${process.env.VUE_APP_API_URL}checkout`)
          .then((response) => {
            resolve(response);
            if (response.data.status) {
              commit("setCheckoutDetail", response.data.data);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
    // eslint-disable-next-line no-empty-pattern
    createOrder({}, params) {
      return new Promise((resolve, reject) => {
        HTTP.post(`${process.env.VUE_APP_API_URL}orders`, params)
          .then((response) => {
            resolve(response);
            // if (response.data.status) {
            //   commit("setCheckoutDetail", response.data.data);
            // }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
  },
};
