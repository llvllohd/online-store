import { HTTP } from "@/interceptor/interceptor.js";

export default {
  namespaced: true,
  state: {
    addressData: [],
  },
  getters: {
    addressData: (state) => state.addressData,
  },
  mutations: {
    setAddressData(state, data) {
      state.addressData = data;
    },
  },
  actions: {
    getAddresses({ commit }) {
      return new Promise((resolve, reject) => {
        HTTP.get(`${process.env.VUE_APP_API_URL}address`)
          .then((response) => {
            resolve(response);
            if (response.data.status) {
              commit("setAddressData", response.data.data);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    // eslint-disable-next-line no-empty-pattern
    getAddressById({}, addressId) {
      return new Promise((resolve, reject) => {
        HTTP.get(`${process.env.VUE_APP_API_URL}address/${addressId}`)
          .then((response) => {
            resolve(response);
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    addAddress({ commit }, params) {
      return new Promise((resolve, reject) => {
        HTTP.post(`${process.env.VUE_APP_API_URL}address`, params)
          .then((response) => {
            resolve(response);
            if (response.data.status) {
              commit("setAddressData", response.data.data);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    updateAddress({ commit }, params) {
      return new Promise((resolve, reject) => {
        HTTP.put(`${process.env.VUE_APP_API_URL}address/${params.address_id}`, params)
          .then((response) => {
            resolve(response);
            if (response.data.status) {
              commit("setAddressData", response.data.data);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },

    deleteAddress({ commit }, addressId) {
      return new Promise((resolve, reject) => {
        HTTP.delete(`${process.env.VUE_APP_API_URL}address/${addressId}`)
          .then((response) => {
            resolve(response);
            if (response.data.status) {
              commit("setAddressData", response.data.data);
            }
          })
          .catch((e) => {
            reject(e);
          });
      });
    },
  },
};
